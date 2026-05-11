# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The filename is historical; the content is tool-neutral and applies to any AI coding assistant (Claude Code, Codex, Cursor, Aider, Continue, Gemini CLI, GitHub Copilot, etc.). `AGENTS.md` and `.github/copilot-instructions.md` are pointers to this file — keep edits here.

## Overview

`@device-management-toolkit/wsman-messages` is a TypeScript library that constructs WS-Management (WSMAN) XML messages addressed to Intel® Active Management Technology (AMT) firmware. Consumers (notably [MPS](https://github.com/device-management-toolkit/mps) and [RPS](https://github.com/device-management-toolkit/rps)) call methods like `new AMT.Messages().GeneralSettings.Get()` and receive a ready-to-send XML envelope; this library does **not** perform any transport — it only emits strings. The public surface is three namespaces — `AMT`, `CIM`, `IPS` — plus shared `Common` types and DMTF base classes. Full AMT SDK reference: <https://software.intel.com/sites/manageability/AMT_Implementation_and_Reference_Guide/default.htm>.

## Commands

- `npm test` — Vitest run with coverage (`@vitest/coverage-v8`). The suites assert on **exact XML byte-for-byte equality** (`expect(response).toEqual(correctResponse)`), so any envelope change — even whitespace, attribute order, or namespace prefix — will surface here.
- Single test: `npx vitest run src/amt/messages.test.ts` (add `-t "AlarmClockService"` to filter by `describe`/`it` name).
- `npm run lint` — ESLint over `**/*.ts`.
- `npm run prettify` / `npm run ci-prettify` — Prettier write / check.
- `npm run compile` — `tsc` to `dist/` (used at publish time, not normally needed during development).

`package.json` does not declare an `engines.node` requirement; CI runs Node `24.x` (see `.github/workflows/`), so that's the version contributors should target locally. Project is ESM (`"type": "module"`); intra-repo imports use `.js` extensions on `.ts` source paths (see `src/index.ts`). Published consumers also import via subpath, e.g. `@device-management-toolkit/wsman-messages/WSMan.js`, so file layout under `src/` is part of the **public** API.

## Architecture

### Public surface (`src/index.ts`)

```ts
import * as AMT from './amt/index.js'
import * as CIM from './cim/index.js'
import * as IPS from './ips/index.js'
import * as Common from './models/index.js'
export { AMT, IPS, CIM, Common }
```

Each namespace (`AMT`, `CIM`, `IPS`) has the same five-file shape — keep them parallel:

- `classes.ts` — `enum Classes` of the WSMAN `ResourceURI` suffixes (e.g. `AMT_GeneralSettings`). The XML resource URI is built as `resourceUriBase + Classes.X`.
- `actions.ts` — `enum Actions` of fully-qualified WSMAN action URIs (used in the SOAP `a:Action` header).
- `methods.ts` — `enum Methods` of method names used as XML element names inside the body (`<h:ReadRecords_INPUT>`).
- `models.ts` — `namespace Models { interface … }` shapes for the inputs callers pass in.
- `types.ts` — `namespace Types { … }` of numeric value-mapped types from the DMTF/AMT schema (e.g. `LinkPolicy = 1 | 14 | 16 | 224`). Preserve the docstring value maps — they document the firmware-side meaning of each integer and consumers rely on them.
- `messages.ts` — one `class XxxService extends Base { className = Classes.X; … }` per AMT class, then a single `export class Messages` at the bottom that instantiates every service against a shared `WSManMessageCreator`. **Every service must be wired into the `Messages` class** — that's the entry point consumers construct.
- `index.ts` — re-exports everything from the files above. Add new exports here.

### The WSMan core (`src/WSMan.ts`)

The XML assembly lives in one file; the namespaces above are thin wrappers.

- `WSManMessageCreator` owns `messageId` (auto-increments per call), the `<Envelope>` prefix/suffix, the anonymous reply address, and the `PT60S` default operation timeout. `createHeader` emits the `<a:Action>`, `<a:To>`, `<w:ResourceURI>`, `<a:MessageID>`, `<a:ReplyTo>`, `<w:OperationTimeout>` block. `createCommonBody` provides `Get` / `Enumerate` / `Pull` / `Delete` / `CreateOrPut` / `RequestStateChange` bodies — use these instead of hand-rolling.
- `OBJtoXML` + `processBody` + `prependObjectKey` convert a JS model object to XML, prepending namespace prefixes (`h:`, `a:`, `w:`, `q:`) based on a small allow-list of well-known DMTF names (`Address`, `ReferenceParameters`, `SelectorSet`, `Selector`, `ResourceURI`). When adding a new model that needs custom namespacing, prefer extending that switch rather than crafting XML in the service class.
- `class Base` is the shared parent for every service. It provides `Enumerate`, `Get`, `Pull` directly, and `protectedDelete`, `protectedPut`, `protectedCreate`, `protectedRequestStateChange` for services that need to expose those operations selectively. Services set `className = Classes.X` and inherit the rest.
- `enum WSManErrors` — every thrown validation error in the library uses one of these constants as its message. Add new strings here rather than inlining; tests assert against the enum values.

### Authoring a new service / message

1. Add the resource URI suffix to the namespace's `classes.ts` (`AMT_NewThing`).
2. If your message needs a non-standard SOAP action, add it to `actions.ts`. If you're calling a custom method (not `Get`/`Put`/`Enumerate`/`Pull`/`Delete`/`RequestStateChange`), add it to `methods.ts`.
3. Add model and type definitions to `models.ts` / `types.ts`, preserving the value-map docstrings.
4. In `messages.ts`, add a `class NewThing extends Base { className = Classes.NEW_THING; … }` exposing only the methods AMT supports for that class. Use `Base.Enumerate` / `Base.Get` / `Base.Pull` and `protectedPut` etc. wherever possible; reach for `wsmanMessageCreator.createHeader` + `createBody` only when the message shape isn't covered by `createCommonBody`.
5. Wire the new class into the `Messages` class at the bottom of `messages.ts`.
6. Add a `describe(...)` block in `messages.test.ts` and assert against the **exact** expected XML string — the test framework's value is that it catches accidental envelope drift, so do not collapse the strings into helpers that hide structure.

### Why XML literals in tests are deliberate

The test files (`src/{amt,cim,ips}/messages.test.ts`) build the expected XML by interpolating `${(messageId++).toString()}` into long template strings. This looks repetitive but is intentional: AMT firmware is unforgiving about envelope shape, and a regression here means every downstream device call breaks. Don't refactor the tests into shared XML builders that mirror the production code — that would let a bug in `WSManMessageCreator` go undetected because both sides would change together.

## Consumer contract (CRITICAL)

This library is published to npm and consumed by external projects — most notably the [MPS](https://github.com/device-management-toolkit/mps) and RPS services in the device-management-toolkit. Implications:

- **Every emitted XML envelope is a public contract.** A whitespace, attribute-order, or namespace-prefix change is a behavior change for AMT firmware on the wire. If `messages.test.ts` expectations need updating, treat the change as breaking unless you can demonstrate the new envelope is byte-equivalent for the firmware (it usually isn't).
- **The exported TypeScript shapes are also public API.** Renaming a method on `AMT.Messages.*`, changing the order/optionality of parameters, restructuring `Models.*`, or relocating files (consumers import `@device-management-toolkit/wsman-messages/WSMan.js`, `/models/common.js`, etc.) are breaking changes.
- **Prefer additive evolution.** New optional parameters with sensible defaults, new methods, new model fields marked optional, new classes — fine. Removing, renaming, or tightening existing shapes — breaking, and must be flagged with `BREAKING CHANGE:` in the commit footer so semantic-release cuts a major.
- **Two npm names are published in parallel** during the rename from `@open-amt-cloud-toolkit/wsman-messages` to `@device-management-toolkit/wsman-messages`. Don't introduce code that assumes one package name over the other; both must stay drop-in compatible until the old name is retired (see README).

## Implementation guidelines (non-negotiable)

- **Never inline `<Envelope>`/`<Header>`/`<Body>` literals in service classes.** Build XML through `WSManMessageCreator.createHeader` + `createCommonBody` / `createBody`. If a message truly needs a hand-crafted body (e.g. `AlarmClockService.AddAlarm`'s nested IPS namespace), keep that XML local to one method and route everything else through the helpers.
- **Throw `WSManErrors` enum values, never ad-hoc strings.** Tests assert on these messages, and consumers may pattern-match on them.
- **Keep value-map docstrings on `Types.*` types.** They are the only place the firmware-side semantics of integer enums are documented; downstream consumers and humans rely on them.
- **Keep `AMT`/`CIM`/`IPS` parallel.** If you add a new file convention or a new export pattern to one namespace, mirror it in the other two unless there's a reason not to. Inconsistency makes consumers reach for the wrong import path.
- **Don't flip `strict: true` off in `tsconfig.json` as a workaround.** This project runs full strict mode; if you hit a typing issue, fix the model rather than weaken the compiler.
- **Keep PRs small and scoped to one concern.** Don't bundle a new `IPS` message with refactors to `WSMan.ts` and a Prettier sweep — they belong in separate PRs so the diff that changes wire format can be reviewed in isolation. This library is depended on by services that ship to devices in the field; reviewers need to see envelope-affecting changes clearly.
- **Order PRs around the semver release impact.** Releases are automated from conventional commits by semantic-release: `feat:` cuts a **minor**, `fix:`/`perf:` cuts a **patch**, `BREAKING CHANGE:` cuts a **major**, `chore:` cuts a **patch** (see `.releaserc.json`), and `refactor:`/`docs:`/`test:`/`style:`/`build:`/`ci:` do **not** cut a release. Land internal helpers and test scaffolding under `refactor:` / `test:` first; ship the user-visible new message as the `feat:` that triggers the release.
- **Before declaring work done, all three must be green:** `npm test`, `npm run ci-prettify`, `npm run lint`. CI runs the same.

## Commit conventions (see CONTRIBUTING.md)

Format: `<type>(<scope>): <subject>` with body and optional footer. Types: `feat | fix | docs | style | refactor | perf | test | build | ci | chore | revert`. Allowed scopes (enforced by `.github/commitlint.config.cjs`): `amt`, `cim`, `ips`, `deps`, `deps-dev`, `gh-actions`. The lint config caps `body-max-line-length` at 200; there is no enforced subject length, but the `CONTRIBUTING.md` style guide asks contributors to keep lines around 72 chars for readability on GitHub and in terminal git tools. Footer references a GitHub issue using a closing keyword (`Closes: #1234` / `Fixes: #1234` / `Resolves: #1234`). Linear history is preferred; PR authors merge via Rebase or Squash.

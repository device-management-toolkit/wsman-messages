# GitHub Copilot Instructions

See **[../CLAUDE.md](../CLAUDE.md)** — the canonical guide for AI coding assistants in this repository. The content is tool-neutral and applies to GitHub Copilot Chat / Copilot Workspace just as it does to any other agent. Edit `CLAUDE.md`; this file is a pointer.

Key rules (full detail in `CLAUDE.md`):

- This library only emits WSMAN XML strings — it never performs transport. Consumers (MPS, RPS, others) read the output and send it to AMT firmware themselves.
- Every emitted envelope is a **public wire-format contract**. Whitespace, attribute order, and namespace prefix changes are behavior changes — the `messages.test.ts` byte-exact assertions are deliberate.
- TypeScript shapes (method signatures on `AMT.Messages.*`, `Models.*`, file layout under `src/`) are also public API — consumers import subpath modules such as `@device-management-toolkit/wsman-messages/WSMan.js`. Prefer additive evolution; use `BREAKING CHANGE:` footers for anything else.
- Build XML through `WSManMessageCreator.createHeader` + `createCommonBody` / `createBody` in `src/WSMan.ts`. Don't inline `<Envelope>`/`<Header>`/`<Body>` literals in service classes.
- Keep the `AMT` / `CIM` / `IPS` namespaces parallel: same file shape (`classes.ts` / `actions.ts` / `methods.ts` / `models.ts` / `types.ts` / `messages.ts`), and every new service is wired into the bottom-of-file `Messages` class.
- Throw `WSManErrors` enum values, never ad-hoc error strings. Preserve value-map doc comments on `Types.*` — they're the only documentation of firmware-side integer semantics.
- Commit scopes are restricted to `amt`, `cim`, `ips`, `deps`, `deps-dev`, `gh-actions` (enforced in CI; see the commit-lint config under `.github/`). Releases are automated from conventional commits.
- Small, focused PRs only. No scope creep.
- Before declaring done: `npm test`, `npm run ci-prettify`, `npm run lint` all green.

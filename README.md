# WSMAN-MESSAGES

![CodeQL](https://img.shields.io/github/actions/workflow/status/device-management-toolkit/wsman-messages/codeql-analysis.yml?style=for-the-badge&label=CodeQL&logo=github)
![Build](https://img.shields.io/github/actions/workflow/status/device-management-toolkit/wsman-messages/node.js.yml?style=for-the-badge&logo=github)
![Codecov](https://img.shields.io/codecov/c/github/device-management-toolkit/wsman-messages?style=for-the-badge&logo=codecov)
[![OSSF-Scorecard Score](https://img.shields.io/ossf-scorecard/github.com/device-management-toolkit/wsman-messages?style=for-the-badge&label=OSSF%20Score)](https://api.securityscorecards.dev/projects/github.com/device-management-toolkit/wsman-messages)
[![Discord](https://img.shields.io/discord/1063200098680582154?style=for-the-badge&label=Discord&logo=discord&logoColor=white&labelColor=%235865F2&link=https%3A%2F%2Fdiscord.gg%2FDKHeUNEWVH)](https://discord.gg/DKHeUNEWVH)

Creates properly formatted wsman messages to send to Intel&reg; Active Management Technology (AMT) capable platforms. These libraries provide an easy to use API that when called return an XML string that is ready to be sent to an Intel&reg; AMT device. Supports calls into AMT, IPS, and CIM classes supported by Intel&reg; AMT devices. Full AMT SDK documentation can be found [here](https://software.intel.com/sites/manageability/AMT_Implementation_and_Reference_Guide/default.htm).

<br>

> IMPORTANT: For now, we are continuing to publish both @device-management-toolkit/wsman-messages and @open-amt-cloud-toolkit/wsman-messages npm packages to avoid a breaking change. Please update your package.json at your earliest convenience for when we cease to publish @open-amt-cloud-toolkit/wsman-messages. This is in effort to support the renaming of the toolkit.

## Installation

via NPM

```bash
npm i @device-management-toolkit/wsman-messages
```

## Usage

```typescript
import { AMT } from '@device-management-toolkit/wsman-messages'

const amtClass = new AMT.Message()
const message = this.amtClass.GeneralSettings.Get()
console.log(message)
```

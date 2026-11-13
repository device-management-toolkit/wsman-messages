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

### Return value descriptions

Method responses (`<Method>_OUTPUT`) carry a numeric `ReturnValue`. The numbers overlap between
services, so `describeReturnValue` takes the table that applies: `AMT` (PT_STATUS), `CIM` (DMTF method
return codes), `IPS` (IPS_HostBasedSetupService Setup / AdminSetup / UpgradeClientToAdmin) or `WIFI`
(AMT_WiFiPortConfigurationService AddWiFiSettings). It turns the raw number into a stable symbolic name
and a human-readable description so consumers can report failures meaningfully instead of passing the
number through or dropping it.

```typescript
import { Common } from '@device-management-toolkit/wsman-messages'
// or: import { describeReturnValue } from '@device-management-toolkit/wsman-messages/models/returnValues.js'

const result = Common.ReturnValues.describeReturnValue('AMT', 2066)
// { value: 2066, namespace: 'AMT', name: 'PT_STATUS_UNSUPPORTED',
//   description: 'Operation or value is not supported by this AMT firmware' }

Common.ReturnValues.describeReturnValue('CIM', 1).name // 'CIM_NOT_SUPPORTED'
Common.ReturnValues.describeReturnValue('IPS', 3).name // 'IPS_INVALID_PARAMETER' (3 is PT_STATUS_INVALID_PT_MODE for 'AMT')
Common.ReturnValues.isSuccessReturnValue(0) // true
```

Unknown values are never dropped: they come back with `name: 'UNKNOWN'` and the raw number in `value`.
The tables themselves are exported as `Common.ReturnValues.PT_STATUS`, `CIM_RETURN_VALUES`,
`IPS_HOST_BASED_SETUP_RETURN_VALUES` and `WIFI_PORT_CONFIGURATION_RETURN_VALUES`.

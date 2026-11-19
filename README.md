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
services, and within one service different methods use different value maps, so
`describeReturnValue` takes the table that documents the method you called:

| Table                     | Methods                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `PT_STATUS`               | Most AMT\_\* services                                                                          |
| `CIM`                     | DMTF method return codes, including IPS_PowerManagementService.RequestOSPowerSavingStateChange |
| `HOST_BASED_SETUP`        | IPS_HostBasedSetupService Setup / AdminSetup / UpgradeClientToAdmin                            |
| `ADD_NEXT_CERT_IN_CHAIN`  | IPS_HostBasedSetupService AddNextCertInChain                                                   |
| `OPT_IN`                  | IPS_OptInService StartOptIn / CancelOptIn / SendOptInCode                                      |
| `WIFI_PORT_CONFIGURATION` | AMT_WiFiPortConfigurationService AddWiFiSettings / UpdateWiFiSettings                          |

It turns the raw number into a stable symbolic name and a human-readable description so consumers can
report failures meaningfully instead of passing the number through or dropping it.

```typescript
import { Common } from '@device-management-toolkit/wsman-messages'
// or: import { describeReturnValue } from '@device-management-toolkit/wsman-messages/models/returnValues.js'

const result = Common.ReturnValues.describeReturnValue('PT_STATUS', 2066)
// { value: 2066, table: 'PT_STATUS', name: 'PT_STATUS_UNSUPPORTED',
//   description: 'Operation or value is not supported by this AMT firmware' }

Common.ReturnValues.describeReturnValue('CIM', 1).name // 'CIM_NOT_SUPPORTED'
Common.ReturnValues.describeReturnValue('HOST_BASED_SETUP', 3).name // 'IPS_INVALID_PARAMETER' (3 is PT_STATUS_INVALID_PT_MODE in 'PT_STATUS')
Common.ReturnValues.describeReturnValue('OPT_IN', 2066).name // 'IPS_OPT_IN_INVALID_CREDENTIALS' (wrong consent code)
Common.ReturnValues.isSuccessReturnValue(0) // true
```

Each table holds only the values the AMT SDK documents for those methods. A value the named table
does not list is never dropped and never decoded with another table: it comes back with
`name: 'UNKNOWN'` and the raw number in `value`. Only `0` is success; CIM `4096` (job started) is
not, so a caller that accepts a started job has to check for it. A string `ReturnValue` is accepted
when it is made of decimal digits.

The tables themselves are exported read-only as `Common.ReturnValues.PT_STATUS`, `CIM_RETURN_VALUES`,
`IPS_HOST_BASED_SETUP_RETURN_VALUES`, `IPS_ADD_NEXT_CERT_IN_CHAIN_RETURN_VALUES`,
`IPS_OPT_IN_RETURN_VALUES` and `WIFI_PORT_CONFIGURATION_RETURN_VALUES`.

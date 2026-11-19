/*********************************************************************
 * Copyright (c) Intel Corporation 2026
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

/**
 * Human-readable descriptions for the numeric `ReturnValue` carried in `<Method>_OUTPUT` responses.
 *
 * The numbers overlap between services and between methods of one service, so the caller names
 * the TABLE that documents the method it called:
 *   PT_STATUS                 AMT PT_STATUS codes (most AMT_* services)
 *   CIM                       DMTF method return codes (RequestStateChange and friends,
 *                             including IPS_PowerManagementService.RequestOSPowerSavingStateChange)
 *   HOST_BASED_SETUP          IPS_HostBasedSetupService Setup / AdminSetup / UpgradeClientToAdmin
 *   ADD_NEXT_CERT_IN_CHAIN    IPS_HostBasedSetupService AddNextCertInChain
 *   OPT_IN                    IPS_OptInService StartOptIn / CancelOptIn / SendOptInCode
 *   WIFI_PORT_CONFIGURATION   AMT_WiFiPortConfigurationService AddWiFiSettings / UpdateWiFiSettings
 *
 * A value that is not in the named table is UNKNOWN; it is never decoded with another table.
 */

export type ReturnValueTable =
  | 'PT_STATUS'
  | 'CIM'
  | 'HOST_BASED_SETUP'
  | 'ADD_NEXT_CERT_IN_CHAIN'
  | 'OPT_IN'
  | 'WIFI_PORT_CONFIGURATION'

export interface ReturnValueEntry {
  name: string
  description: string
}

export interface ReturnValueDescription extends ReturnValueEntry {
  value: number
  table: ReturnValueTable
}

type ReturnValueEntries = Readonly<Record<number, Readonly<ReturnValueEntry>>>

function freezeTable(entries: Record<number, ReturnValueEntry>): ReturnValueEntries {
  Object.values(entries).forEach((entry) => Object.freeze(entry))
  return Object.freeze(entries)
}

/** AMT PT_STATUS return values, as listed on the AMT SDK PT_STATUS codes page. */
export const PT_STATUS: ReturnValueEntries = freezeTable({
  0: { name: 'PT_STATUS_SUCCESS', description: 'Operation completed successfully' },
  1: { name: 'PT_STATUS_INTERNAL_ERROR', description: 'AMT reported an internal error' },
  3: {
    name: 'PT_STATUS_INVALID_PT_MODE',
    description: 'Operation is not allowed in the current AMT provisioning mode'
  },
  9: { name: 'PT_STATUS_INVALID_REGISTRATION_DATA', description: 'Registration data is invalid' },
  10: { name: 'PT_STATUS_APPLICATION_DOES_NOT_EXIST', description: 'Referenced application does not exist' },
  11: { name: 'PT_STATUS_NOT_ENOUGH_STORAGE', description: 'AMT does not have enough storage for the request' },
  12: { name: 'PT_STATUS_INVALID_NAME', description: 'Name is invalid' },
  13: { name: 'PT_STATUS_BLOCK_DOES_NOT_EXIST', description: 'Referenced storage block does not exist' },
  14: { name: 'PT_STATUS_INVALID_BYTE_OFFSET', description: 'Byte offset is invalid' },
  15: { name: 'PT_STATUS_INVALID_BYTE_COUNT', description: 'Byte count is invalid' },
  16: { name: 'PT_STATUS_NOT_PERMITTED', description: 'Operation is not permitted' },
  17: { name: 'PT_STATUS_NOT_OWNER', description: 'Caller is not the owner of the resource' },
  18: { name: 'PT_STATUS_BLOCK_LOCKED_BY_OTHER', description: 'Storage block is locked by another application' },
  19: { name: 'PT_STATUS_BLOCK_NOT_LOCKED', description: 'Storage block is not locked' },
  20: { name: 'PT_STATUS_INVALID_GROUP_PERMISSIONS', description: 'Group permissions are invalid' },
  21: { name: 'PT_STATUS_GROUP_DOES_NOT_EXIST', description: 'Referenced group does not exist' },
  22: { name: 'PT_STATUS_INVALID_MEMBER_COUNT', description: 'Member count is invalid' },
  23: {
    name: 'PT_STATUS_MAX_LIMIT_REACHED',
    description: 'AMT has reached the maximum number of entries for this resource'
  },
  24: { name: 'PT_STATUS_INVALID_AUTH_TYPE', description: 'Specified key algorithm is invalid' },
  26: { name: 'PT_STATUS_INVALID_DHCP_MODE', description: 'DHCP mode is invalid' },
  27: { name: 'PT_STATUS_INVALID_IP_ADDRESS', description: 'IP address is invalid' },
  28: { name: 'PT_STATUS_INVALID_DOMAIN_NAME', description: 'Domain name is invalid' },
  30: { name: 'PT_STATUS_REQUEST_UNEXPECTED', description: 'Request was unexpected in the current AMT state' },
  32: {
    name: 'PT_STATUS_INVALID_PROVISIONING_STATE',
    description: 'Operation is not allowed in the current provisioning state'
  },
  34: { name: 'PT_STATUS_INVALID_TIME', description: 'Time value is invalid' },
  35: { name: 'PT_STATUS_INVALID_INDEX', description: 'Index is invalid' },
  36: { name: 'PT_STATUS_INVALID_PARAMETER', description: 'A request parameter is invalid' },
  37: { name: 'PT_STATUS_INVALID_NETMASK', description: 'Network mask is invalid' },
  38: { name: 'PT_STATUS_FLASH_WRITE_LIMIT_EXCEEDED', description: 'AMT flash write limit has been exceeded' },
  2049: { name: 'PT_STATUS_UNSUPPORTED_OEM_NUMBER', description: 'OEM number is not supported' },
  2050: { name: 'PT_STATUS_UNSUPPORTED_BOOT_OPTION', description: 'Boot option is not supported' },
  2051: { name: 'PT_STATUS_INVALID_COMMAND', description: 'Command is invalid' },
  2052: { name: 'PT_STATUS_INVALID_SPECIAL_COMMAND', description: 'Special command is invalid' },
  2053: { name: 'PT_STATUS_INVALID_HANDLE', description: 'Handle is invalid' },
  2054: { name: 'PT_STATUS_INVALID_PASSWORD', description: 'The password specified in the user ACL is invalid' },
  2055: { name: 'PT_STATUS_INVALID_REALM', description: 'Realm is invalid' },
  2056: { name: 'PT_STATUS_STORAGE_ACL_ENTRY_IN_USE', description: 'Storage ACL entry is in use' },
  2057: { name: 'PT_STATUS_DATA_MISSING', description: 'Required data is missing from the request' },
  2058: { name: 'PT_STATUS_DUPLICATE', description: 'An entry with the same name or value already exists' },
  2059: { name: 'PT_STATUS_EVENTLOG_FROZEN', description: 'Event log is frozen' },
  2060: { name: 'PT_STATUS_PKI_MISSING_KEYS', description: 'PKI keys are missing' },
  2061: { name: 'PT_STATUS_PKI_GENERATING_KEYS', description: 'AMT is still generating PKI keys' },
  2062: { name: 'PT_STATUS_INVALID_KEY', description: 'Key is invalid' },
  2063: { name: 'PT_STATUS_INVALID_CERT', description: 'Certificate is invalid' },
  2064: { name: 'PT_STATUS_CERT_KEY_NOT_MATCH', description: 'Certificate does not match the key' },
  2065: {
    name: 'PT_STATUS_MAX_KERB_DOMAIN_REACHED',
    description: 'Maximum number of Kerberos domains has been reached'
  },
  2066: { name: 'PT_STATUS_UNSUPPORTED', description: 'Operation or value is not supported by this AMT firmware' },
  2067: { name: 'PT_STATUS_INVALID_PRIORITY', description: 'Priority is invalid' },
  2068: { name: 'PT_STATUS_NOT_FOUND', description: 'Referenced item was not found' },
  2069: { name: 'PT_STATUS_INVALID_CREDENTIALS', description: 'Credentials are invalid' },
  2070: { name: 'PT_STATUS_INVALID_PASSPHRASE', description: 'Passphrase is invalid' },
  2072: { name: 'PT_STATUS_NO_ASSOCIATION', description: 'No association exists for the request' },
  2075: { name: 'PT_STATUS_AUDIT_FAIL', description: 'Audit log operation failed' },
  2076: { name: 'PT_STATUS_BLOCKING_COMPONENT', description: 'One of the ME components is not ready' },
  2081: { name: 'PT_STATUS_USER_CONSENT_REQUIRED', description: 'User consent is required' },
  2082: {
    name: 'PT_STATUS_OPERATION_IN_PROGRESS',
    description: 'Operation is not complete yet (for example AMT is generating a key pair); wait and retry'
  }
})

/** DMTF CIM method return values (RequestStateChange and friends). */
export const CIM_RETURN_VALUES: ReturnValueEntries = freezeTable({
  0: { name: 'CIM_COMPLETED_NO_ERROR', description: 'Operation completed successfully' },
  1: { name: 'CIM_NOT_SUPPORTED', description: 'Operation is not supported by this device' },
  2: { name: 'CIM_UNKNOWN_ERROR', description: 'Device reported an unknown or unspecified error' },
  3: { name: 'CIM_TIMEOUT', description: 'Device could not complete the operation within the timeout period' },
  4: { name: 'CIM_FAILED', description: 'Device reported the operation failed' },
  5: { name: 'CIM_INVALID_PARAMETER', description: 'A request parameter is invalid' },
  6: { name: 'CIM_IN_USE', description: 'Resource is in use' },
  4096: { name: 'CIM_JOB_STARTED', description: 'Method parameters checked, job started' },
  4097: { name: 'CIM_INVALID_STATE_TRANSITION', description: 'Requested state transition is invalid' },
  4098: { name: 'CIM_TIMEOUT_NOT_SUPPORTED', description: 'Use of the timeout parameter is not supported' },
  4099: { name: 'CIM_BUSY', description: 'Device is busy' }
})

/**
 * IPS_HostBasedSetupService Setup / AdminSetup / UpgradeClientToAdmin.
 * 4 is returned by Setup only and 7 by UpgradeClientToAdmin only.
 */
export const IPS_HOST_BASED_SETUP_RETURN_VALUES: ReturnValueEntries = freezeTable({
  0: { name: 'IPS_SUCCESS', description: 'Operation completed successfully' },
  1: { name: 'IPS_INTERNAL_ERROR', description: 'AMT reported an internal error during host-based setup' },
  2: { name: 'IPS_INVALID_STATE', description: 'AMT is not in a state that allows host-based setup' },
  3: { name: 'IPS_INVALID_PARAMETER', description: 'A host-based setup parameter is invalid' },
  4: { name: 'IPS_METHOD_DISABLED', description: 'Host-based setup is disabled on this device' },
  5: { name: 'IPS_AUTHENTICATION_FAILED', description: 'AMT could not authenticate the host-based setup request' },
  6: { name: 'IPS_FLASH_WRITE_LIMIT_EXCEEDED', description: 'AMT flash write limit has been exceeded' },
  7: { name: 'IPS_TEP_UNTRUSTED_ROOT', description: 'AMT does not trust the TEP root certificate' }
})

/** IPS_HostBasedSetupService.AddNextCertInChain. 1 to 3 differ from the Setup table. */
export const IPS_ADD_NEXT_CERT_IN_CHAIN_RETURN_VALUES: ReturnValueEntries = freezeTable({
  0: { name: 'IPS_CERT_CHAIN_SUCCESS', description: 'Operation completed successfully' },
  1: { name: 'IPS_CERT_CHAIN_INVALID_PARAMETER', description: 'A certificate chain parameter is invalid' },
  2: {
    name: 'IPS_CERT_CHAIN_INTERNAL_ERROR',
    description: 'AMT reported an internal error while adding the certificate'
  },
  3: {
    name: 'IPS_CERT_CHAIN_INVALID_STATE',
    description: 'AMT is not in a state that allows adding a certificate to the chain'
  },
  4: { name: 'IPS_CERT_CHAIN_CERT_VERIFY_FAILED', description: 'AMT could not verify the certificate' },
  5: {
    name: 'IPS_CERT_CHAIN_LENGTH_EXCEEDED',
    description: 'Certificate chain is longer than AMT allows'
  },
  6: { name: 'IPS_CERT_CHAIN_TEP_CERT_TIME_INVALID', description: 'TEP certificate time is invalid' },
  7: { name: 'IPS_CERT_CHAIN_TEP_OWNERSHIP_STATUS_EXPIRED', description: 'TEP ownership status has expired' },
  8: { name: 'IPS_CERT_CHAIN_TEP_OWNERSHIP_STATUS_SUSPENDED', description: 'TEP ownership status is suspended' },
  9: { name: 'IPS_CERT_CHAIN_TEP_DOMAIN_CA_OID_MISSING', description: 'TEP domain CA OID is missing' }
})

/**
 * IPS_OptInService StartOptIn / CancelOptIn / SendOptInCode. 2 to 4 and 2066 differ from PT_STATUS.
 * 3 and 4 are returned by StartOptIn only; 2057 and 2066 by SendOptInCode only.
 */
export const IPS_OPT_IN_RETURN_VALUES: ReturnValueEntries = freezeTable({
  0: { name: 'IPS_OPT_IN_SUCCESS', description: 'Operation completed successfully' },
  1: { name: 'IPS_OPT_IN_INTERNAL_ERROR', description: 'AMT reported an internal error during user consent' },
  2: {
    name: 'IPS_OPT_IN_INVALID_STATE',
    description: 'User consent is not in a state that allows this operation'
  },
  3: { name: 'IPS_OPT_IN_BLOCKED', description: 'AMT is blocking user consent requests' },
  4: { name: 'IPS_OPT_IN_FAILED_FFS', description: 'AMT failed to store the user consent state' },
  2057: { name: 'IPS_OPT_IN_DATA_MISSING', description: 'User consent code is missing from the request' },
  2066: { name: 'IPS_OPT_IN_INVALID_CREDENTIALS', description: 'User consent code is incorrect' }
})

/** AMT_WiFiPortConfigurationService return values (AddWiFiSettings, UpdateWiFiSettings). */
export const WIFI_PORT_CONFIGURATION_RETURN_VALUES: ReturnValueEntries = freezeTable({
  0: { name: 'AMT_WIFI_COMPLETED_NO_ERROR', description: 'Operation completed successfully' },
  1: { name: 'AMT_WIFI_NOT_SUPPORTED', description: 'Wireless settings are not supported by this device' },
  2: { name: 'AMT_WIFI_FAILED', description: 'AMT failed to apply the wireless settings' },
  3: { name: 'AMT_WIFI_INVALID_PARAMETER', description: 'A wireless setting parameter is invalid' },
  4: { name: 'AMT_WIFI_INVALID_REFERENCE', description: 'A wireless setting references an item AMT does not have' }
})

const TABLES: Readonly<Record<ReturnValueTable, ReturnValueEntries>> = Object.freeze({
  PT_STATUS,
  CIM: CIM_RETURN_VALUES,
  HOST_BASED_SETUP: IPS_HOST_BASED_SETUP_RETURN_VALUES,
  ADD_NEXT_CERT_IN_CHAIN: IPS_ADD_NEXT_CERT_IN_CHAIN_RETURN_VALUES,
  OPT_IN: IPS_OPT_IN_RETURN_VALUES,
  WIFI_PORT_CONFIGURATION: WIFI_PORT_CONFIGURATION_RETURN_VALUES
})

/** Only 0 is success, in every table. CIM 4096 (job started) is not treated as success. */
export function isSuccessReturnValue(value: number | string): boolean {
  return toNumber(value) === 0
}

/**
 * Describes a method ReturnValue using the named table. A value the table does not list, or an
 * invalid table name, comes back with `name: 'UNKNOWN'` and the raw value in `description`.
 * A string of decimal digits is accepted, since several response models type ReturnValue as string.
 */
export function describeReturnValue(table: ReturnValueTable, value: number | string): ReturnValueDescription {
  const numeric = toNumber(value)
  const entries = Object.prototype.hasOwnProperty.call(TABLES, table) ? TABLES[table] : undefined
  const entry = entries != null && Number.isInteger(numeric) ? entries[numeric] : undefined
  if (entry != null) {
    return { value: numeric, table, name: entry.name, description: entry.description }
  }
  return { value: numeric, table, name: 'UNKNOWN', description: `Unrecognized return value ${value}` }
}

/** Decimal digits only: Number() would read '0x812' as 2066. */
function toNumber(value: number | string): number {
  if (typeof value === 'number') {
    return value
  }
  return typeof value === 'string' && /^\d+$/.test(value.trim()) ? Number(value) : Number.NaN
}

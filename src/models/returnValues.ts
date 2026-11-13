/*********************************************************************
 * Copyright (c) Intel Corporation 2026
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

/**
 * Human-readable descriptions for the numeric `ReturnValue` carried in `<Method>_OUTPUT` responses.
 *
 * The numbers overlap between services, so the caller names the table that applies:
 *   AMT   PT_STATUS codes (most AMT_* services)
 *   CIM   DMTF method return codes (RequestStateChange etc.)
 *   IPS   IPS_HostBasedSetupService Setup / AdminSetup / UpgradeClientToAdmin (0-6), PT_STATUS otherwise
 *   WIFI  AMT_WiFiPortConfigurationService AddWiFiSettings / UpdateWiFiSettings (1-4), PT_STATUS otherwise
 *
 * Consumers (RPS, MPS) use `describeReturnValue` to turn a raw number into a stable symbolic name
 * and a description instead of passing the number through or dropping it.
 */

export type ReturnValueNamespace = 'AMT' | 'CIM' | 'IPS' | 'WIFI'

export interface ReturnValueEntry {
  name: string
  description: string
}

export interface ReturnValueDescription extends ReturnValueEntry {
  value: number
  namespace: ReturnValueNamespace
}

/** AMT PT_STATUS method return values. */
export const PT_STATUS: Readonly<Record<number, ReturnValueEntry>> = {
  0: { name: 'PT_STATUS_SUCCESS', description: 'Operation completed successfully' },
  1: { name: 'PT_STATUS_INTERNAL_ERROR', description: 'AMT reported an internal error' },
  2: { name: 'PT_STATUS_NOT_READY', description: 'AMT is not ready to handle the request yet' },
  3: {
    name: 'PT_STATUS_INVALID_PT_MODE',
    description: 'Operation is not allowed in the current AMT provisioning mode'
  },
  4: { name: 'PT_STATUS_INVALID_MESSAGE_LENGTH', description: 'Request message length is invalid' },
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
  24: { name: 'PT_STATUS_INVALID_AUTH_TYPE', description: 'Authentication type is invalid' },
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
  47: { name: 'PT_STATUS_RNG_GENERATION_IN_PROGRESS', description: 'AMT is still generating random numbers' },
  48: { name: 'PT_STATUS_RNG_NOT_READY', description: 'AMT random number generator is not ready' },
  49: { name: 'PT_STATUS_CERTIFICATE_NOT_READY', description: 'AMT certificate is not ready' },
  2049: { name: 'PT_STATUS_UNSUPPORTED_OEM_NUMBER', description: 'OEM number is not supported' },
  2050: { name: 'PT_STATUS_UNSUPPORTED_BOOT_OPTION', description: 'Boot option is not supported' },
  2051: { name: 'PT_STATUS_INVALID_COMMAND', description: 'Command is invalid' },
  2052: { name: 'PT_STATUS_INVALID_SPECIAL_COMMAND', description: 'Special command is invalid' },
  2053: { name: 'PT_STATUS_INVALID_HANDLE', description: 'Handle is invalid' },
  2054: { name: 'PT_STATUS_INVALID_PASSWORD', description: 'Password does not meet AMT requirements' },
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
  2076: { name: 'PT_STATUS_BLOCKING_COMPONENT', description: 'A blocking component prevented the operation' },
  2081: { name: 'PT_STATUS_USER_CONSENT_REQUIRED', description: 'User consent is required' },
  2082: { name: 'PT_STATUS_OPERATION_IN_PROGRESS', description: 'Another operation is already in progress' }
}

/** DMTF CIM method return values (RequestStateChange and friends). */
export const CIM_RETURN_VALUES: Readonly<Record<number, ReturnValueEntry>> = {
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
}

/**
 * IPS_HostBasedSetupService return values (Setup, AdminSetup, UpgradeClientToAdmin). These reuse
 * small numbers that mean something else in PT_STATUS (3 is PT_STATUS_INVALID_PT_MODE there).
 */
export const IPS_HOST_BASED_SETUP_RETURN_VALUES: Readonly<Record<number, ReturnValueEntry>> = {
  0: { name: 'IPS_SUCCESS', description: 'Operation completed successfully' },
  1: { name: 'IPS_INTERNAL_ERROR', description: 'AMT reported an internal error during host-based setup' },
  2: { name: 'IPS_INVALID_STATE', description: 'AMT is not in a state that allows host-based setup' },
  3: { name: 'IPS_INVALID_PARAMETER', description: 'A host-based setup parameter is invalid' },
  4: { name: 'IPS_METHOD_DISABLED', description: 'Host-based setup is disabled on this device' },
  5: { name: 'IPS_AUTHENTICATION_FAILED', description: 'AMT could not authenticate the host-based setup request' },
  6: { name: 'IPS_FLASH_WRITE_LIMIT_EXCEEDED', description: 'AMT flash write limit has been exceeded' }
}

/** AMT_WiFiPortConfigurationService return values (AddWiFiSettings, UpdateWiFiSettings). */
export const WIFI_PORT_CONFIGURATION_RETURN_VALUES: Readonly<Record<number, ReturnValueEntry>> = {
  1: { name: 'AMT_WIFI_NOT_SUPPORTED', description: 'Wireless settings are not supported by this device' },
  2: { name: 'AMT_WIFI_FAILED', description: 'AMT failed to apply the wireless settings' },
  3: { name: 'AMT_WIFI_INVALID_PARAMETER', description: 'A wireless setting parameter is invalid' },
  4: { name: 'AMT_WIFI_INVALID_REFERENCE', description: 'A wireless setting references an item AMT does not have' }
}

/** A ReturnValue of 0 means success in every namespace. */
export function isSuccessReturnValue(value: number | string): boolean {
  return toNumber(value) === 0
}

/**
 * Describes a method ReturnValue using the table the namespace names. IPS and WIFI values outside
 * the service's own range are PT_STATUS codes. Unknown values are never dropped: they come back with
 * `name: 'UNKNOWN'` and the raw value in `description`.
 *
 * Parsed responses often carry ReturnValue as a string (several models in this library type it
 * that way), so a numeric string is accepted and converted; `value` is always the number.
 */
export function describeReturnValue(namespace: ReturnValueNamespace, value: number | string): ReturnValueDescription {
  const numeric = toNumber(value)
  const entry = Number.isInteger(numeric) ? lookup(namespace, numeric) : undefined
  if (entry != null) {
    return { value: numeric, namespace, name: entry.name, description: entry.description }
  }
  return { value: numeric, namespace, name: 'UNKNOWN', description: `Unrecognized return value ${value}` }
}

function toNumber(value: number | string): number {
  if (typeof value === 'number') {
    return value
  }
  return typeof value === 'string' && value.trim() !== '' ? Number(value) : Number.NaN
}

function lookup(namespace: ReturnValueNamespace, value: number): ReturnValueEntry | undefined {
  switch (namespace) {
    case 'CIM':
      return CIM_RETURN_VALUES[value]
    case 'IPS':
      return IPS_HOST_BASED_SETUP_RETURN_VALUES[value] ?? PT_STATUS[value]
    case 'WIFI':
      return WIFI_PORT_CONFIGURATION_RETURN_VALUES[value] ?? PT_STATUS[value]
    default:
      return PT_STATUS[value]
  }
}

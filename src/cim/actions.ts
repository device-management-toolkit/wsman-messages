/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

export enum Actions {
  SET_BOOT_CONFIG_ROLE = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_BootService/SetBootConfigRole',
  CHANGE_BOOT_ORDER = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_BootConfigSetting/ChangeBootOrder',
  REQUEST_POWER_STATE_CHANGE = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_PowerManagementService/RequestPowerStateChange',
  READ = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/Read',
  WRITE = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/Write',
  CREATE = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/Create',
  LOCK = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/Lock',
  ASSIGN_ACCESS = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/AssignAccess',
  REASSIGN_OWNERSHIP = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/ReassignOwnership',
  EXPORT_TO_URI = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/ExportToURI',
  IMPORT_FROM_URI = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_OpaqueManagementDataService/ImportFromURI'
}

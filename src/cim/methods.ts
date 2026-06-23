/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

export enum Methods {
  GET = 'Get',
  PULL = 'Pull',
  ENUMERATE = 'Enumerate',
  PUT = 'Put',
  DELETE = 'Delete',
  SET_BOOT_CONFIG_ROLE = 'SetBootConfigRole',
  CHANGE_BOOT_ORDER = 'ChangeBootOrder',
  REQUEST_POWER_STATE_CHANGE = 'RequestPowerStateChange',
  REQUEST_STATE_CHANGE = 'RequestStateChange',
  READ = 'Read',
  WRITE = 'Write',
  CREATE = 'Create',
  LOCK = 'Lock',
  ASSIGN_ACCESS = 'AssignAccess',
  REASSIGN_OWNERSHIP = 'ReassignOwnership',
  EXPORT_TO_URI = 'ExportToURI',
  IMPORT_FROM_URI = 'ImportFromURI'
}

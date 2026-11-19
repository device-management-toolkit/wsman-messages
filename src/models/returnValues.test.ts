/*********************************************************************
 * Copyright (c) Intel Corporation 2026
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

import {
  CIM_RETURN_VALUES,
  describeReturnValue,
  IPS_ADD_NEXT_CERT_IN_CHAIN_RETURN_VALUES,
  IPS_HOST_BASED_SETUP_RETURN_VALUES,
  IPS_OPT_IN_RETURN_VALUES,
  isSuccessReturnValue,
  PT_STATUS,
  type ReturnValueTable,
  WIFI_PORT_CONFIGURATION_RETURN_VALUES
} from './returnValues.js'
import { Common } from '../index.js'

describe('returnValues', () => {
  describe('tables', () => {
    it('contains the 56 PT_STATUS entries of the AMT SDK with PT_STATUS_ names', () => {
      const entries = Object.entries(PT_STATUS)
      expect(entries).toHaveLength(56)
      for (const [, entry] of entries) {
        expect(entry.name.startsWith('PT_STATUS_')).toBe(true)
        expect(entry.description.length).toBeGreaterThan(0)
      }
    })

    it('has no PT_STATUS entry for values the AMT SDK does not list', () => {
      for (const value of [
        2,
        4,
        47,
        48,
        49
      ]) {
        expect(describeReturnValue('PT_STATUS', value).name).toBe('UNKNOWN')
      }
    })

    it('holds exactly the values the AMT SDK documents for each IPS and WiFi method table', () => {
      const keys = (table: object): number[] =>
        Object.keys(table)
          .map(Number)
          .sort((a, b) => a - b)
      expect(keys(IPS_HOST_BASED_SETUP_RETURN_VALUES)).toEqual([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ])
      expect(keys(IPS_ADD_NEXT_CERT_IN_CHAIN_RETURN_VALUES)).toEqual([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ])
      expect(keys(IPS_OPT_IN_RETURN_VALUES)).toEqual([
        0,
        1,
        2,
        3,
        4,
        2057,
        2066
      ])
      expect(keys(WIFI_PORT_CONFIGURATION_RETURN_VALUES)).toEqual([
        0,
        1,
        2,
        3,
        4
      ])
    })

    it('cannot be changed by a consumer', () => {
      expect(Object.isFrozen(PT_STATUS)).toBe(true)
      expect(Object.isFrozen(PT_STATUS[0])).toBe(true)
      expect(Object.isFrozen(CIM_RETURN_VALUES)).toBe(true)
      expect(Object.isFrozen(IPS_OPT_IN_RETURN_VALUES[2066])).toBe(true)
      expect(() => {
        ;(PT_STATUS as Record<number, unknown>)[0] = { name: 'CHANGED', description: 'changed' }
      }).toThrow(TypeError)
      expect(describeReturnValue('PT_STATUS', 0).name).toBe('PT_STATUS_SUCCESS')
    })

    it('contains the DMTF CIM return codes', () => {
      expect(
        Object.keys(CIM_RETURN_VALUES)
          .map(Number)
          .sort((a, b) => a - b)
      ).toEqual([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        4096,
        4097,
        4098,
        4099
      ])
      for (const entry of Object.values(CIM_RETURN_VALUES)) {
        expect(entry.name.startsWith('CIM_')).toBe(true)
      }
    })
  })

  describe('describeReturnValue', () => {
    it('describes PT_STATUS values', () => {
      expect(describeReturnValue('PT_STATUS', 2066)).toEqual({
        value: 2066,
        table: 'PT_STATUS',
        name: 'PT_STATUS_UNSUPPORTED',
        description: 'Operation or value is not supported by this AMT firmware'
      })
      expect(describeReturnValue('PT_STATUS', 2054).name).toBe('PT_STATUS_INVALID_PASSWORD')
    })

    it('uses the host-based setup table only when the caller names it, not for all of IPS', () => {
      // 3 is PT_STATUS_INVALID_PT_MODE in PT_STATUS; for Setup / AdminSetup it is an invalid parameter.
      expect(describeReturnValue('PT_STATUS', 3).name).toBe('PT_STATUS_INVALID_PT_MODE')
      expect(describeReturnValue('HOST_BASED_SETUP', 3).name).toBe('IPS_INVALID_PARAMETER')
      expect(describeReturnValue('HOST_BASED_SETUP', 5).name).toBe('IPS_AUTHENTICATION_FAILED')
      expect(describeReturnValue('HOST_BASED_SETUP', 7).name).toBe('IPS_TEP_UNTRUSTED_ROOT')
    })

    it('reads AddNextCertInChain values with its own table, not the Setup one', () => {
      expect(describeReturnValue('HOST_BASED_SETUP', 1).name).toBe('IPS_INTERNAL_ERROR')
      expect(describeReturnValue('ADD_NEXT_CERT_IN_CHAIN', 1).name).toBe('IPS_CERT_CHAIN_INVALID_PARAMETER')
      expect(describeReturnValue('ADD_NEXT_CERT_IN_CHAIN', 2).name).toBe('IPS_CERT_CHAIN_INTERNAL_ERROR')
      expect(describeReturnValue('ADD_NEXT_CERT_IN_CHAIN', 4).name).toBe('IPS_CERT_CHAIN_CERT_VERIFY_FAILED')
      expect(describeReturnValue('ADD_NEXT_CERT_IN_CHAIN', 5).name).toBe('IPS_CERT_CHAIN_LENGTH_EXCEEDED')
      expect(describeReturnValue('ADD_NEXT_CERT_IN_CHAIN', 9).name).toBe('IPS_CERT_CHAIN_TEP_DOMAIN_CA_OID_MISSING')
    })

    it('reads IPS_OptInService values with the opt-in table, not PT_STATUS', () => {
      expect(describeReturnValue('OPT_IN', 2).name).toBe('IPS_OPT_IN_INVALID_STATE')
      expect(describeReturnValue('OPT_IN', 3).name).toBe('IPS_OPT_IN_BLOCKED')
      expect(describeReturnValue('OPT_IN', 4).name).toBe('IPS_OPT_IN_FAILED_FFS')
      expect(describeReturnValue('OPT_IN', 2057).name).toBe('IPS_OPT_IN_DATA_MISSING')
      // A wrong consent code; in PT_STATUS 2066 means "not supported".
      expect(describeReturnValue('OPT_IN', 2066)).toEqual({
        value: 2066,
        table: 'OPT_IN',
        name: 'IPS_OPT_IN_INVALID_CREDENTIALS',
        description: 'User consent code is incorrect'
      })
      expect(describeReturnValue('PT_STATUS', 2066).name).toBe('PT_STATUS_UNSUPPORTED')
    })

    it('reads IPS_PowerManagementService.RequestOSPowerSavingStateChange values with the CIM table', () => {
      expect(describeReturnValue('CIM', 3).name).toBe('CIM_TIMEOUT')
      expect(describeReturnValue('CIM', 4096).name).toBe('CIM_JOB_STARTED')
    })

    it('uses the WiFi port configuration table for AddWiFiSettings / UpdateWiFiSettings', () => {
      expect(describeReturnValue('WIFI_PORT_CONFIGURATION', 0).name).toBe('AMT_WIFI_COMPLETED_NO_ERROR')
      expect(describeReturnValue('WIFI_PORT_CONFIGURATION', 1).name).toBe('AMT_WIFI_NOT_SUPPORTED')
      expect(describeReturnValue('WIFI_PORT_CONFIGURATION', 4).name).toBe('AMT_WIFI_INVALID_REFERENCE')
    })

    it('never decodes a value with a table the caller did not name', () => {
      expect(describeReturnValue('HOST_BASED_SETUP', 36)).toEqual({
        value: 36,
        table: 'HOST_BASED_SETUP',
        name: 'UNKNOWN',
        description: 'Unrecognized return value 36'
      })
      expect(describeReturnValue('HOST_BASED_SETUP', 2058).name).toBe('UNKNOWN')
      expect(describeReturnValue('ADD_NEXT_CERT_IN_CHAIN', 36).name).toBe('UNKNOWN')
      expect(describeReturnValue('OPT_IN', 2081).name).toBe('UNKNOWN')
      expect(describeReturnValue('WIFI_PORT_CONFIGURATION', 2066).name).toBe('UNKNOWN')
    })

    it('reports UNKNOWN for a table name that does not exist instead of guessing PT_STATUS', () => {
      for (const table of [
        'IPS',
        'toString',
        '__proto__',
        ''
      ]) {
        expect(describeReturnValue(table as ReturnValueTable, 0)).toEqual({
          value: 0,
          table,
          name: 'UNKNOWN',
          description: 'Unrecognized return value 0'
        })
      }
    })

    it('describes CIM values', () => {
      expect(describeReturnValue('CIM', 1)).toEqual({
        value: 1,
        table: 'CIM',
        name: 'CIM_NOT_SUPPORTED',
        description: 'Operation is not supported by this device'
      })
      expect(describeReturnValue('CIM', 4096).name).toBe('CIM_JOB_STARTED')
    })

    it('describes success in every table', () => {
      expect(describeReturnValue('PT_STATUS', 0).name).toBe('PT_STATUS_SUCCESS')
      expect(describeReturnValue('HOST_BASED_SETUP', 0).name).toBe('IPS_SUCCESS')
      expect(describeReturnValue('ADD_NEXT_CERT_IN_CHAIN', 0).name).toBe('IPS_CERT_CHAIN_SUCCESS')
      expect(describeReturnValue('OPT_IN', 0).name).toBe('IPS_OPT_IN_SUCCESS')
      expect(describeReturnValue('WIFI_PORT_CONFIGURATION', 0).name).toBe('AMT_WIFI_COMPLETED_NO_ERROR')
      expect(describeReturnValue('CIM', 0).name).toBe('CIM_COMPLETED_NO_ERROR')
    })

    it('keeps the raw number for unknown values', () => {
      expect(describeReturnValue('PT_STATUS', 31337)).toEqual({
        value: 31337,
        table: 'PT_STATUS',
        name: 'UNKNOWN',
        description: 'Unrecognized return value 31337'
      })
      expect(describeReturnValue('CIM', 77).name).toBe('UNKNOWN')
      expect(describeReturnValue('PT_STATUS', Number.NaN).name).toBe('UNKNOWN')
      expect(describeReturnValue('PT_STATUS', 1.5).name).toBe('UNKNOWN')
    })

    it('accepts the string ReturnValue the parsed response models carry', () => {
      expect(describeReturnValue('PT_STATUS', '2066')).toEqual(describeReturnValue('PT_STATUS', 2066))
      expect(describeReturnValue('CIM', ' 1 ').name).toBe('CIM_NOT_SUPPORTED')
      expect(describeReturnValue('PT_STATUS', '').name).toBe('UNKNOWN')
      expect(describeReturnValue('PT_STATUS', 'abc')).toMatchObject({
        name: 'UNKNOWN',
        description: 'Unrecognized return value abc'
      })
      expect(isSuccessReturnValue('0')).toBe(true)
      expect(isSuccessReturnValue('')).toBe(false)
    })

    it('accepts only decimal digits in a string ReturnValue', () => {
      for (const text of [
        '0x812',
        '0x0',
        '1e3',
        '0b1',
        '+1',
        '-1',
        '1.0'
      ]) {
        expect(describeReturnValue('PT_STATUS', text)).toMatchObject({
          name: 'UNKNOWN',
          description: `Unrecognized return value ${text}`
        })
        expect(isSuccessReturnValue(text)).toBe(false)
      }
    })

    it('describes the statuses whose SDK text tells the caller what to do', () => {
      expect(describeReturnValue('PT_STATUS', 24).description).toBe('Specified key algorithm is invalid')
      expect(describeReturnValue('PT_STATUS', 2076).description).toBe('One of the ME components is not ready')
      expect(describeReturnValue('PT_STATUS', 2082).description).toContain('wait and retry')
    })

    it('does not fall through to CIM codes for PT_STATUS values or vice versa', () => {
      // 4096 is CIM_JOB_STARTED but has no PT_STATUS meaning.
      expect(describeReturnValue('PT_STATUS', 4096).name).toBe('UNKNOWN')
      // 2066 is PT_STATUS_UNSUPPORTED but has no CIM meaning.
      expect(describeReturnValue('CIM', 2066).name).toBe('UNKNOWN')
    })
  })

  describe('isSuccessReturnValue', () => {
    it('is true only for 0', () => {
      expect(isSuccessReturnValue(0)).toBe(true)
      expect(isSuccessReturnValue(1)).toBe(false)
      expect(isSuccessReturnValue(2066)).toBe(false)
    })

    it('does not treat CIM 4096 (job started) as success', () => {
      expect(isSuccessReturnValue(4096)).toBe(false)
    })
  })

  describe('public surface', () => {
    it('is reachable through Common.ReturnValues', () => {
      expect(Common.ReturnValues.describeReturnValue('PT_STATUS', 2066).name).toBe('PT_STATUS_UNSUPPORTED')
      expect(Common.ReturnValues.isSuccessReturnValue(0)).toBe(true)
      // Existing Models export is untouched.
      expect(Common.Models).toBeDefined()
    })
  })
})

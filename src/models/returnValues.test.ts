/*********************************************************************
 * Copyright (c) Intel Corporation 2026
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

import { CIM_RETURN_VALUES, describeReturnValue, isSuccessReturnValue, PT_STATUS } from './returnValues.js'
import { Common } from '../index.js'

describe('returnValues', () => {
  describe('tables', () => {
    it('contains the 61 PT_STATUS entries with PT_STATUS_ names', () => {
      const entries = Object.entries(PT_STATUS)
      expect(entries).toHaveLength(61)
      for (const [, entry] of entries) {
        expect(entry.name.startsWith('PT_STATUS_')).toBe(true)
        expect(entry.description.length).toBeGreaterThan(0)
      }
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
    it('describes AMT PT_STATUS values', () => {
      expect(describeReturnValue('AMT', 2066)).toEqual({
        value: 2066,
        namespace: 'AMT',
        name: 'PT_STATUS_UNSUPPORTED',
        description: 'Operation or value is not supported by this AMT firmware'
      })
      expect(describeReturnValue('AMT', 2054).name).toBe('PT_STATUS_INVALID_PASSWORD')
    })

    it('uses the host-based setup table for IPS methods, not PT_STATUS', () => {
      // 3 is PT_STATUS_INVALID_PT_MODE for AMT methods; for Setup / AdminSetup it is an invalid parameter.
      expect(describeReturnValue('AMT', 3).name).toBe('PT_STATUS_INVALID_PT_MODE')
      expect(describeReturnValue('IPS', 3).name).toBe('IPS_INVALID_PARAMETER')
      expect(describeReturnValue('IPS', 5).name).toBe('IPS_AUTHENTICATION_FAILED')
      // Outside the service's own range the value is a PT_STATUS code.
      const described = describeReturnValue('IPS', 2058)
      expect(described.namespace).toBe('IPS')
      expect(described.name).toBe('PT_STATUS_DUPLICATE')
    })

    it('uses the WiFi port configuration table for values 1-4 and PT_STATUS otherwise', () => {
      expect(describeReturnValue('WIFI', 1).name).toBe('AMT_WIFI_NOT_SUPPORTED')
      expect(describeReturnValue('WIFI', 4).name).toBe('AMT_WIFI_INVALID_REFERENCE')
      expect(describeReturnValue('WIFI', 2066).name).toBe('PT_STATUS_UNSUPPORTED')
      expect(describeReturnValue('WIFI', 0).name).toBe('PT_STATUS_SUCCESS')
    })

    it('describes CIM values', () => {
      expect(describeReturnValue('CIM', 1)).toEqual({
        value: 1,
        namespace: 'CIM',
        name: 'CIM_NOT_SUPPORTED',
        description: 'Operation is not supported by this device'
      })
      expect(describeReturnValue('CIM', 4096).name).toBe('CIM_JOB_STARTED')
    })

    it('describes success in every namespace', () => {
      expect(describeReturnValue('AMT', 0).name).toBe('PT_STATUS_SUCCESS')
      expect(describeReturnValue('IPS', 0).name).toBe('IPS_SUCCESS')
      expect(describeReturnValue('CIM', 0).name).toBe('CIM_COMPLETED_NO_ERROR')
    })

    it('keeps the raw number for unknown values', () => {
      expect(describeReturnValue('AMT', 31337)).toEqual({
        value: 31337,
        namespace: 'AMT',
        name: 'UNKNOWN',
        description: 'Unrecognized return value 31337'
      })
      expect(describeReturnValue('CIM', 77).name).toBe('UNKNOWN')
      expect(describeReturnValue('AMT', Number.NaN).name).toBe('UNKNOWN')
      expect(describeReturnValue('AMT', 1.5).name).toBe('UNKNOWN')
    })

    it('accepts the string ReturnValue the parsed response models carry', () => {
      expect(describeReturnValue('AMT', '2066')).toEqual(describeReturnValue('AMT', 2066))
      expect(describeReturnValue('CIM', ' 1 ').name).toBe('CIM_NOT_SUPPORTED')
      expect(describeReturnValue('AMT', '').name).toBe('UNKNOWN')
      expect(describeReturnValue('AMT', 'abc')).toMatchObject({
        name: 'UNKNOWN',
        description: 'Unrecognized return value abc'
      })
      expect(isSuccessReturnValue('0')).toBe(true)
      expect(isSuccessReturnValue('')).toBe(false)
    })

    it('names the not-ready statuses', () => {
      expect(describeReturnValue('AMT', 2).name).toBe('PT_STATUS_NOT_READY')
      expect(describeReturnValue('AMT', 49).name).toBe('PT_STATUS_CERTIFICATE_NOT_READY')
    })

    it('does not fall through to CIM codes for AMT values or vice versa', () => {
      // 4096 is CIM_JOB_STARTED but has no PT_STATUS meaning.
      expect(describeReturnValue('AMT', 4096).name).toBe('UNKNOWN')
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
  })

  describe('public surface', () => {
    it('is reachable through Common.ReturnValues', () => {
      expect(Common.ReturnValues.describeReturnValue('AMT', 2066).name).toBe('PT_STATUS_UNSUPPORTED')
      expect(Common.ReturnValues.isSuccessReturnValue(0)).toBe(true)
      // Existing Models export is untouched.
      expect(Common.Models).toBeDefined()
    })
  })
})

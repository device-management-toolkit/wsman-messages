/*********************************************************************
* Copyright (c) Intel Corporation 2021
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { Messages } from './messages'
import { Methods } from './methods'
import { WSManErrors } from '../WSMan'

const ipsClass = new Messages()
const castedIPSClass = new Messages() as any

describe('IPS Tests', () => {
  const messageId = '1'
  const adminPassEncryptionType = 2
  const adminPassword = 'ba74395270afd494f8658201162adfd0'
  describe('ips_OptInService Tests', () => {
    it('should create a valid ips_OptInService Get wsman message', () => {
      const response = ipsClass.OptInService(Methods.GET, messageId)
      const correctResponse = '<?xml version="1.0" encoding="utf-8"?><Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:w="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd" xmlns="http://www.w3.org/2003/05/soap-envelope"><Header><a:Action>http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>1</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body></Body></Envelope>'
      expect(response).toEqual(correctResponse)
    })
    it('should return null if messageId in ips_OptInService is missing', () => {
      expect(() => { ipsClass.OptInService(Methods.GET, null) }).toThrow(WSManErrors.MESSAGE_ID)
    })
    it('should throw error if an unsupported method is called', () => {
      expect(() => { castedIPSClass.OptInService(Methods.REQUEST_POWER_STATE_CHANGE, messageId) }).toThrow(WSManErrors.UNSUPPORTED_METHOD)
    })
  })
  describe('ips_HostBasedSetupService Tests', () => {
    it('should return a valid ips_HostBasedSetupService Setup wsman message', () => {
      const correctResponse = `<?xml version="1.0" encoding="utf-8"?><Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:w="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd" xmlns="http://www.w3.org/2003/05/soap-envelope"><Header><a:Action>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/Setup</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${messageId}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body><r:Setup_INPUT xmlns:r="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><r:NetAdminPassEncryptionType>${adminPassEncryptionType}</r:NetAdminPassEncryptionType><r:NetworkAdminPassword>${adminPassword}</r:NetworkAdminPassword></r:Setup_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService(Methods.SETUP, messageId, adminPassEncryptionType, adminPassword)
      expect(response).toEqual(correctResponse)
    })
    it('should return null if adminPassEncryptionType in ips_HostBasedSetupService is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.SETUP, messageId, null, adminPassword) }).toThrow(WSManErrors.ADMIN_PASS_ENCRYPTION_TYPE)
    })
    it('should return null if adminPassword in ips_HostBasedSetupService is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.SETUP, messageId, adminPassEncryptionType, null) }).toThrow(WSManErrors.ADMIN_PASSWORD)
    })
    it('should throw error if an unsupported method is called', () => {
      expect(() => { castedIPSClass.HostBasedSetupService(Methods.REQUEST_POWER_STATE_CHANGE, messageId) }).toThrow(WSManErrors.UNSUPPORTED_METHOD)
    })
  })
})

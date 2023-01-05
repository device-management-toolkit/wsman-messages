/*********************************************************************
* Copyright (c) Intel Corporation 2021
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { WSManErrors } from '../WSMan'
import { Messages, Methods, Classes } from './'
import type { AMT } from '../'
import type { Selector } from '../WSMan'
import type { Models } from './'

const castedIPSClass = new Messages() as any

describe('IPS Tests', () => {
  let messageId: number
  let ipsClass: Messages
  beforeEach(() => {
    messageId = 0
    ipsClass = new Messages()
  })
  const xmlHeader = '<?xml version="1.0" encoding="utf-8"?>'
  const envelope = '<Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:w="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd" xmlns="http://www.w3.org/2003/05/soap-envelope"><Header><a:Action>'
  const adminPassEncryptionType = 2
  const adminPassword = 'bebb3497d69b544c732651365cc3462d'
  const mcNonce = 'ZxxE0cFy590zDBIR39q6QU6iuII='
  const signingAlgorithm = 2
  const digitalSignature = 'T0NvoR7RUkOpVULIcNL0VhpEK5rO3j5/TBpN82q1YgPM5sRBxqymu7fKBgAGGN49oD8xsqW4X0SWxjuB3q/TLHjNJJNxoHHlXZnb77HTwfXHp59E/TM10UvOX96qEgKU5Mp+8/IE9LnYxC1ajQostSRA/X+HA5F6kRctLiCK+ViWUCk4sAtPzHhhHSTB/98KDWuacPepScSpref532hpD2/g43nD3Wg0SjmOMExPLMMnijWE9KDkxE00+Bos28DD3Yclj4BMhkoXDw6k4EcTWKbGhtF/9meXXmSPwRmXEaWe8COIDrQks1mpyLblYu8yHHnUjhssdcCQHtAOu7t0RA=='
  const certificate = 'certificate_blob'
  const enumerationContext = 'AC070000-0000-0000-0000-000000000000'
  const operationTimeout = 'PT60S'

  describe('IPS private function Tests', () => {
    it('should return a valid Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.switch({ method: Methods.GET, class: Classes.IPS_OPT_IN_SERVICE })
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid Put wsman message', () => {
      const data: Models.OptInService = { }
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:IPS_OptInService xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"></h:IPS_OptInService></Body></Envelope>`
      const response = ipsClass.switch({ method: Methods.PUT, class: Classes.IPS_OPT_IN_SERVICE, data })
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid Delete wsman message', () => {
      const selector: Selector = {
        name: 'test',
        value: 'test'
      }
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Delete</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout><w:SelectorSet><w:Selector Name="test">test</w:Selector></w:SelectorSet></Header><Body></Body></Envelope>`
      const response = ipsClass.switch({ method: Methods.DELETE, class: Classes.IPS_ALARM_CLOCK_OCCURRENCE, selector })
      expect(response).toEqual(correctResponse)
    })
    it('should throw error if missing data when PUT is called on switch', () => {
      expect(() => { ipsClass.switch({ method: Methods.PUT, class: Classes.IPS_OPT_IN_SERVICE }) }).toThrow(WSManErrors.DATA)
    })
    it('should throw error if an unsupported method is called on switch', () => {
      expect(() => { ipsClass.switch({ method: Methods.SET_CERTIFICATES, class: Classes.IPS_IEEE8021X_SETTINGS }) }).toThrow(WSManErrors.UNSUPPORTED_METHOD)
    })
    it('should throw error if missing enumerationContext when PULL is called on switch', () => {
      expect(() => { ipsClass.switch({ method: Methods.PULL, class: Classes.IPS_ALARM_CLOCK_OCCURRENCE }) }).toThrow(WSManErrors.ENUMERATION_CONTEXT)
    })
    it('should throw error if missing selector when DELETE is called on switch', () => {
      expect(() => { ipsClass.switch({ method: Methods.DELETE, class: Classes.IPS_OPT_IN_SERVICE }) }).toThrow(WSManErrors.SELECTOR)
    })
  })
  describe('ips_IEEE8021xCredentialContext Tests', () => {
    it('should return a valid ips_IEEE8021xCredentialContext Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_8021xCredentialContext</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.IEEE8021xCredentialContext(Methods.GET)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_8021xCredentialContext</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.IEEE8021xCredentialContext(Methods.PULL, enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_8021xCredentialContext</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.IEEE8021xCredentialContext(Methods.ENUMERATE)
      expect(response).toEqual(correctResponse)
    })
    it('should throw an error if enumerationContext is missing', () => {
      expect(() => { ipsClass.IEEE8021xCredentialContext(Methods.PULL, undefined) }).toThrow(WSManErrors.ENUMERATION_CONTEXT)
    })
  })
  describe('ips_AlarmClockOccurrence Tests', () => {
    const selector: Selector = {
      name: 'Name',
      value: 'Instance'
    }
    it('should return a valid ips_AlarmClockOccurrence Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence(Methods.GET)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_AlarmClockOccurrence Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence(Methods.PULL, enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_AlarmClockOccurrence Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence(Methods.ENUMERATE)
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_AlarmClockOccurrence Delete wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Delete</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout><w:SelectorSet><w:Selector Name="Name">Instance</w:Selector></w:SelectorSet></Header><Body></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence(Methods.DELETE, undefined, selector)
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_AlarmClockOccurrence Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence(Methods.PULL, enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_AlarmClockOccurrence Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence(Methods.ENUMERATE)
      expect(response).toEqual(correctResponse)
    })
    it('should throw error if enumerationContext is missing from ips_AlarmClockOccurrence Pull request', () => {
      expect(() => { ipsClass.AlarmClockOccurrence(Methods.PULL) }).toThrow(WSManErrors.ENUMERATION_CONTEXT)
    })
    it('should throw error if selector is missing from ips_AlarmClockOccurrence Delete method', () => {
      expect(() => { ipsClass.AlarmClockOccurrence(Methods.DELETE) }).toThrow(WSManErrors.SELECTOR)
    })
    it('should throw error if an unsupported method is called', () => {
      /* Not supporting GET or PUT */
      expect(() => { castedIPSClass.AlarmClockOccurrence(Methods.ADD_NEXT_CERT_IN_CHAIN) }).toThrow(WSManErrors.UNSUPPORTED_METHOD)
    })
  })
  describe('ips_HostBasedSetupService Tests', () => {
    it('should return a valid ips_HostBasedSetupService Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService(Methods.GET)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService(Methods.PULL, enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService(Methods.ENUMERATE)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Setup wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/Setup</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:Setup_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><h:NetAdminPassEncryptionType>2</h:NetAdminPassEncryptionType><h:NetworkAdminPassword>bebb3497d69b544c732651365cc3462d</h:NetworkAdminPassword></h:Setup_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService(Methods.SETUP, undefined, adminPassEncryptionType, adminPassword)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Admin Setup wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/AdminSetup</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:AdminSetup_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><h:NetAdminPassEncryptionType>2</h:NetAdminPassEncryptionType><h:NetworkAdminPassword>bebb3497d69b544c732651365cc3462d</h:NetworkAdminPassword><h:McNonce>ZxxE0cFy590zDBIR39q6QU6iuII=</h:McNonce><h:SigningAlgorithm>2</h:SigningAlgorithm><h:DigitalSignature>T0NvoR7RUkOpVULIcNL0VhpEK5rO3j5/TBpN82q1YgPM5sRBxqymu7fKBgAGGN49oD8xsqW4X0SWxjuB3q/TLHjNJJNxoHHlXZnb77HTwfXHp59E/TM10UvOX96qEgKU5Mp+8/IE9LnYxC1ajQostSRA/X+HA5F6kRctLiCK+ViWUCk4sAtPzHhhHSTB/98KDWuacPepScSpref532hpD2/g43nD3Wg0SjmOMExPLMMnijWE9KDkxE00+Bos28DD3Yclj4BMhkoXDw6k4EcTWKbGhtF/9meXXmSPwRmXEaWe8COIDrQks1mpyLblYu8yHHnUjhssdcCQHtAOu7t0RA==</h:DigitalSignature></h:AdminSetup_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService(Methods.ADMIN_SETUP, undefined, adminPassEncryptionType, adminPassword, mcNonce, signingAlgorithm, digitalSignature)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Add Next Cert in Chain wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/AddNextCertInChain</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:AddNextCertInChain_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><h:NextCertificate>ExampleCertificate</h:NextCertificate><h:IsLeafCertificate>true</h:IsLeafCertificate><h:IsRootCertificate>false</h:IsRootCertificate></h:AddNextCertInChain_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService(Methods.ADD_NEXT_CERT_IN_CHAIN, undefined, undefined, undefined, undefined, undefined, undefined, 'ExampleCertificate', true, false)
      expect(response).toEqual(correctResponse)
    })
    it('should throw error if adminPassEncryptionType in ips_HostBasedSetupService SETUP is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.SETUP, undefined, undefined, adminPassword) }).toThrow(WSManErrors.ADMIN_PASS_ENCRYPTION_TYPE)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService SETUP is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.SETUP, undefined, adminPassEncryptionType, undefined) }).toThrow(WSManErrors.ADMIN_PASSWORD)
    })
    it('should throw error if adminPassEncryptionType in ips_HostBasedSetupService ADMIN_SETUP is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADMIN_SETUP, undefined, undefined, adminPassword) }).toThrow(WSManErrors.ADMIN_PASS_ENCRYPTION_TYPE)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService ADMIN_SETUP is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADMIN_SETUP, undefined, adminPassEncryptionType, undefined) }).toThrow(WSManErrors.ADMIN_PASSWORD)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService ADMIN_SETUP is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADMIN_SETUP, undefined, adminPassEncryptionType, adminPassword, undefined) }).toThrow(WSManErrors.NONCE)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService ADMIN_SETUP is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADMIN_SETUP, undefined, adminPassEncryptionType, adminPassword, mcNonce, undefined) }).toThrow(WSManErrors.SIGNING_ALGORITHM)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService ADMIN_SETUP is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADMIN_SETUP, undefined, adminPassEncryptionType, adminPassword, mcNonce, signingAlgorithm, undefined) }).toThrow(WSManErrors.DIGITAL_SIGNATURE)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService ADD_NEXT_CERT_IN_CHAIN is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADD_NEXT_CERT_IN_CHAIN, undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, true) }).toThrow(WSManErrors.CERTIFICATE_BLOB)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService ADD_NEXT_CERT_IN_CHAIN is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADD_NEXT_CERT_IN_CHAIN, undefined, undefined, undefined, undefined, undefined, undefined, certificate, undefined, false) }).toThrow(WSManErrors.IS_LEAF)
    })
    it('should throw error if adminPassword in ips_HostBasedSetupService ADD_NEXT_CERT_IN_CHAIN is missing', () => {
      expect(() => { ipsClass.HostBasedSetupService(Methods.ADD_NEXT_CERT_IN_CHAIN, undefined, undefined, undefined, undefined, undefined, undefined, certificate, false, undefined) }).toThrow(WSManErrors.IS_ROOT)
    })
    it('should throw error if an unsupported method is called', () => {
      expect(() => { castedIPSClass.HostBasedSetupService(Methods.REQUEST_POWER_STATE_CHANGE) }).toThrow(WSManErrors.UNSUPPORTED_METHOD)
    })
  })
  describe('ips_IEEE8021xSettings Tests', () => {
    it('should return a valid ips_IEEE8021xSettings Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings(Methods.GET)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings(Methods.PULL, enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings(Methods.ENUMERATE)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Put wsman message', () => {
      const ieee8021xSettings: Models.IEEE8021xSettings = {
        Enabled: 2,
        AuthenticationProtocol: 0,
        RoamingIdentity: 'testdomain/testname'
      }
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:IPS_IEEE8021xSettings xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings"><h:Enabled>2</h:Enabled><h:AuthenticationProtocol>0</h:AuthenticationProtocol><h:RoamingIdentity>testdomain/testname</h:RoamingIdentity></h:IPS_IEEE8021xSettings></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings(Methods.PUT, undefined, ieee8021xSettings)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings SetCertificates wsman message', () => {
      const serverCertificateIssuer: AMT.Models.PublicKeyCertificate = {
        ElementName: 'publicKeyCertificate',
        InstanceID: 'abc',
        Issuer: 'serverTest',
        ReadOnlyCertificate: true,
        Subject: 'serverTest',
        TrustedRootCertficate: true,
        X509Certificate: 'certificateblob'
      }
      const clientCertificate: AMT.Models.PublicKeyCertificate = {
        ElementName: 'publicKeyCertificate',
        InstanceID: 'abc',
        Issuer: 'clientTest',
        ReadOnlyCertificate: true,
        Subject: 'clientTest',
        TrustedRootCertficate: false,
        X509Certificate: 'certificateblob'
      }
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings/SetCertificates</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>IPS_IEEE8021xSettings</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:SetCertificates xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings"><h:ServerCertificateIssuer><h:ElementName>publicKeyCertificate</h:ElementName><h:InstanceID>abc</h:InstanceID><h:Issuer>serverTest</h:Issuer><h:ReadOnlyCertificate>true</h:ReadOnlyCertificate><h:Subject>serverTest</h:Subject><h:TrustedRootCertficate>true</h:TrustedRootCertficate><h:X509Certificate>certificateblob</h:X509Certificate></h:ServerCertificateIssuer><h:ClientCertificate><h:ElementName>publicKeyCertificate</h:ElementName><h:InstanceID>abc</h:InstanceID><h:Issuer>clientTest</h:Issuer><h:ReadOnlyCertificate>true</h:ReadOnlyCertificate><h:Subject>clientTest</h:Subject><h:TrustedRootCertficate>false</h:TrustedRootCertficate><h:X509Certificate>certificateblob</h:X509Certificate></h:ClientCertificate></h:SetCertificates></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings(Methods.SET_CERTIFICATES, undefined, undefined, serverCertificateIssuer, clientCertificate)
      expect(response).toEqual(correctResponse)
    })
    it('should throw error if certificate data is missing', () => {
      expect(() => { ipsClass.IEEE8021xSettings(Methods.SET_CERTIFICATES) }).toThrow(WSManErrors.CERTIFICATE_BLOB)
    })
    it('should throw error if an unsupported method is called', () => {
      expect(() => { castedIPSClass.IEEE8021xSettings(Methods.ADD_NEXT_CERT_IN_CHAIN) }).toThrow(WSManErrors.UNSUPPORTED_METHOD)
    })
    it('should throw error if missing ieee8021xSettings data', () => {
      expect(() => { ipsClass.IEEE8021xSettings(Methods.PUT, undefined) }).toThrow(WSManErrors.DATA)
    })
    it('should throw an error if enumerationContext is missing', () => {
      expect(() => { ipsClass.IEEE8021xSettings(Methods.PULL, undefined) }).toThrow(WSManErrors.ENUMERATION_CONTEXT)
    })
  })
  describe('ips_OptInService Tests', () => {
    it('should create a valid ips_OptInService Get wsman message', () => {
      const response = ipsClass.OptInService(Methods.GET)
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_OptInService Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.OptInService(Methods.PULL, enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_OptInService Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.OptInService(Methods.ENUMERATE)
      expect(response).toEqual(correctResponse)
    })
    it('should throw error if an unsupported method is called', () => {
      expect(() => { castedIPSClass.OptInService(Methods.REQUEST_POWER_STATE_CHANGE) }).toThrow(WSManErrors.UNSUPPORTED_METHOD)
    })
    it('should create a valid ips_OptInService Put wsman message', () => {
      const data: Models.OptInServiceResponse = {
        IPS_OptInService: {
          OptInCodeTimeout: 300
        }
      }
      const response = ipsClass.OptInService(Methods.PUT, undefined, undefined, data)
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:IPS_OptInService xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"><h:OptInCodeTimeout>300</h:OptInCodeTimeout></h:IPS_OptInService></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_StartOptIn wsman message', () => {
      const response = ipsClass.OptInService(Methods.START_OPT_IN)
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService/StartOptIn</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:StartOptIn_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService" /></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_SendOptInCode wsman message', () => {
      const code = 1
      const response = ipsClass.OptInService(Methods.SEND_OPT_IN_CODE, undefined, code)
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService/SendOptInCode</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:SendOptInCode_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"><h:OptInCode>1</h:OptInCode></h:SendOptInCode_INPUT></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_CancelOptIn wsman message', () => {
      const response = ipsClass.OptInService(Methods.CANCEL_OPT_IN)
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService/CancelOptIn</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:CancelOptIn_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService" /></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should throw error if optInServiceResponse is missing', () => {
      expect(() => { ipsClass.OptInService(Methods.PUT, undefined, undefined) }).toThrow(WSManErrors.OPT_IN_SERVICE_RESPONSE)
    })
    it('should throw error if optInCode is missing', () => {
      expect(() => { ipsClass.OptInService(Methods.SEND_OPT_IN_CODE, undefined, undefined) }).toThrow(WSManErrors.OPT_IN_CODE)
    })
  })
})

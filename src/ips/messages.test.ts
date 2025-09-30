/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

import type { Selector } from '../WSMan'
import type { Models } from './'
import { Messages } from './'

describe('IPS Tests', () => {
  let messageId: number
  let ipsClass: Messages
  beforeEach(() => {
    messageId = 0
    ipsClass = new Messages()
  })
  const xmlHeader = '<?xml version="1.0" encoding="utf-8"?>'
  const envelope =
    '<Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:w="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd" xmlns="http://www.w3.org/2003/05/soap-envelope"><Header><a:Action>'
  const adminPassEncryptionType = 2
  const adminPassword = 'bebb3497d69b544c732651365cc3462d'
  const mcNonce = 'ZxxE0cFy590zDBIR39q6QU6iuII='
  const signingAlgorithm = 2
  const digitalSignature =
    'T0NvoR7RUkOpVULIcNL0VhpEK5rO3j5/TBpN82q1YgPM5sRBxqymu7fKBgAGGN49oD8xsqW4X0SWxjuB3q/TLHjNJJNxoHHlXZnb77HTwfXHp59E/TM10UvOX96qEgKU5Mp+8/IE9LnYxC1ajQostSRA/X+HA5F6kRctLiCK+ViWUCk4sAtPzHhhHSTB/98KDWuacPepScSpref532hpD2/g43nD3Wg0SjmOMExPLMMnijWE9KDkxE00+Bos28DD3Yclj4BMhkoXDw6k4EcTWKbGhtF/9meXXmSPwRmXEaWe8COIDrQks1mpyLblYu8yHHnUjhssdcCQHtAOu7t0RA=='
  const enumerationContext = 'AC070000-0000-0000-0000-000000000000'
  const operationTimeout = 'PT60S'

  describe('ips_IEEE8021xCredentialContext Tests', () => {
    it('should return a valid ips_IEEE8021xCredentialContext Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_8021xCredentialContext</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.IEEE8021xCredentialContext.Get()
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_8021xCredentialContext</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.IEEE8021xCredentialContext.Pull(enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_8021xCredentialContext</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.IEEE8021xCredentialContext.Enumerate()
      expect(response).toEqual(correctResponse)
    })
  })
  describe('ips_AlarmClockOccurrence Tests', () => {
    const selector: Selector = {
      name: 'Name',
      value: 'Instance'
    }
    it('should return a valid ips_AlarmClockOccurrence Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence.Get()
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_AlarmClockOccurrence Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence.Pull(enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_AlarmClockOccurrence Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence.Enumerate()
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_AlarmClockOccurrence Delete wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Delete</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout><w:SelectorSet><w:Selector Name="Name">Instance</w:Selector></w:SelectorSet></Header><Body></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence.Delete(selector)
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_AlarmClockOccurrence Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence.Pull(enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_AlarmClockOccurrence Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_AlarmClockOccurrence</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.AlarmClockOccurrence.Enumerate()
      expect(response).toEqual(correctResponse)
    })
  })
  describe('ips_HostBasedSetupService Tests', () => {
    it('should return a valid ips_HostBasedSetupService Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService.Get()
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService.Pull(enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService.Enumerate()
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Setup wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/Setup</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:Setup_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><h:NetAdminPassEncryptionType>2</h:NetAdminPassEncryptionType><h:NetworkAdminPassword>bebb3497d69b544c732651365cc3462d</h:NetworkAdminPassword></h:Setup_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService.Setup(adminPassEncryptionType, adminPassword)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Upgrade Client To Admin wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/UpgradeClientToAdmin</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:UpgradeClientToAdmin_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><h:McNonce>ZxxE0cFy590zDBIR39q6QU6iuII=</h:McNonce><h:SigningAlgorithm>2</h:SigningAlgorithm><h:DigitalSignature>T0NvoR7RUkOpVULIcNL0VhpEK5rO3j5/TBpN82q1YgPM5sRBxqymu7fKBgAGGN49oD8xsqW4X0SWxjuB3q/TLHjNJJNxoHHlXZnb77HTwfXHp59E/TM10UvOX96qEgKU5Mp+8/IE9LnYxC1ajQostSRA/X+HA5F6kRctLiCK+ViWUCk4sAtPzHhhHSTB/98KDWuacPepScSpref532hpD2/g43nD3Wg0SjmOMExPLMMnijWE9KDkxE00+Bos28DD3Yclj4BMhkoXDw6k4EcTWKbGhtF/9meXXmSPwRmXEaWe8COIDrQks1mpyLblYu8yHHnUjhssdcCQHtAOu7t0RA==</h:DigitalSignature></h:UpgradeClientToAdmin_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService.UpgradeClientToAdmin(mcNonce, signingAlgorithm, digitalSignature)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Admin Setup wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/AdminSetup</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:AdminSetup_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><h:NetAdminPassEncryptionType>2</h:NetAdminPassEncryptionType><h:NetworkAdminPassword>bebb3497d69b544c732651365cc3462d</h:NetworkAdminPassword><h:McNonce>ZxxE0cFy590zDBIR39q6QU6iuII=</h:McNonce><h:SigningAlgorithm>2</h:SigningAlgorithm><h:DigitalSignature>T0NvoR7RUkOpVULIcNL0VhpEK5rO3j5/TBpN82q1YgPM5sRBxqymu7fKBgAGGN49oD8xsqW4X0SWxjuB3q/TLHjNJJNxoHHlXZnb77HTwfXHp59E/TM10UvOX96qEgKU5Mp+8/IE9LnYxC1ajQostSRA/X+HA5F6kRctLiCK+ViWUCk4sAtPzHhhHSTB/98KDWuacPepScSpref532hpD2/g43nD3Wg0SjmOMExPLMMnijWE9KDkxE00+Bos28DD3Yclj4BMhkoXDw6k4EcTWKbGhtF/9meXXmSPwRmXEaWe8COIDrQks1mpyLblYu8yHHnUjhssdcCQHtAOu7t0RA==</h:DigitalSignature></h:AdminSetup_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService.AdminSetup(
        adminPassEncryptionType,
        adminPassword,
        mcNonce,
        signingAlgorithm,
        digitalSignature
      )
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_HostBasedSetupService Add Next Cert in Chain wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService/AddNextCertInChain</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:AddNextCertInChain_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HostBasedSetupService"><h:NextCertificate>ExampleCertificate</h:NextCertificate><h:IsLeafCertificate>true</h:IsLeafCertificate><h:IsRootCertificate>false</h:IsRootCertificate></h:AddNextCertInChain_INPUT></Body></Envelope>`
      const response = ipsClass.HostBasedSetupService.AddNextCertInChain('ExampleCertificate', true, false)
      expect(response).toEqual(correctResponse)
    })
  })
  describe('ips_IEEE8021xSettings Tests', () => {
    it('should return a valid ips_IEEE8021xSettings Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings.Get()
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings.Pull(enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings.Enumerate()
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings Put wsman message', () => {
      const ieee8021xSettings: Models.IEEE8021xSettings = {
        ElementName: 'testElement',
        Enabled: 2,
        AuthenticationProtocol: 0,
        RoamingIdentity: 'testdomain/testname'
      }
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:IPS_IEEE8021xSettings xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings"><h:ElementName>testElement</h:ElementName><h:Enabled>2</h:Enabled><h:AuthenticationProtocol>0</h:AuthenticationProtocol><h:RoamingIdentity>testdomain/testname</h:RoamingIdentity></h:IPS_IEEE8021xSettings></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings.Put(ieee8021xSettings)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_IEEE8021xSettings SetCertificates wsman message', () => {
      const X509Certificate = 'certificateblob'
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings/SetCertificates</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:SetCertificates_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_IEEE8021xSettings"><h:ServerCertificateIssuer>certificateblob</h:ServerCertificateIssuer><h:ClientCertificate>certificateblob</h:ClientCertificate></h:SetCertificates_INPUT></Body></Envelope>`
      const response = ipsClass.IEEE8021xSettings.SetCertificates(X509Certificate, X509Certificate)
      expect(response).toEqual(correctResponse)
    })
  })
  describe('ips_OptInService Tests', () => {
    it('should create a valid ips_OptInService Get wsman message', () => {
      const response = ipsClass.OptInService.Get()
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_OptInService Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.OptInService.Pull(enumerationContext)
      expect(response).toEqual(correctResponse)
    })
    it('should return a valid ips_OptInService Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.OptInService.Enumerate()
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_OptInService Put wsman message', () => {
      const data: Models.OptInServiceResponse = {
        IPS_OptInService: {
          OptInCodeTimeout: 300
        }
      }
      const response = ipsClass.OptInService.Put(data)
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:IPS_OptInService xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"><h:OptInCodeTimeout>300</h:OptInCodeTimeout></h:IPS_OptInService></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_OptInService Put wsman message with an empty body', () => {
      const data: Models.OptInServiceResponse = {} as any
      const response = ipsClass.OptInService.Put(data)
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:IPS_OptInService xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"></h:IPS_OptInService></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_StartOptIn wsman message', () => {
      const response = ipsClass.OptInService.StartOptIn()
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService/StartOptIn</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:StartOptIn_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"></h:StartOptIn_INPUT></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_SendOptInCode wsman message', () => {
      const code = 1
      const response = ipsClass.OptInService.SendOptInCode(code)
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService/SendOptInCode</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:SendOptInCode_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"><h:OptInCode>1</h:OptInCode></h:SendOptInCode_INPUT></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
    it('should create a valid ips_CancelOptIn wsman message', () => {
      const response = ipsClass.OptInService.CancelOptIn()
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService/CancelOptIn</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:CancelOptIn_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_OptInService"></h:CancelOptIn_INPUT></Body></Envelope>`
      expect(response).toEqual(correctResponse)
    })
  })
  describe('ips_PowerManagementService Tests', () => {
    it('should create a valid ips_PowerManagementService RequestOSPowerSavingStateChange wsman message', () => {
      const OSPowerSavingState = 3 //OS power saving

      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_PowerManagementService/RequestOSPowerSavingStateChange</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_PowerManagementService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:RequestOSPowerSavingStateChange_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_PowerManagementService"><h:OSPowerSavingState>${OSPowerSavingState}</h:OSPowerSavingState><h:ManagedElement><Address xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://schemas.xmlsoap.org/ws/2004/08/addressing</Address><ReferenceParameters xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing"><ResourceURI xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd">http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_ComputerSystem</ResourceURI><SelectorSet xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd"><Selector Name="CreationClassName">CIM_ComputerSystem</Selector><Selector Name="Name">ManagedSystem</Selector></SelectorSet></ReferenceParameters></h:ManagedElement></h:RequestOSPowerSavingStateChange_INPUT></Body></Envelope>`
      const response = ipsClass.PowerManagementService.RequestOSPowerSavingStateChange(OSPowerSavingState)
      expect(response).toEqual(correctResponse)
    })
  })
  describe('ips_HTTPProxyService Tests', () => {
    it('should create a valid ips_HTTPProxyService AddProxyAccessPoint wsman message', () => {
      const addProxyAccessPointParameters: Models.AddProxyAccessPointParameters = {
        AccessInfo: 'proxy.example.com',
        InfoFormat: 201,
        Port: 8080,
        NetworkDnsSuffix: 'example.com'
      }
      const correctResponse = `${xmlHeader}${envelope}http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HTTPProxyService/AddProxyAccessPoint</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HTTPProxyService</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:AddProxyAccessPoint_INPUT xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_HTTPProxyService"><h:AccessInfo>${addProxyAccessPointParameters.AccessInfo}</h:AccessInfo><h:InfoFormat>${addProxyAccessPointParameters.InfoFormat}</h:InfoFormat><h:Port>${addProxyAccessPointParameters.Port}</h:Port><h:NetworkDnsSuffix>${addProxyAccessPointParameters.NetworkDnsSuffix}</h:NetworkDnsSuffix></h:AddProxyAccessPoint_INPUT></Body></Envelope>`
      const response = ipsClass.HTTPProxyService.AddProxyAccessPoint(addProxyAccessPointParameters)
      expect(response).toEqual(correctResponse)
    })
  })

  describe('ips_ScreenSettingData Tests', () => {
    it('should return a valid ips_ScreenSettingData Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_ScreenSettingData</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.ScreenSettingData.Get()
      expect(response).toEqual(correctResponse)
    })
  })

  describe('ips_KVMRedirectionSettingData Tests', () => {
    it('should return a valid ips_KVMRedirectionSettingData Get wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_KVMRedirectionSettingData</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body></Body></Envelope>`
      const response = ipsClass.KVMRedirectionSettingData.Get()
      expect(response).toEqual(correctResponse)
    })

    it('should return a valid ips_KVMRedirectionSettingData Enumerate wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_KVMRedirectionSettingData</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>`
      const response = ipsClass.KVMRedirectionSettingData.Enumerate()
      expect(response).toEqual(correctResponse)
    })

    it('should return a valid ips_KVMRedirectionSettingData Pull wsman message', () => {
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_KVMRedirectionSettingData</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>${enumerationContext}</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>`
      const response = ipsClass.KVMRedirectionSettingData.Pull(enumerationContext)
      expect(response).toEqual(correctResponse)
    })

    it('should return a valid ips_KVMRedirectionSettingData Put wsman message', () => {
      const data: Models.KVMRedirectionSettingData = {
        ElementName: 'testKVM',
        InstanceID: 'KVM-1',
        OptInPolicy: true,
        SessionTimeout: 30,
        RFBPassword: 'password',
        DefaultScreen: 0,
        InitialDecimationModeForLowRes: 0,
        GreyscalePixelFormatSupported: false,
        ZlibControlSupported: false,
        DoubleBufferMode: false,
        DoubleBufferState: false,
        EnabledByMEBx: true,
        BackToBackFbMode: false,
        Is5900PortEnabled: true
      }
      const correctResponse = `${xmlHeader}${envelope}http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>/wsman</a:To><w:ResourceURI>http://intel.com/wbem/wscim/1/ips-schema/1/IPS_KVMRedirectionSettingData</w:ResourceURI><a:MessageID>${(messageId++).toString()}</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>${operationTimeout}</w:OperationTimeout></Header><Body><h:IPS_KVMRedirectionSettingData xmlns:h="http://intel.com/wbem/wscim/1/ips-schema/1/IPS_KVMRedirectionSettingData"><h:ElementName>testKVM</h:ElementName><h:InstanceID>KVM-1</h:InstanceID><h:OptInPolicy>true</h:OptInPolicy><h:SessionTimeout>30</h:SessionTimeout><h:RFBPassword>password</h:RFBPassword><h:DefaultScreen>0</h:DefaultScreen><h:InitialDecimationModeForLowRes>0</h:InitialDecimationModeForLowRes><h:GreyscalePixelFormatSupported>false</h:GreyscalePixelFormatSupported><h:ZlibControlSupported>false</h:ZlibControlSupported><h:DoubleBufferMode>false</h:DoubleBufferMode><h:DoubleBufferState>false</h:DoubleBufferState><h:EnabledByMEBx>true</h:EnabledByMEBx><h:BackToBackFbMode>false</h:BackToBackFbMode><h:Is5900PortEnabled>true</h:Is5900PortEnabled></h:IPS_KVMRedirectionSettingData></Body></Envelope>`
      const response = ipsClass.KVMRedirectionSettingData.Put(data)
      expect(response).toEqual(correctResponse)
    })
  })
})

/*********************************************************************
* Copyright (c) Intel Corporation 2021
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/

import { Selector, WSManMessageCreator, WSManErrors } from '../WSMan'
import { EthernetPortSettings, MPServer, RemoteAccessPolicyRule, EnvironmentDetectionSettingData, BootSettingData, RedirectionResponse } from './models'
import { Methods } from './methods'
import { Actions, REQUEST_STATE_CHANGE } from './actions'
import { Classes } from './classes'

type AllActions = Actions

interface AMTCall {
  method: Methods
  class: Classes
  messageId: string
  enumerationContext?: string
  selector?: Selector
  requestedState?: number
  data?: RedirectionResponse
}

export class Messages {
  wsmanMessageCreator: WSManMessageCreator = new WSManMessageCreator()
  readonly resourceUriBase: string = 'http://intel.com/wbem/wscim/1/amt-schema/1/'

  private readonly get = (action: AllActions, amtClass: Classes, messageId: string): string => {
    const header = this.wsmanMessageCreator.createHeader(action, `${this.resourceUriBase}${amtClass}`, messageId)
    const body = this.wsmanMessageCreator.createCommonBody(Methods.GET)
    return this.wsmanMessageCreator.createXml(header, body)
  }

  private readonly enumerate = (action: AllActions, amtClass: Classes, messageId: string): string => {
    const header = this.wsmanMessageCreator.createHeader(action, `${this.resourceUriBase}${amtClass}`, messageId)
    const body = this.wsmanMessageCreator.createCommonBody(Methods.ENUMERATE)
    return this.wsmanMessageCreator.createXml(header, body)
  }

  private readonly pull = (action: AllActions, amtClass: Classes, messageId: string, enumerationContext: string): string => {
    const header = this.wsmanMessageCreator.createHeader(action, `${this.resourceUriBase}${amtClass}`, messageId)
    const body = this.wsmanMessageCreator.createCommonBody(Methods.PULL, enumerationContext)
    return this.wsmanMessageCreator.createXml(header, body)
  }

  private readonly put = (action: AllActions, amtClass: Classes, messageId: string, data: RedirectionResponse): string => {
    const header = this.wsmanMessageCreator.createHeader(action, `${this.resourceUriBase}${amtClass}`, messageId)
    const key = Object.keys(data)[0]
    const body = this.wsmanMessageCreator.createBody(Classes.AMT_REDIRECTION_SERVICE, this.resourceUriBase, key, data[key])
    return this.wsmanMessageCreator.createXml(header, body)
  }

  private readonly delete = (action: AllActions, amtClass: Classes, messageId: string, selector: Selector): string => {
    const header = this.wsmanMessageCreator.createHeader(action, `${this.resourceUriBase}${amtClass}`, messageId, null, null, selector)
    const body = this.wsmanMessageCreator.createCommonBody(Methods.DELETE)
    return this.wsmanMessageCreator.createXml(header, body)
  }

  private readonly requestStateChange = (action: string, amtClass: Classes, messageId: string, requestedState: number): string => {
    const header = this.wsmanMessageCreator.createHeader(action, `${this.resourceUriBase}${amtClass}`, messageId)
    const body = this.wsmanMessageCreator.createCommonBody(Methods.REQUEST_STATE_CHANGE, null, `${this.resourceUriBase}${amtClass}`, requestedState)
    return this.wsmanMessageCreator.createXml(header, body)
  }

  private readonly amtSwitch = (amt: AMTCall): string => {
    switch (amt.method) {
      case Methods.GET:
        return this.get(Actions.GET, amt.class, amt.messageId)
      case Methods.PUT:
        if (amt.data == null) { throw new Error(WSManErrors.BODY) }
        return this.put(Actions.PUT, amt.class, amt.messageId, amt.data)
      case Methods.PULL:
        if (amt.enumerationContext == null) { throw new Error(WSManErrors.ENUMERATION_CONTEXT) }
        return this.pull(Actions.PULL, amt.class, amt.messageId, amt.enumerationContext)
      case Methods.ENUMERATE:
        return this.enumerate(Actions.ENUMERATE, amt.class, amt.messageId)
      case Methods.DELETE:
        if (amt.selector == null) { throw new Error(WSManErrors.SELECTOR) }
        return this.delete(Actions.DELETE, amt.class, amt.messageId, amt.selector)
      case Methods.REQUEST_STATE_CHANGE:
        if (amt.requestedState == null) { throw new Error(WSManErrors.REQUESTED_STATE) }
        return this.requestStateChange(REQUEST_STATE_CHANGE(amt.class), amt.class, amt.messageId, amt.requestedState)
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  AuditLog = (method: Methods.READ_RECORDS, messageId: string, startIndex: number): string => {
    let header: string
    let body: string
    switch (method) {
      case Methods.READ_RECORDS:
        header = this.wsmanMessageCreator.createHeader(Actions.READ_RECORDS, `${this.resourceUriBase}${Classes.AMT_AUDIT_LOG}`, messageId)
        body = this.wsmanMessageCreator.createBody('ReadRecords_INPUT', this.resourceUriBase, Classes.AMT_AUDIT_LOG, { StartIndex: startIndex })
        return this.wsmanMessageCreator.createXml(header, body)
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  MessageLog = (method: Methods.GET_RECORDS|Methods.POSITION_TO_FIRSTRECORD, messageId: string, identifier?: number): string => {
    let header: string, body: string
    switch (method) {
      case Methods.POSITION_TO_FIRSTRECORD:
        header = this.wsmanMessageCreator.createHeader(Actions.POSITION_TO_FIRSTRECORD, `${this.resourceUriBase}${Classes.AMT_MESSAGE_LOG}`, messageId)
        body = `<Body><r:PositionToFirstRecord_INPUT xmlns:r="${this.resourceUriBase}${Classes.AMT_MESSAGE_LOG}" /></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      case Methods.GET_RECORDS:
        header = this.wsmanMessageCreator.createHeader(Actions.GET_RECORDS, `${this.resourceUriBase}${Classes.AMT_MESSAGE_LOG}`, messageId)
        body = this.wsmanMessageCreator.createBody('GetRecords_INPUT', this.resourceUriBase, Classes.AMT_MESSAGE_LOG, { IterationIdentifier: identifier, MaxReadRecords: 390 })
        return this.wsmanMessageCreator.createXml(header, body)
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  BootCapabilities = (method: Methods.GET, messageId: string): string => {
    return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_BOOT_CAPABILITIES })
  }

  RedirectionService = (method: Methods.GET | Methods.REQUEST_STATE_CHANGE | Methods.PUT, messageId: string, requestedState?: number, data?: RedirectionResponse): string => {
    return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_REDIRECTION_SERVICE, requestedState, data })
  }

  SetupAndConfigurationService = (method: Methods.GET | Methods.UNPROVISION | Methods.SET_MEBX_PASSWORD | Methods.COMMIT_CHANGES, messageId: string, password?: string, provisioningMode?: number): string => {
    let header: string, body: string
    switch (method) {
      case Methods.GET:
        return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_SETUP_AND_CONFIGURATION_SERVICE })
      case Methods.UNPROVISION:
        header = this.wsmanMessageCreator.createHeader(Actions.UNPROVISION, `${this.resourceUriBase}${Classes.AMT_SETUP_AND_CONFIGURATION_SERVICE}`, messageId)
        body = `<Body><r:Unprovision_INPUT xmlns:r="${this.resourceUriBase}${Classes.AMT_SETUP_AND_CONFIGURATION_SERVICE}"><r:ProvisioningMode>${provisioningMode}</r:ProvisioningMode></r:Unprovision_INPUT></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      case Methods.SET_MEBX_PASSWORD:
        header = this.wsmanMessageCreator.createHeader(Actions.SET_MEBX_PASSWORD, `${this.resourceUriBase}${Classes.AMT_SETUP_AND_CONFIGURATION_SERVICE}`, messageId)
        body = `<Body><r:SetMEBxPassword_INPUT xmlns:r="${this.resourceUriBase}${Classes.AMT_SETUP_AND_CONFIGURATION_SERVICE}"><r:Password>${password}</r:Password></r:SetMEBxPassword_INPUT></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  GeneralSettings = (method: Methods.GET, messageId: string): string => {
    return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_GENERAL_SETTINGS })
  }

  EthernetPortSettings = (method: Methods.PULL | Methods.ENUMERATE | Methods.PUT, messageId: string, enumerationContext?: string, ethernetPortObject?: EthernetPortSettings): string => {
    switch (method) {
      case Methods.PULL:
      case Methods.ENUMERATE:
        return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_ETHERNET_PORT_SETTINGS, enumerationContext })
      case Methods.PUT: {
        if (ethernetPortObject == null) { throw new Error(WSManErrors.ETHERNET_PORT_OBJECT) }
        const selector: Selector = { name: 'InstanceID', value: ethernetPortObject.InstanceId }
        const header = this.wsmanMessageCreator.createHeader(Actions.PUT, `${this.resourceUriBase}${Classes.AMT_ETHERNET_PORT_SETTINGS}`, messageId, null, null, selector)
        let body = `<Body><r:AMT_EthernetPortSettings xmlns:r="${this.resourceUriBase}${Classes.AMT_ETHERNET_PORT_SETTINGS}"><r:DHCPEnabled>${String(ethernetPortObject.DHCPEnabled)}</r:DHCPEnabled><r:ElementName>${ethernetPortObject.ElementName}</r:ElementName><r:InstanceID>${ethernetPortObject.InstanceId}</r:InstanceID><r:IpSyncEnabled>${String(ethernetPortObject.IpSyncEnabled)}</r:IpSyncEnabled><r:LinkIsUp>${String(ethernetPortObject.LinkIsUp)}</r:LinkIsUp>`
        ethernetPortObject.LinkPolicy.forEach(function (item) {
          body += `<r:LinkPolicy>${item}</r:LinkPolicy>`
        })
        body += `<r:MACAddress>${ethernetPortObject.MACAddress}</r:MACAddress><r:PhysicalConnectionType>${ethernetPortObject.PhysicalConnectionType}</r:PhysicalConnectionType><r:SharedDynamicIP>${String(ethernetPortObject.SharedDynamicIp)}</r:SharedDynamicIP><r:SharedMAC>${String(ethernetPortObject.SharedMAC)}</r:SharedMAC><r:SharedStaticIp>${String(ethernetPortObject.SharedStaticIp)}</r:SharedStaticIp></r:AMT_EthernetPortSettings></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      }
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  RemoteAccessPolicyRule = (method: Methods.DELETE, messageId: string, selector?: Selector): string => {
    return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_REMOTE_ACCESS_POLICY_RULE, selector: selector })
  }

  ManagementPresenceRemoteSAP = (method: Methods.PULL | Methods.ENUMERATE, messageId: string, enumerationContext?: string): string => {
    return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_MANAGEMENT_PRESENCE_REMOTE_SAP, enumerationContext: enumerationContext })
  }

  PublicKeyCertificate = (method: Methods.PULL | Methods.ENUMERATE, messageId: string, enumerationContext?: string): string => {
    return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_PUBLIC_KEY_CERTIFICATE, enumerationContext: enumerationContext })
  }

  EnvironmentDetectionSettingData = (method: Methods.GET | Methods.PUT, messageId: string, environmentDetectionSettingData?: EnvironmentDetectionSettingData): string => {
    switch (method) {
      case Methods.GET:
        return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_ENVIRONMENT_DETECTION_SETTING_DATA })
      case Methods.PUT: {
        if (environmentDetectionSettingData == null) { throw new Error(WSManErrors.ENVIRONMENT_DETECTION_SETTING_DATA) }
        const selector: Selector = { name: 'InstanceID', value: environmentDetectionSettingData.InstanceId }
        const header = this.wsmanMessageCreator.createHeader(Actions.PUT, `${this.resourceUriBase}${Classes.AMT_ENVIRONMENT_DETECTION_SETTING_DATA}`, messageId, null, null, selector)
        let body = `<Body><r:AMT_EnvironmentDetectionSettingData xmlns:r="${this.resourceUriBase}${Classes.AMT_ENVIRONMENT_DETECTION_SETTING_DATA}"><r:DetectionAlgorithm>${environmentDetectionSettingData.DetectionAlgorithm}</r:DetectionAlgorithm><r:ElementName>${environmentDetectionSettingData.ElementName}</r:ElementName><r:InstanceID>${environmentDetectionSettingData.InstanceId}</r:InstanceID>`
        environmentDetectionSettingData.DetectionStrings.forEach(function (item) {
          body += `<r:DetectionStrings>${item}</r:DetectionStrings>`
        })
        body += '</r:AMT_EnvironmentDetectionSettingData></Body>'
        return this.wsmanMessageCreator.createXml(header, body)
      }
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  PublicKeyManagementService = (method: Methods.ADD_TRUSTED_ROOT_CERTIFICATE, messageId: string, certificateBlob?: string): string => {
    switch (method) {
      case Methods.ADD_TRUSTED_ROOT_CERTIFICATE: {
        if (certificateBlob == null) { throw new Error(WSManErrors.CERTIFICATE_BLOB) }
        const header = this.wsmanMessageCreator.createHeader(Actions.ADD_TRUSTED_ROOT_CERTIFICATE, `${this.resourceUriBase}${Classes.AMT_PUBLIC_KEY_MANAGEMENT_SERVICE}`, messageId)
        const body = `<Body><r:AddTrustedRootCertificate_INPUT xmlns:r="http://intel.com/wbem/wscim/1/amt-schema/1/AMT_PublicKeyManagementService"><r:CertificateBlob>${certificateBlob}</r:CertificateBlob></r:AddTrustedRootCertificate_INPUT></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      }
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  RemoteAccessService = (method: Methods.ADD_MPS | Methods.ADD_REMOTE_ACCESS_POLICY_RULE, messageId: string, mpServer?: MPServer, remoteAccessPolicyRule?: RemoteAccessPolicyRule, selector?: Selector): string => {
    switch (method) {
      case Methods.ADD_MPS: {
        if (mpServer == null) { throw new Error(WSManErrors.MP_SERVER) }
        const header = this.wsmanMessageCreator.createHeader(Actions.ADD_MPS, `${this.resourceUriBase}${Classes.AMT_REMOTE_ACCESS_SERVICE}`, messageId)
        const body = `<Body><r:AddMpServer_INPUT xmlns:r="http://intel.com/wbem/wscim/1/amt-schema/1/AMT_RemoteAccessService"><r:AccessInfo>${mpServer.AccessInfo}</r:AccessInfo><r:InfoFormat>${mpServer.InfoFormat}</r:InfoFormat><r:Port>${mpServer.Port}</r:Port><r:AuthMethod>${mpServer.AuthMethod}</r:AuthMethod><r:Username>${mpServer.Username}</r:Username><r:Password>${mpServer.Password}</r:Password><r:CN>${mpServer.CommonName}</r:CN></r:AddMpServer_INPUT></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      }
      case Methods.ADD_REMOTE_ACCESS_POLICY_RULE: {
        if (remoteAccessPolicyRule == null) { throw new Error(WSManErrors.REMOTE_ACCESS_POLICY_RULE) }
        if (selector == null) { throw new Error(WSManErrors.SELECTOR) }
        const header = this.wsmanMessageCreator.createHeader(Actions.ADD_REMOTE_ACCESS_POLICY_RULE, `${this.resourceUriBase}${Classes.AMT_REMOTE_ACCESS_SERVICE}`, messageId)
        const body = `<Body><r:AddRemoteAccessPolicyRule_INPUT xmlns:r="http://intel.com/wbem/wscim/1/amt-schema/1/AMT_RemoteAccessService"><r:Trigger>${remoteAccessPolicyRule.Trigger}</r:Trigger><r:TunnelLifeTime>${remoteAccessPolicyRule.TunnelLifeTime}</r:TunnelLifeTime><r:ExtendedData>${remoteAccessPolicyRule.ExtendedData}</r:ExtendedData><r:MpServer><Address xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</Address><ReferenceParameters xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing"><ResourceURI xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd">http://intel.com/wbem/wscim/1/amt-schema/1/AMT_ManagementPresenceRemoteSAP</ResourceURI><SelectorSet xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd"><Selector Name="${selector.name}">${selector.value}</Selector></SelectorSet></ReferenceParameters></r:MpServer></r:AddRemoteAccessPolicyRule_INPUT></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      }
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }

  UserInitiatedConnectionService = (method: Methods.REQUEST_STATE_CHANGE, messageId: string, requestedState?: number): string => {
    return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_USER_INITIATED_CONNECTION_SERVICE, requestedState: requestedState })
  }

  BootSettingData = (method: Methods.GET | Methods.PUT, messageId: string, bootSettingData?: BootSettingData): string => {
    switch (method) {
      case Methods.GET:
        return this.amtSwitch({ method: method, messageId: messageId, class: Classes.AMT_BOOT_SETTING_DATA })
      case Methods.PUT: {
        if (bootSettingData == null) { throw new Error(WSManErrors.BOOT_SETTING_DATA) }
        const header = this.wsmanMessageCreator.createHeader(Actions.PUT, `${this.resourceUriBase}${Classes.AMT_BOOT_SETTING_DATA}`, messageId)
        let body = '<Body><r:AMT_BootSettingData xmlns:r="http://intel.com/wbem/wscim/1/amt-schema/1/AMT_BootSettingData">'
        bootSettingData.BIOSLastStatus?.forEach(function (item) {
          body += `<r:BIOSLastStatus>${item}</r:BIOSLastStatus>`
        })
        bootSettingData.UEFIBootNumberOfParams?.forEach(function (item) {
          body += `<r:UEFIBootNumberOfParams>${item}</r:UEFIBootNumberOfParams>`
        })
        bootSettingData.UEFIBootParametersArray?.forEach(function (item) {
          body += `<r:UEFIBootParametersArray>${item}</r:UEFIBootParametersArray>`
        })
        body += `<r:BIOSPause>${String(bootSettingData.BIOSPause)}</r:BIOSPause><r:BIOSSetup>${String(bootSettingData.BIOSSetup)}</r:BIOSSetup><r:BootMediaIndex>${bootSettingData.BootMediaIndex}</r:BootMediaIndex><r:ConfigurationDataReset>${String(bootSettingData.ConfigurationDataReset)}</r:ConfigurationDataReset><r:ElementName>${bootSettingData.ElementName}</r:ElementName><r:EnforceSecureBoot>${String(bootSettingData.EnforceSecureBoot)}</r:EnforceSecureBoot><r:FirmwareVerbosity>${String(bootSettingData.FirmwareVerbosity)}</r:FirmwareVerbosity><r:ForcedProgressEvents>${String(bootSettingData.ForcedProgressEvents)}</r:ForcedProgressEvents><r:IDERBootDevice>${bootSettingData.IDERBootDevice}</r:IDERBootDevice><r:InstanceID>${bootSettingData.InstanceId}</r:InstanceID><r:LockKeyboard>${String(bootSettingData.LockKeyboard)}</r:LockKeyboard><r:LockPowerButton>${String(bootSettingData.LockPowerButton)}</r:LockPowerButton><r:LockResetButton>${String(bootSettingData.LockResetButton)}</r:LockResetButton><r:LockSleepButton>${String(bootSettingData.LockSleepButton)}</r:LockSleepButton><r:OptionsCleared>${String(bootSettingData.OptionsCleared)}</r:OptionsCleared><r:OwningEntity>${bootSettingData.OwningEntity}</r:OwningEntity><r:ReflashBIOS>${String(bootSettingData.ReflashBIOS)}</r:ReflashBIOS><r:SecureErase>${String(bootSettingData.SecureErase)}</r:SecureErase><r:UseIDER>${String(bootSettingData.UseIDER)}</r:UseIDER><r:UseSOL>${String(bootSettingData.UseSOL)}</r:UseSOL><r:UseSafeMode>${String(bootSettingData.UseSafeMode)}</r:UseSafeMode><r:UserPasswordBypass>${String(bootSettingData.UserPasswordBypass)}</r:UserPasswordBypass></r:AMT_BootSettingData></Body>`
        return this.wsmanMessageCreator.createXml(header, body)
      }
      default:
        throw new Error(WSManErrors.UNSUPPORTED_METHOD)
    }
  }
}

/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

import type { Selector } from '../WSMan.js'
import { Base, WSManErrors, WSManMessageCreator } from '../WSMan.js'
import type { Models, Types } from './index.js'
import { Actions, Classes, Methods } from './index.js'

class BIOSElement extends Base {
  className = Classes.BIOS_ELEMENT
}
class BootConfigSetting extends Base {
  className = Classes.BOOT_CONFIG_SETTING
  /**
   * This method is called to change the boot order within a boot configuration.
   * @param source Types.BootConfigSetting.InstanceID. Optional. Not specifying a source clears the BootConfigSetting
   * @returns string
   */
  ChangeBootOrder = (source?: Types.BootConfigSetting.InstanceID): string => {
    const header = this.wsmanMessageCreator.createHeader(Actions.CHANGE_BOOT_ORDER, Classes.BOOT_CONFIG_SETTING)
    const bootSource = source
      ? `<h:Source><Address xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://schemas.xmlsoap.org/ws/2004/08/addressing</Address><ReferenceParameters xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing"><ResourceURI xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd">http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_BootSourceSetting</ResourceURI><SelectorSet xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd"><Selector Name="InstanceID">${source}</Selector></SelectorSet></ReferenceParameters></h:Source>`
      : ''
    const body = `<Body><h:ChangeBootOrder_INPUT xmlns:h="http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_BootConfigSetting">${bootSource}</h:ChangeBootOrder_INPUT></Body>`
    return this.wsmanMessageCreator.createXml(header, body)
  }
}
class BootService extends Base {
  className = Classes.BOOT_SERVICE
  /**
   * This method is called to set the role of the BootConfigSetting that is directly or indirectly associated to one or more ComputerSystems. The method applies the new role equally to all related ComputerSystems. If a BootConfigSetting can be related to more than one ComputerSystem, but role modification applies to just one of them, the SetBootConfigUsage method shall be used instead.  The method shall update the IsNext or IsDefault property of every ElementSettingData that directly or indirectly associates BootConfigSetting to a ComputerSystem. The method may also update the IsNext or IsDefault property of other ElementSettingDatas that reference the same ComputerSystems to satisfy cardinality constraints.
   * @param bootSource An existing BootConfigSetting instance whose role will be updated.
   * @param role The desired Role of the BootConfigSetting.
   * @returns string
   */
  SetBootConfigRole = (bootSource: string, role: Types.BootService.Role): string => {
    const header = this.wsmanMessageCreator.createHeader(Actions.SET_BOOT_CONFIG_ROLE, Classes.BOOT_SERVICE)
    const body = `<Body><h:SetBootConfigRole_INPUT xmlns:h="http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_BootService"><h:BootConfigSetting><Address xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://schemas.xmlsoap.org/ws/2004/08/addressing</Address><ReferenceParameters xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing"><ResourceURI xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd">http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_BootConfigSetting</ResourceURI><SelectorSet xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd"><Selector Name="InstanceID">${bootSource}</Selector></SelectorSet></ReferenceParameters></h:BootConfigSetting><h:Role>${role}</h:Role></h:SetBootConfigRole_INPUT></Body>`
    return this.wsmanMessageCreator.createXml(header, body)
  }

  /**
   * Requests that the state of the element be changed to the value specified in the RequestedState parameter. When the requested state change takes place, the EnabledState and RequestedState of the element will be the same. Invoking the RequestStateChange method multiple times could result in earlier requests being overwritten or lost. If 0 is returned, then the task completed successfully and the use of ConcreteJob was not required. If 4096 (0x1000) is returned, then the task will take some time to complete, ConcreteJob will be created, and its reference returned in the output parameter Job. Any other return code indicates an error condition.
   * @param requestedState The state requested for the element. This information will be placed into the RequestedState property of the instance if the return code of the RequestStateChange method is 0 ('Completed with No Error'), or 4096 (0x1000) ('Job Started'). Refer to the description of the EnabledState and RequestedState properties for the detailed explanations of the RequestedState values.
   * @returns string
   */
  RequestStateChange = (requestedState: Types.BootService.RequestedState): string =>
    this.protectedRequestStateChange(
      `http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/${this.className}/RequestStateChange`,
      requestedState
    )
}
class BootSourceSetting extends Base {
  className = Classes.BOOT_SOURCE_SETTING
}
class Card extends Base {
  className = Classes.CARD
}
class Chassis extends Base {
  className = Classes.CHASSIS
}
class Chip extends Base {
  className = Classes.CHIP
}
class ComputerSystemPackage extends Base {
  className = Classes.COMPUTER_SYSTEM_PACKAGE
}
class IEEE8021xSettings extends Base {
  className = Classes.IEEE8021X_SETTINGS
}
class KVMRedirectionSAP extends Base {
  className = Classes.KVM_REDIRECTION_SAP
  /**
   * Requests that the state of the element be changed to the value specified in the RequestedState parameter. When the requested state change takes place, the EnabledState and RequestedState of the element will be the same. Invoking the RequestStateChange method multiple times could result in earlier requests being overwritten or lost.  A return code of 0 shall indicate the state change was successfully initiated.  A return code of 3 shall indicate that the state transition cannot complete within the interval specified by the TimeoutPeriod parameter.  A return code of 4096 (0x1000) shall indicate the state change was successfully initiated, a ConcreteJob has been created, and its reference returned in the output parameter Job. Any other return code indicates an error condition.
   * @param requestedState The state requested for the element. This information will be placed into the RequestedState property of the instance if the return code of the RequestStateChange method is 0 ('Completed with No Error'), or 4096 (0x1000) ('Job Started'). Refer to the description of the EnabledState and RequestedState properties for the detailed explanations of the RequestedState values.
   * @returns string
   */
  RequestStateChange = (requestedState: Types.KVMRedirectionSAP.RequestedStateInputs): string =>
    this.protectedRequestStateChange(
      `http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/${this.className}/RequestStateChange`,
      requestedState
    )
}
class MediaAccessDevice extends Base {
  className = Classes.MEDIA_ACCESS_DEVICE
}
class OpaqueManagementData extends Base {
  className = Classes.OPAQUE_MANAGEMENT_DATA
}
class PhysicalMemory extends Base {
  className = Classes.PHYSICAL_MEMORY
}
class PhysicalPackage extends Base {
  className = Classes.PHYSICAL_PACKAGE
}
class PowerManagementService extends Base {
  className = Classes.POWER_MANAGEMENT_SERVICE
  /**
   * RequestPowerStateChange defines the desired power state of the managed element, and when the element should be put into that state. The RequestPowerStateChange method has five input parameters and a result code.
   * @param powerState The power state for PowerManagementService.
   * @returns string
   */
  RequestPowerStateChange = (powerState: Types.PowerManagementService.PowerState): string => {
    const header = this.wsmanMessageCreator.createHeader(
      Actions.REQUEST_POWER_STATE_CHANGE,
      Classes.POWER_MANAGEMENT_SERVICE
    )
    const body = `<Body><h:RequestPowerStateChange_INPUT xmlns:h="http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_PowerManagementService"><h:PowerState>${powerState}</h:PowerState><h:ManagedElement><Address xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://schemas.xmlsoap.org/ws/2004/08/addressing</Address><ReferenceParameters xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing"><ResourceURI xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd">http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/CIM_ComputerSystem</ResourceURI><SelectorSet xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd"><Selector Name="CreationClassName">CIM_ComputerSystem</Selector><Selector Name="Name">ManagedSystem</Selector></SelectorSet></ReferenceParameters></h:ManagedElement></h:RequestPowerStateChange_INPUT></Body>`
    return this.wsmanMessageCreator.createXml(header, body)
  }
}
class Processor extends Base {
  className = Classes.PROCESSOR
}
class ServiceAvailableToElement extends Base {
  className = Classes.SERVICE_AVAILABLE_TO_ELEMENT
}
class SoftwareIdentity extends Base {
  className = Classes.SOFTWARE_IDENTITY
}
class SystemPackaging extends Base {
  className = Classes.SYSTEM_PACKAGING
}
class WiFiEndpointSettings extends Base {
  className = Classes.WIFI_ENDPOINT_SETTINGS
  /**
   * Deletes an instance of WiFiEndpointSettings
   * @param selector Selector Object.
   * @returns string
   */
  Delete = (selector: Selector): string => this.protectedDelete(selector)
}
class WiFiPort extends Base {
  className = Classes.WIFI_PORT
  /**
   * Requests that the state of the element be changed to the value specified in the RequestedState parameter. When the requested state change takes place, the EnabledState and RequestedState of the element will be the same. Invoking the RequestStateChange method multiple times could result in earlier requests being overwritten or lost.  A return code of 0 shall indicate the state change was successfully initiated.  A return code of 3 shall indicate that the state transition cannot complete within the interval specified by the TimeoutPeriod parameter.  A return code of 4096 (0x1000) shall indicate the state change was successfully initiated, a ConcreteJob has been created, and its reference returned in the output parameter Job. Any other return code indicates an error condition.
   * @param requestedState The state requested for the element. This information will be placed into the RequestedState property of the instance if the return code of the RequestStateChange method is 0 ('Completed with No Error'), or 4096 (0x1000) ('Job Started'). Refer to the description of the EnabledState and RequestedState properties for the detailed explanations of the RequestedState values.
   * @returns string
   */
  RequestStateChange = (requestedState: Types.WiFiPort.RequestedState): string =>
    this.protectedRequestStateChange(
      `http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/${this.className}/RequestStateChange`,
      requestedState
    )
}
class ConcreteDependency extends Base {
  className = Classes.CONCRETE_DEPENDENCY
}

class CredentialContext extends Base {
  className = Classes.CREDENTIAL_CONTEXT
}

class OpaqueManagementDataService extends Base {
  className = Classes.OPAQUE_MANAGEMENT_DATA_SERVICE

  /**
   * Builds the Endpoint Reference XML for a referenced CIM instance, wrapped in the
   * supplied input-parameter element (e.g. <h:OpaqueManagementData>). The instance is
   * selected by a single key selector (InstanceID for most CIM classes, DeviceID for
   * CIM_StorageExtent).
   */
  private readonly reference = (
    parameter: string,
    wsmanClass: string,
    selectorName: string,
    selectorValue: string
  ): string =>
    `<h:${parameter}><Address xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://schemas.xmlsoap.org/ws/2004/08/addressing</Address><ReferenceParameters xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing"><ResourceURI xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd">${this.wsmanMessageCreator.resourceUriBase}${wsmanClass}</ResourceURI><SelectorSet xmlns="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd"><Selector Name="${selectorName}">${selectorValue}</Selector></SelectorSet></ReferenceParameters></h:${parameter}>`

  /** Endpoint Reference to a CIM_OpaqueManagementData block, selected by its InstanceID. */
  private readonly opaqueDataReference = (handle: string): string =>
    this.reference('OpaqueManagementData', Classes.OPAQUE_MANAGEMENT_DATA, 'InstanceID', handle)

  /** Wraps method parameters in the SOAP Body and assembles the full envelope. */
  private readonly createMethod = (action: Actions, method: Methods, parameters: string): string => {
    const header = this.wsmanMessageCreator.createHeader(action, this.className)
    const body = `<Body><h:${method}_INPUT xmlns:h="${this.wsmanMessageCreator.resourceUriBase}${this.className}">${parameters}</h:${method}_INPUT></Body>`
    return this.wsmanMessageCreator.createXml(header, body)
  }

  /**
   * Reads a block of octets from an opaque management data block.
   * @param data Models.OpaqueManagementDataService.Read - the block Handle plus optional Length, Offset and LockToken.
   * @returns string
   */
  Read = (data: Models.OpaqueManagementDataService.Read): string => {
    if (data?.Handle == null) throw new Error(WSManErrors.INSTANCE_ID)
    let parameters = ''
    if (data.Length != null) parameters += `<h:Length>${data.Length.toString()}</h:Length>`
    if (data.Offset != null) parameters += `<h:Offset>${data.Offset.toString()}</h:Offset>`
    if (data.LockToken != null) parameters += `<h:LockToken>${data.LockToken}</h:LockToken>`
    parameters += this.opaqueDataReference(data.Handle)
    return this.createMethod(Actions.READ, Methods.READ, parameters)
  }

  /**
   * Writes a block of octets to an opaque management data block.
   * @param data Models.OpaqueManagementDataService.Write - the block Handle and Data plus optional Length, Offset, Truncate and LockToken.
   * @returns string
   */
  Write = (data: Models.OpaqueManagementDataService.Write): string => {
    if (data?.Handle == null) throw new Error(WSManErrors.INSTANCE_ID)
    if (data?.Data == null) throw new Error(WSManErrors.DATA)
    let parameters = ''
    if (data.Length != null) parameters += `<h:Length>${data.Length.toString()}</h:Length>`
    if (data.Offset != null) parameters += `<h:Offset>${data.Offset.toString()}</h:Offset>`
    if (data.Truncate != null) parameters += `<h:Truncate>${data.Truncate.toString()}</h:Truncate>`
    parameters += `<h:Data>${data.Data}</h:Data>`
    if (data.LockToken != null) parameters += `<h:LockToken>${data.LockToken}</h:LockToken>`
    parameters += this.opaqueDataReference(data.Handle)
    return this.createMethod(Actions.WRITE, Methods.WRITE, parameters)
  }

  /**
   * Allocates a new opaque management data block.
   * @param data Models.OpaqueManagementDataService.Create - optional DataFormat, ElementName, MaxSize, BasedOnExtent and Owner.
   * @returns string
   */
  Create = (data: Models.OpaqueManagementDataService.Create = {}): string => {
    let parameters = ''
    if (data.DataFormat != null) parameters += `<h:DataFormat>${data.DataFormat}</h:DataFormat>`
    if (data.ElementName != null) parameters += `<h:ElementName>${data.ElementName}</h:ElementName>`
    if (data.MaxSize != null) parameters += `<h:MaxSize>${data.MaxSize.toString()}</h:MaxSize>`
    if (data.BasedOnExtent != null)
      parameters += this.reference('BasedOnExtent', 'CIM_StorageExtent', 'DeviceID', data.BasedOnExtent)
    if (data.Owner != null) parameters += this.reference('Owner', 'CIM_Identity', 'InstanceID', data.Owner)
    return this.createMethod(Actions.CREATE, Methods.CREATE, parameters)
  }

  /**
   * Acquires or releases a lock on an opaque management data block.
   * @param data Models.OpaqueManagementDataService.Lock - the block Handle, the Lock flag and an optional LockToken.
   * @returns string
   */
  Lock = (data: Models.OpaqueManagementDataService.Lock): string => {
    if (data?.Handle == null) throw new Error(WSManErrors.INSTANCE_ID)
    let parameters = `<h:Lock>${data.Lock.toString()}</h:Lock>`
    if (data.LockToken != null) parameters += `<h:LockToken>${data.LockToken}</h:LockToken>`
    parameters += this.opaqueDataReference(data.Handle)
    return this.createMethod(Actions.LOCK, Methods.LOCK, parameters)
  }

  /**
   * Grants an identity a set of access rights (activities) to an opaque management data block.
   * @param data Models.OpaqueManagementDataService.AssignAccess - the block Handle, the Identity and the Activities being granted.
   * @returns string
   */
  AssignAccess = (data: Models.OpaqueManagementDataService.AssignAccess): string => {
    if (data?.Handle == null) throw new Error(WSManErrors.INSTANCE_ID)
    let parameters = ''
    data.Activities?.forEach((activity) => {
      parameters += `<h:Activities>${activity.toString()}</h:Activities>`
    })
    parameters += this.reference('Identity', 'CIM_Identity', 'InstanceID', data.Identity)
    parameters += this.opaqueDataReference(data.Handle)
    return this.createMethod(Actions.ASSIGN_ACCESS, Methods.ASSIGN_ACCESS, parameters)
  }

  /**
   * Transfers ownership of an opaque management data block to a new identity.
   * @param data Models.OpaqueManagementDataService.ReassignOwnership - the block Handle and the NewOwner.
   * @returns string
   */
  ReassignOwnership = (data: Models.OpaqueManagementDataService.ReassignOwnership): string => {
    if (data?.Handle == null) throw new Error(WSManErrors.INSTANCE_ID)
    let parameters = this.reference('NewOwner', 'CIM_Identity', 'InstanceID', data.NewOwner)
    parameters += this.opaqueDataReference(data.Handle)
    return this.createMethod(Actions.REASSIGN_OWNERSHIP, Methods.REASSIGN_OWNERSHIP, parameters)
  }

  /**
   * Exports the contents of an opaque management data block to an external URI.
   * @param data Models.OpaqueManagementDataService.ExportToURI - the block Handle and ExportURI plus optional Length, Offset and LockToken.
   * @returns string
   */
  ExportToURI = (data: Models.OpaqueManagementDataService.ExportToURI): string => {
    if (data?.Handle == null) throw new Error(WSManErrors.INSTANCE_ID)
    let parameters = `<h:ExportURI>${data.ExportURI}</h:ExportURI>`
    if (data.Length != null) parameters += `<h:Length>${data.Length.toString()}</h:Length>`
    if (data.Offset != null) parameters += `<h:Offset>${data.Offset.toString()}</h:Offset>`
    if (data.LockToken != null) parameters += `<h:LockToken>${data.LockToken}</h:LockToken>`
    parameters += this.opaqueDataReference(data.Handle)
    return this.createMethod(Actions.EXPORT_TO_URI, Methods.EXPORT_TO_URI, parameters)
  }

  /**
   * Imports data from an external URI into an opaque management data block.
   * @param data Models.OpaqueManagementDataService.ImportFromURI - the block Handle and ImportURI plus optional Length, Offset, Truncate and LockToken.
   * @returns string
   */
  ImportFromURI = (data: Models.OpaqueManagementDataService.ImportFromURI): string => {
    if (data?.Handle == null) throw new Error(WSManErrors.INSTANCE_ID)
    let parameters = `<h:ImportURI>${data.ImportURI}</h:ImportURI>`
    if (data.Length != null) parameters += `<h:Length>${data.Length.toString()}</h:Length>`
    if (data.Offset != null) parameters += `<h:Offset>${data.Offset.toString()}</h:Offset>`
    if (data.Truncate != null) parameters += `<h:Truncate>${data.Truncate.toString()}</h:Truncate>`
    if (data.LockToken != null) parameters += `<h:LockToken>${data.LockToken}</h:LockToken>`
    parameters += this.opaqueDataReference(data.Handle)
    return this.createMethod(Actions.IMPORT_FROM_URI, Methods.IMPORT_FROM_URI, parameters)
  }
}

export class Messages {
  readonly resourceUriBase: string = 'http://schemas.dmtf.org/wbem/wscim/1/cim-schema/2/'
  wsmanMessageCreator: WSManMessageCreator = new WSManMessageCreator(this.resourceUriBase)
  public BIOSElement = new BIOSElement(this.wsmanMessageCreator)
  public BootConfigSetting = new BootConfigSetting(this.wsmanMessageCreator)
  public BootService = new BootService(this.wsmanMessageCreator)
  public BootSourceSetting = new BootSourceSetting(this.wsmanMessageCreator)
  public Card = new Card(this.wsmanMessageCreator)
  public Chassis = new Chassis(this.wsmanMessageCreator)
  public Chip = new Chip(this.wsmanMessageCreator)
  public ComputerSystemPackage = new ComputerSystemPackage(this.wsmanMessageCreator)
  public IEEE8021xSettings = new IEEE8021xSettings(this.wsmanMessageCreator)
  public KVMRedirectionSAP = new KVMRedirectionSAP(this.wsmanMessageCreator)
  public MediaAccessDevice = new MediaAccessDevice(this.wsmanMessageCreator)
  public OpaqueManagementData = new OpaqueManagementData(this.wsmanMessageCreator)
  public PhysicalMemory = new PhysicalMemory(this.wsmanMessageCreator)
  public PhysicalPackage = new PhysicalPackage(this.wsmanMessageCreator)
  public PowerManagementService = new PowerManagementService(this.wsmanMessageCreator)
  public Processor = new Processor(this.wsmanMessageCreator)
  public ServiceAvailableToElement = new ServiceAvailableToElement(this.wsmanMessageCreator)
  public SoftwareIdentity = new SoftwareIdentity(this.wsmanMessageCreator)
  public SystemPackaging = new SystemPackaging(this.wsmanMessageCreator)
  public WiFiEndpointSettings = new WiFiEndpointSettings(this.wsmanMessageCreator)
  public WiFiPort = new WiFiPort(this.wsmanMessageCreator)
  public ConcreteDependency = new ConcreteDependency(this.wsmanMessageCreator)
  public CredentialContext = new CredentialContext(this.wsmanMessageCreator)
  public OpaqueManagementDataService = new OpaqueManagementDataService(this.wsmanMessageCreator)
}

/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

export namespace Types {
  export namespace HostBasedSetupService {
    /**
     * Not provisioned:0 | Client:1 | Admin:2
     */
    export type CurrentControlMode = 0 | 1 | 2
    /**
     * Not Started:0 | Chain In-Progress:1 | Chain Complete:2
     */
    export type CertChainStatus = 0 | 1 | 2
    /**
     * None:0 | Other:1 | HTTP Digest MD5(A1):2
     */
    export type AdminPassEncryptionType = 0 | 1 | 2
    /**
     * None:0 | Other:1 | RSA_SHA-2_256:2
     */
    export type SigningAlgorithm = 0 | 1 | 2
  }
  export namespace OptInService {
    /**
     * None:0 | KVM:1 | All:4294967295
     */
    export type OptInRequired = 0 | 1 | 4294967295
    /**
     * Not started:0 | Requested:1 | Displayed:2 | Received:3 | In Session:4
     */
    export type OptInState = 0 | 1 | 2 | 3 | 4
    /**
     * FALSE:0 | TRUE:1
     */
    export type CanModifyOptInPolicy = 0 | 1
  }

  export namespace IEEE8021xSettings {
    /**
     * Enabled:2 | Disabled:3 | Enabled Without Certificates:6
     */
    export type Enabled = 2 | 3 | 6
  }

  export namespace PowerManagementService {
    /**
     * Unknown: 0| Unsupported: 1| Full Power: 2 | OS power saving: 3
     */

    export type OSPowerSavingState = 0 | 1 | 2 | 3
    /**
     * Unknown:0 | Other:1 | Enabled:2 | Disabled:3 | Shutting Down:4 | Not Applicable:5 | Enabled but Offline:6 | In Test:7 | Deferred:8 | Quiesce:9 | Starting:10
     */
    export type EnabledState = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    /**
     * Unknown:0 | Enabled:2 | Disabled:3 | Shut Down:4 | No Change:5 | Offline:6 | Test:7 | Deferred:8 | Quiesce:9 | Reboot:10 | Reset:11 | Not Applicable:12
     */
    export type RequestedState = 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
}

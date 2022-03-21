import { PropertiesFromAPI } from '@/Common/types/document'

export default class Properties {
  syncStatus: string
  hasSubscribedToVault: boolean

  constructor(properties: PropertiesFromAPI) {
    this.syncStatus = properties.syncStatus
    this.hasSubscribedToVault =
      properties.HasSubscribedToVault !== undefined ||
      properties.ENDO !== undefined
  }
}

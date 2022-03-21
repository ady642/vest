import state from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import actions from '@/modules/DataManipulation/Create/CreateFolder/store/actions'
import getters from '@/modules/DataManipulation/Create/CreateFolder/store/getters'
import mutations from '@/modules/DataManipulation/Create/CreateFolder/store/mutations'

export const createFolderModule = (name: string): string =>
  `GED/DataManipulation/CreateFolder/${name}`

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

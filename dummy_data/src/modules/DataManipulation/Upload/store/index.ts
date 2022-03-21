import actions from '@/modules/DataManipulation/Upload/store/actions'
import mutations from '@/modules/DataManipulation/Upload/store/mutations'
import state from '@/modules/DataManipulation/Upload/store/state'
import getters from '@/modules/DataManipulation/Upload/store/getters'

export const uploadModule = (name: string): string =>
  `GED/DataManipulation/Upload/${name}`

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

import state from '@/modules/Trash/store/state'
import actions from '@/modules/Trash/store/actions'
import getters from '@/modules/Trash/store/getters'
import mutations from '@/modules/Trash/store/mutations'

export const trashModule = (name: string): string => `GED/Trash/${name}`

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

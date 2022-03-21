import actions from '@/modules/Search/store/actions'
import mutations from '@/modules/Search/store/mutations'
import state from '@/modules/Search/store/state'
import getters from '@/modules/Search/store/getters'

export const searchModule = (name: string): string => `GED/Search/${name}`

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

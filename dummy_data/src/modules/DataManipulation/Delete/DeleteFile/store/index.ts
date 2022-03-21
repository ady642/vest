import getters from '@/modules/DataManipulation/Delete/DeleteFile/store/getters'
import actions from '@/modules/DataManipulation/Delete/DeleteFile/store/actions'
import mutations from '@/modules/DataManipulation/Delete/DeleteFile/store/mutations'
import state from '@/modules/DataManipulation/Delete/DeleteFile/store/state'

export const deleteFileModule = (name: string): string => {
  return `GED/DataManipulation/DeleteFile/${name}`
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}

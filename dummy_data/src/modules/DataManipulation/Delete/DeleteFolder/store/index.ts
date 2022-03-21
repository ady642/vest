import getters from '@/modules/DataManipulation/Delete/DeleteFolder/store/getters'
import actions from '@/modules/DataManipulation/Delete/DeleteFolder/store/actions'
import mutations from '@/modules/DataManipulation/Delete/DeleteFolder/store/mutations'

export const deleteFoldersModule = (name: string): string => {
  return `GED/DataManipulation/DeleteFolders/${name}`
}

export default {
  namespaced: true,
  getters,
  actions,
  mutations
}

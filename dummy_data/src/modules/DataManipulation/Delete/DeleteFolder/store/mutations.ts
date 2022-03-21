import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'

export const SET_IS_FOLDER_DELETING = 'SET_IS_FOLDER_DELETING'

export default {
  [SET_IS_FOLDER_DELETING](
    state: DeleteFoldersStateInterface,
    payload: boolean
  ): void {
    state.isFolderDeleting = payload
  }
}

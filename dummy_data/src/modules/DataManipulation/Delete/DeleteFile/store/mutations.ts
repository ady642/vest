import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'

export const SET_IS_FILE_DELETING = 'SET_IS_FILE_DELETING'

export default {
  [SET_IS_FILE_DELETING](
    state: DeleteFileStateInterface,
    payload: boolean
  ): void {
    state.isFileDeleting = payload
  }
}

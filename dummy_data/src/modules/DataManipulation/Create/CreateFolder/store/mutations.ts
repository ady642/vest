import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'

export const SET_IS_FOLDER_CREATING = 'SET_IS_FOLDER_CREATING'

export default {
  [SET_IS_FOLDER_CREATING](
    state: CreateFolderStateInterface,
    payload: boolean
  ): void {
    state.isCreatingFolder = payload
  }
}

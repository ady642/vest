import mutations from '@/modules/DataManipulation/Delete/DeleteFolder/store/mutations'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'

describe('DeleteFolders mutations', () => {
  it('SET_IS_FOLDER_DELETING', () => {
    const state = {
      isFolderDeleting: false
    } as DeleteFoldersStateInterface

    // When the SET_IS_FOLDER_DELETING mutation is called
    mutations.SET_IS_FOLDER_DELETING(state, true)

    // Then isFolderDeleting state must be equal to payload
    expect(state.isFolderDeleting).toEqual(true)
  })
})

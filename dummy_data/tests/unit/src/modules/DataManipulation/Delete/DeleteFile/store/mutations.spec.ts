import mutations from '@/modules/DataManipulation/Delete/DeleteFile/store/mutations'
import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'

describe('DeleteFile mutations', () => {
  it('SET_IS_FILE_DELETING', () => {
    const state = {
      isFileDeleting: false
    } as DeleteFileStateInterface

    // When the SET_IS_FILE_DELETING mutation is called
    mutations.SET_IS_FILE_DELETING(state, true)

    // Then isFileDeleting state must be equal to payload
    expect(state.isFileDeleting).toEqual(true)
  })
})

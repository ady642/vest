import mutations from '@/modules/DataManipulation/Create/CreateFolder/store/mutations'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'

describe('create folder module mutations', () => {
  it('SET_IS_FOLDER_CREATING', () => {
    const state = {
      isCreatingFolder: false
    } as CreateFolderStateInterface

    // When the SET_DOCUMENTS_TOTAL_COUNT mutation is called
    mutations.SET_IS_FOLDER_CREATING(state, true)

    // Then documentsTotalCount state must be equal to 4545
    expect(state.isCreatingFolder).toEqual(true)
  })
})

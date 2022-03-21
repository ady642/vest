import actions from '@/modules/DataManipulation/Delete/DeleteFolder/store/actions'
import DeleteFoldersServices from '@/modules/DataManipulation/Delete/DeleteFolder/services'
import RootSearchStateInterface from '@/store/types/rootState'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'
import { SearchStateInterface } from '@/modules/Search/store/types'
import { Commit } from 'vuex'
import { searchModule } from '@/modules/Search/store'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { TrashStateInterface } from '@/modules/Trash/store/state'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'

const commit: Commit = jest.fn()

const rootState: RootSearchStateInterface = {
  app: {
    account: {
      AccountId: '1001'
    }
  },
  GED: {
    Trash: {} as TrashStateInterface,
    Search: {} as SearchStateInterface,
    DataManipulation: {
      MailToGed: {} as MailToGedStateInterface,
      Upload: {} as UploadStateInterface,
      DeleteFolders: {} as DeleteFoldersStateInterface,
      DeleteFile: {} as DeleteFileStateInterface,
      CreateFolder: {} as CreateFolderStateInterface
    }
  }
}

describe('DeleteFolder actions module', () => {
  describe('deleteFolderByModal', () => {
    it('should call the DeleteFolderServices and commit REMOVE_FOLDER mutation', async () => {
      // Given the service return a resolved value
      jest.spyOn(DeleteFoldersServices, 'deleteFolder').mockResolvedValue()

      // When I call the deleteFolderByModal action
      await actions.deleteFolderByModal(
        {
          rootState,
          commit
        },
        4521
      )

      // Then deleteFolder service must be called
      expect(DeleteFoldersServices.deleteFolder).toHaveBeenCalledWith(
        '1001',
        4521
      )

      // And commit must be called with good mutation
      expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_FOLDER_DELETING', true)
      expect(commit).toHaveBeenNthCalledWith(
        2,
        searchModule('REMOVE_FOLDER'),
        4521,
        {
          root: true
        }
      )
      expect(commit).toHaveBeenNthCalledWith(3, 'SET_IS_FOLDER_DELETING', false)
    })
  })
})

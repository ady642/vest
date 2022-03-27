import { Commit } from 'vuex'
import CreateFolderServices from '@/modules/DataManipulation/Create/CreateFolder/services'
import { Category, CreateFolderQuery } from '@/modules/Search/types'
import actions from '@/modules/DataManipulation/Create/CreateFolder/store/actions'
import RootStateInterface from '@/store/types/rootState'
import useFoldersData from 'dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock'
import { searchModule } from '@/modules/Search/store'
import { PUSH_FOLDER } from '@/modules/Search/store/mutations'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import FolderExistsError from '@/Common/errors/FolderExistsError'

const commit: Commit = jest.fn()

describe('CreateFolder actions', () => {
  it('Should call CreateFolderServices.CreateFolder with the correct payload when folder dose not exist', async () => {
    // Given the service return no value
    const category: Category = {
      id: 4545,
      name: 'New Folder',
      children: [],
      parent: {
        id: 1122
      },
      properties: {},
      permissions: []
    }

    jest.spyOn(CreateFolderServices, 'CreateFolder').mockResolvedValue({
      data: category
    })

    // When I call the CreateFolder action
    const query = {
      targetFolder: 1122,
      folderName: 'New Folder',
      accountNumber: '75545'
    } as CreateFolderQuery

    await actions.CreateFolder(
      {
        rootGetters: { 'GED/Search/folders': useFoldersData().FoldersData },
        commit,
        rootState: {
          app: {
            account: {
              AccountId: '75545'
            }
          }
        } as RootStateInterface
      },
      query
    )

    // Then the service must be called it the query and the account number as 75545
    // And the folder must be pushed in folders state of search module
    expect(CreateFolderServices.CreateFolder).toBeCalledWith(query)
    expect(commit).toHaveBeenCalledTimes(3)
    expect(commit).toHaveBeenNthCalledWith(1, 'SET_IS_FOLDER_CREATING', true)
    expect(commit).toHaveBeenNthCalledWith(
      2,
      searchModule(PUSH_FOLDER),
      new Folder(category),
      { root: true }
    )
    expect(commit).toHaveBeenNthCalledWith(3, 'SET_IS_FOLDER_CREATING', false)
  })
  it('Should not call CreateFolderServices.CreateFolder and throw error if a folder with same name exist in parent folder', async () => {
    // When I call the CreateFolder action with a folderName that already exist
    const query = {
      targetFolder: 1122,
      folderName: '   The child',
      accountNumber: '75545'
    } as CreateFolderQuery

    // Then the action must throw a FolderExistsError
    await expect(
      actions.CreateFolder(
        {
          rootGetters: { 'GED/Search/folders': useFoldersData().FoldersData },
          commit,
          rootState: {
            app: {
              account: {
                AccountId: '75545'
              }
            }
          } as RootStateInterface
        },
        query
      )
    ).rejects.toThrow(new FolderExistsError())
  })
})

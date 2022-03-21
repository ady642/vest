import getters from '@/modules/DataManipulation/Create/CreateFolder/store/getters'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { CreateFolderQuery } from '@/modules/Search/types'
import RootStateInterface from '@/store/types/rootState'
import constants from '@/Common/constants'

describe('hasPermissionToDeleteFolder', () => {
  const permissionCases = [
    {
      hasPermissionToManipulateFolder: jest.fn(() => false),
      expectedHasPermission: false
    },
    {
      hasPermissionToManipulateFolder: jest.fn(() => true),
      expectedHasPermission: true
    }
  ]

  it.each(permissionCases)(
    'should return true if permissions are in the folders.permission',
    ({ hasPermissionToManipulateFolder, expectedHasPermission }) => {
      // Given hasPermission getter exists
      const state = {} as CreateFolderStateInterface
      const rootState = {} as RootStateInterface
      const rootGetters = {
        'GED/DataManipulation/hasPermissionToManipulateFolder':
          hasPermissionToManipulateFolder
      }

      // When I call the folders getter
      const hasPermissionToAdd = getters.hasPermissionToAddFolder(
        state,
        getters,
        rootState,
        rootGetters
      )(1)

      // Then hasPermission must return true
      expect(
        rootGetters['GED/DataManipulation/hasPermissionToManipulateFolder']
      ).toHaveBeenCalledWith({
        folderId: 1,
        permissionName: constants.CAN_CREATE_FOLDER
      })
      expect(hasPermissionToAdd).toEqual(expectedHasPermission)
    }
  )
})

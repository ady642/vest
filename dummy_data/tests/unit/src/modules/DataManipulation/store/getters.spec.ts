import { Category, PermissionsNames } from '@/modules/Search/types'
import { categoryMock } from '../../Search/mocks/CategoryAPIMock'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import getters from '@/modules/DataManipulation/store/getters'
import RootStateInterface from '@/store/types/rootState'

describe('DataManipulation getter', () => {
  describe('hasPermissionToManipulateFolder', () => {
    const permissionCases = [
      {
        folderId: 1,
        permissionName: 'CAN_CREATE_FOLDER' as PermissionsNames,
        category: {
          ...categoryMock,
          permissions: ['CAN_CREATE_FOLDER']
        } as Category,
        expectedHasPermission: true
      },
      {
        folderId: 1,
        permissionName: 'CanDeleteChildren' as PermissionsNames,
        category: {
          ...categoryMock,
          permissions: ['CAN_CREATE_FOLDER']
        } as Category,
        expectedHasPermission: false
      },
      {
        folderId: 1,
        permissionName: 'CAN_CREATE_FOLDER' as PermissionsNames,
        category: { ...categoryMock, id: 27 } as Category, // 27 to search a folder that does not exist in folders.collection
        expectedHasPermission: false // Must return false
      },
      {
        folderId: 0,
        permissionName: 'CAN_CREATE_FOLDER' as PermissionsNames,
        category: { ...categoryMock, id: 27 } as Category, // 27 to search a folder that does not exist in folders.collection
        expectedHasPermission: false // Must return false
      }
    ]

    it.each(permissionCases)(
      'should return true if permissions are in the folders.permission',
      ({ folderId, permissionName, category, expectedHasPermission }) => {
        // Given folders state is set
        const state = {} as unknown
        const rootState = {} as RootStateInterface
        const rootGetters = {
          'GED/Search/folders': Folders.loaded([category])
        }

        // When I call the hasPermissionToManipulateFolder getter
        const hasPermissionToManipulateFolder =
          getters.hasPermissionToManipulateFolder(
            state,
            getters,
            rootState,
            rootGetters
          )({
            permissionName,
            folderId
          })

        // Then hasPermissionToManipulateFolder
        expect(hasPermissionToManipulateFolder).toEqual(expectedHasPermission)
      }
    )
  })
})

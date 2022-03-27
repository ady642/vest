import { createFile } from 'dummy_data/tests/unit/__mocks__/Files/createFile'
import FoldersDataMock from 'dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock'

import RootStateInterface from '@/store/types/rootState'
import getters from '@/modules/DataManipulation/Delete/DeleteFolder/store/getters'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import constants from '@/Common/constants'

describe('delete folders getters', () => {
  describe('isFolderDeletable', () => {
    const cases = [
      // File is directly in folder
      {
        folderIdToDelete: 1122,
        files: [createFile(1122, StateUpload.UPLOADING)], // In folder and UPLOADING
        expectedDeletable: false // CANT be deleted
      },
      {
        folderIdToDelete: 1122,
        files: [createFile(1122, StateUpload.PENDING)], // In folder and PENDING
        expectedDeletable: true // CAN be deleted
      },
      // File is in a child
      {
        folderIdToDelete: 1122,
        files: [createFile(1001, StateUpload.UPLOADING)], // In the son and UPLOADING
        expectedDeletable: false // CANT be deleted
      },
      {
        folderIdToDelete: 1122,
        files: [createFile(2705, StateUpload.UPLOADING)], // In the grandson and UPLOADING
        expectedDeletable: false // CANT be deleted
      },
      {
        folderIdToDelete: 1122,
        files: [createFile(1001, StateUpload.PENDING)], // In the son and PENDING
        expectedDeletable: true // CAN be deleted
      },
      // Folder has files uploading and no child
      {
        folderIdToDelete: 2705,
        files: [createFile(1001, StateUpload.UPLOADING)], // In a parent folder and UPLOADING
        expectedDeletable: true // CAN be deleted
      },
      // Folder and children have no files uploading
      {
        folderIdToDelete: 2705,
        files: [createFile(1233, StateUpload.UPLOADING)], // In a sibling folder and UPLOADING
        expectedDeletable: true // CAN be deleted
      }
    ]

    test.each(cases)(
      'should return $expectedDeletable',
      ({ folderIdToDelete, files, expectedDeletable }) => {
        // Given
        const state = {} as DeleteFoldersStateInterface
        const rootState = {} as RootStateInterface
        const rootGetters = {
          'GED/DataManipulation/Upload/files': files,
          'GED/Search/folders': FoldersDataMock().FoldersData
        }

        // When
        const isFolderDeletable = getters.isFolderDeletable(
          state,
          getters,
          rootState,
          rootGetters
        )(folderIdToDelete)

        // Then
        expect(isFolderDeletable).toEqual(expectedDeletable)
      }
    )
  })
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
        const state = {} as DeleteFoldersStateInterface
        const rootState = {} as RootStateInterface
        const rootGetters = {
          'GED/DataManipulation/hasPermissionToManipulateFolder':
            hasPermissionToManipulateFolder
        }

        // When I call the folders getter
        const hasPermissionToDelete = getters.hasPermissionToDeleteFolder(
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
          permissionName: constants.CAN_DELETE_FOLDER
        })
        expect(hasPermissionToDelete).toEqual(expectedHasPermission)
      }
    )
  })
  describe('isFolderDeleting', () => {
    const deletingCases = [
      { isFolderDeleting: false, expected: false },
      { isFolderDeleting: true, expected: true }
    ]

    it.each(deletingCases)(
      'is should return $expected if isFolderDeleting = $isFolderDeleting',
      ({ isFolderDeleting, expected }) => {
        const state = {
          isFolderDeleting
        } as DeleteFoldersStateInterface

        expect(getters.isFolderDeleting(state)).toBe(expected)
      }
    )
  })
})

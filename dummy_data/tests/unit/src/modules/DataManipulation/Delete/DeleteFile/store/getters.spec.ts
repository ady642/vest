import { createDocument } from 'tests/unit/__mocks__/Document/createDocument'

import RootStateInterface from '@/store/types/rootState'
import getters from '@/modules/DataManipulation/Delete/DeleteFile/store/getters'
import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'
import constants from '@/Common/constants'
import { folderMock } from '@/modules/Search/services/__mocks__/folderMock'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'

describe('delete file getters', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('isFileDeletable', () => {
    const cases = [
      // File is directly in folder
      {
        document: createDocument('document-id-1', 123, constants.SUCCESS_SYNC), // File with wrong folder id
        expectedDeletable: false, // CANT be deleted
        hasPermissionToManipulateFolder: jest.fn(() => false)
      },
      {
        // Folder example : 135393653 Traité
        document: createDocument(
          'document-id-1',
          135393653,
          constants.SUCCESS_SYNC
        ), // Folder without can delete file permission
        hasPermissionToManipulateFolder: jest.fn(() => false),
        expectedDeletable: false // CANT be deleted
      },
      {
        // Folder example : 135393659 Achats
        document: createDocument(
          'document-id-1',
          135393659,
          constants.PENDING_SYNC
        ), // Folder isPia & File pending
        hasPermissionToManipulateFolder: jest.fn(() => false),
        expectedDeletable: false // CANT be deleted
      },
      {
        // Folder example : 135393659 Achats
        document: createDocument(
          'document-id-1',
          135393659,
          constants.SUCCESS_SYNC
        ), // Folder isPia & File success
        hasPermissionToManipulateFolder: jest.fn(() => false),
        expectedDeletable: false // CANT be deleted
      },
      {
        // Folder example : 135393657 Fiscalité
        document: createDocument(
          'document-id-1',
          135393657,
          constants.SUCCESS_SYNC
        ), // Folder not pia and any file status
        hasPermissionToManipulateFolder: jest.fn(() => true),
        expectedDeletable: true // CANT be deleted
      }
    ]

    test.each(cases)(
      'should return %s',
      ({ document, expectedDeletable, hasPermissionToManipulateFolder }) => {
        // Given
        const state = {} as DeleteFileStateInterface
        const rootState = {} as RootStateInterface
        const rootGetters = {
          'GED/DataManipulation/hasPermissionToManipulateFolder':
            hasPermissionToManipulateFolder,
          'GED/Search/documents': { collection: [document] },
          'GED/Search/folders': new Folders({
            state: 'loaded',
            collectionFromAPI: folderMock
          })
        }

        // When
        const isFileDeletable = getters.isFileDeletable(
          state,
          getters,
          rootState,
          rootGetters
        )(document.id ?? '')

        // Then
        expect(isFileDeletable).toEqual(expectedDeletable)
      }
    )
  })
  describe('isFileDeleting', () => {
    const deletingCases = [
      { isFileDeleting: false, expected: false },
      { isFileDeleting: true, expected: true }
    ]

    it.each(deletingCases)(
      'is should return $expected if isFileDeleting = $isFileDeleting',
      ({ isFileDeleting, expected }) => {
        const state = {
          isFileDeleting
        } as DeleteFileStateInterface

        expect(getters.isFileDeleting(state)).toBe(expected)
      }
    )
  })
  describe('areDocumentsDeletable', () => {
    it.each([
      { deletableValues: [true, true, true], expected: true },
      { deletableValues: [false, true, true], expected: false },
      { deletableValues: [false, false, false], expected: false }
    ])(
      'should return true if all the documents can be deleted',
      ({ deletableValues, expected }) => {
        // Given
        const state = {} as DeleteFileStateInterface
        const myGetters = {
          isFileDeletable: jest.fn()
        }

        jest
          .spyOn(myGetters, 'isFileDeletable')
          .mockReturnValueOnce(deletableValues[0])
          .mockReturnValueOnce(deletableValues[1])
          .mockReturnValueOnce(deletableValues[2])

        const documentIds = ['19', '27', '05']

        const areDocumentsDeletable = getters.areDocumentsDeletable(
          state,
          myGetters
        )(documentIds)

        expect(areDocumentsDeletable).toBe(expected)
      }
    )
  })
})

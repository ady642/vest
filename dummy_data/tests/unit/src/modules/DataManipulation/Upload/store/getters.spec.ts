import getters from '@/modules/DataManipulation/Upload/store/getters'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import constants from '@/Common/constants'
import { SearchStateInterface } from '@/modules/Search/store/types'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { PermissionsNames } from '@/modules/Search/types'
import RootStateInterface from '@/store/types/rootState'

let state = {} as UploadStateInterface
let searchState = {} as SearchStateInterface
let uploadGetters = {} as any
let rootState = {} as RootStateInterface
let rootGetters = {} as any
describe('Upload getters', () => {
  it('should return files when I called files getter', () => {
    state = {
      files: [
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.TO_UPLOAD
        )
      ]
    } as UploadStateInterface

    const files = getters.files(state)

    expect(files).toEqual([
      {
        destination: null,
        errorDescription: {},
        file: new File([''], 'filename', { type: 'text/html' }),
        state: 0
      }
    ])
  })

  it('should return selectedFolderToUpload when I called selectedFolderToUpload getter', () => {
    state = {
      selectedFolderToUpload: 4521
    } as UploadStateInterface

    const files = getters.selectedFolderToUpload(state)

    expect(files).toEqual(4521)
  })

  describe('hasPermissionToUploadFile', () => {
    const disableCases = [
      {
        files: [
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.UPLOADING
          ),
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.UPLOADING
          )
        ],
        expectedValue: true
      },
      {
        files: [
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.CANCELED
          ),
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.UPLOADED
          )
        ],
        expectedValue: false
      }
    ]

    test.each(disableCases)('Test value', ({ files, expectedValue }) => {
      state = {
        files: files
      } as UploadStateInterface
      const isUploading = getters.isUploading(state)

      expect(isUploading).toBe(expectedValue)
    })
  })
  describe('hasPermissionToUploadFile', () => {
    const cases = [
      {
        hasPermissionToManipulateFolder: jest.fn(() => true),
        expectedValue: true
      },
      {
        hasPermissionToManipulateFolder: jest.fn(() => false),
        expectedValue: false
      }
    ]

    test.each(cases)(
      'Test value',
      ({ hasPermissionToManipulateFolder, expectedValue }) => {
        const rootState = {} as RootStateInterface
        const rootGetters = {
          'GED/DataManipulation/hasPermissionToManipulateFolder':
            hasPermissionToManipulateFolder
        }
        const canUpload = getters.hasPermissionToUploadFile(
          state,
          uploadGetters,
          rootState,
          rootGetters
        )(1122)

        expect(canUpload).toBe(expectedValue)
      }
    )
  })
})

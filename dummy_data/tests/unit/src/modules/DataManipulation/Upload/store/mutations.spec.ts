import mutations from '@/modules/DataManipulation/Upload/store/mutations'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { ErrorDescription } from '@/Common/types/common'

describe('Documents mutations', () => {
  it('SET_SELECTED_FOLDER_TO_UPLOAD', () => {
    const state = {
      selectedFolderToUpload: 0
    } as UploadStateInterface

    // When the SET_SELECTED_FOLDER_TO_UPLOAD mutation is called
    mutations.SET_SELECTED_FOLDER_TO_UPLOAD(state, 4521)

    // Then selectedFolderToUpload state must be equal to payload
    expect(state.selectedFolderToUpload).toEqual(4521)
  })

  describe('SET_FILES', () => {
    it('SET_FILES', () => {
      const state = {
        files: [] as FileUpload[]
      } as UploadStateInterface

      // When the SET_FILES mutation is called
      mutations.SET_FILES(state, [
        new FileUpload(
          new File([''], 'filename.txt', { type: 'text/plain' }),
          StateUpload.TO_UPLOAD
        )
      ])

      // Then files state must be equal to payload
      expect(state.files).toEqual([
        {
          destination: null,
          errorDescription: {},
          file: new File([''], 'filename', { type: 'text/plain' }),
          state: 0
        }
      ])
    })

    it('SET_FILES with a file type not accepted', () => {
      const state = {
        files: [] as FileUpload[]
      } as UploadStateInterface

      // When the SET_FILES mutation is called with a file type not accepted
      mutations.SET_FILES(state, [
        new FileUpload(
          new File([''], 'filename', { type: 'application/msi' }),
          StateUpload.TO_UPLOAD
        )
      ])

      // Then files state must be equal to payload
      expect(state.files).toEqual([
        {
          destination: null,
          errorDescription: {
            description:
              'Changer le format de votre fichier et veuillez le déposer de nouveau. Format pris en compte:Jpeg, Png, Pdf, Doc, Xls, Zip, Rar, Xml',
            libelle: 'Format de fichier non pris en compte'
          },
          file: new File([''], 'filename', { type: 'text/html' }),
          state: StateUpload.ERROR
        }
      ])
    })
  })

  describe('SET_FILE_STATE', () => {
    it('SET_FILE_STATE with error properties', () => {
      const state = {
        files: [
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.TO_UPLOAD
          )
        ]
      } as UploadStateInterface

      // When the SET_FILE_STATE mutation is called
      mutations.SET_FILE_STATE(state, {
        index: 0,
        fileState: StateUpload.UPLOADING
      } as { index: number; fileState: StateUpload; error: ErrorDescription })

      // Then files state must be equal to payload
      expect(state.files[0]).toEqual({
        destination: null,
        errorDescription: {},
        file: new File([''], 'filename', { type: 'text/html' }),
        state: 2
      })
    })

    it('SET_FILE_STATE without error properties', () => {
      const state = {
        files: [
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.TO_UPLOAD
          )
        ]
      } as UploadStateInterface

      // When the SET_FILE_STATE mutation is called
      mutations.SET_FILE_STATE(state, {
        index: 0,
        fileState: StateUpload.ERROR,
        error: { libelle: 'test ', description: 'good error' }
      } as { index: number; fileState: StateUpload; error: ErrorDescription })

      // Then files state must be equal to payload
      expect(state.files[0]).toEqual({
        destination: null,
        errorDescription: { libelle: 'test ', description: 'good error' },
        file: new File([''], 'filename', { type: 'text/html' }),
        state: 4
      })
    })
  })
})

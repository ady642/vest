import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import UploadActions from '@/modules/DataManipulation/Upload/store/actions'
import UploadServices from '@/modules/DataManipulation/Upload/services'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import RootStateInterface from '@/store/types/rootState'
import { SearchStateInterface } from '@/modules/Search/store/types'
import { ErrorDescription } from '@/Common/types/common'
import { INotificationComponent } from '@/Common/helpers/NotificationComponent'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))
import { TrashStateInterface } from '@/modules/Trash/store/state'
import getErrorMapping from '@/Common/consts/uploadErrorMapping'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'
import { flushPromises } from '@vue/test-utils'

let commit = jest.fn()
let dispatch = jest.fn()

const myFile = new FileUpload(
  new File([''], 'filename', { type: 'text/html' }),
  StateUpload.PENDING
)

myFile.destination = 1

const state: UploadStateInterface = {
  selectedFolderToUpload: 0,
  files: [myFile],
  gedNotification: {} as INotificationComponent
}

const rootState: RootStateInterface = {
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
      Upload: state,
      DeleteFolders: {} as DeleteFoldersStateInterface,
      DeleteFile: {} as DeleteFileStateInterface,
      CreateFolder: {} as CreateFolderStateInterface
    }
  }
}

describe('UploadActions', () => {
  beforeEach(() => {
    commit = jest.fn()
    dispatch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('sortFiles', () => {
    it('Should sort files in the correct order', () => {
      const files = [
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.UPLOADED
        ),
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.ERROR
        ),
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.CANCELED
        )
      ]

      myFile.destination = 1

      const statemock: UploadStateInterface = {
        selectedFolderToUpload: 0,
        files,
        gedNotification: {} as INotificationComponent
      }

      UploadActions.sortFiles({ commit, state: statemock })
      expect(statemock.files).toStrictEqual(files)
    })
  })
  describe('cancelFilesUpload', () => {
    it('should commit the correct mutation', () => {
      UploadActions.cancelFilesUpload({ commit, state })
      expect(commit).toHaveBeenCalledWith('SET_FILE_STATE', {
        index: 0,
        fileState: StateUpload.CANCELED,
        error: getErrorMapping('CanceledUpload')
      })
    })
  })
  describe('setFiles', () => {
    it('should commit SET_FILES', () => {
      UploadActions.setFiles(
        { commit },

        [
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.TO_UPLOAD
          )
        ]
      )

      expect(commit).toHaveBeenNthCalledWith(1, 'SET_FILES', [
        new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.TO_UPLOAD
        )
      ])
    })
  })

  describe('setFileState', () => {
    it('should commit SET_FILE_STATE', () => {
      UploadActions.setFileState({ commit }, {
        index: 0,
        fileState: StateUpload.TO_UPLOAD
      } as { index: number; fileState: StateUpload; error: ErrorDescription })

      expect(commit).toHaveBeenNthCalledWith(1, 'SET_FILE_STATE', {
        index: 0,
        fileState: StateUpload.TO_UPLOAD
      })
    })
  })

  describe('setFileDestination', () => {
    it('should commit SET_FILE_DESTINATION', () => {
      UploadActions.setFileDestination(
        { commit },
        {
          index: 0,
          destinationId: 1234
        }
      )

      expect(commit).toHaveBeenNthCalledWith(1, 'SET_FILE_DESTINATION', {
        index: 0,
        destinationId: 1234
      })
    })
  })

  describe('uploadDocuments', () => {
    const buildPromiseAllPayload = (index: number) =>
      `uploadDocument with ${index}`

    it.each([
      {
        indexes: [1, 2, 4, 5, 6, 10, 12, 15, 20, 21, 23, 27],
        firstRequestsBatch: [
          buildPromiseAllPayload(1),
          buildPromiseAllPayload(2),
          buildPromiseAllPayload(4),
          buildPromiseAllPayload(5),
          buildPromiseAllPayload(6)
        ],
        secondRequestsBatch: [
          buildPromiseAllPayload(10),
          buildPromiseAllPayload(12),
          buildPromiseAllPayload(15),
          buildPromiseAllPayload(20),
          buildPromiseAllPayload(21)
        ],
        lastRequestsBatch: [
          buildPromiseAllPayload(23),
          buildPromiseAllPayload(27)
        ]
      },
      {
        indexes: [1, 2, 4, 5, 6],
        firstRequestsBatch: [
          buildPromiseAllPayload(1),
          buildPromiseAllPayload(2),
          buildPromiseAllPayload(4),
          buildPromiseAllPayload(5),
          buildPromiseAllPayload(6)
        ]
      },
      {
        indexes: [1, 2],
        firstRequestsBatch: [
          buildPromiseAllPayload(1),
          buildPromiseAllPayload(2)
        ]
      }
    ])(
      'should dispatch upload 3 different batches of parallels requests when indexes is length of 12',
      async ({
        indexes,
        firstRequestsBatch,
        secondRequestsBatch,
        lastRequestsBatch
      }) => {
        Promise.all = jest.fn()

        dispatch = jest.fn(
          (actionName: string, payload: number) =>
            `${actionName} with ${payload}`
        )

        await UploadActions.uploadDocuments({ dispatch }, indexes)

        await flushPromises()

        indexes.forEach((index) => {
          expect(dispatch).toHaveBeenCalledWith('uploadDocument', index)
        })
        expect(Promise.all).toHaveBeenNthCalledWith(1, firstRequestsBatch)
        if (secondRequestsBatch) {
          expect(Promise.all).toHaveBeenNthCalledWith(2, secondRequestsBatch)
        }
        if (lastRequestsBatch) {
          expect(Promise.all).toHaveBeenNthCalledWith(3, lastRequestsBatch)
        }
      }
    )
    it('should call the uploadDocument services', async () => {
      jest.spyOn(UploadServices, 'uploadDocument').mockReturnValue({
        data: []
      } as never)

      await UploadActions.uploadDocument(
        {
          rootState,
          commit,
          state
        },
        0
      )

      expect(trackEventFactory).toBeCalledWith('updm-upload-success')
      expect(UploadServices.uploadDocument).toHaveBeenCalledWith({
        accountNumberOrId: '1001',
        file: new File([''], 'filename', { type: 'text/html' }),
        folderId: 1
      })
    })
  })

  describe('setSelectedFolderToUpload', () => {
    it('Should call the mutation to set the selectedFolderId', () => {
      // When setSelectedFolderToUpload action is called
      UploadActions.setSelectedFolderToUpload({ commit }, 4521)

      // Then the SET_SELECTED_FOLDER_ID mutation must be called
      expect(commit).toHaveBeenCalledWith('SET_SELECTED_FOLDER_TO_UPLOAD', 4521)
    })
  })
})

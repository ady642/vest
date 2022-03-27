port DocumentsUploadModal from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/DocumentsUploadModal.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import NattoUploadModal from '@/Common/components/Modals/NattoUploadModal.vue'
import { ComponentPublicInstance } from 'vue'
import { createStore, Store } from 'vuex'
import Upload from '@/modules/DataManipulation/Upload/store'
import DataManipulation from '@/modules/DataManipulation/store'
import Search from '@/modules/Search/store'
import RootStateInterface from '@/store/types/rootState'
import useFoldersData from 'dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

const files = [
  new FileUpload(
    new File([''], 'file0.txt', { type: 'text/html' }),
    StateUpload.UPLOADING
  ),
  new FileUpload(
    new File([''], 'file1.txt', { type: 'text/html' }),
    StateUpload.TO_UPLOAD
  ),
  new FileUpload(
    new File([''], 'file2.txt', { type: 'text/html' }),
    StateUpload.TO_UPLOAD
  ),
  new FileUpload(
    new File([''], 'file3.txt', { type: 'text/html' }),
    StateUpload.TO_UPLOAD
  )
]

files[1].destination = 200

export type DocumentsUploadModalTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    {
      files: FileUpload[]
      selectedFolderToUpload: number[]
      disabledCategories: []
    },
    {
      allFileSameFolderHandler: () => void
      HandleFileUpload: (indexes: number[]) => void
      categorySelectedHandler: (id: number) => void
      validateHandler: () => void
      displayFileHandler: (index: number) => void
      handleModalClose: () => void
      uploadFile: (fileIndex: number) => void
    }
  >
>

const storeMock: Store<RootStateInterface> = createStore({
  modules: {
    GED: {
      namespaced: true,
      modules: {
        Search,
        DataManipulation: {
          ...DataManipulation,
          modules: {
            Upload: {
              ...Upload,
              actions: {
                ...Upload.actions,
                uploadDocument: jest.fn()
              }
            }
          }
        }
      }
    }
  }
})

storeMock.state.GED.DataManipulation.Upload.selectedFolderToUpload = 4521
storeMock.state.GED.DataManipulation.Upload.files = files
storeMock.state.GED.Search.folders = useFoldersData().FoldersData
storeMock.state.GED.Search.filters.folderId = 4521

const createWrapper = (
  disabledCategories: boolean
): DocumentsUploadModalTypeWrapper =>
  wrapperFactory(DocumentsUploadModal, {
    props: {
      modelValue: false,
      disabledCategories
    },
    global: {
      stubs: {
        NattoUploadModal
      },
      plugins: [storeMock]
    }
  })

let wrapper = createWrapper(false)

const findNattoUploadModal = (wrapper: DocumentsUploadModalTypeWrapper) =>
  wrapper.findComponent(NattoUploadModal)
let nattoUploadModalWrapper = findNattoUploadModal(wrapper)

describe('documents-upload-modal', () => {
  beforeEach(() => {
    storeMock.state.GED.DataManipulation.Upload.files = files
    wrapper = createWrapper(false)
    nattoUploadModalWrapper = findNattoUploadModal(wrapper)
    storeMock.dispatch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('binding', () => {
    describe('watch', () => {
      it('When isDocumentUploadModalOpened changed should trace log if new value true', async () => {
        await wrapper.setProps({ modelValue: true })
        await wrapper.vm.$nextTick()

        expect(trackEventFactory).toHaveBeenNthCalledWith(
          1,
          'updm-select-destination-file-upload',
          4
        )
        expect(trackEventFactory).toHaveBeenNthCalledWith(
          2,
          'updm-select-destination-file-format',
          'txt'
        )
        expect(trackEventFactory).toHaveBeenNthCalledWith(
          3,
          'updm-select-destination-file-format',
          'txt'
        )
      })
    })
    describe('props', () => {
      it('Should bind files value with child component', () => {
        const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal)

        expect(NattoUploadModalWrapper.props('files')).toHaveLength(
          wrapper.vm.files.length
        )
        expect(NattoUploadModalWrapper.props('files')).toStrictEqual(
          wrapper.vm.files
        )
      })
      it('Should init selectedFolderToUpload value with searchFolderId', async () => {
        const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal)

        expect(NattoUploadModalWrapper.props('selectedFolderToUpload')).toEqual(
          4521
        )
      })
      it('primaryCtaAction Should be validateNext when there is some files ready and selected file is not last item', () => {
        const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal)

        expect(NattoUploadModalWrapper.props('primaryCtaAction')).toEqual(
          'validateNext'
        )
      })
      it('primaryCtaAction Should be validate when there is some files ready and selected file is last item', () => {
        storeMock.state.GED.DataManipulation.Upload.files = [
          new FileUpload(
            new File([''], 'file1.txt', { type: 'text/html' }),
            StateUpload.TO_UPLOAD
          )
        ]

        const wrapper = createWrapper(false)
        const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal)

        expect(NattoUploadModalWrapper.props('primaryCtaAction')).toEqual(
          'validate'
        )
      })
      it('primaryCtaAction Should be finish when all files are not ready', () => {
        storeMock.state.GED.DataManipulation.Upload.files = [
          new FileUpload(
            new File([''], 'file1.txt', { type: 'text/html' }),
            StateUpload.UPLOADED
          ),
          new FileUpload(
            new File([''], 'file2.txt', { type: 'text/html' }),
            StateUpload.ERROR
          ),
          new FileUpload(
            new File([''], 'file3.txt', { type: 'text/html' }),
            StateUpload.UPLOADING
          )
        ]

        const wrapper = createWrapper(false)
        const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal)

        expect(NattoUploadModalWrapper.props('primaryCtaAction')).toEqual(
          'finish'
        )
      })
      it('Should bind disabledCategories value with child component', () => {
        const NattoUploadModalWrapper = wrapper.findComponent(NattoUploadModal)

        expect(NattoUploadModalWrapper.props('disabledCategories')).toEqual(
          wrapper.vm.disabledCategories
        )
      })
      describe('events', () => {
        it('Should dispatch setSelectedFolderToUpload when change-selected-folderId is emitted', async () => {
          await nattoUploadModalWrapper.vm.$emit('change-selected-folderId', 27)

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/DataManipulation/Upload/setSelectedFolderToUpload',
            27
          )
        })
        it('Should dispatch setSelectedFolderToUpload when searchFolderId changes', async () => {
          storeMock.state.GED.Search.filters.folderId = 27

          await wrapper.vm.$nextTick()

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/DataManipulation/Upload/setSelectedFolderToUpload',
            27
          )
        })
        it('Should dispatch setFileDestination action when validate event is emitted', async () => {
          const NattoUploadModalWrapper =
            wrapper.findComponent(NattoUploadModal)

          await NattoUploadModalWrapper.vm.$emit('validate')

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/DataManipulation/Upload/setFileDestination',
            { index: 0, destinationId: 4521 }
          )
        })
        it('Should emit reset event when on-modal-close event is emitted', async () => {
          const NattoUploadModalWrapper =
            wrapper.findComponent(NattoUploadModal)

          await NattoUploadModalWrapper.vm.$emit('on-modal-close')
          expect(wrapper.emitted('reset')).toBeTruthy()
        })
        it('Should dispatch setFileState action when secondary-click event is emitted', async () => {
          const NattoUploadModalWrapper =
            wrapper.findComponent(NattoUploadModal)

          await NattoUploadModalWrapper.vm.$emit('secondary-click')
          // Should not send index 0 because status is uploading
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            1,
            'GED/DataManipulation/Upload/setFileDestination',
            { destinationId: 4521, index: 1 }
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            2,
            'GED/DataManipulation/Upload/setFileState',
            { error: undefined, fileState: 1, index: 1 }
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            3,
            'GED/DataManipulation/Upload/setFileDestination',
            { destinationId: 4521, index: 2 }
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            4,
            'GED/DataManipulation/Upload/setFileState',
            { error: undefined, fileState: 1, index: 2 }
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            5,
            'GED/DataManipulation/Upload/setFileDestination',
            { destinationId: 4521, index: 3 }
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            6,
            'GED/DataManipulation/Upload/setFileState',
            { error: undefined, fileState: 1, index: 3 }
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            7,
            'GED/DataManipulation/Upload/uploadDocuments',
            [1, 2, 3]
          )
          await flushPromises()
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            8,
            'GED/Search/fetchDocuments'
          )
        })
      })
    })
  })
})

import { VueWrapper } from '@vue/test-utils'
import NattoUploadModal from '@/Common/components/Modals/NattoUploadModal.vue'
import NattoDialog from '@/Common/components/Modals/NattoDialog.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import ModalTwoColumns from '@/Common/components/Modals/ModalTwoColumns.vue'
import DocumentPrimaryCta from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/DocumentPrimaryCta.vue'
import SecondaryCtaButton from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/SecondaryCtaButton.vue'
import UploadFileList from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileList.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import UploadFileInfos from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileInfos.vue'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import useElement from 'tests/unit/utils/useElementStubs'
import { UploadFileInfoTypeWrapper } from 'tests/unit/src/modules/DataManipulation/Upload/components/DocumentsModalUpload/Content/UploadFileInfo.spec'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import { PermissionsNames } from '@/modules/Search/types'
import constants from '@/Common/constants'
import { createFileStoreMock } from 'tests/unit/__mocks__/storeMock/createStoreMock'
import { ComponentPublicInstance } from 'vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'

const { ElDialog } = useElement()

/******
Wrapper Types
 *****/

type NattoUploadModalProps = Partial<{
  selectedFileIndex: number
  primaryCtaAction: string
  secondaryCtaFolderName: string
  files: FileUpload[]
  modelValue: boolean
  selectedFolderToUpload: number
  disabledCategories: boolean
  triggerUploadAllFiles: boolean
}>

type NattoUploadModalSetup = {
  folders: Folders
  disableCategoryChange: boolean
  disablePrimaryButton: boolean
  isOpened: boolean
  canUpload: boolean
}

type NattoUploadModalWrapper = VueWrapper<
  ComponentPublicInstance<NattoUploadModalProps, NattoUploadModalSetup>
>

const foldersData = useFoldersData().FoldersData

const filesMock: FileUpload[] = [
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

const defaultProps: NattoUploadModalProps = {
  selectedFileIndex: 1,
  primaryCtaAction: 'validateNext',
  secondaryCtaFolderName: 'Achats',
  files: filesMock,
  modelValue: true,
  selectedFolderToUpload: 1234,
  disabledCategories: false,
  triggerUploadAllFiles: false
}

const createWrapper = (
  props = defaultProps,
  store = createFileStoreMock()
): NattoUploadModalWrapper =>
  wrapperFactory(NattoUploadModal, {
    props: {
      ...defaultProps,
      ...props
    },
    global: {
      stubs: {
        ModalTwoColumns,
        NattoDialog,
        ElDialog
      },
      plugins: [store]
    }
  })

let wrapper = createWrapper()

describe('natto-upload-modal', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('binding', () => {
    describe('props', () => {
      describe('modal-two-columns', () => {
        it('should pass modelValue props', () => {
          const ModalTwoColumnsWrapper: VueWrapper<any> =
            wrapper.findComponent(ModalTwoColumns)

          expect(ModalTwoColumnsWrapper.props('modelValue')).toBe(true)
        })
      })
      describe('upload-file-list', () => {
        it('shoud pass files props', () => {
          const uploadFileListWrapper: VueWrapper<any> =
            wrapper.findComponent(UploadFileList)

          expect(uploadFileListWrapper.props('files')).toStrictEqual(filesMock)
        })
        it('shoud pass selectedFileIndex props', () => {
          const uploadFileListWrapper: VueWrapper<any> =
            wrapper.findComponent(UploadFileList)

          expect(uploadFileListWrapper.props('selectedFileIndex')).toBe(1)
        })
      })
      describe('upload-file-infos', () => {
        it('should pass selectedFolderToUpload props', () => {
          const uploadFileinfosWrapper: VueWrapper<any> =
            wrapper.findComponent(UploadFileInfos)

          expect(uploadFileinfosWrapper.props('selectedFolderToUpload')).toBe(
            1234
          )
        })
        it('should pass disabledCategories props', () => {
          const uploadFileinfosWrapper: VueWrapper<any> =
            wrapper.findComponent(UploadFileInfos)

          expect(uploadFileinfosWrapper.props('disabledCategories')).toBe(false)
        })

        it('should pass file props', () => {
          const uploadFileinfosWrapper: VueWrapper<any> =
            wrapper.findComponent(UploadFileInfos)

          expect(uploadFileinfosWrapper.props('file')).toStrictEqual(
            filesMock[1]
          )
        })

        describe('events', () => {
          it('should emit update:selectedFolderToUpload when UpdateFileInfos emits update:selectedFolderToUpload', async () => {
            const uploadFileInfosWrapper: UploadFileInfoTypeWrapper =
              wrapper.findComponent(UploadFileInfos)

            await uploadFileInfosWrapper.vm.$emit(
              'update:selectedFolderToUpload',
              27
            )

            expect(wrapper.emitted('change-selected-folderId')).toBeTruthy()
            expect(wrapper.emitted('change-selected-folderId')).toStrictEqual([
              [27]
            ])
          })
        })
      })
      describe('secondary-cta-button', () => {
        it('should pass folderName props', () => {
          const secondaryCtaButtonWrapper: VueWrapper<any> =
            wrapper.findComponent(SecondaryCtaButton)

          expect(secondaryCtaButtonWrapper.props('folderName')).toBe('Achats')
        })
        it('should pass vshow props', () => {
          wrapper = createWrapper({
            secondaryCtaFolderName: ''
          })

          const secondaryCtaButtonWrapper: VueWrapper<any> =
            wrapper.findComponent(SecondaryCtaButton)

          expect(
            (secondaryCtaButtonWrapper.element as HTMLElement).style.display
          ).toBe('none')
        })
      })
      describe('document-primary-cta', () => {
        it('should pass disabled props', () => {
          wrapper = createWrapper(
            {},
            createFileStoreMock({ hasPermissionToUploadFile: false })
          )

          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true)
        })
        it('should pass action props', () => {
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('action')).toBe('validateNext')
        })

        it('Should be disabled when selected file upload is UPLOADING and cta action validateNext', () => {
          const filesMock = [
            new FileUpload(
              new File([''], 'file1.txt', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            new FileUpload(
              new File([''], 'file2.txt', { type: 'text/html' }),
              StateUpload.UPLOADING
            ),
            new FileUpload(
              new File([''], 'file3.txt', { type: 'text/html' }),
              StateUpload.UPLOADING
            )
          ]

          const wrapper = createWrapper({
            files: filesMock,
            selectedFolderToUpload: 123
          })
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true)
        })
        it('Should be disabled when selected file upload is UPLOADED and cta action validateNext', () => {
          const filesMock = [
            new FileUpload(
              new File([''], 'file1.txt', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            new FileUpload(
              new File([''], 'file2.txt', { type: 'text/html' }),
              StateUpload.UPLOADED
            ),
            new FileUpload(
              new File([''], 'file3.txt', { type: 'text/html' }),
              StateUpload.UPLOADING
            )
          ]

          const wrapper = createWrapper({
            files: filesMock
          })
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true)
        })

        it('Should be disabled when selected file upload is ERROR and cta action validateNext', () => {
          const filesMock = [
            new FileUpload(
              new File([''], 'file1.txt', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
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

          const wrapper = createWrapper({
            files: filesMock
          })
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true)
        })
        it('Should be disabled when selected file upload is PENDING and cta action validateNext', () => {
          const filesMock = [
            new FileUpload(
              new File([''], 'file1.txt', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            new FileUpload(
              new File([''], 'file2.txt', { type: 'text/html' }),
              StateUpload.PENDING
            ),
            new FileUpload(
              new File([''], 'file3.txt', { type: 'text/html' }),
              StateUpload.UPLOADING
            )
          ]

          const wrapper = createWrapper({
            files: filesMock
          })
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true)
        })
        it('Should be disabled when there is not an upload file permission', () => {
          const wrapper = createWrapper(
            {},
            createFileStoreMock({ hasPermissionToUploadFile: false })
          )
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(true)
        })
        it('Should not be disabled when there is  an upload file permission', () => {
          const filesMock = [
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

          const updatedFolderData = foldersData.collection[0]

          updatedFolderData.permissions.push(
            constants.CAN_UPLOAD_FILES as PermissionsNames
          )
          const wrapper = createWrapper({
            selectedFolderToUpload: 123,
            files: filesMock
          })
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(false)
        })
        it('Should not be disabled when selected file upload is TO_UPLOAD and cta action validateNext', () => {
          const filesMock = [
            new FileUpload(
              new File([''], 'file1.txt', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            new FileUpload(
              new File([''], 'file2.txt', { type: 'text/html' }),
              StateUpload.UPLOADING
            ),
            new FileUpload(
              new File([''], 'file3.txt', { type: 'text/html' }),
              StateUpload.UPLOADING
            )
          ]

          foldersData.collection[0].permissions.push(
            constants.CAN_UPLOAD_FILES as PermissionsNames
          )
          const wrapper = createWrapper(
            {
              selectedFileIndex: 0,
              files: filesMock
            },
            createFileStoreMock({ hasPermissionToUploadFile: true })
          )
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(false)
        })
        it('Should not be disabled when cta action is finish and all files upload are finish', () => {
          const filesMock = [
            new FileUpload(
              new File([''], 'file1.txt', { type: 'text/html' }),
              StateUpload.UPLOADED
            ),
            new FileUpload(
              new File([''], 'file2.txt', { type: 'text/html' }),
              StateUpload.UPLOADING
            ),
            new FileUpload(
              new File([''], 'file3.txt', { type: 'text/html' }),
              StateUpload.ERROR
            )
          ]

          const wrapper = createWrapper(
            {
              primaryCtaAction: 'finish',
              files: filesMock
            },
            createFileStoreMock({ hasPermissionToUploadFile: true })
          )
          const documentPrimaryCtaWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentPrimaryCta)

          expect(documentPrimaryCtaWrapper.props('disabled')).toBe(false)
        })
      })
    })
    describe('events', () => {
      describe('upload-file-list', () => {
        it('Should trigger display-file when upload-file-list fire display-file event', () => {
          const uploadFileListWrapper: VueWrapper<any> =
            wrapper.findComponent(UploadFileList)

          uploadFileListWrapper.vm.$emit('display-file', 9)

          expect(wrapper.emitted('display-file')).toBeTruthy()
          expect(wrapper.emitted('display-file')).toStrictEqual([[9]])
        })
      })

      it('Should trigger on-modal-close when document-primary-cta fire close event', () => {
        const documentPrimaryCtaWrapper: VueWrapper<any> =
          wrapper.findComponent(DocumentPrimaryCta)

        documentPrimaryCtaWrapper.vm.$emit('close')

        expect(wrapper.emitted('on-modal-close')).toBeTruthy()
      })
      it('Should trigger validate when document-primary-cta fire validate event', () => {
        const documentPrimaryCtaWrapper: VueWrapper<any> =
          wrapper.findComponent(DocumentPrimaryCta)

        documentPrimaryCtaWrapper.vm.$emit('validate')

        expect(wrapper.emitted('validate')).toBeTruthy()
      })
    })
  })
})

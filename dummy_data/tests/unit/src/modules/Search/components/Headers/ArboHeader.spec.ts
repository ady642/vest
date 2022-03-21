import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import useElementStubs from 'tests/unit/utils/useElementStubs'
import NattoBreadcrumb from '@/Common/components/Breadcrumb/NattoBreadcrumb.vue'
import ArboHeader from '@/modules/Search/components/Headers/ArboHeader.vue'
import DocumentsUploadBtn from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { createFolderStoreMocked } from 'tests/unit/__mocks__/storeMock'
import DocumentsCreateFolderButton from '@/modules/Search/components/Buttons/DocumentsCreateFolderButton.vue'
import CreateFolderModal from '@/modules/Search/components/Modals/CreateFolderModal.vue'
import { ComponentPublicInstance } from 'vue'
import NattoHeader from '@/Common/components/Header/NattoHeader.vue'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'
import ChevronLeftIcon from '@/Common/components/Icons/ChevronLeftIcon.vue'

export type CreateFolderModalTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    {
      selectedFolderId: number
      modelValue: boolean
    },
    unknown
  >
>

const { ElBreadcrumbItem, ElBreadcrumb, ElDialog } = useElementStubs()
const { FoldersData } = useFoldersData()

const { MpTitle } = useStyleguideStubs()

const createWrapper = (
  {
    folders,
    disabledUpload,
    searchFolderId
  }: {
    folders: Folders
    disabledUpload: boolean
    searchFolderId: number
    canUploadFiles: boolean
    hasAccessDs: boolean
    isMainViewBtn: boolean
  },
  store = createFolderStoreMocked({
    hasPermissionToAddFolder: false
  })
) =>
  wrapperFactory(ArboHeader, {
    global: {
      stubs: {
        NattoBreadcrumb,
        DocumentsUploadBtn,
        ElBreadcrumbItem,
        ElBreadcrumb,
        DocumentsCreateFolderButton,
        CreateFolderModal,
        ElDialog,
        NattoHeader,
        MpTitle
      },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      },
      plugins: [store]
    },
    props: {
      folders,
      disabledUpload,
      searchFolderId
    }
  })

let wrapper = createWrapper({
  folders: FoldersData,
  disabledUpload: true,
  searchFolderId: 1122,
  canUploadFiles: true,
  hasAccessDs: true,
  isMainViewBtn: true
})

const findCreateFolderModal = (wrapper: VueWrapper<any>) =>
  wrapper.findComponent(CreateFolderModal)

let createFolderModalWrapper = findCreateFolderModal(wrapper)

describe('ArboHeader', () => {
  beforeEach(() => {
    wrapper = createWrapper({
      folders: FoldersData,
      disabledUpload: true,
      searchFolderId: 1122,
      canUploadFiles: true,
      hasAccessDs: true,
      isMainViewBtn: true
    })
  })
  describe('bindings with CreateFolderModal', () => {
    it('props', () => {
      createFolderModalWrapper = findCreateFolderModal(wrapper)

      expect(createFolderModalWrapper.props('selectedFolderId')).toBe(1122)
      expect(createFolderModalWrapper.props('modelValue')).toBe(false)
    })
  })
  describe('bindings', () => {
    describe('props', () => {
      describe('natto-breadcrumb', () => {
        it('should pass breadcrumbs props', () => {
          const nattoBreadcrumWrapper: VueWrapper<any> =
            wrapper.findComponent(NattoBreadcrumb)

          expect(nattoBreadcrumWrapper.props('breadcrumbs')).toStrictEqual([
            {
              id: 1122,
              text: 'A classer'
            }
          ])
        })
      })
      describe('documents-upload-btn', () => {
        it('should pass disabled props', () => {
          const documentsUploadBtnWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentsUploadBtn)

          expect(documentsUploadBtnWrapper.props('disabled')).toBe(true)
        })
        it('should pass canUploadFiles props', () => {
          const documentsUploadBtnWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentsUploadBtn)

          expect(documentsUploadBtnWrapper.props('canUploadFiles')).toBe(
            wrapper.props('canUploadFiles')
          )
        })
        it('should pass hasAccessDs props', () => {
          const documentsUploadBtnWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentsUploadBtn)

          expect(documentsUploadBtnWrapper.props('hasAccessDs')).toBe(
            wrapper.props('hasAccessDs')
          )
        })
        it('should pass isMainViewBtn props', () => {
          const documentsUploadBtnWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentsUploadBtn)

          expect(documentsUploadBtnWrapper.props('isMainViewBtn')).toBe(
            wrapper.props('isMainViewBtn')
          )
        })
      })
      describe('documents-create-folder-button', () => {
        it('should pass !canAddFolder computed', () => {
          const DocCreateFolderBtnWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentsCreateFolderButton)

          expect(DocCreateFolderBtnWrapper.props('disabled')).toBeTruthy()
        })
      })
    })

    describe('events', () => {
      it('Should fire back-click event when click header-back-icon icon', async () => {
        const iWrapper = wrapper.findComponent(ChevronLeftIcon)

        await iWrapper.vm.$emit('click')

        expect(wrapper.emitted()['back-click']).toBeTruthy()
        expect(wrapper.emitted()['back-click']).toHaveLength(1)
        expect(wrapper.emitted()['back-click'][0]).toStrictEqual([])
      })

      describe('documents-upload-btn', () => {
        it('Should emit breadcrumb-click when breadcrumb-click fired', () => {
          const breadcrumbWrapper: VueWrapper<any> =
            wrapper.findComponent(NattoBreadcrumb)

          breadcrumbWrapper.vm.$emit('breadcrumb-click', 1)

          expect(wrapper.emitted()['update:searchFolderId']).toBeTruthy()
          expect(wrapper.emitted()['update:searchFolderId']).toHaveLength(1)
          expect(wrapper.emitted()['update:searchFolderId'][0]).toStrictEqual([
            1
          ])
        })

        it('Should emit upload-triggered when on-files-change fired', () => {
          const uploadbWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentsUploadBtn)

          const content = 'mock content'
          const data = new Blob([content], { type: 'application/zip' })
          const arrayOfBlob = new Array<Blob>()

          arrayOfBlob.push(data)
          const mockZip = new File(arrayOfBlob, 'Mock.zip')
          const mockZip2 = new File(arrayOfBlob, 'Mock2.zip')
          const files = new Array<File>()

          files.push(mockZip)
          files.push(mockZip2)

          uploadbWrapper.vm.$emit('on-files-change', files)

          expect(wrapper.emitted()['upload-triggered']).toBeTruthy()
          expect(wrapper.emitted()['upload-triggered']).toHaveLength(1)
          expect(wrapper.emitted()['upload-triggered'][0]).toStrictEqual([
            files
          ])
        })

        it('Should not open modal when DocumentsCreateFolderButton emit click and not canAddFolder', async () => {
          const DocCreateFolderBtnWrapper: VueWrapper<any> =
            wrapper.findComponent(DocumentsCreateFolderButton)

          const ModalWrapper: CreateFolderModalTypeWrapper =
            wrapper.findComponent(CreateFolderModal)

          await DocCreateFolderBtnWrapper.vm.$emit('click')

          expect(ModalWrapper.props().modelValue).toBe(false)
        })
      })
    })
  })
  describe('rendering', () => {
    it('Should display last item send breadcrumbs props', () => {
      const nattoHeaderWrapper = wrapper.findComponent(NattoHeader)

      expect(nattoHeaderWrapper.attributes('title')).toBe('A classer')
    })
  })
})

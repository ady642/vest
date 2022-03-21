import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'
import NattoCreateFolderForm from '@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue'
import DocumentsFoldersCreation from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Forms/DocumentsFoldersCreation.vue'
import { createFolderStoreMocked } from 'tests/unit/__mocks__/storeMock'

export type DocumentsFoldersCreationTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    selectedFolderId: number
    showForm: boolean
    creationFolderError: string
  }>
>

const mainStoreMock = createFolderStoreMocked()

const createWrapper = (
  selectedFolderId: number,
  showForm: boolean,
  creationFolderError: string,
  store = mainStoreMock
): DocumentsFoldersCreationTypeWrapper =>
  wrapperFactory(DocumentsFoldersCreation, {
    props: {
      selectedFolderId,
      showForm,
      creationFolderError
    },
    global: {
      stubs: {
        NattoButton,
        NattoCreateFolderForm
      },
      plugins: [store]
    }
  })

let wrapper = createWrapper(1234, true, '')

describe('documents-folders-creation', () => {
  beforeEach(() => {
    wrapper = createWrapper(1234, true, '')
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind creationFolderError prop value correctly', () => {
        wrapper = createWrapper(1234, true, 'error')

        const NattoCreateFolderForWrapper = wrapper.findComponent(
          NattoCreateFolderForm
        )

        expect(NattoCreateFolderForWrapper.vm.creationFolderError).toBe('error')
      })
      it('Should bind selectedFolderId prop value correctly', () => {
        const NattoCreateFolderForWrapper = wrapper.findComponent(
          NattoCreateFolderForm
        )

        expect(wrapper.props('selectedFolderId')).toBe(1234)
        expect(wrapper.props('selectedFolderId')).toBe(
          NattoCreateFolderForWrapper.props('selectedFolderId')
        )
      })
      it('Should bind showForm prop value correctly', () => {
        expect(wrapper.props('showForm')).toBe(true)
      })
    })
    describe('events', () => {
      it('Should emit on-folder-creation-cta-click when cta click', async () => {
        wrapper = createWrapper(1234, false, '')
        const NatooButtonWrapper = wrapper.findComponent(NattoButton)

        await NatooButtonWrapper.trigger('click')
        expect(wrapper.emitted('on-folder-creation-cta-click')).toBeTruthy()
      })
      describe('create-folder-click event', () => {
        it('Should emit on-create-folder when  create-folder-click event is triggered', async () => {
          const data = {
            targetFolder: 1234,
            folderName: 'hello'
          }
          const NattoCreateFolderForWrapper = wrapper.findComponent(
            NattoCreateFolderForm
          )

          await NattoCreateFolderForWrapper.vm.$emit(
            'create-folder-click',
            data
          )

          expect(wrapper.emitted('on-create-folder')).toBeTruthy()
        })
        it('Should emit on-cancel-create-folder when cancel-create-folder-click event is triggered', async () => {
          const NattoCreateFolderForWrapper = wrapper.findComponent(
            NattoCreateFolderForm
          )

          await NattoCreateFolderForWrapper.vm.$emit(
            'cancel-create-folder-click'
          )
          expect(wrapper.emitted('on-cancel-create-folder')).toBeTruthy()
        })
      })
    })
  })
  describe('rendering', () => {
    it('Should display create folder form when shoForm is true', () => {
      expect(wrapper.findComponent(NattoCreateFolderForm).exists()).toBeTruthy()
    })
    it('Should not display create folder form when shoForm is false', () => {
      wrapper = createWrapper(1234, false, '')
      expect(wrapper.findComponent(NattoCreateFolderForm).exists()).toBeFalsy()
    })
  })
})

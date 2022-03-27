import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import useElement from 'dummy_data/tests/unit/utils/useElementStubs'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'
import NattoCreateFolderForm from '@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue'
import CreateFolderModal from '@/modules/Search/components/Modals/CreateFolderModal.vue'
import { createFolderStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { createFolderModule } from '@/modules/DataManipulation/Create/CreateFolder/store'
import FolderExistsError from '@/Common/errors/FolderExistsError'

const mockStore = createFolderStoreMocked()

export type CreateFolderModalTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    {
      selectedFolderId: number
      modelValue: boolean
    },
    { creationFolderError: string }
  >
>
const { ElDialog, ElButton, ElInput } = useElement()

const createWrapper = (
  selectedFolderId: number,
  modelValue: boolean,
  store = mockStore
): CreateFolderModalTypeWrapper =>
  wrapperFactory(CreateFolderModal, {
    props: {
      selectedFolderId,
      modelValue
    },
    global: {
      stubs: {
        ElButton,
        ElInput,
        NattoButton,
        ElDialog,
        NattoCreateFolderForm
      },
      plugins: [store]
    }
  })

let wrapper = createWrapper(1234, true)

describe('create-folder-modal', () => {
  beforeEach(() => {
    wrapper = createWrapper(1234, true)
    mockStore.dispatch = jest.fn()
    jest.clearAllMocks()
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind selectedFolderId prop value correctly', () => {
        const NattoCreateFolderForWrapper = wrapper.findComponent(
          NattoCreateFolderForm
        )

        expect(wrapper.props('selectedFolderId')).toBe(1234)
        expect(wrapper.props('selectedFolderId')).toBe(
          NattoCreateFolderForWrapper.props('selectedFolderId')
        )
      })
      it('Should bind modelValue prop value correctly', () => {
        expect(wrapper.props('modelValue')).toBe(true)
      })
    })
    describe('events', () => {
      describe('create-folder-click event', () => {
        it('Should dispatch createFolderByArbo when create-folder-click event is triggered', async () => {
          wrapper = createWrapper(1234, true)

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

          await wrapper.vm.$nextTick()

          expect(mockStore.dispatch).toHaveBeenCalledWith(
            createFolderModule('CreateFolder'),
            {
              targetFolder: 1234,
              folderName: 'hello'
            }
          )
          expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
        })
        it('Should catch createFolderByArbo error when create-folder-click event is triggered', async () => {
          mockStore.dispatch = jest.fn(() => {
            throw new FolderExistsError()
          })

          const data = {
            targetFolder: 1234,
            folderName: 'hello'
          }

          wrapper = createWrapper(1234, true)

          const nattoCreateFolderWrapper = wrapper.findComponent(
            NattoCreateFolderForm
          )

          // When create-folder-click is emitted
          await nattoCreateFolderWrapper.vm.$emit('create-folder-click', data)

          // Then set the error message
          expect(wrapper.vm.creationFolderError).toBe(
            'ged.dataManipulation.create.folder.error.alreadyExists with {"folderName":"hello"}'
          )
        })
      })

      it('Should reset error and close the modal when cancel-create-folder-click event is triggered', async () => {
        const nattoCreateFolderForWrapper = wrapper.findComponent(
          NattoCreateFolderForm
        )

        await nattoCreateFolderForWrapper.vm.$emit('cancel-create-folder-click')
        expect(nattoCreateFolderForWrapper.props('creationFolderError')).toBe(
          ''
        )
        expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
      })
    })
  })
})

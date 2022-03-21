import WhoUploadModal from '@/modules/DataManipulation/Upload/components/WhoUploadModal/WhoUploadModal.vue'
import NattoUploadTypePopup from '@/Common/components/Modals/NattoUploadTypePopup.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import useElement from 'tests/unit/utils/useElementStubs'

const { ElButton } = useElement()

export type WhoUploadModal = VueWrapper<
  ComponentPublicInstance<{
    modelValue: boolean
    folders: Folders[]
  }>
>
const createWrapper = (folders = Folders.loading(), modelValue: boolean) =>
  wrapperFactory(WhoUploadModal, {
    global: {
      stubs: {
        NattoUploadTypePopup,
        ElButton
      }
    },
    propsData: {
      folders,
      modelValue
    }
  })
let wrapper = createWrapper(
  Folders.loaded([
    {
      id: 1122,
      name: 'Comptabilité',
      parent: { id: 0 },
      children: [],
      properties: {},
      permissions: []
    },
    {
      id: 1233,
      name: 'Gestion Sociale',
      parent: { id: 0 },
      children: [],
      properties: {},
      permissions: []
    }
  ]),
  true
)

describe('WhoUploadModal', () => {
  describe('binding', () => {
    beforeEach(() => {
      wrapper = wrapper = createWrapper(
        Folders.loaded([
          {
            id: 1122,
            name: 'Comptabilité',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          },
          {
            id: 1233,
            name: 'Gestion Sociale',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          }
        ]),
        true
      )
    })
    describe('props', () => {
      it('Should bind correctly the folders prop', () => {
        const NattoUploadTypePopupWrapper =
          wrapper.findComponent(NattoUploadTypePopup)

        expect(NattoUploadTypePopupWrapper.props('folders')).toStrictEqual(
          wrapper.vm.folders
        )
      })
      it('Should bind correctly the modelValue prop', () => {
        const NattoUploadTypePopupWrapper =
          wrapper.findComponent(NattoUploadTypePopup)

        expect(NattoUploadTypePopupWrapper.props('modelValue')).toEqual(
          wrapper.vm.modelValue
        )
      })
    })
  })
  describe('events', () => {
    it('Should emit popup-folder-select-close when NattoUploadTypePopup emit popup-folder-select-close', async () => {
      const NattoUploadTypePopupWrapper =
        wrapper.findComponent(NattoUploadTypePopup)

      await NattoUploadTypePopupWrapper.vm.$emit('popup-folder-select-close')
      expect(wrapper.emitted('popup-folder-select-close')).toBeTruthy()
    })
  })
})

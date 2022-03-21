import NattoUploadTypePopup from '@/Common/components/Modals/NattoUploadTypePopup.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import useElement from 'tests/unit/utils/useElementStubs'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import NattoDialog from '@/Common/components/Modals/NattoDialog.vue'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn()
}))

export type NattoUploadTypePopupTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    {
      modelValue: boolean
      folders: Folders[]
    },
    {
      categoryCode: (folderName: string) => void
      folderItemClick: (folderId: number) => void
      treatByClient: () => void
      treatByCollab: () => void
      handleClose: () => void
    }
  >
>
const { ElDialog, ElButton } = useElement()

const createWrapper = (folders = Folders.loading(), modelValue: boolean) =>
  wrapperFactory(NattoUploadTypePopup, {
    global: {
      stubs: {
        NattoDialog,
        ElDialog,
        ElButton
      }
    },
    propsData: {
      folders,
      modelValue
    }
  })

const findFolders = (
  wrapper: NattoUploadTypePopupTypeWrapper
): DOMWrapper<HTMLDivElement>[] => wrapper.findAll('.folder-item')

let foldersData = Folders.loaded([
  {
    id: 1122,
    name: 'Comptabilité',
    parent: { id: 0 },
    children: [],
    properties: { tracingName: 'Accounting' },
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
])
let wrapper = createWrapper(foldersData, true)

describe('NattoUploadTypePopup', () => {
  describe('binding', () => {
    beforeEach(() => {
      foldersData = Folders.loaded([
        {
          id: 1122,
          name: 'Comptabilité',
          parent: { id: 0 },
          children: [],
          properties: { tracingName: 'Accounting' },
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
      ])
      wrapper = createWrapper(foldersData, true)
      jest.clearAllMocks()
    })
    describe('props', () => {
      it('Should bind correctly the folders prop', () => {
        expect(wrapper.props('folders').collection).toHaveLength(2)
      })
      it('Should bind correctly the modelValue prop', () => {
        expect(wrapper.props('modelValue')).toBe(true)
      })
    })
    describe('rendering', () => {
      it('Should disable Collab CTA when there is no default folders', () => {
        foldersData.getDefaultUploadFolderById = () => undefined
        wrapper = createWrapper(foldersData, true)
        const collabCtaWrapper = wrapper.find('.collab-cta')

        expect(collabCtaWrapper.classes('nbtn-grey')).toBe(true)
      })
    })
    describe('events', () => {
      it('Should emit on-treat-by-client on nbtn-blue click ', async () => {
        const folderWrapper: DOMWrapper<any>[] = wrapper.findAll('.folder-item')

        expect(folderWrapper.length).toBe(2)
        await folderWrapper[0].trigger('click')

        const ElDialogWrapper = wrapper.findComponent(NattoDialog)
        const bntnBlueWrapper = ElDialogWrapper.findAllComponents(ElButton)[0]

        await bntnBlueWrapper.trigger('click')

        expect(wrapper.emitted('on-treat-by-client')).toBeTruthy()
        expect(wrapper.emitted()['on-treat-by-client'][0]).toHaveLength(1)
        expect(wrapper.emitted()['on-treat-by-client'][0]).toContain(1122)
      })
      it('Should not emit on-treat-by-collab on nbtn-grey click ', async () => {
        const ElDialogWrapper = wrapper.findComponent(NattoDialog)
        const bntnBlueWrapper = ElDialogWrapper.findAllComponents(ElButton)[1]

        await bntnBlueWrapper.trigger('click')

        expect(wrapper.emitted('on-treat-by-collab')).toBeFalsy()
      })
      it('Should emit on-treat-by-collab on nbtn-complete click ', async () => {
        const ElDialogWrapper = wrapper.findComponent(NattoDialog)
        const bntnBlueWrapper = ElDialogWrapper.findAllComponents(ElButton)[1]

        const folderWrapper: DOMWrapper<any>[] = wrapper.findAll('.folder-item')

        expect(folderWrapper.length).toBe(2)
        await folderWrapper[0].trigger('click')

        await bntnBlueWrapper.trigger('click')

        expect(wrapper.emitted('on-treat-by-collab')).toBeTruthy()
        expect(wrapper.emitted()['on-treat-by-collab'][0]).toHaveLength(1)
        expect(wrapper.emitted()['on-treat-by-collab'][0]).toContain(1122)
      })
      it('Should emit popup-folder-select-close on modal close event', async () => {
        const ElDialogWrapper = wrapper.findComponent(NattoDialog)

        await ElDialogWrapper.vm.$emit('close')
        expect(wrapper.emitted('popup-folder-select-close')).toBeTruthy()
      })

      it('Should change classes on click folder event', async () => {
        const folderWrapper: DOMWrapper<any>[] = wrapper.findAll('.folder-item')

        expect(folderWrapper.length).toBe(2)

        expect(folderWrapper[0].classes()).toHaveLength(1)
        expect(folderWrapper[0].classes()[0]).toStrictEqual('folder-item')
        expect(folderWrapper[1].classes()).toHaveLength(1)
        expect(folderWrapper[1].classes()[0]).toStrictEqual('folder-item')

        await folderWrapper[0].trigger('click')

        expect(folderWrapper[0].classes()).toHaveLength(2)
        expect(folderWrapper[0].classes()[0]).toStrictEqual('folder-item')
        expect(folderWrapper[0].classes()[1]).toStrictEqual('selected')
        expect(folderWrapper[1].classes()).toHaveLength(1)
        expect(folderWrapper[1].classes()[0]).toStrictEqual('folder-item')
      })

      it('should emit tracking event on click on folder', async () => {
        const folderWrappers = findFolders(wrapper)

        const firstFolder = folderWrappers[0]

        await firstFolder.trigger('click')

        expect(trackEventFactory).toHaveBeenCalledWith(
          'updm-select-tree-folder',
          'Accounting'
        )
      })
    })
  })
})

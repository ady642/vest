import { ComponentPublicInstance } from 'vue'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import DocumentDetailsDrawer from '@/modules/Search/components/Drawer/DocumentDetailsDrawer.vue'
import useStyleguide from 'dummy_data/tests/unit/utils/useStyleguideStubs'
import constants from '@/Common/constants'
import DocumentDetailsDrawerTabs from '@/modules/Search/components/Tabs/DocumentDetailsDrawerTabs.vue'
import Document, {
  LifeCycleStatus
} from '@/modules/Search/models/Documents/Inputs/Document'
import Properties from '@/modules/Search/models/Documents/Inputs/Properties'
import NattoDrawer from '@/Common/components/Drawer/NattoDrawer.vue'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'
import { DocumentDetailsDrawerTabsTypeWrapper } from '../Tabs/DocumentDetailsDrawerTabs.spec'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { searchModule } from '@/modules/Search/store'

const { MpIcon } = useStyleguide()

type DocumentDetailsDrawerProps = {
  opened: boolean
  document: Document
}
type DocumentDetailsDrawerSetup = {
  documentTypeIcon: string
  isOpened: boolean
}

export type DocumentDetailsDrawerTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    DocumentDetailsDrawerProps,
    DocumentDetailsDrawerSetup
  >
>

const document = new Document({
  id: 'myID',
  name: 'Mon bilan comptable',
  type: '.pdf',
  created: '2018-05-27',
  createdBy: 'luffy',
  updated: '2018-05-29',
  folder: { id: 45454, path: [] },
  properties: {
    syncStatus: constants.PENDING_SYNC,
    'Total Excluding VAT': 0,
    'Scanner Source': ''
  },
  size: 54545,
  preview: { href: 'preview-href' },
  restorationStatus: '',
  folderId: 0,
  comments: '',
  creationDate: '',
  account: { id: '', name: '' },
  content: { href: '' },
  isUploadedInGedLoop: false,
  updatedBy: '',
  lifecycleStatus: LifeCycleStatus.Treated
})
const defaultProps: DocumentDetailsDrawerProps = {
  opened: true,
  document
}

const findNattoDrawer = (wrapper: DocumentDetailsDrawerTypeWrapper) =>
  wrapper.findComponent(NattoDrawer)

const findPreviewModal = (wrapper: DocumentDetailsDrawerTypeWrapper) =>
  wrapper.findComponent({ name: 'preview-modal' })

const findCertifiedTagDrawer = (wrapper: DocumentDetailsDrawerTypeWrapper) =>
  wrapper.findComponent({ name: 'certified-tag-drawer' })

const findDocumentDetailsDrawerTabs = (
  wrapper: DocumentDetailsDrawerTypeWrapper
): DocumentDetailsDrawerTabsTypeWrapper =>
  wrapper.findComponent({ name: 'document-details-drawer-tabs' })

const { ElDrawer } = useElementStubs()

const createWrapper = ({
  props = defaultProps,
  store = createSearchStoreMocked()
} = {}): DocumentDetailsDrawerTypeWrapper =>
  wrapperFactory(DocumentDetailsDrawer, {
    props,
    global: {
      plugins: [store],
      stubs: {
        MpIcon,
        DocumentDetailsDrawerTabs,
        NattoDrawer,
        ElDrawer
      },
      directives: {
        ClickOutside: {}
      }
    }
  })

let wrapper = createWrapper()

describe('DocumentDetailsDrawer', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('props', () => {
    it.each([
      { type: '.pdf', downloadVisualization: true },
      { type: '.doc', downloadVisualization: false }
    ])(
      'should reset visualization and fetch an other visualization when the document change',
      async ({ type, downloadVisualization }) => {
        const storeMock = createSearchStoreMocked()

        storeMock.dispatch = jest.fn()

        wrapper = createWrapper({
          store: storeMock
        })

        await wrapper.setProps({
          document: new Document({ id: 2705, type } as never)
        })

        await flushPromises()

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          searchModule('resetVisualization')
        )

        if (downloadVisualization) {
          expect(storeMock.dispatch).toHaveBeenCalledWith(
            searchModule('downloadVisualization'),
            2705
          )
        } else {
          expect(storeMock.dispatch).not.toHaveBeenCalledWith(
            searchModule('downloadVisualization'),
            2705
          )
        }
      }
    )
  })
  describe('binding', () => {
    describe('NattoDrawer', () => {
      it('Should bind with opened', async () => {
        expect(findNattoDrawer(wrapper).props('opened')).toStrictEqual(true)
      })
    })
    describe('props', () => {
      it('Should bind with document', async () => {
        const details = wrapper.findComponent(DocumentDetailsDrawerTabs)

        expect(details.props('document')).toEqual({
          comments: '',
          createdBy: 'luffy',
          id: 'myID',
          folderId: 45454,
          name: 'Mon bilan comptable',
          creationDate: '2018-05-27',
          path: [],
          properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
          restorationStatus: '',
          size: 54545,
          type: '.pdf',
          updatedDate: '2018-05-29',
          preview: 'preview-href',
          lifecycleStatus: LifeCycleStatus.Treated
        })
      })
    })
  })
  describe('bindings with PreviewModal', () => {
    describe('props', () => {
      it('static props', async () => {
        //When the banner emits click
        await findDocumentDetailsDrawerTabs(wrapper).vm.$emit('open-preview')

        // Given the document is set
        // Then the PreviewModal must have this document as prop
        const previewModalWrapper = findPreviewModal(wrapper)

        expect(previewModalWrapper.props('document')).toStrictEqual(document)
        expect(previewModalWrapper.props('modelValue')).toStrictEqual(true)
      })
    })
    describe('events bindings', () => {
      it('should close the modal when PreviewModal emit an update:modelValue event with false as payload', async () => {
        //When the banner emits open-preview
        await findDocumentDetailsDrawerTabs(wrapper).vm.$emit('open-preview')

        // Then the previewModal must exist
        expect(findPreviewModal(wrapper).exists()).toBe(true)

        // When PreviewModal emit update:modelValue with false
        await findPreviewModal(wrapper).vm.$emit('update:modelValue', false)

        // Then the previewModal must not exist
        expect(findPreviewModal(wrapper).exists()).toBe(false)
      })
      it('should close the drawer when PreviewModal emit a delete event', async () => {
        //When the banner emits click
        await findDocumentDetailsDrawerTabs(wrapper).vm.$emit('open-preview')

        // Then the previewModal must exist
        expect(findPreviewModal(wrapper).exists()).toBe(true)

        // When PreviewModal emit update:modelValue with true
        await findPreviewModal(wrapper).vm.$emit('delete')

        // Then the drawer must be closed
        expect(wrapper.emitted('update:opened')).toStrictEqual([[false]])
      })
    })
  })
  describe('bindings with CertifiedTagDrawer', () => {
    describe('rendering', () => {
      it('should render the certifiedTag if the document has the property hasSubscribedToVault at true', () => {
        const document = new Document()

        document.properties.hasSubscribedToVault = true

        wrapper = createWrapper({ props: { ...defaultProps, document } })

        expect(findCertifiedTagDrawer(wrapper).exists()).toBe(true)
      })
    })
  })
  describe('bindings with DocumentDetailsDrawerTabs', () => {
    describe('events', () => {
      it('should dispatch downloadDocument when download-clicked is emitted', async () => {
        const store = createSearchStoreMocked()

        store.dispatch = jest.fn()
        wrapper = createWrapper({
          store
        })

        const documentDetailsDrawerTabs = findDocumentDetailsDrawerTabs(wrapper)

        await documentDetailsDrawerTabs.vm.$emit('download-clicked')

        expect(store.dispatch).toHaveBeenCalledWith(
          searchModule('downloadDocument'),
          'myID'
        )
      })
    })
  })
})

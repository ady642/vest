import DocumentDetailsDrawerTabs from '@/modules/Search/components/Tabs/DocumentDetailsDrawerTabs.vue'
import NattoTabs from '@/Common/components/Tabs/NattoTabs.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import * as translationHelper from '@/Common/hooks/useTranslation'
import DocumentDetailsTab from '@/modules/Search/components/Drawer/DocumentDetailsTab.vue'
import DocumentDetailsBanner from '@/modules/Search/components/Drawer/DocumentDetailsBanner.vue'
import constants from '@/Common/constants'
import Document, {
  LifeCycleStatus
} from '@/modules/Search/models/Documents/Inputs/Document'

type DocumentDetailsDrawerTabsProps = {
  document: Document
}
type DocumentDetailsDrawerTabsSetup = {
  activeName: string
  handleClick: (tab: { props: { name: string } }) => void
}

export type DocumentDetailsDrawerTabsTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    DocumentDetailsDrawerTabsProps,
    DocumentDetailsDrawerTabsSetup
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

const documentCertified = new Document({
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
    'Scanner Source': '',
    HasSubscribedToVault: 'true'
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

const defaultProps: DocumentDetailsDrawerTabsProps = {
  document
}

const createWrapper = (
  props = defaultProps
): DocumentDetailsDrawerTabsTypeWrapper =>
  wrapperFactory(DocumentDetailsDrawerTabs, {
    props,
    global: {
      stubs: {
        NattoTabs,
        DocumentDetailsTab,
        DocumentDetailsBanner
      },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

const findDocumentDetailsBanner = (
  wrapper: DocumentDetailsDrawerTabsTypeWrapper
) => wrapper.findComponent({ name: 'document-details-banner' })

let tMock = jest.fn()
let tcMock = jest.fn()

jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
  t: tMock,
  tc: tcMock
})

describe('DocumentDetailsDrawerTabs', () => {
  beforeEach(() => {
    tMock = jest.fn()
    tcMock = jest.fn()
    jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
      t: tMock,
      tc: tcMock
    })
  })
  describe('bindings', () => {
    it('Should have liste of tab passed and strech', () => {
      const wrapper = createWrapper()

      const NattoTabsWrapper = wrapper.findComponent(NattoTabs)

      expect(NattoTabsWrapper.props('items')).toHaveLength(1)

      expect(NattoTabsWrapper.props('stretch')).toBe(true)
    })
    it('Should have two tab when a document is certifed', () => {
      const props: DocumentDetailsDrawerTabsProps = {
        document: documentCertified
      }

      const wrapperCertif = createWrapper(props)

      const NattoTabsWrapper = wrapperCertif.findComponent(NattoTabs)

      expect(NattoTabsWrapper.props('items')).toHaveLength(2)

      expect(NattoTabsWrapper.props('stretch')).toBe(true)
    })
  })
})

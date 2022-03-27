import DocumentSyncStatusItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentSyncStatusItem.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { DocumentMock } from 'dummy_data/tests/unit/src/modules/Search/mocks/DocumentMock'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'
import GedSyncStatusIcon from '@/Common/components/Icons/GedSyncStatusIcon.vue'
import constants from '@/Common/constants'

export type DocumentSyncStatusItemTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    document: Document
  }>
>

const createWrapper = (document: Document): DocumentSyncStatusItemTypeWrapper =>
  wrapperFactory(DocumentSyncStatusItem, {
    props: {
      document
    },
    global: {
      stubs: {
        NattoButton,
        GedSyncStatusIcon
      }
    }
  })

const wrapper = createWrapper(DocumentMock)

describe('DocumentSyncStatusItem', () => {
  describe('rendering', () => {
    it('should render icons  properly', async () => {
      const DocumentSyncStatusItemWrapper = wrapper.findComponent(
        DocumentSyncStatusItem
      )

      const NattoButtonWrapper =
        DocumentSyncStatusItemWrapper.findComponent(NattoButton)

      const syncPendingIconWrapper = NattoButtonWrapper.find('.sync-pending')

      expect(syncPendingIconWrapper.exists).toBeTruthy()
    })
  })
  describe('binding', () => {
    it('Should bind correctly the syncStatus prop', () => {
      const DocumentSyncStatusItemWrapper = wrapper.findComponent(
        DocumentSyncStatusItem
      )

      const NattoButtonWrapper =
        DocumentSyncStatusItemWrapper.findComponent(NattoButton)

      const GedSyncStatusIconWrapper =
        NattoButtonWrapper.findComponent(GedSyncStatusIcon)

      expect(GedSyncStatusIconWrapper.props('syncStatus')).toBe(
        constants.PENDING_SYNC
      )
    })
  })
})

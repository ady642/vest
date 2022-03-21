import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import DocumentDetailsTab from '@/modules/Search/components/Drawer/DocumentDownloadTab.vue'
import NattoDate from '@/Common/components/Dates/NattoDate.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import { findLoadingIcon, findMpButton } from 'tests/unit/utils/finders'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import useStyleguide from 'tests/unit/utils/useStyleguideStubs'

type DocumentDownloadTabProps = {
  document: Document
}

export type DocumentDownloadTabTypeWrapper = VueWrapper<
  ComponentPublicInstance<DocumentDownloadTabProps>
>

const document = new Document()

document.id = 'columbo'
document.name = 'test'
document.type = '.pdf'
document.creationDate = '2018-05-27'

const defaultProps: DocumentDownloadTabProps = {
  document
}

const { MpButton } = useStyleguide()

const createWrapper = ({
  props = defaultProps,
  store = createSearchStoreMocked()
} = {}): DocumentDownloadTabTypeWrapper =>
  wrapperFactory(DocumentDetailsTab, {
    props,
    global: {
      plugins: [store],
      stubs: { NattoDate, MpButton },
      renderStubDefaultSlot: true
    }
  })

let wrapper = createWrapper()

describe('DocumentDownloadTab', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('bindings with NattoDate', () => {
    it('Should bind document prop correctly', async () => {
      const Date = wrapper.findComponent(NattoDate)

      expect(Date.props('date')).toEqual('2018-05-27')
    })
  })
  describe('bindings with MpButton', () => {
    describe('events', () => {
      it('should emit download-clicked when the button is clicked', async () => {
        await findMpButton(wrapper).vm.$emit('click')

        expect(wrapper.emitted('download-clicked')).toHaveLength(1)
      })
    })
    describe('rendering', () => {
      it.each([
        { isDownloading: false, isLoadingIconExists: false },
        { isDownloading: true, isLoadingIconExists: true }
      ])(
        'should display loadingIcon only if downloading',
        ({ isLoadingIconExists, isDownloading }) => {
          wrapper = createWrapper({
            store: createSearchStoreMocked({
              isDownloading
            })
          })

          expect(findLoadingIcon(wrapper).exists()).toBe(isLoadingIconExists)
        }
      )
    })
  })
})

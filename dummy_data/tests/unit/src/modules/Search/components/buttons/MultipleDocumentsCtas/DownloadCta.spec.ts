import DownloadCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/DownloadCta.vue'
import MultipleDocumentsCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import {
  findDownloadIcon,
  findLoadingIcon,
  findMultipleDocumentsCta
} from 'tests/unit/utils/finders'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'

/****
 * Wrapper types
 */

type DownloadCtaProps = {
  selectedDocumentsIds: string[]
}

export type DownloadCtaWrapper = VueWrapper<
  ComponentPublicInstance<DownloadCtaProps>
>

/****
 * Wrapper creation
 */

const defaultProps: DownloadCtaProps = {
  selectedDocumentsIds: ['19', '27']
}

const createWrapper = ({
  props = defaultProps,
  store = createSearchStoreMocked()
} = {}): DownloadCtaWrapper =>
  wrapperFactory(DownloadCta, {
    props,
    global: {
      plugins: [store],
      stubs: {
        MultipleDocumentsCta
      },
      renderStubDefaultSlot: true
    }
  })

let wrapper = createWrapper()
let multipleDocumentsCta = findMultipleDocumentsCta(wrapper)

describe('DownloadCta', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    multipleDocumentsCta = findMultipleDocumentsCta(wrapper)
  })

  describe('bindings with MultipleDocumentsCta', () => {
    test('props bindings', () => {
      expect(multipleDocumentsCta.props()).toStrictEqual({
        text: 'ged.common.download',
        disabled: false
      })
    })
    describe('rendering', () => {
      it('should render the download-icon via the MultipleDocumentsCta prepend-icon slot', () => {
        expect(findDownloadIcon(wrapper).exists()).toBe(true)
      })
      it('should render the loading icon when isFileDeleting is true', () => {
        wrapper = createWrapper({
          store: createSearchStoreMocked({
            multipleDownloadLoading: true
          })
        })

        expect(findLoadingIcon(wrapper).exists()).toBe(true)
        expect(findDownloadIcon(wrapper).exists()).toBe(false)
      })
    })
  })
})

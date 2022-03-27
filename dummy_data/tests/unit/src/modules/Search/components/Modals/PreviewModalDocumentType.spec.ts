import PreviewModalDocumentType from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalDocumentType.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findMpIcon } from 'dummy_data/tests/unit/utils/finders'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

/****
 * Wrapper types
 */
type PreviewModalDocumentTypeProps = {
  type?: string
}

type PreviewModalDocumentTypeSetup = {
  documentTypeIcon: string
  documentType: string
}

export type DocumentTypeTagWrapper = VueWrapper<
  ComponentPublicInstance<
    PreviewModalDocumentTypeProps,
    PreviewModalDocumentTypeSetup
  >
>

/****
 * Wrapper creation
 */
const defaultProps: PreviewModalDocumentTypeProps = {
  type: '.pdf'
}

const { MpIcon } = useStyleguideStubs()

const createWrapper = (props = defaultProps): DocumentTypeTagWrapper =>
  wrapperFactory(PreviewModalDocumentType, {
    props,
    global: {
      stubs: { MpIcon },
      renderStubDefaultSlot: true
    }
  })

let wrapper = createWrapper()

describe('DocumentTypeTag', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('bindings with NattoTag', () => {
    describe('documentTypeIcon', () => {
      const cases = [
        {
          type: '.pdf',
          expectedIcon: 'pdf'
        },
        {
          type: '.txt',
          expectedIcon: 'file'
        },
        {
          type: '.xls',
          expectedIcon: 'xls'
        },
        {
          type: '.jpg',
          expectedIcon: 'file'
        }
      ]

      test.each(cases)(
        'It should bind document type icon correctly',
        ({ type, expectedIcon }) => {
          wrapper = createWrapper({
            type
          })

          expect(findMpIcon(wrapper).props('name')).toEqual(expectedIcon)
        }
      )
    })
  })
})

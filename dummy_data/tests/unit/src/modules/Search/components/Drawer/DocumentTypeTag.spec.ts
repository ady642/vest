import DocumentTypeTag from '@/modules/Search/components/Drawer/DocumentTypeTag/DocumentTypeTag.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findMpIcon } from 'tests/unit/utils/finders'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'

/****
 * Wrapper types
 */
type DocumentTypeTagProps = {
  type?: string
}

type DocumentTypeTagSetup = {
  documentTypeIcon: string
  documentType: string
}

export type DocumentTypeTagWrapper = VueWrapper<
  ComponentPublicInstance<DocumentTypeTagProps, DocumentTypeTagSetup>
>

/****
 * Wrapper creation
 */
const defaultProps: DocumentTypeTagProps = {
  type: '.pdf'
}

const { MpIcon } = useStyleguideStubs()

const createWrapper = (props = defaultProps): DocumentTypeTagWrapper =>
  wrapperFactory(DocumentTypeTag, {
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
    describe('documentType', () => {
      const cases = [
        {
          type: '.pdf',
          expectedType: 'PDF'
        },
        {
          type: '.txt',
          expectedType: 'TXT'
        },
        {
          type: '.xls',
          expectedType: 'XLS'
        },
        {
          type: '.jpg',
          expectedType: 'JPG'
        }
      ]

      test.each(cases)(
        'It should render document type correctly',
        ({ type, expectedType }) => {
          wrapper = createWrapper({
            type
          })

          expect(wrapper.text()).toEqual(expectedType)
        }
      )
    })
  })
})

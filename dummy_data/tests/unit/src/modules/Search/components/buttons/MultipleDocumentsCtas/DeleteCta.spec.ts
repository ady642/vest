import DeleteCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/DeleteCta.vue'
import MultipleDocumentsCta from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import {
  findDeleteIcon,
  findLoadingIcon,
  findMultipleDocumentsCta
} from 'tests/unit/utils/finders'
import { createDeleteFileStoreMocked } from 'tests/unit/__mocks__/storeMock'

/****
 * Wrapper types
 */

type DeleteCtaProps = {
  selectedDocumentsIds: string[]
}

export type DeleteCtaWrapper = VueWrapper<
  ComponentPublicInstance<DeleteCtaProps>
>

/****
 * Wrapper creation
 */

const defaultProps: DeleteCtaProps = {
  selectedDocumentsIds: ['27']
}

const createWrapper = ({
  props = defaultProps,
  store = createDeleteFileStoreMocked()
} = {}): DeleteCtaWrapper =>
  wrapperFactory(DeleteCta, {
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

describe('DeleteCta', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    multipleDocumentsCta = findMultipleDocumentsCta(wrapper)
  })

  describe('bindings with MultipleDocumentsCta', () => {
    describe('props bindings', () => {
      test('static props', () => {
        expect(multipleDocumentsCta.props()).toStrictEqual({
          text: 'ged.common.delete',
          disabled: true
        })
      })
      it.each([
        {
          selectedDocumentsIds: [],
          areDocumentsDeletable: false,
          disabled: true
        },
        {
          selectedDocumentsIds: [],
          areDocumentsDeletable: true,
          disabled: true
        },
        {
          selectedDocumentsIds: ['19', '27'],
          areDocumentsDeletable: false,
          disabled: true
        },
        {
          selectedDocumentsIds: ['19', '27'],
          areDocumentsDeletable: true,
          disabled: false
        }
      ])(
        'should disabled the delete cta when areDocumentsDeletable is false',
        ({ selectedDocumentsIds, areDocumentsDeletable, disabled }) => {
          wrapper = createWrapper({
            props: { selectedDocumentsIds },
            store: createDeleteFileStoreMocked({
              areDocumentsDeletable
            })
          })

          expect(findMultipleDocumentsCta(wrapper).props('disabled')).toBe(
            disabled
          )
        }
      )
    })
    describe('rendering', () => {
      it('should render the delete icon via the MultipleDocumentsCta prepend-icon slot', () => {
        expect(findDeleteIcon(wrapper).exists()).toBe(true)
      })
      it('should render the loading icon when isFileDeleting is true', () => {
        wrapper = createWrapper({
          store: createDeleteFileStoreMocked({
            isFileDeleting: true
          })
        })

        expect(findLoadingIcon(wrapper).exists()).toBe(true)
        expect(findDeleteIcon(wrapper).exists()).toBe(false)
      })
    })
  })
})

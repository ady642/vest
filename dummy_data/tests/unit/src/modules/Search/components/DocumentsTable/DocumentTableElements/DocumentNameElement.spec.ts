import DocumentNameElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import Document, {
  LifeCycleStatus
} from '@/modules/Search/models/Documents/Inputs/Document'
import { documentAPIMock } from '../../../mocks/DocumentAPIMock'
import { PropertiesFromAPI } from '@/Common/types/document'

/****
 * Wrapper types
 */
type DocumentNameElementProps = {
  displayDescription: boolean
  value: string
  search: string
}

type DocumentNameElementSetup = {
  noPermissionOnDocument: string
}

export type DocumentNameElementWrapper = VueWrapper<
  ComponentPublicInstance<DocumentNameElementProps, DocumentNameElementSetup>
>
/****
 * Wrapper finders
 */

const findDocumentTags = (wrapper: DocumentNameElementWrapper) =>
  wrapper.findComponent({ name: 'document-tags' })

/****
 * Wrapper creation
 */
const defaultProps: DocumentNameElementProps = {
  displayDescription: true,
  value: '',
  search: ''
}

const createDocumentsTableElement = (
  myDocument = new Document(documentAPIMock)
) => ({
  props: { documentProp: { type: Document, default: myDocument } },
  template: `<div>
    <slot name="item" :props="documentProp" />
    <slot name="header" />
  </div>`
})

const createWrapper = ({
  props = defaultProps,
  DocumentsTableElement = createDocumentsTableElement()
} = {}): DocumentNameElementWrapper =>
  wrapperFactory(DocumentNameElement, {
    props,
    global: {
      stubs: {
        DocumentsTableElement
      }
    }
  })

let wrapper = createWrapper()
let documentTags = findDocumentTags(wrapper)

describe('DocumentNameElement', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    documentTags = findDocumentTags(wrapper)
  })

  describe('bindings with DocumentTags', () => {
    describe('props', () => {
      it.each([
        {
          properties: {} as PropertiesFromAPI,
          documentCertifyTagExists: false
        },
        {
          properties: {
            ...documentAPIMock.properties,
            HasSubscribedToVault: undefined
          },
          documentCertifyTagExists: false
        },
        {
          properties: {
            ...documentAPIMock.properties,
            HasSubscribedToVault: 'Oui'
          },
          documentCertifyTagExists: true
        }
      ])(
        'should render DocumentCertifyTag if the document property hasSubscribedToVault is at true',
        ({ properties, documentCertifyTagExists }) => {
          // Given the document has the hasSubscribedToVault property at true
          const document = new Document({
            ...documentAPIMock,
            properties
          })

          // When the wrapper is created with a certified document
          wrapper = createWrapper({
            DocumentsTableElement: createDocumentsTableElement(document)
          })

          // Then DocumentCertifyTag must exist
          documentTags = findDocumentTags(wrapper)
          expect(documentTags.props('hasSubscribedToVault')).toBe(
            documentCertifyTagExists
          )
        }
      )
      it('should bind isTreated with document getter isTreated', () => {
        const document = new Document({
          ...documentAPIMock,
          lifecycleStatus: LifeCycleStatus.Treated
        })

        wrapper = createWrapper({
          DocumentsTableElement: createDocumentsTableElement(document)
        })

        documentTags = findDocumentTags(wrapper)
        expect(documentTags.props('isTreated')).toBe(true)
      })
      it('should bind isNew with document getter isNew', () => {
        const document = new Document({
          ...documentAPIMock,
          lifecycleStatus: LifeCycleStatus.New
        })

        wrapper = createWrapper({
          DocumentsTableElement: createDocumentsTableElement(document)
        })

        documentTags = findDocumentTags(wrapper)
        expect(documentTags.props('isNew')).toBe(true)
      })
    })
  })
})

import DocumentActionsElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentActionsElement.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import { documentAPIMock } from '../../../mocks/DocumentAPIMock'
import { ITEMS } from '@/Common/types/actionItemTypes'
import DocumentActionsDropdownList from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownList.vue'
import NattoDropdown from '@/Common/components/Dropdown/NattoDropdown.vue'
import useElementStubs from '../../../../../../utils/useElementStubs'
import DocumentActionsDropdownActivator from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownActivator.vue'

/****
 * Wrapper types
 */
type DocumentActionsElementSetup = {
  handleAction: (action: ITEMS, document: Document) => void
}

export type DocumentActionsElementWrapper = VueWrapper<
  ComponentPublicInstance<any, DocumentActionsElementSetup>
>
/****
 * Wrapper finders
 */

const findDocumentActionsDropdownList = (
  wrapper: DocumentActionsElementWrapper
) => wrapper.findComponent(DocumentActionsDropdownList)

const findDocumentActionsDropdownActivator = (
  wrapper: DocumentActionsElementWrapper
) => wrapper.findComponent(DocumentActionsDropdownActivator)

/****
 * Wrapper creation
 */
const createDocumentsTableElement = (
  myDocument = new Document(documentAPIMock)
) => ({
  props: { documentProp: { type: Document, default: myDocument } },
  template: `<div>
    <slot name="item" :props="documentProp" />
    <slot name="header" />
  </div>`
})

const { ElDropdown, ElDropdownMenu } = useElementStubs()

const createWrapper = ({
  DocumentsTableElement = createDocumentsTableElement()
} = {}): DocumentActionsElementWrapper =>
  wrapperFactory(DocumentActionsElement, {
    global: {
      stubs: {
        DocumentsTableElement,
        NattoDropdown,
        ElDropdown,
        ElDropdownMenu
      },
      renderStubDefaultSlot: true
    }
  })

let wrapper = createWrapper()
let documentActionsDropdownList = findDocumentActionsDropdownList(wrapper)
let documentActionsDropdownActivator =
  findDocumentActionsDropdownActivator(wrapper)

describe('DocumentActionsElement', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    documentActionsDropdownList = findDocumentActionsDropdownList(wrapper)
    documentActionsDropdownActivator =
      findDocumentActionsDropdownActivator(wrapper)
  })

  describe('bindings with DocumentActionsDropdownList', () => {
    describe('props', () => {
      test('static props', () => {
        expect(documentActionsDropdownList.props('documentId')).toBe('myID')
      })
    })
    describe('events', () => {
      it('should emit goTo-clicked when dropdownList emits item-clicked with goto', async () => {
        await documentActionsDropdownList.vm.$emit('item-clicked', ITEMS.GOTO)

        expect(wrapper.emitted('goto-clicked')).toHaveLength(1)
        expect(wrapper.emitted('goto-clicked')).toStrictEqual([
          [
            {
              documentId: 'myID',
              isSynchronizedDocument: true,
              folderId: 45454
            }
          ]
        ])
      })
    })
  })
  describe('bindings with DocumentActionsDropdownActivator', () => {
    describe('events', () => {
      it('should emit document-dropdown-clicked when activator emits click', async () => {
        await documentActionsDropdownActivator.vm.$emit('click')

        expect(wrapper.emitted('document-dropdown-clicked')).toHaveLength(1)
        expect(wrapper.emitted('document-dropdown-clicked')).toStrictEqual([
          ['myID']
        ])
      })
    })
  })
})

import DocumentActionDropdownItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'

import TrashDocumentsActionsDropdownList from '@/modules/Trash/components/TrashDocumentTableItems/TrashDocumentsActionsDropdownList.vue'

const storeMock = createTrashStoreMock()

const defaultProps = {
  documentId: 'document-id'
}

const createWrapper = (props = defaultProps): VueWrapper<any> =>
  wrapperFactory(TrashDocumentsActionsDropdownList, {
    props,
    global: {
      stubs: {
        DocumentActionDropdownItem
      },
      plugins: [storeMock]
    }
  })

let wrapper = createWrapper()

describe('DocumentActionsDropdownList', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('binding', () => {
    describe('events', () => {
      it('Should fire item-clicked when item clicked', () => {
        const dropdownItemWrapper = wrapper.findComponent(
          DocumentActionDropdownItem
        )

        dropdownItemWrapper.trigger('click')

        expect(wrapper.emitted('item-clicked')).toBeTruthy()
      })
    })
  })
})

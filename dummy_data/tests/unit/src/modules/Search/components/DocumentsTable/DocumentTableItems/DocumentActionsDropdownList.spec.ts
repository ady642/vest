import DocumentActionDropdownItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue'
import DocumentActionsDropdownList from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownList.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { createDeleteFileStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { ITEMS } from '@/Common/types/actionItemTypes'

const testCases = [
  {
    fileIsDeletable: true,
    buttonShouldBeDisabled: false
  },
  {
    fileIsDeletable: false,
    buttonShouldBeDisabled: true
  }
]
let storeMock = createDeleteFileStoreMocked()

const defaultProps = {
  documentId: 'document-id',
  isSynchronizedDocument: false,
  displayGoTo: false
}

const createWrapper = (props = defaultProps): VueWrapper<any> =>
  wrapperFactory(DocumentActionsDropdownList, {
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
    describe('props', () => {
      it('static props', () => {
        const dropdownItemWrapper = wrapper.findComponent(
          DocumentActionDropdownItem
        )

        expect(dropdownItemWrapper.props()).toStrictEqual({
          disabled: true,
          icon: 'delete',
          label: 'ged.common.delete',
          tooltipContent: 'ged.dataManipulation.delete.cantDelete'
        })
      })
    })
    describe('events', () => {
      it('Should fire item-clicked when item clicked', () => {
        const dropdownItemWrapper = wrapper.findComponent(
          DocumentActionDropdownItem
        )

        dropdownItemWrapper.trigger('click')

        expect(wrapper.emitted('item-clicked')).toHaveLength(1)
        expect(wrapper.emitted('item-clicked')).toStrictEqual([[ITEMS.DELETE]])
      })
    })
  })
  describe('rendering', () => {
    it.each(testCases)(
      'When file  deletable = $fileIsDeletable should dropdown delete action should be disabled=$buttonShouldBeDisabled ',
      async ({ fileIsDeletable, buttonShouldBeDisabled }) => {
        storeMock = createDeleteFileStoreMocked({
          isFileDeletable: fileIsDeletable
        })

        wrapper = createWrapper({
          ...defaultProps,
          documentId: '69241b23-f6d1-458d-8675-1ea36f593303',
          isSynchronizedDocument: false
        })
        await wrapper.vm.$nextTick()
        const dropdownItemWrapper = wrapper.findComponent(
          DocumentActionDropdownItem
        )

        expect(dropdownItemWrapper.props('disabled')).toBe(
          buttonShouldBeDisabled
        )
      }
    )
    it.each([
      { displayGoTo: true, expectedItemsCount: 3 },
      { displayGoTo: false, expectedItemsCount: 2 }
    ])(
      'should display the goto item if displayGoTo is at true',
      ({ displayGoTo, expectedItemsCount }) => {
        wrapper = createWrapper({
          ...defaultProps,
          displayGoTo
        })

        const dropdownItemWrappers = wrapper.findAllComponents(
          DocumentActionDropdownItem
        )

        expect(dropdownItemWrappers).toHaveLength(expectedItemsCount)
      }
    )
  })
})

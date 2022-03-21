import SearchTreeItem from '@/modules/Search/components/Trees/SearchTreeItem.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import useFoldersData from '../../mocks/FoldersDataMock'

/****
 * Wrapper types
 */
type SearchTreeItemProps = {
  folder: Folder
  isFolderSelected: boolean
}

export type SearchTreeItemWrapper = VueWrapper<
  ComponentPublicInstance<SearchTreeItemProps>
>

/****
 * Wrapper creation
 */
const defaultProps: SearchTreeItemProps = {
  folder: useFoldersData().FoldersData.collection[0],
  isFolderSelected: false
}

const createWrapper = (props = defaultProps): SearchTreeItemWrapper =>
  wrapperFactory(SearchTreeItem, {
    props
  })

let wrapper = createWrapper()

describe('SearchTreeItem', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('rendering', () => {
    it('should render the folder name and the folder children length', () => {
      expect(wrapper.text()).toContain('A classer')
      expect(wrapper.text()).toContain('1')
    })
    it.each([
      {
        isFolderSelected: true,
        activeNameExist: true,
        activeChildrenLength: true
      },
      {
        isFolderSelected: false,
        activeNameExist: false,
        activeChildrenLength: false
      }
    ])(
      'should add active classes when the folder is selected',
      ({ isFolderSelected, activeChildrenLength, activeNameExist }) => {
        wrapper = createWrapper({
          ...defaultProps,
          isFolderSelected
        })

        expect(wrapper.find('.search-tree__item__name--active').exists()).toBe(
          activeNameExist
        )
        expect(
          wrapper.find('.search-tree__item__children-length--active').exists()
        ).toBe(activeChildrenLength)
      }
    )
  })
})

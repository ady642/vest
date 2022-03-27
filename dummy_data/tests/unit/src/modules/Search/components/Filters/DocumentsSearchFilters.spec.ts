import DocumentsSearchFilters from '@/modules/Search/components/Filters/DocumentsSearchFilters.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { DocumentsSearchBarWrapper } from './DocumentsSearchBar.spec'
import DocumentsSearchBar from '@/modules/Search/components/Filters/DocumentsSearchBar.vue'
import NattoCollapseTransition from '@/Common/components/Transitions/NattoCollapseTransition.vue'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'
import AdvancedSearchOptions from '@/modules/Search/components/Filters/AdvancedSearchOptions/AdvancedSearchOptions.vue'
import Period from '@/Common/models/List/Period'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'

/****
 * Wrapper types
 */
type DocumentsSearchFiltersProps = {
  search: string
  activeFiltersCount: number
}

type DocumentsSearchFiltersSetup = {
  noPermissionOnDocument: string
}

export type DocumentsSearchFiltersWrapper = VueWrapper<
  ComponentPublicInstance<
    DocumentsSearchFiltersProps,
    DocumentsSearchFiltersSetup
  >
>
/****
 * Wrapper finders
 */

const findDocumentsSearchBar = (
  wrapper: DocumentsSearchFiltersWrapper
): DocumentsSearchBarWrapper => wrapper.findComponent(DocumentsSearchBar)

const findAdvancedSearchOptionsElement = (
  wrapper: DocumentsSearchFiltersWrapper
): DOMWrapper<HTMLDivElement> => wrapper.find('.advanced-search-options')

const findAdvancedSearchOptionsWrapper = (
  wrapper: DocumentsSearchFiltersWrapper
): VueWrapper<ComponentPublicInstance> =>
  wrapper.findComponent(AdvancedSearchOptions)

/****
 * Wrapper creation
 */
const defaultProps: DocumentsSearchFiltersProps = {
  search: '',
  activeFiltersCount: 0
}

const { ElCollapseTransition } = useElementStubs()

const createWrapper = (props = defaultProps): DocumentsSearchFiltersWrapper =>
  wrapperFactory(DocumentsSearchFilters, {
    props,
    global: {
      stubs: {
        NattoCollapseTransition,
        ElCollapseTransition
      }
    }
  })

let wrapper = createWrapper()
let documentsSearchBarWrapper = findDocumentsSearchBar(wrapper)
let advancedSearchOptionsWrapper = findAdvancedSearchOptionsWrapper(wrapper)

describe('DocumentsSearchFilters', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    documentsSearchBarWrapper = findDocumentsSearchBar(wrapper)
    advancedSearchOptionsWrapper = findAdvancedSearchOptionsWrapper(wrapper)
  })

  describe('bindings with DocumentsSearchBar', () => {
    test('props bindings', () => {
      wrapper = createWrapper({ search: 'test', activeFiltersCount: 1 })

      documentsSearchBarWrapper = findDocumentsSearchBar(wrapper)
      expect(documentsSearchBarWrapper.vm.search).toEqual('test')
      expect(documentsSearchBarWrapper.vm.activeFiltersCount).toEqual(1)
      expect(documentsSearchBarWrapper.vm.displayAdvancedSearch).toEqual(false)
    })
    it('should emit update:search when DocumentsSearchBar emits update:modelValue', async () => {
      // When DocumentsSearchBar emits update:search
      await documentsSearchBarWrapper.vm.$emit('update:search', 'ma recherche')

      // Then DocumentsSearchFilters should emit update:search with 'ma recherche' as payload
      expect(wrapper.emitted('update:search')).toHaveLength(1)
      expect(wrapper.emitted('update:search')).toEqual([['ma recherche']])
    })
    it('should toggle the advanced filters option when DocumentsSearchBar emits open-filters-button-clicked', async () => {
      // When DocumentsSearchBar emits open-filters-button-clicked
      await documentsSearchBarWrapper.vm.$emit('open-filters-button-clicked')

      // Then the advanced search options (close at init) must be displayed
      const advancedSearchOptionsElement =
        findAdvancedSearchOptionsElement(wrapper)

      expect(advancedSearchOptionsElement.isVisible()).toBe(true)
      expect(documentsSearchBarWrapper.vm.displayAdvancedSearch).toBe(true)
    })
  })
  describe('bindings with AdvancedSearchOptions', () => {
    it('should emit change-filters when AdvancedSearchOptions emit search-filters', () => {
      // Given the period is setted
      advancedSearchOptionsWrapper.vm.$emit(
        'update:period',
        new Period({ startDate: '2022-05-19', endDate: '2022-05-27' })
      )
      // And set the certified also
      advancedSearchOptionsWrapper.vm.$emit('update:certified', true)
      // When AdvancedSearchOptions emit search-filters
      advancedSearchOptionsWrapper.vm.$emit('search-clicked')

      // Then AdvancedSearhOptions should emit change-filters
      expect(wrapper.emitted('change-filters')).toHaveLength(1)
      expect(wrapper.emitted('change-filters')).toEqual([
        [
          new DocumentsFilters({
            search: '',
            period: new Period({
              startDate: '2022-05-19',
              endDate: '2022-05-27'
            }),
            certified: true,
            findInChildFolders: false,
            folderId: 0
          })
        ]
      ])
    })
    it('should emit reset-filters when AdvancedSearchOptions emit reset-search-filters', () => {
      // Given the period is setted
      advancedSearchOptionsWrapper.vm.$emit(
        'update:period',
        new Period({ startDate: '2022-05-19', endDate: '2022-05-27' })
      )
      // And set the certified also
      advancedSearchOptionsWrapper.vm.$emit('update:certified', true)
      // When AdvancedSearchOptions emit reset-filters-clicked
      advancedSearchOptionsWrapper.vm.$emit('reset-filters-clicked')

      // Then AdvancedSearhOptions should emit reset-filters
      expect(wrapper.emitted('reset-filters')).toHaveLength(1)
      expect(advancedSearchOptionsWrapper.props('certified')).toBe('all')
      expect(advancedSearchOptionsWrapper.props('period')).toStrictEqual(
        new Period()
      )
    })
  })
})

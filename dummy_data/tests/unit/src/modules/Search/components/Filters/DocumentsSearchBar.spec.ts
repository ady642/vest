import DocumentsSearchBar from '@/modules/Search/components/Filters/DocumentsSearchBar.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { OpenFilterButtonWrapper } from './Buttons/OpenFilterButton.spec'
import OpenFilterButton from '@/modules/Search/components/Filters/Buttons/OpenFilterButton.vue'
import DocumentsSearchInput from '@/modules/Search/components/Filters/DocumentsSearchInput.vue'
import { DocumentsSearchInputWrapper } from './DocumentsSearchInput.spec'

/****
 * Wrapper types
 */
type DocumentsSearchBarProps = {
  search: string
  activeFiltersCount?: number
  displayAdvancedSearch?: boolean
}

type DocumentsSearchBarSetup = {
  noPermissionOnDocument: string
}

export type DocumentsSearchBarWrapper = VueWrapper<
  ComponentPublicInstance<DocumentsSearchBarProps, DocumentsSearchBarSetup>
>
/****
 * Wrapper finders
 */

const findDocumentsSearchInput = (
  wrapper: DocumentsSearchBarWrapper
): DocumentsSearchInputWrapper => wrapper.findComponent(DocumentsSearchInput)

const findOpenFiltersButton = (
  wrapper: DocumentsSearchBarWrapper
): OpenFilterButtonWrapper => wrapper.findComponent(OpenFilterButton)

/****
 * Wrapper creation
 */
const defaultProps: DocumentsSearchBarProps = {
  search: ''
}

const createWrapper = (props = defaultProps): DocumentsSearchBarWrapper =>
  wrapperFactory(DocumentsSearchBar, {
    props
  })

let wrapper = createWrapper()
let documentsSearchInputWrapper = findDocumentsSearchInput(wrapper)
let openFiltersButtonWrapper = findOpenFiltersButton(wrapper)

describe('DocumentsSearchBar', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    documentsSearchInputWrapper = findDocumentsSearchInput(wrapper)
    openFiltersButtonWrapper = findOpenFiltersButton(wrapper)
  })

  describe('rendering', () => {
    it('should set documents-filters__search-bar--active class when displayAdvancedSearch', () => {
      wrapper = createWrapper({ displayAdvancedSearch: true, search: '' })

      expect(wrapper.classes()).toContain(
        'documents-filters__search-bar--active'
      )
    })
  })

  describe('bindings with DocumentsSearchInput', () => {
    test('props bindings', () => {
      wrapper = createWrapper({ ...defaultProps, search: 'test' })

      expect(findDocumentsSearchInput(wrapper).vm.modelValue).toBe('test')
    })
    it('should emit update:search when DocumentsSearchInput emit update:modelValue', async () => {
      // When DocumentsSearchInput emit update:modelValue
      await documentsSearchInputWrapper.vm.$emit(
        'update:modelValue',
        'bisrepetita'
      )

      // Then DocumentsSearchBar Should emit update:search with same payload
      expect(wrapper.emitted('update:search')).toHaveLength(1)
      expect(wrapper.emitted('update:search')).toEqual([['bisrepetita']])
    })
  })

  describe('bindings with OpenFiltersButton', () => {
    test('props bindings', () => {
      wrapper = createWrapper({ ...defaultProps, activeFiltersCount: 1 })

      expect(findOpenFiltersButton(wrapper).vm.activeFiltersCount).toBe(1)
    })
    it('should emit open-filters-button-clicked when OpenFiltersButton emit click', async () => {
      // When OpenFiltersButton emit click
      await openFiltersButtonWrapper.vm.$emit('click')

      // Then DocumentsSearchBar Should emit open-filters-button-clicked
      expect(wrapper.emitted('open-filters-button-clicked')).toHaveLength(1)
    })
  })
})

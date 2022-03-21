import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import DocumentNameHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentNameHeader.vue'
import DocumentCreationDateHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentCreationDateHeader.vue'
import DocumentActionHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentActionHeader.vue'
import DocumentTypeHeader from '@/modules/Search/components/DocumentsTable/DocumentsTableHeaders/DocumentTypeHeader.vue'
import ArrowDownIcon from '@/Common/components/Icons/ArrowDownIcon.vue'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import NattoTableCustomHeader from '@/Common/components/Table/NattoTableCustomHeader.vue'
import { findNattoCheckbox } from 'tests/unit/utils/finders'

type NattoTableCustomHeaderProps = {
  sortOptions: DocumentsSortOptions
  areAllSelected?: boolean
}

type NattoTableCustomHeaderSetup = {
  displayNameSort: boolean
  displayDateSort: boolean
  sort: () => void
}

export type NattoTableCustomHeaderPropsTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    NattoTableCustomHeaderProps,
    NattoTableCustomHeaderSetup
  >
>

const defaultProps: NattoTableCustomHeaderProps = {
  sortOptions: new DocumentsSortOptions({
    sortBy: 'name',
    sortDirection: 'ascending'
  }),
  areAllSelected: false
}

const createWrapper = (
  props = defaultProps
): NattoTableCustomHeaderPropsTypeWrapper =>
  wrapperFactory(NattoTableCustomHeader, {
    props
  })

let wrapper = createWrapper()
let nattoCheckboxWrapper = findNattoCheckbox(wrapper)

describe('NattoTableCustomHeader', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoCheckboxWrapper = findNattoCheckbox(wrapper)
  })
  describe('bindings with NattoCheckbox', () => {
    test('static props', () => {
      expect(nattoCheckboxWrapper.attributes()).toStrictEqual({
        'model-value': 'false'
      })
    })
    describe('events', () => {
      it('should emit select-all when NattoCheckbox emits change', async () => {
        await nattoCheckboxWrapper.vm.$emit('change')

        expect(wrapper.emitted('select-all')).toHaveLength(1)
      })
    })
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind correctly prop sortOptions', () => {
        expect(wrapper.props('sortOptions')).toEqual(defaultProps.sortOptions)
      })
    })
    describe('rendering', () => {
      describe('Should calculate displayNameSort correctly', () => {
        const cases = [
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'ascending'
            }),
            expectedClass: '.filter-icon-asc',
            expectedValue: true
          },
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'descending'
            }),
            expectedClass: '.filter-icon-desc',
            expectedValue: true
          },
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: null
            }),
            expectedClass: '.filter-icon-asc',
            expectedValue: false
          },
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: null
            }),
            expectedClass: '.filter-icon-desc',
            expectedValue: false
          }
        ]

        test.each(cases)(
          'Test Computing',
          ({ sortOptions, expectedClass, expectedValue }) => {
            wrapper = createWrapper({
              sortOptions: sortOptions
            })
            const IconWrapper = wrapper.find(expectedClass)

            expect(IconWrapper.exists()).toBe(expectedValue)
          }
        )
      })

      describe('Should calculate displayDateSort correctly', () => {
        const cases = [
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'ascending'
            }),
            expectedClass: '.filter-icon-asc',
            expectedValue: true
          },
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'descending'
            }),
            expectedClass: '.filter-icon-desc',
            expectedValue: true
          },
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: null
            }),
            expectedClass: '.filter-icon-asc',
            expectedValue: false
          },
          {
            sortOptions: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: null
            }),
            expectedClass: '.filter-icon-desc',
            expectedValue: false
          }
        ]

        test.each(cases)(
          'Test Computing',
          ({ sortOptions, expectedClass, expectedValue }) => {
            wrapper = createWrapper({
              sortOptions: sortOptions
            })
            const IconWrapper = wrapper.find(expectedClass)

            expect(IconWrapper.exists()).toBe(expectedValue)
          }
        )
      })
    })
    describe('events', () => {
      describe('It should emit sort-arbo-table corretly , Name', () => {
        const cases = [
          {
            elementToClick: '.browse-doc__header-name',
            currentSortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'ascending'
            }),
            expectedSortDirection: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'descending'
            })
          },
          {
            elementToClick: '.browse-doc__header-name',
            currentSortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'descending'
            }),
            expectedSortDirection: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: null
            })
          }
        ]

        test.each(cases)(
          'Test sort by name',
          async ({
            elementToClick,
            currentSortOptions,
            expectedSortDirection
          }) => {
            wrapper = createWrapper({
              sortOptions: currentSortOptions
            })
            const IconWrapper = wrapper.find(elementToClick)

            await IconWrapper.trigger('click')
            expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1)
            expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
              [expectedSortDirection]
            ])
          }
        )
      })
      describe('It should emit sort-arbo-table corretly , Updated', () => {
        const cases = [
          {
            elementToClick: '.browse-doc__header-date',
            currentSortOptions: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'ascending'
            }),
            expectedSortDirection: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'descending'
            })
          },
          {
            elementToClick: '.browse-doc__header-date',
            currentSortOptions: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'descending'
            }),
            expectedSortDirection: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: null
            })
          }
        ]

        test.each(cases)(
          'Test sort by creation',
          async ({
            elementToClick,
            currentSortOptions,
            expectedSortDirection
          }) => {
            wrapper = createWrapper({
              sortOptions: currentSortOptions
            })
            const IconWrapper = wrapper.find(elementToClick)

            await IconWrapper.trigger('click')
            expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1)
            expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
              [expectedSortDirection]
            ])
          }
        )
      })
      describe('It should set default sortDirection while changing sortBy', () => {
        const cases = [
          {
            elementToClick: '.browse-doc__header-date',
            currentSortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'ascending'
            }),
            expectedSortDirection: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'ascending'
            })
          },
          {
            elementToClick: '.browse-doc__header-name',
            currentSortOptions: new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'descending'
            }),
            expectedSortDirection: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'ascending'
            })
          }
        ]

        test.each(cases)(
          'Toggle between sort by name and creation',
          async ({
            elementToClick,
            currentSortOptions,
            expectedSortDirection
          }) => {
            wrapper = createWrapper({
              sortOptions: currentSortOptions
            })
            const IconWrapper = wrapper.find(elementToClick)

            await IconWrapper.trigger('click')
            expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1)
            expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
              [expectedSortDirection]
            ])
          }
        )
      })
    })
  })
})

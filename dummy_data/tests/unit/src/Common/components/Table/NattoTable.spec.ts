import { ComponentPublicInstance, Ref } from 'vue'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import NattoTable from '@/Common/components/Table/NattoTable.vue'
import { NattoPaginationWrapper } from '../Paging/NattoPagination.spec'
import NattoPagination from '@/Common/components/Paging/NattoPagination.vue'
import NattoTableCustomHeader from '@/Common/components/Table/NattoTableCustomHeader.vue'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'
import { findMpTableWrapper } from 'dummy_data/tests/unit/utils/finders'

type NattoTableProps = {
  tableData: { value: string; label: string }[]
  loading?: boolean
  paginated?: boolean
  hideHeader?: boolean
  itemsTotal?: number
  itemsPerPage?: number
  infiniteScrollFinished?: boolean
  pageNumber?: number
  sortOptions?: DocumentsSortOptions
  cellClassName?: () => string
  rowClassName?: ({ row, rowIndex }: { row: any; rowIndex: number }) => string
  isSelection?: boolean
  highlightRowOnClick?: boolean
  areAllSelected?: boolean
}

type NattoTableSetup = {
  emitOnScrollToBottom: () => void
  clearSelection: () => void
  toggleAll: () => void
  selectRow: (docID: string) => void
  handleRowClick: () => void
  mpTableRef: Ref
  nattoTableContainerRef: HTMLDivElement
}

export type NattoTableWrapper = VueWrapper<
  ComponentPublicInstance<NattoTableProps, NattoTableSetup>
>

const { MpTable } = useStyleguideStubs()

const defaultProps: NattoTableProps = {
  tableData: []
}

const createWrapper = (props = defaultProps): NattoTableWrapper =>
  wrapperFactory(NattoTable, {
    global: {
      stubs: {
        MpTable
      },
      directives: {
        Loading: {},
        InfiniteScroll: (node, binding) => {
          binding.value()
        }
      }
    },
    props
  })

let wrapper = createWrapper()

const findNattoPaginationWrapper = (
  wrapper: NattoTableWrapper
): NattoPaginationWrapper => wrapper.findComponent(NattoPagination)
const findNattoTableCustomHeaderWrapper = (
  wrapper: NattoTableWrapper
): VueWrapper<ComponentPublicInstance> =>
  wrapper.findComponent(NattoTableCustomHeader)

let mpTableWrapper = findMpTableWrapper(wrapper)

describe('NattoTable', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    mpTableWrapper = findMpTableWrapper(wrapper)
  })

  describe('bindings', () => {
    describe('MpTable binding', () => {
      describe('mpTable methods', () => {
        it('should call clearSelection of ElTable when clearSelection is called', async () => {
          mpTableWrapper.vm.ElTableInstance.clearSelection = jest.fn()
          mpTableWrapper.vm.handleSelectionChange = jest.fn()

          wrapper.vm.clearSelection()

          expect(
            mpTableWrapper.vm.ElTableInstance.clearSelection
          ).toHaveBeenCalled()
          expect(mpTableWrapper.vm.handleSelectionChange).toHaveBeenCalledWith(
            []
          )
        })
        it('should call handleRowClick when selectRow is called', async () => {
          mpTableWrapper.vm.handleRowClick = jest.fn()

          wrapper.vm.selectRow('19')

          expect(mpTableWrapper.vm.handleRowClick).toHaveBeenCalledWith({
            id: '19'
          })
        })
        it('should call toggleAll when toggleAll is called', () => {
          mpTableWrapper.vm.ElTableInstance.toggleAllSelection = jest.fn()

          wrapper.vm.toggleAll()

          expect(
            mpTableWrapper.vm.ElTableInstance.toggleAllSelection
          ).toHaveBeenCalled()
        })
      })
      it('props binding', () => {
        const cellClassName = jest.fn(() => 'test')
        const rowClassName = jest.fn(() => 'test')

        wrapper = createWrapper({
          tableData: [{ value: 'test', label: 'Test' }],
          loading: true,
          hideHeader: true,
          infiniteScrollFinished: true,
          rowClassName,
          cellClassName,
          isSelection: true,
          highlightRowOnClick: true
        })

        const mpTableWrapper: VueWrapper<any> = findMpTableWrapper(wrapper)

        expect(mpTableWrapper.attributes('show-header')).toBe('false')
        expect(mpTableWrapper.props('data')).toStrictEqual([
          { value: 'test', label: 'Test' }
        ])
        expect(mpTableWrapper.props('cellClassName')).toBe(cellClassName)
        expect(mpTableWrapper.props('rowClassName')).toBe(rowClassName)
        expect(mpTableWrapper.props('isSelection')).toBe(true)
        expect(mpTableWrapper.props('highlightRowOnClick')).toBe(true)
        expect(mpTableWrapper.attributes('infinite-scroll-disabled')).toBe(
          'true'
        )
      })

      const disabledCases = [
        {
          infiniteScrollFinished: false,
          loading: false,
          expectedDisabled: false
        },
        {
          infiniteScrollFinished: false,
          loading: true,
          expectedDisabled: true
        },
        {
          infiniteScrollFinished: true,
          loading: false,
          expectedDisabled: true
        },
        {
          infiniteScrollFinished: true,
          loading: true,
          expectedDisabled: true
        }
      ]

      test.each(disabledCases)(
        'infinite scroll must be disabled if loading or no more result',
        ({ infiniteScrollFinished, loading, expectedDisabled }) => {
          wrapper = createWrapper({
            tableData: [{ value: 'test', label: 'Test' }],
            loading,
            infiniteScrollFinished
          })

          const elTableWrapper: VueWrapper<any> = findMpTableWrapper(wrapper)

          expect(elTableWrapper.attributes('infinite-scroll-disabled')).toBe(
            `${expectedDisabled}`
          )
        }
      )

      describe('events', () => {
        it('should emit on-scroll-to-bottom on mounted', () => {
          expect(wrapper.emitted('on-scroll-to-bottom')).toBeTruthy()
        })
        it.each([
          { received: 'row-click', emitted: 'row-clicked' },
          { received: 'selection-change', emitted: 'selection-change' }
        ])(
          'should emit row-clicked when MpTable emit row-click',
          async ({ received, emitted }) => {
            await mpTableWrapper.vm.$emit(received)

            expect(wrapper.emitted(emitted))
          }
        )
      })
    })
    describe('NattoPagination binding', () => {
      describe('rendering', () => {
        const displayCases = [
          { paginated: false, loading: false, nattoPaginationExists: false },
          { paginated: false, loading: true, nattoPaginationExists: false },
          { paginated: true, loading: false, nattoPaginationExists: true },
          { paginated: true, loading: true, nattoPaginationExists: false }
        ]

        test.each(displayCases)(
          'if paginated: $paginated ,then NattoPagination exists: $nattoPaginationExists',
          ({ paginated, loading, nattoPaginationExists }) => {
            wrapper = createWrapper({
              tableData: [],
              paginated,
              loading
            })

            const nattoPagination: DOMWrapper<HTMLDivElement> = wrapper.find(
              '.natto-table__pagination'
            )

            expect(nattoPagination.element.style.display !== 'none').toBe(
              nattoPaginationExists
            )
          }
        )
      })
      describe('props', () => {
        it('props binding', () => {
          wrapper = createWrapper({
            tableData: [],
            paginated: true,
            itemsTotal: 520,
            itemsPerPage: 10,
            pageNumber: 52
          })

          const nattoPaginationWrapper = findNattoPaginationWrapper(wrapper)

          expect(nattoPaginationWrapper.vm.itemsTotal).toBe(520)
          expect(nattoPaginationWrapper.vm.pageSize).toBe(10)
          expect(nattoPaginationWrapper.vm.pageNumber).toBe(52)
        })
      })
      describe('events', () => {
        it('should emit page-opened when NattoPagination emit page-opened and scrollToTop', async () => {
          wrapper = createWrapper({
            tableData: [],
            paginated: true
          })
          wrapper.vm.nattoTableContainerRef.scrollTo = jest.fn()

          const nattoPaginationWrapper: NattoPaginationWrapper =
            findNattoPaginationWrapper(wrapper)

          await nattoPaginationWrapper.vm.$emit('page-opened', 4)

          expect(wrapper.emitted('page-opened')).toBeTruthy()
          expect(wrapper.emitted('page-opened')).toStrictEqual([[4]])
          expect(
            wrapper.vm.nattoTableContainerRef.scrollTo
          ).toHaveBeenCalledWith({
            top: 0
          })
        })
      })
    })
    describe('NattoTableCustomHeader binding', () => {
      describe('props', () => {
        it('Should bind sortOptions Correctly', () => {
          wrapper = createWrapper({
            ...defaultProps,
            sortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'ascending'
            }),
            areAllSelected: true,
            hideHeader: true
          })
          expect(findNattoTableCustomHeaderWrapper(wrapper).props()).toEqual({
            sortOptions: new DocumentsSortOptions({
              sortBy: 'name',
              sortDirection: 'ascending'
            }),
            areAllSelected: true
          })
        })
      })
      describe('rendering', () => {
        const displayCases = [
          { hideHeader: false, nattoTableCustomHeaderExists: false },
          { hideHeader: true, nattoTableCustomHeaderExists: true }
        ]

        test.each(displayCases)(
          'if hideHeader: $hideHeader ,then NattoTableCustomHeader exists: $nattoTableCustomHeaderExists',
          ({ hideHeader, nattoTableCustomHeaderExists }) => {
            wrapper = createWrapper({
              tableData: [],
              hideHeader
            })

            expect(findNattoTableCustomHeaderWrapper(wrapper).exists()).toBe(
              nattoTableCustomHeaderExists
            )
          }
        )
      })
      describe('events', () => {
        it('Should emit sort-arbo-table on sort-arbo-table', async () => {
          wrapper = createWrapper({
            ...defaultProps,
            hideHeader: true
          })
          await findNattoTableCustomHeaderWrapper(wrapper).vm.$emit(
            'sort-arbo-table',
            new DocumentsSortOptions({
              sortBy: 'updated',
              sortDirection: 'ascending'
            })
          )

          expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1)
          expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
            [
              new DocumentsSortOptions({
                sortBy: 'updated',
                sortDirection: 'ascending'
              })
            ]
          ])
        })
        it('should emit select-all when NattoTableCustomHeader emit select-all', async () => {
          wrapper = createWrapper({
            ...defaultProps,
            hideHeader: true
          })
          await findNattoTableCustomHeaderWrapper(wrapper).vm.$emit(
            'select-all'
          )

          expect(wrapper.emitted('select-all')).toHaveLength(1)
          expect(wrapper.emitted('select-all')).toBeTruthy()
        })
      })
    })

    describe('empty slot binding', () => {
      describe('rendering', () => {
        const displayCases = [
          { loading: true, displayDefaultMessages: false },
          { loading: false, displayDefaultMessages: true }
        ]

        test.each(displayCases)(
          'if loading: $loading ,then default messages exists: $displayDefaultMessages',
          ({ loading, displayDefaultMessages }) => {
            wrapper = createWrapper({
              ...defaultProps,
              loading
            })

            expect(wrapper.find('#default-message').exists()).toBe(
              displayDefaultMessages
            )
          }
        )
      })
    })
  })
})

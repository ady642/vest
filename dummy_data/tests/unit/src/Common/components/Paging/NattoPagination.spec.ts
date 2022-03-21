import NattoPagination from '@/Common/components/Paging/NattoPagination.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'

type NattoPaginationProps = {
  itemsTotal: number
  pageSize: number
  pageNumber: number
}

type NattoPaginationSetup = {
  pageCount: number
  pageChanged: (page: number) => void
}

export type NattoPaginationWrapper = VueWrapper<
  ComponentPublicInstance<NattoPaginationProps, NattoPaginationSetup>
>

const { MpPagination } = useStyleguideStubs()

const createWrapper = (
  itemsTotal: number,
  pageSize: number,
  pageNumber: number
): NattoPaginationWrapper =>
  wrapperFactory(NattoPagination, {
    props: {
      itemsTotal,
      pageSize,
      pageNumber
    },
    global: {
      stubs: { MpPagination }
    }
  })

let wrapper = createWrapper(100, 10, 10)

describe('NattoPagination', () => {
  beforeEach(() => {
    wrapper = createWrapper(100, 10, 10)
  })
  describe('bindings', () => {
    describe('props', () => {
      it('Should send correctly props to MpPagination', () => {
        const mpPaginationWrapper = wrapper.findComponent(MpPagination)

        expect(mpPaginationWrapper.attributes('page-size')).toBe('10')
        expect(mpPaginationWrapper.attributes('total')).toBe('100')
        expect(mpPaginationWrapper.attributes('page-count')).toBe('10')
        expect(mpPaginationWrapper.attributes('current-page')).toBe('10')
      })
    })
  })
  describe('events', () => {
    test('Paging should trigger an page-opened event when MpPagination emits a current-change event', () => {
      const mpPaginationWrapper = wrapper.findComponent(MpPagination)

      mpPaginationWrapper.vm.$emit('current-change', 3)

      expect(wrapper.emitted('page-opened')).toEqual([[3]])
      expect(wrapper.emitted('page-opened')).toBeTruthy()
    })
  })
})

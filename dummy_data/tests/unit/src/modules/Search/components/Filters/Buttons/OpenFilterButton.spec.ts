import NattoBadge from '@/Common/components/Badges/NattoBadge.vue'
import OpenFilterButton from '@/modules/Search/components/Filters/Buttons/OpenFilterButton.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import useElementStubs from 'tests/unit/utils/useElementStubs'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'

const { ElBadge, ElButton } = useElementStubs()
const { MpAdvancedSearchBtn } = useStyleguideStubs()

type OpenFilterButtonProps = {
  activeFiltersCount: number
  displayAdvancedSearch?: boolean
}

type OpenFilterButtonSetup = {
  advancedButtonIcon: string
  advancedButtonType: string
}

export type OpenFilterButtonWrapper = VueWrapper<
  ComponentPublicInstance<OpenFilterButtonProps, OpenFilterButtonSetup>
>

const defaultProps: OpenFilterButtonProps = {
  activeFiltersCount: 0,
  displayAdvancedSearch: true
}

const createWrapper = (props = defaultProps): OpenFilterButtonWrapper =>
  wrapperFactory(OpenFilterButton, {
    props,
    global: {
      stubs: { NattoBadge, ElButton, ElBadge, MpAdvancedSearchBtn },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

let wrapper = createWrapper()

const findMpAdvancedSearchBtn = (wrapper: OpenFilterButtonWrapper) =>
  wrapper.findComponent(MpAdvancedSearchBtn)

const findNattoBadge = (wrapper: OpenFilterButtonWrapper) =>
  wrapper.findComponent(NattoBadge)

let nattoBadgeWrapper = findNattoBadge(wrapper)
let mpAdvancedSearchBtnWrapper = findMpAdvancedSearchBtn(wrapper)

describe('OpenFilterButton', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoBadgeWrapper = findNattoBadge(wrapper)
    mpAdvancedSearchBtnWrapper = findMpAdvancedSearchBtn(wrapper)
  })

  describe('bindings with NattoBadge', () => {
    it('should pass props', () => {
      expect(nattoBadgeWrapper.props().value).toBe(0)
    })
  })

  describe('bindings with MpAdvancedSearchBtn', () => {
    describe('props bindings', () => {
      it('should have active class when advanced filters are opened', () => {
        expect(mpAdvancedSearchBtnWrapper.attributes('active')).toBe('true')
        expect(mpAdvancedSearchBtnWrapper.attributes('text')).toBe(
          'ged.search.input.advanced'
        )
      })
    })
    describe('events', () => {
      it('should trigger an open-advanced-filters event when MpAdvancedSearchBtn emit click', async () => {
        await mpAdvancedSearchBtnWrapper.vm.$emit('click')
        expect(wrapper.emitted('open-advanced-filters')).toBeTruthy()
      })
    })
  })
})

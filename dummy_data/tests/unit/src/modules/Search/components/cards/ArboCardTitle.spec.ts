import ArboCardTitle from '@/modules/Search/components/Cards/ArboCardTitle.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

/****
 * Wrapper types
 */
type ArboCardTitleProps = {
  title: string
}

type ArboCardTitleSetup = unknown

export type ArboCardTitleWrapper = VueWrapper<
  ComponentPublicInstance<ArboCardTitleProps, ArboCardTitleSetup>
>

/****
 * Wrapper creation
 */
const defaultProps: ArboCardTitleProps = {
  title: ''
}

const createWrapper = (props = defaultProps): ArboCardTitleWrapper =>
  wrapperFactory(ArboCardTitle, {
    props
  })

let wrapper = createWrapper()

describe('ArboCardTitle', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('rendering', () => {
    it('should render the title', () => {
      wrapper = createWrapper({ title: 'test' })

      expect(wrapper.text()).toContain('test')
    })
  })
})

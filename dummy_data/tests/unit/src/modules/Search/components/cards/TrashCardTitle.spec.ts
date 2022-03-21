import TrashCardTitle from '@/modules/Trash/components/Cards/TrashCardTitle.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

/****
 * Wrapper types
 */
type TrashCardTitleProps = {
  title: string
}

type TrashCardTitleSetup = unknown

export type TrashCardTitleWrapper = VueWrapper<
  ComponentPublicInstance<TrashCardTitleProps, TrashCardTitleSetup>
>

/****
 * Wrapper creation
 */
const defaultProps: TrashCardTitleProps = {
  title: ''
}

const createWrapper = (props = defaultProps): TrashCardTitleWrapper =>
  wrapperFactory(TrashCardTitle, {
    props
  })

let wrapper = createWrapper()

describe('TrashCardTitle', () => {
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

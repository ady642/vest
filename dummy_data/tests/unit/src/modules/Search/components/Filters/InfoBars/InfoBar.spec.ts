import InfoBar from '@/modules/Search/components/Filters/InfoBars/InfoBar.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import { computed, ComputedRef } from 'vue'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'

export type InfoBarWrapper = VueWrapper<
  ComponentPublicInstance<
    {
      nbDocuments: number
      title: string
      displayArrow: boolean
    },
    { handleClick: () => void; nbDocumentsDisplayed: number }
  >
>

const defaultProps: {
  nbDocuments?: number
  title?: string
  displayArrow?: boolean
  documentsLoading?: ComputedRef<boolean>
} = {
  nbDocuments: 3,
  title: 'azerty',
  displayArrow: true,
  documentsLoading: computed(() => false)
}

const createWrapper = ({
  nbDocuments = 3,
  title = 'azerty',
  displayArrow = true,
  documentsLoading = computed(() => false)
} = defaultProps): InfoBarWrapper =>
  wrapperFactory(InfoBar, {
    global: {
      provide: { documentsLoading }
    },
    props: {
      nbDocuments,
      title,
      displayArrow
    }
  })

let wrapper = createWrapper()

const findDocumentsNumberSpan = (wrapper: InfoBarWrapper) =>
  wrapper.findAll('span')[0]

describe('InfoBar', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('rendering', () => {
    it('Should display number and text when send props', () => {
      const spanWrapper: DOMWrapper<HTMLSpanElement>[] = wrapper.findAll('span')

      expect(spanWrapper.length).toBe(2)
      expect(spanWrapper[0].text()).toBe('3')
      expect(spanWrapper[1].text()).toBe('azerty')
    })
    it('Should display 0 results when documents loading', () => {
      // Given Documents are loading
      wrapper = createWrapper({
        documentsLoading: computed(() => true)
      })

      // Then I should see 0 results
      expect(findDocumentsNumberSpan(wrapper).text()).toBe('0')
    })
    describe('displayArrow', () => {
      const displayArrowCases = [
        { displayArrow: false, expected: false },
        { displayArrow: true, expected: true }
      ]

      test.each(displayArrowCases)(
        'Should have display set $expected at arrow when displayArrow is $displayArrow',
        ({ displayArrow, expected }) => {
          // Given displayArrow is set at false
          wrapper = createWrapper({ ...defaultProps, displayArrow })

          // Then the arrow must be displayed
          const arrowRightIcon: DOMWrapper<HTMLImageElement> =
            wrapper.find('.arrow')

          expect(arrowRightIcon.exists()).toBe(expected)
        }
      )
    })
  })
  describe('events', () => {
    it('Should fire click event when click on div', () => {
      const divWrapper: DOMWrapper<HTMLDivElement>[] = wrapper.findAll('div')

      expect(divWrapper.length).toBe(2)
      divWrapper[0].trigger('click')

      expect(wrapper.emitted()['click']).toBeTruthy()
      expect(wrapper.emitted()['click']).toHaveLength(1)
    })
  })
})

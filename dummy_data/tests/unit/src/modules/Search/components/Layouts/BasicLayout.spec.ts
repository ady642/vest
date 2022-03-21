import wrapperFactory from '../../../../../utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import BasicLayout from '@/modules/Search/components/Layouts/BasicLayout.vue'

const createWrapper = (headerSlot: string, contentSlot: string) =>
  wrapperFactory(BasicLayout, {
    slots: {
      header: headerSlot,
      content: contentSlot
    }
  })

describe('BasicLayout', () => {
  describe('rendering', () => {
    it('Should render header slot', () => {
      const wrapper = createWrapper(
        '<div>header slot</div>',
        '<div> content slot</div>'
      )
      const pWrapper: DOMWrapper<any> = wrapper.find('.basic-layout__header')

      expect(pWrapper.text()).toBe('header slot')
    })

    it('Should render content slot', () => {
      const wrapper = createWrapper(
        '<div>header slot</div>',
        '<div>content slot</div>'
      )
      const pWrapper: DOMWrapper<any> = wrapper.find('.basic-layout__content')

      expect(pWrapper.text()).toBe('content slot')
    })
  })
})

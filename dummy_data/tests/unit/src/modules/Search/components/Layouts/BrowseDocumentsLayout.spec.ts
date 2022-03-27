import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { DOMWrapper } from '@vue/test-utils'
import ArboViewLayout from '@/modules/Search/components/Layouts/ArboViewLayout.vue'
import BasicLayout from '@/modules/Search/components/Layouts/BasicLayout.vue'

const createWrapper = (documentsViewHeaderSlot = '', listViewSlot = '') =>
  wrapperFactory(ArboViewLayout, {
    slots: {
      'documents-view-header': documentsViewHeaderSlot,
      'list-view': listViewSlot
    },
    global: {
      stubs: {
        BasicLayout
      }
    }
  })

describe('ArboViewLayout', () => {
  describe('rendering', () => {
    it('When slots exist should display the content', () => {
      const wrapper = createWrapper(
        '<div id="header">nice header</div>',
        '<div id="list">nice list</div>'
      )
      const headerSlotWrapper: DOMWrapper<any> = wrapper.find('#header')
      const listSlotWrapper: DOMWrapper<any> = wrapper.find('#list')

      expect(headerSlotWrapper.text()).toBe('nice header')
      expect(listSlotWrapper.text()).toBe('nice list')
    })
  })
})

import NattoRefreshBtn from '@/Common/components/Buttons/NattoRefreshBtn.vue'
import { VueWrapper, mount } from '@vue/test-utils'

describe('natto-refresh-btn', () => {
  describe('events', () => {
    it('Should emit refresh event on click', async () => {
      const wrapper = mount(NattoRefreshBtn)
      const div = wrapper.find('.refresh-btn')
      await div.trigger('click')
      expect(wrapper.emitted('refresh')).toBeTruthy()
    })
  })
})

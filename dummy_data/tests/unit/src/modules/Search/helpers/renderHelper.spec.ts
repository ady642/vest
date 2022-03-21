import renderHelper from '@/Common/helpers/renderHelper'
import { defineComponent } from 'vue'

const testComponennt = defineComponent({
  props: ['total'],
  template: `
     <span>test params {{ total }}.</span>`
})

describe('renderHelper', () => {
  describe('binding', () => {
    it('Should pass props', () => {
      var renderedComponent = renderHelper.render(testComponennt, {
        total: 99
      })
      expect(renderedComponent?.props?.total).toBe(99)
    })
  })
})

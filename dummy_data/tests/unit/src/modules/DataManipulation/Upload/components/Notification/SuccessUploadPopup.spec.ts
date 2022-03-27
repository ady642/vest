import SuccessUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/SuccessUploadPopup.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'

const createWrapper = ({ successed }: { successed: number }) =>
  wrapperFactory(SuccessUploadPopup, {
    propsData: {
      successed
    }
  })

describe('SuccessUploadPopup', () => {
  describe('binding', () => {
    it('Should fire close event when button is clicked', () => {
      const wrapper = createWrapper({ successed: 10 })
      const iWrapper = wrapper.find('.close-icon')

      iWrapper.trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
      expect(wrapper.emitted('close')).toHaveLength(1)
    })
  })
  describe('rendering', () => {
    it('When successed value > 0 (plural) should display correct message', async () => {
      const wrapper = createWrapper({ successed: 10 })
      const pWrapper = wrapper.find('.sub-description')

      expect(pWrapper.text()).toBe('10 nouveaux fichiers déposés correctement')
    })

    it('When successed value == 1 (singular) should display correct message', async () => {
      const wrapper = createWrapper({
        successed: 1
      })
      const pWrapper = wrapper.find('.sub-description')

      expect(pWrapper.text()).toBe('1 nouveau fichier déposé correctement')
    })
  })
})

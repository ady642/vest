import InProgressUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/InProgressUploadPopup.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'

const createWrapper = ({
  loading,
  total,
  running
}: {
  loading: boolean
  total: number
  running: number
}) =>
  wrapperFactory(InProgressUploadPopup, {
    propsData: {
      loading,
      total,
      running
    },
    global: {
      stubs: {
        LoadingIcon
      }
    }
  })

describe('InProgressUploadPopup', () => {
  describe('binding', () => {
    it('Should fire cancel event when cancel button is clicked', () => {
      const wrapper = createWrapper({ loading: false, total: 10, running: 5 })
      const iWrapper = wrapper.find('.cancel-action')

      iWrapper.trigger('click')
      expect(wrapper.emitted('cancelUpload')).toBeTruthy()
      expect(wrapper.emitted('cancelUpload')).toHaveLength(1)
    })
  })
  describe('rendering', () => {
    it('Should display loader when loading is true', () => {
      const wrapper = createWrapper({ loading: true, total: 10, running: 5 })

      expect(wrapper.findComponent(LoadingIcon)).toBeTruthy()
    })
    it('Should display correct messages', async () => {
      const wrapper = createWrapper({ loading: false, total: 10, running: 5 })
      const pWrapper = wrapper.find('.description')

      expect(pWrapper.text()).toBe('Import en cours - 5/10')
    })

    it('Should display correct progress bar level', async () => {
      const wrapper = createWrapper({ loading: false, total: 10, running: 5 })
      const progressWrapper = wrapper.find('progress')

      expect(progressWrapper.attributes('max')).toBe('10')
      expect(progressWrapper.attributes('value')).toBe('5')
    })
  })
})

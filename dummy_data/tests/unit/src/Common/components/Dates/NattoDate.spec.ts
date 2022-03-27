import NattoDate from '@/Common/components/Dates/NattoDate.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'

const createWrapper = ({ date = '', format = '' } = {}) =>
  wrapperFactory(NattoDate, {
    props: { date, format }
  })

let wrapper = createWrapper()

describe('NattoDate', () => {
  describe('rendering', () => {
    it('should render the date formatted', () => {
      wrapper = createWrapper({
        date: '2019-01-19T10:00:00+00:00',
        format: 'DD MMMM YYYY'
      })

      expect(wrapper.html()).toContain('19 janvier 2019')
    })
  })
})

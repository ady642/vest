import DocumentCreationDateItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentCreationDateItem.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import NattoDate from '@/Common/components/Dates/NattoDate.vue'

const createWrapper = ({ creationDate = '' } = {}) =>
  wrapperFactory(DocumentCreationDateItem, {
    props: { creationDate }
  })

let wrapper = createWrapper()

describe('DocumentCreationDate', () => {
  describe('bindings', () => {
    it('creationDate <=> date', () => {
      // Given date is equal to '19-1-2019T10:00:00'
      wrapper = createWrapper({ creationDate: '19-1-2019T10:00:00' })

      // Then filename must be also equal to 'test'
      const nattoDateWrapper = wrapper.findComponent(NattoDate)

      expect(nattoDateWrapper.vm.date).toBe('19-1-2019T10:00:00')
    })
    it("'19-01-1929T10:00:00' <=> format", () => {
      // Given format is equal to 'DD MMMM YYYY'
      wrapper = createWrapper()

      // Then format must be also equal to 'DD MMMM YY'
      const nattoDateWrapper = wrapper.findComponent(NattoDate)

      expect(nattoDateWrapper.vm.format).toBe('DD MMMM YYYY')
    })
  })
})

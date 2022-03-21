import DocumentPathItem from '@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentPathItem.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import FilePathText from '@/Common/components/Text/FilePathText.vue'

const createWrapper = ({ path = [] }: { path: string[] } = { path: [] }) =>
  wrapperFactory(DocumentPathItem, {
    props: { path }
  })

describe('DocumentPathItem', () => {
  describe('bindings', () => {
    it('path <=> filepath', () => {
      // Given name is equal to 'test'
      const wrapper = createWrapper({ path: ['folderA', 'folderB'] })

      // Then filename must be also equal to 'test'
      const filePathTextWrapper = wrapper.findComponent(FilePathText)

      expect(filePathTextWrapper.vm.filePath).toStrictEqual([
        'folderA',
        'folderB'
      ])
    })
  })
})

import UploadFileListItem from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileListItem.vue'
import FilenameText from '@/Common/components/Text/FilenameText.vue'
import DocumentUploadStateIcon from '@/modules/Search/components/DocumentUploadStateIcon.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

const createWrapper = (file: FileUpload, selected: boolean) =>
  wrapperFactory(UploadFileListItem, {
    global: {
      stubs: {
        FilenameText,
        DocumentUploadStateIcon
      }
    },
    propsData: {
      file,
      selected
    },
    shallow: true
  })

const content = 'mock content'
const data = new Blob([content], { type: 'application/zip' })
const arrayOfBlob = new Array<Blob>()

arrayOfBlob.push(data)
const mockZip = new File(arrayOfBlob, 'Mock.zip')
const file = new FileUpload(mockZip, StateUpload.UPLOADED)

describe('UploadFileListItem', () => {
  describe('bindings', () => {
    it('div should have 1 class when send selected false props', () => {
      const wrapper = createWrapper(file, false)
      const divWrapper: DOMWrapper<HTMLDivElement>[] = wrapper.findAll('div')

      expect(divWrapper.length).toBe(1)
      expect(divWrapper[0].classes()).toHaveLength(1)
      expect(divWrapper[0].classes()[0]).toBe('file-item')
    })

    it('div class should contains 2 class when send selected true props', () => {
      const wrapper = createWrapper(file, true)
      const divWrapper: DOMWrapper<HTMLDivElement>[] = wrapper.findAll('div')

      expect(divWrapper.length).toBe(1)
      expect(divWrapper[0].classes()).toHaveLength(2)
      expect(divWrapper[0].classes()[0]).toBe('file-item')
      expect(divWrapper[0].classes()[1]).toBe('selected')
    })
  })
  describe('rendering', () => {
    describe('props', () => {
      it('Should display FilenameText and DocumentUploadStateIcon when send file and selected props', () => {
        const wrapper = createWrapper(file, false)
        const textWrappper: VueWrapper<any>[] =
          wrapper.findAllComponents(FilenameText)
        const icontWrappper: VueWrapper<any>[] = wrapper.findAllComponents(
          DocumentUploadStateIcon
        )

        expect(textWrappper).toHaveLength(1)
        expect(textWrappper[0].vm.filename).toEqual('Mock.zip')

        expect(icontWrappper).toHaveLength(1)
        expect(icontWrappper[0].vm.status).toEqual(StateUpload.UPLOADED)
      })
    })
  })
})

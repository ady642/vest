import UploadFileList from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileList.vue'
import UploadFileListItem from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileListItem.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { StateUpload } from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import useElement from 'dummy_data/tests/unit/utils/useElementStubs'

const { ElScrollbar } = useElement()

const createWrapper = (files: FileUpload[]) =>
  wrapperFactory(UploadFileList, {
    global: {
      stubs: {
        UploadFileListItem,
        ElScrollbar
      }
    },
    propsData: {
      files
    }
  })

const content = 'mock content'
const data = new Blob([content], { type: 'application/zip' })
const arrayOfBlob = new Array<Blob>()

arrayOfBlob.push(data)
const mockZip = new File(arrayOfBlob, 'Mock.zip')
const mockZip2 = new File(arrayOfBlob, 'Mock2.zip')
const file = new FileUpload(mockZip, StateUpload.UPLOADING)
const file2 = new FileUpload(mockZip2, StateUpload.UPLOADING)
const files = new Array<FileUpload>()

files.push(file)
files.push(file2)

describe('UploadFileList', () => {
  describe('bindings', () => {
    describe('events', () => {
      it('Should fire display-file event and change fileSelected data when click event is fired', () => {
        const wrapper = createWrapper(files)
        const itemWrappper: VueWrapper<any> =
          wrapper.findComponent(UploadFileListItem)

        itemWrappper.vm.$emit('click', 27)
        expect(wrapper.emitted()['display-file']).toBeTruthy()
        expect(wrapper.emitted()['display-file']).toHaveLength(1)
        expect(wrapper.emitted()['display-file'][0]).toStrictEqual([0])
      })
    })
  })
  describe('rendering', () => {
    it('Should display item when send files props', async () => {
      const wrapper = createWrapper(files)
      const itemWrappper: VueWrapper<any>[] =
        wrapper.findAllComponents(UploadFileListItem)

      expect(itemWrappper).toHaveLength(2)
      expect(itemWrappper[0].vm.file).toEqual(file)
      expect(itemWrappper[0].vm.selected).toEqual(true)
      expect(itemWrappper[1].vm.file).toEqual(file2)
      expect(itemWrappper[1].vm.selected).toEqual(false)
    })
  })
})

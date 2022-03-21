import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { DOMWrapper } from '@vue/test-utils'
import MainViewLayout from '@/modules/Search/components/Layouts/MainViewLayout.vue'
import BasicLayout from '@/modules/Search/components/Layouts/BasicLayout.vue'
import MainHeader from '@/modules/Search/components/Headers/MainHeader.vue'
import DocumentsUploadBox from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBox.vue'

const createWrapper = (
  categorySlot = '',
  dragFileSlot = '',
  disabled: boolean,
  hasAccessDs: boolean,
  isMainViewBtn: boolean,
  tree = ''
) =>
  wrapperFactory(MainViewLayout, {
    props: {
      hasAccessDs,
      isMainViewBtn,
      disabled
    },
    slots: {
      category: categorySlot,
      dragfile: dragFileSlot,
      tree
    },
    global: {
      stubs: {
        BasicLayout,
        MainHeader,
        DocumentsUploadBox
      },
      renderStubDefaultSlot: true
    }
  })

describe('MainViewLayout', () => {
  describe('rendering', () => {
    it('When Category slots exist should display the conntent', () => {
      const wrapper = createWrapper(
        '<div id="searchme">nice div</div>',
        '',
        true,
        true,
        false
      )
      const categorySlotWrapper: DOMWrapper<any> = wrapper.find('#searchme')

      expect(categorySlotWrapper.text()).toBe('nice div')
    })

    it('When DragFile slots exist should display the conntent', () => {
      const wrapper = createWrapper(
        '',
        '<div id="searchmeDragFile">nice div dragfile</div>',
        true,
        true,
        false
      )
      const dragFileSlot: DOMWrapper<any> = wrapper.find('#searchmeDragFile')

      expect(dragFileSlot.text()).toBe('nice div dragfile')
    })
  })
  describe('MainHeader bindings', () => {
    it('Should pass the correct disabled prop to child component ', () => {
      const wrapper = createWrapper(
        '',
        '<div id="searchmeDragFile">nice div dragfile</div>',
        true,
        true,
        false
      )
      const MainHeaderWrapper = wrapper.findComponent(MainHeader)

      expect(wrapper.props('disabled')).toBe(
        MainHeaderWrapper.props('disabled')
      )
    })
    it('Should pass the correct hasAccessDs prop to child component ', () => {
      const wrapper = createWrapper(
        '',
        '<div id="searchmeDragFile">nice div dragfile</div>',
        true,
        true,
        false
      )
      const MainHeaderWrapper = wrapper.findComponent(MainHeader)

      expect(wrapper.props('hasAccessDs')).toBe(
        MainHeaderWrapper.props('hasAccessDs')
      )
    })
    it('Should pass the correct isMainViewBtn prop to child component ', () => {
      const wrapper = createWrapper(
        '',
        '<div id="searchmeDragFile">nice div dragfile</div>',
        true,
        true,
        false
      )
      const MainHeaderWrapper = wrapper.findComponent(MainHeader)

      expect(wrapper.props('isMainViewBtn')).toBe(
        MainHeaderWrapper.props('isMainViewBtn')
      )
    })
    describe('events', () => {
      it('Should emit upload-triggered when on-files-change fired', () => {
        const wrapper = createWrapper(
          '',
          '<div id="searchmeDragFile">nice div dragfile</div>',
          true,
          true,
          false
        )

        const mainHeaderWrapper = wrapper.findComponent(MainHeader)

        const content = 'mock content'
        const data = new Blob([content], { type: 'application/zip' })
        const arrayOfBlob = new Array<Blob>()

        arrayOfBlob.push(data)
        const mockZip = new File(arrayOfBlob, 'Mock.zip')
        const mockZip2 = new File(arrayOfBlob, 'Mock2.zip')
        const files = new Array<File>()

        files.push(mockZip)
        files.push(mockZip2)

        mainHeaderWrapper.vm.$emit('upload-triggered', files)

        expect(wrapper.emitted()['upload-triggered']).toBeTruthy()
        expect(wrapper.emitted()['upload-triggered']).toHaveLength(1)
        expect(wrapper.emitted()['upload-triggered'][0]).toStrictEqual([files])
      })
    })
  })
})

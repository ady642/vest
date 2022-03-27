import MainHeader from '@/modules/Search/components/Headers/MainHeader.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import NattoHeader from '@/Common/components/Header/NattoHeader.vue'
import DocumentsUploadBtn from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

const { MpTitle } = useStyleguideStubs()

const createWrapper = (
  disabled: boolean,
  hasAccessDs: boolean,
  isMainViewBtn: boolean
) =>
  wrapperFactory(MainHeader, {
    props: {
      disabled,
      hasAccessDs,
      isMainViewBtn
    },
    global: {
      stubs: { NattoHeader, DocumentsUploadBtn, MpTitle },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

let wrapper = createWrapper(false, true, true)

const findNattoHeader = (
  wrapper: VueWrapper<
    ComponentPublicInstance<{ title: string; subtitle: string }>
  >
): VueWrapper<ComponentPublicInstance<{ title: string; subtitle: string }>> =>
  wrapper.findComponent(NattoHeader)

describe('MainHeader', () => {
  describe('bindings', () => {
    describe('props', () => {
      it('should bind the title to the NattoHeader title prop', () => {
        // Given the title is equal to 'Mes Documents'
        wrapper = createWrapper(false, true, true)

        // Then NattoHeader should have 'Mes Documents' as title prop
        const NattoHeaderWrapper = findNattoHeader(wrapper)

        expect(NattoHeaderWrapper.attributes().title).toBe('ged.title')
      })
      it('should bind the subtitle to the NattoHeader subtitle prop', () => {
        // Given the subtitle is equal to 'l'activité de votre GED'
        wrapper = createWrapper(false, true, true)

        // Then NattoHeader should have 'l'activité de votre GED' as subtitle prop
        const NattoHeaderWrapper = findNattoHeader(wrapper)

        expect(NattoHeaderWrapper.attributes().subtitle).toBe('ged.subTitle')
      })
    })
  })
  describe('bindings with documents-upload-btn', () => {
    it('Should pass correct disabled to child component', () => {
      const DocumentsUploadBtnWrapper =
        wrapper.findComponent(DocumentsUploadBtn)

      expect(wrapper.props('disabled')).toBe(
        DocumentsUploadBtnWrapper.props('disabled')
      )
    })
    it('Should pass correct hasAccessDs to child component', () => {
      const DocumentsUploadBtnWrapper =
        wrapper.findComponent(DocumentsUploadBtn)

      expect(wrapper.props('hasAccessDs')).toBe(
        DocumentsUploadBtnWrapper.props('hasAccessDs')
      )
    })
    it('Should pass correct isMainViewBtn to child component', () => {
      const DocumentsUploadBtnWrapper =
        wrapper.findComponent(DocumentsUploadBtn)

      expect(wrapper.props('isMainViewBtn')).toBe(
        DocumentsUploadBtnWrapper.props('isMainViewBtn')
      )
    })
  })
  describe('events', () => {
    it('Should emit upload-triggered when on-files-change fired', () => {
      const uploadbWrapper: VueWrapper<any> =
        wrapper.findComponent(DocumentsUploadBtn)

      const content = 'mock content'
      const data = new Blob([content], { type: 'application/zip' })
      const arrayOfBlob = new Array<Blob>()

      arrayOfBlob.push(data)
      const mockZip = new File(arrayOfBlob, 'Mock.zip')
      const mockZip2 = new File(arrayOfBlob, 'Mock2.zip')
      const files = new Array<File>()

      files.push(mockZip)
      files.push(mockZip2)

      uploadbWrapper.vm.$emit('on-files-change', files)

      expect(wrapper.emitted()['upload-triggered']).toBeTruthy()
      expect(wrapper.emitted()['upload-triggered']).toHaveLength(1)
      expect(wrapper.emitted()['upload-triggered'][0]).toStrictEqual([files])
    })
  })
})

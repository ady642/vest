import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'
import NattoUploadBtn from '@/Common/components/Upload/Buttons/NattoUploadBtn.vue'
import NattoUploadFilesBtn from '@/Common/components/Upload/Buttons/NattoUploadFilesBtn.vue'
import useStyleguide from 'tests/unit/utils/useStyleguideStubs'

type NattoUploadFilesProps = {
  icon: string
  buttoninnerText: string
  disabled: boolean
  canUploadFiles: boolean
  hasAccessDs: boolean
  isMainViewBtn: boolean
}

type NattoUploadFilesSetup = {}

export type NattoUploadFilesTypeWrapper = VueWrapper<
  ComponentPublicInstance<NattoUploadFilesProps, NattoUploadFilesSetup>
>

const { MpButton } = useStyleguide()

const defaultProps = {
  icon: 'icon-value',
  buttoninnerText: 'btn inner text',
  disabled: false,
  canUploadFiles: true,
  hasAccessDs: true,
  isMainViewBtn: true
}

const createWrapper = (props = defaultProps): NattoUploadFilesTypeWrapper =>
  wrapperFactory(NattoUploadFilesBtn, {
    props,
    global: {
      stubs: {
        NattoUploadBtn,
        NattoIcon,
        MpButton,
        ElUpload: {}
      },
      renderStubDefaultSlot: true
    }
  })

let wrapper = createWrapper()

describe('NattoUploadFilesBtn', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('binding', () => {
    it('Should pass prop disabled correctly to natto-upload-btn', () => {
      const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn)

      expect(wrapper.props('disabled')).toBe(
        NattoUploadBtnWrapper.props('disabled')
      )
    })
  })
  describe('rendring', () => {
    it('Should display the correct button text', () => {
      const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn)
      const innerText = NattoUploadBtnWrapper.find('.btn-text')

      expect(innerText.text()).toBe(wrapper.props('buttoninnerText'))
    })
    describe('In arbo view', () => {
      const disabledCases = [
        {
          disabled: true,
          canUploadFiles: true,
          hasAccessDs: true,
          isMainViewBtn: false,
          expectedValue: true
        },
        {
          disabled: false,
          canUploadFiles: false,
          hasAccessDs: true,
          isMainViewBtn: false,
          expectedValue: true
        },
        {
          disabled: false,
          canUploadFiles: true,
          hasAccessDs: false,
          isMainViewBtn: false,
          expectedValue: true
        }
      ]

      test.each(disabledCases)(
        'disabled cases',
        ({
          disabled,
          canUploadFiles,
          hasAccessDs,
          isMainViewBtn,
          expectedValue
        }) => {
          // Given props are set
          wrapper = createWrapper({
            icon: 'icon-value',
            buttoninnerText: 'btn inner text',
            disabled,
            canUploadFiles,
            hasAccessDs,
            isMainViewBtn
          })
          const btnWrapper = wrapper.findComponent(MpButton)

          expect(btnWrapper.props('disabled')).toBe(expectedValue)
        }
      )
    })
    it('Should be hidden when hasAccessDs is false', () => {
      wrapper = createWrapper({
        icon: 'icon-value',
        buttoninnerText: 'btn inner text',
        disabled: false,
        canUploadFiles: true,
        hasAccessDs: false,
        isMainViewBtn: true
      })
      const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn)

      expect(NattoUploadBtnWrapper.exists()).toBe(false)
    })
  })
  describe('events', () => {
    it('should emit on-files-change on natto-upload-btn files change event', async () => {
      const NattoUploadBtnWrapper = await wrapper.findComponent(NattoUploadBtn)

      NattoUploadBtnWrapper.vm.$emit('on-files-change')

      expect(wrapper.emitted('on-files-change')).toBeTruthy()
    })
  })
})

import NattoUploadBox from '@/Common/components/Upload/Box/NattoUploadBox.vue'
import UploadBoxIcon from '@/Common/components/Icons/UploadBoxIcon.vue'
import WaitIcon from '@/Common/components/Icons/WaitIcon.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import NattoDropZone from '@/Common/components/Upload/NattoDropZone.vue'
import { ComponentPublicInstance } from 'vue'
import * as translationHelper from '@/Common/hooks/useTranslation'

type NattoUploadBoxProps = {
  supportedTypes: string[]
  disabled: boolean
}

type NattoUploadBoxSetup = {
  authorizedTypes: string
  onFilesChange: () => void
  handleDragZoneClick: () => void
  boxInnerText: string
}

export type NattoUploadBoxTypeWrapper = VueWrapper<
  ComponentPublicInstance<NattoUploadBoxProps, NattoUploadBoxSetup>
>

const defaultProps: NattoUploadBoxProps = {
  supportedTypes: ['ext1', 'ext2'],
  disabled: false
}

const createWrapper = (props = defaultProps): NattoUploadBoxTypeWrapper =>
  wrapperFactory(NattoUploadBox, {
    props,
    global: {
      stubs: {
        WaitIcon,
        UploadBoxIcon,
        NattoDropZone
      },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })
let tMock = jest.fn()
let tcMock = jest.fn()

jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
  t: tMock,
  tc: tcMock
})

let wrapper = createWrapper()
let NattoDropZoneWrapper = wrapper.findComponent(NattoDropZone)

describe('NattoUploadBox', () => {
  beforeEach(() => {
    tMock = jest.fn()
    tcMock = jest.fn()
    jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
      t: tMock,
      tc: tcMock
    })
    wrapper = createWrapper()
    NattoDropZoneWrapper = wrapper.findComponent(NattoDropZone)
  })
  describe('binding', () => {
    describe('props', () => {
      const cases = [
        {
          prop: 'supportedTypes',
          expectedValue: ['ext1', 'ext2']
        },
        {
          prop: 'disabled',
          expectedValue: false
        }
      ]

      test.each(cases)('Test binding own props', ({ prop, expectedValue }) => {
        expect(wrapper.props(prop)).toEqual(expectedValue)
      })
      describe('NattoDropZone', () => {
        const cases = [
          {
            prop: 'disabled',
            expectedValue: false
          }
        ]

        test.each(cases)(
          'Test binding with NattoDropZone',
          ({ prop, expectedValue }) => {
            expect(NattoDropZoneWrapper.props(prop)).toEqual(expectedValue)
          }
        )
      })
    })
    describe('events', () => {
      describe('NattoUploadBox', () => {
        it('Should emit on-files-change on files-changes', async () => {
          NattoDropZoneWrapper.vm.$emit('files-changes', [
            new File([''], 'File 1')
          ])
          expect(wrapper.emitted('on-files-change')).toHaveLength(1)
          expect(wrapper.emitted('on-files-change')).toEqual([
            [[new File([''], 'File 1')]]
          ])
        })
      })
      describe('input', () => {
        it('Should emit on-files-change when change event fired one or multiple time', async () => {
          const InputFileWrapper = wrapper.find('.uploadInput')

          InputFileWrapper.trigger('change')
          expect(wrapper.emitted('on-files-change')).toHaveLength(1)
          InputFileWrapper.trigger('change')
          expect(wrapper.emitted('on-files-change')).toHaveLength(2)
        })
      })
    })
    describe('rendering', () => {
      describe('enabled state', () => {
        it('Should have the proper ui specs: Icon', () => {
          const NattoUploadBoxWrapper = wrapper.findComponent(UploadBoxIcon)

          expect(NattoUploadBoxWrapper.exists()).toBeTruthy()
        })
      })
      describe('disabled state', () => {
        it('Should have the proper ui specs: Icon', () => {
          wrapper = createWrapper({
            supportedTypes: ['ext1', 'ext2'],
            disabled: true
          })
          const NattoUploadBoxWrapper = wrapper.findComponent(WaitIcon)

          expect(NattoUploadBoxWrapper.exists()).toBeTruthy()
        })
      })
    })
  })
})

import NattoDropZone from '@/Common/components/Upload/NattoDropZone.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import * as dataTransferHelper from '@/Common/helpers/dataTransferHelper'

const fileMock = new File([''], 'filename', { type: 'text/html' })

jest
  .spyOn(dataTransferHelper, 'getFilesFromDataTransfer')
  .mockReturnValue(Promise.resolve([fileMock]))

type NattoDropZonePropsType = {
  disabled: boolean
  dragOverEnabledClass: string
  dragOverDisabledClass: string
}
const createWrapper = ({
  disabled,
  dragOverDisabledClass,
  dragOverEnabledClass
}: NattoDropZonePropsType) =>
  wrapperFactory(NattoDropZone, {
    props: {
      disabled,
      dragOverDisabledClass,
      dragOverEnabledClass
    }
  })

type renderingTestType = {
  props: NattoDropZonePropsType
  dragOver: boolean
  expectedClasses: string
}
const renderingTestCases: renderingTestType[] = [
  {
    dragOver: false,
    props: {
      disabled: false,
      dragOverDisabledClass: 'drag-over-disabled',
      dragOverEnabledClass: 'drag-over-enabled'
    },
    expectedClasses: 'natto-dropzone__container'
  },
  {
    dragOver: true,
    props: {
      disabled: false,
      dragOverDisabledClass: 'drag-over-disabled',
      dragOverEnabledClass: 'drag-over-enabled'
    },
    expectedClasses:
      'natto-dropzone__container natto-dropzone__container--dragged-over drag-over-enabled'
  },
  {
    dragOver: false,
    props: {
      disabled: true,
      dragOverDisabledClass: 'drag-over-disabled',
      dragOverEnabledClass: 'drag-over-enabled'
    },
    expectedClasses: 'natto-dropzone__container'
  },
  {
    dragOver: true,
    props: {
      disabled: true,
      dragOverDisabledClass: 'drag-over-disabled',
      dragOverEnabledClass: 'drag-over-enabled'
    },
    expectedClasses: 'natto-dropzone__container drag-over-disabled'
  }
]

describe('NattoDropZone', () => {
  describe('events', () => {
    it('Should emits files-changes when files dropped', async () => {
      const wrapper = createWrapper({
        disabled: false,
        dragOverDisabledClass: 'drag-over-disabled',
        dragOverEnabledClass: 'drag-over-enabled'
      })

      wrapper.trigger('drop', { dataTransfer: 'awesome-dataTransfer-object' })

      await wrapper.vm.$nextTick()
      const response: File[] = wrapper.emitted()['files-changes'][0] as File[]

      expect(response[0]).toStrictEqual([fileMock])
    })
  })
  describe('rendering', () => {
    test.each(renderingTestCases)(
      'When drag disabled=$props.disabled and dragOver=$dragOver',
      async ({ props, dragOver, expectedClasses }: renderingTestType) => {
        const wrapper = createWrapper(props)

        if (dragOver) {
          wrapper.trigger('dragover')
        }
        await wrapper.vm.$nextTick()
        expect(wrapper.classes().join(' ')).toBe(expectedClasses)
      }
    )
  })
})

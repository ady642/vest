import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import CommentsTab from '@/modules/Search/components/Drawer/CommentsTab.vue'
import useStyleguide from 'tests/unit/utils/useStyleguideStubs'
import useElementStubs from 'tests/unit/utils/useElementStubs'

const { ElInput } = useElementStubs()

const { MpInput } = useStyleguide()

type CommentTabProps = {
  documentId: string
  commentDate: string
  currentComment?: string
}
type CommentsTabSetup = {
  updateComWhenInputChange: () => void
  comment: string
}

export type CommentsTabTypeWrapper = VueWrapper<
  ComponentPublicInstance<CommentTabProps, CommentsTabSetup>
>

const defaultProps: CommentTabProps = {
  documentId: 'test',
  commentDate: 'test',
  currentComment: ''
}

let storeMock = createSearchStoreMocked()

const createWrapper = (store = storeMock, props = defaultProps) =>
  wrapperFactory(CommentsTab, {
    props,
    global: {
      plugins: [store],
      stubs: { ElInput, MpInput },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

const findMpInput = (wrapper: CommentsTabTypeWrapper): VueWrapper<any> =>
  wrapper.findComponent({ name: 'mp-input' })

let wrapper = createWrapper()

describe('CommentsTab', () => {
  beforeEach(() => {
    storeMock = createSearchStoreMocked()
    storeMock.dispatch = jest.fn()
    wrapper = createWrapper()
  })
  describe('binding with MpInput', () => {
    describe('props', () => {
      it('Should pass the correct modelValue', () => {
        wrapper = createWrapper(storeMock)
        const input = findMpInput(wrapper)

        expect(input.props('modelValue')).toStrictEqual('')
      })
    })
    describe('events', () => {
      it('Should dispatch patch document on input change ', async () => {
        const input = wrapper.findComponent(MpInput)

        await input.vm.$emit('update:modelValue', 'test')
        await input.vm.$emit('change')

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/patchDocumentComment',
          { documentId: 'test', value: 'test' }
        )
      })
      it('Should not dispatch patch document on input change when input is an empty string ', async () => {
        const input = wrapper.findComponent(MpInput)

        await input.vm.$emit('update:modelValue', '')
        await input.vm.$emit('change')

        expect(storeMock.dispatch).toHaveBeenCalledTimes(0)
      })
    })
  })
})

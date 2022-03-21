import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import TrashDocumentOriginItem from '@/modules/Trash/components/TrashDocumentTableItems/TrashDocumentTableOriginItem.vue'
import FilenameText from '@/Common/components/Text/FilenameText.vue'

export type TrashDocumentOriginItemTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    origin: string
  }>
>

const createWrapper = (origin: string): TrashDocumentOriginItemTypeWrapper =>
  wrapperFactory(TrashDocumentOriginItem, {
    props: {
      origin
    },
    global: {
      stubs: {
        FilenameText
      }
    }
  })

let wrapper = createWrapper('KPMG')

describe('TrashDocumentOriginItem', () => {
  beforeEach(() => {
    wrapper = createWrapper('KPMG')
  })
  describe('binding', () => {
    it('Should bind origin prop correctly', () => {
      const FilenameTextWrapper = wrapper.findComponent(FilenameText)

      expect(FilenameTextWrapper.props('filename')).toEqual(
        wrapper.props('origin')
      )
    })
  })
})

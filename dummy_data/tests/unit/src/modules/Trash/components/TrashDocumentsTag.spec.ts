import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import NattoTag from '@/Common/components/Tags/NattoTag.vue'
import TrashDocumentsTag from '@/modules/Trash/components/TrashDocumentsTag.vue'
import useElementStubs from '../../../../utils/useElementStubs'
import { NattoTagWrapper } from '../../../Common/components/Tags/NattoTag.spec'

export type TrashDocumentsTagTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    text: string
    color: string
    closable: boolean
  }>
>

const { ElTag } = useElementStubs()

const createWrapper = (
  text: string,
  color: string,
  closable: boolean
): TrashDocumentsTagTypeWrapper =>
  wrapperFactory(TrashDocumentsTag, {
    props: {
      text,
      color,
      closable
    },
    global: {
      stubs: {
        NattoTag,
        ElTag
      }
    }
  })

const findNattoTagWrapper = (
  wrapper: TrashDocumentsTagTypeWrapper
): NattoTagWrapper => wrapper.findComponent(NattoTag)

let wrapper = createWrapper('some text', 'color', false)

describe('TrashDocumentsTag', () => {
  beforeEach(() => {
    wrapper = createWrapper('some text', 'color', false)
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind text prop correctly', () => {
        const nattoTagWrapper = findNattoTagWrapper(wrapper)

        expect(nattoTagWrapper.text()).toContain('some text')
      })
      it('Should bind closable prop correctly', () => {
        const nattoTagWrapper = findNattoTagWrapper(wrapper)

        expect(nattoTagWrapper.props('closable')).toEqual(
          wrapper.props('closable')
        )
      })
    })
  })
})

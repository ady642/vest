import DocumentIcon from '@/Common/components/Icons/DocumentIcon.vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { NattoIconWrapperType } from 'tests/unit/src/Common/components/Icons/NattoIcon.spec'

export type DocumentIconWrapper = VueWrapper<
  ComponentPublicInstance<{ src: string }>
>

const createWrapper = ({ src }: { src: string }): DocumentIconWrapper =>
  wrapperFactory(DocumentIcon, {
    props: { src }
  })

let wrapper = createWrapper({ src: 'test' })

const findNattoIcon = (wrapper: DocumentIconWrapper): NattoIconWrapperType =>
  wrapper.findComponent(NattoIcon)

describe('DocumentIcon', () => {
  describe('bindings', () => {
    describe('props', () => {
      it('should pass the src prop to NattoIcon child', () => {
        wrapper = createWrapper({ src: '@/assets/Icons/myIcon.svg' })

        const nattoIconWrapper = findNattoIcon(wrapper)

        expect(nattoIconWrapper.props().src).toBe('@/assets/Icons/myIcon.svg')
      })
    })
  })
})

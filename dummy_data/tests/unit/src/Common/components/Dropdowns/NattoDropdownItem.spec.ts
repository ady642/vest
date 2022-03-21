import NattoDropdownItem from '@/Common/components/Dropdown/NattoDropdownItem.vue'
import NattoTooltip from '@/Common/components/Tooltips/NattoTooltip.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useElementStubs from 'tests/unit/utils/useElementStubs'

const { ElDropdownItem, ElTooltip } = useElementStubs()

export type NattoDropdownItemProps = {
  icon?: string
  label: string
  disabled?: boolean
}

type NattoDropdownItemSetup = unknown

export type NattoDropdownItemWrapper = VueWrapper<
  ComponentPublicInstance<NattoDropdownItemProps, NattoDropdownItemSetup>
>

const defaultProps: NattoDropdownItemProps = {
  label: 'test'
}

const createWrapper = (props = defaultProps): NattoDropdownItemWrapper =>
  wrapperFactory(NattoDropdownItem, {
    props,
    global: {
      stubs: { ElDropdownItem, NattoTooltip, ElTooltip }
    }
  })

let wrapper = createWrapper()
const findElDropdownItem = (wrapper: NattoDropdownItemWrapper) =>
  wrapper.findComponent(ElDropdownItem)

describe('NattoDropdownItem', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('bindings with ElDropdownItem', () => {
    it('props <=> :props', () => {
      wrapper = createWrapper({
        icon: 'delete',
        label: 'Supprimer',
        disabled: false
      })

      const ElDropdownItemWrapper = findElDropdownItem(wrapper)

      expect(ElDropdownItemWrapper.props('icon')).toBe('el-icon-delete')
      expect(ElDropdownItemWrapper.props('disabled')).toBe(false)
      expect(ElDropdownItemWrapper.text()).toContain('Supprimer')
    })
    describe('events', () => {
      it('should emit click when ElDropdownItem is clicked', async () => {
        const ElDropdownItemWrapper = findElDropdownItem(wrapper)

        await ElDropdownItemWrapper.vm.$emit('click')

        expect(wrapper.emitted('click')).toHaveLength(1)
      })
    })
  })
})

import NattoSelect from '@/Common/components/Select/NattoSelect.vue'
import SelectOption from '@/Common/models/Select/SelectOption'

import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import useElement from 'tests/unit/utils/useElementStubs'

const { ElSelect, ElOption } = useElement()

const createWrapper = (modelValue: number, options: Array<SelectOption>) =>
  wrapperFactory(NattoSelect, {
    propsData: {
      modelValue,
      options
    },
    global: {
      stubs: { ElSelect, ElOption }
    }
  })

let wrapper: VueWrapper<any> = createWrapper(1, [
  new SelectOption('', undefined),
  new SelectOption('l1', 1),
  new SelectOption('l2', 2),
  new SelectOption('l3', 3)
])

describe('NattoSelect', () => {
  beforeEach(() => {
    wrapper = createWrapper(1, [
      new SelectOption('', undefined),
      new SelectOption('l1', 1),
      new SelectOption('l2', 2),
      new SelectOption('l3', 3)
    ])
  })
  describe('bindings', () => {
    describe('props', () => {
      it('Should send correctly props to ElSelect component - default case', () => {
        const elSelectWrapper = wrapper.findComponent(ElSelect)

        expect(elSelectWrapper.props('modelValue')).toBe(1)
      })
      it('Should send correctly props to ElSelect component - non default case', () => {
        wrapper = createWrapper(1, [
          new SelectOption('', undefined),
          new SelectOption('l1', 1),
          new SelectOption('l2', 2),
          new SelectOption('l3', 3)
        ])
        const elSelectWrapper = wrapper.findComponent(ElSelect)

        expect(elSelectWrapper.props('modelValue')).toBe(1)
      })
    })
  })
  describe('events', () => {
    test('Switch of el select value should trigger an emit from NattoSelect', () => {
      const elSelectWrapper = wrapper.findComponent(ElSelect)

      elSelectWrapper.vm.$emit('update:modelValue', 2)

      expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })
})

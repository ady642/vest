import NattoInput from '@/Common/components/Inputs/NattoInput.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import { NattoInputProps, NattoInputWrapper } from './NattoInputType'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

const { MpInput } = useStyleguideStubs()

jest.useRealTimers()

const findMpInput = (wrapper: NattoInputWrapper): VueWrapper<any> =>
  wrapper.findComponent(MpInput)

const defaultProps: NattoInputProps = {
  modelValue: ''
}

const createWrapper = (props = defaultProps): NattoInputWrapper =>
  wrapperFactory(NattoInput, {
    global: {
      stubs: { MpInput }
    },
    props
  })

let wrapper = createWrapper()
let mpInputWrapper = findMpInput(wrapper)

describe('NattoInput', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    mpInputWrapper = findMpInput(wrapper)
  })
  describe('binding', () => {
    it('should binds with the props', () => {
      const wrapper = createWrapper({
        modelValue: 'test',
        placeholder: 'Ma recherche ici',
        disabled: false,
        clearable: true
      })

      const mpInputWrapper = findMpInput(wrapper)

      expect(mpInputWrapper.props().modelValue).toBe('test')
      expect(mpInputWrapper.attributes().placeholder).toBe('Ma recherche ici')
      expect(mpInputWrapper.attributes().disabled).toBe('false')
      expect(mpInputWrapper.attributes().clearable).toBe('true')
    })
    it('should reset model-value prop of ElInput when search changes', async () => {
      // When search prop changes
      await wrapper.setProps({ modelValue: 'gustave' })

      // Then ElInput model-value prop must be gustave
      expect(findMpInput(wrapper).props().modelValue).toBe('gustave')
    })
  })
  describe('events', () => {
    it('Should fire update:modelValue event when ElInput emit input', async () => {
      await mpInputWrapper.vm.$emit('input')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
    it('Should fire handleChange when input is fired from el input', async () => {
      await mpInputWrapper.vm.$emit('input', 'test')

      expect(wrapper.emitted()['update:modelValue'].length).toBe(1)
      expect(wrapper.emitted()['update:modelValue'][0]).toStrictEqual(['test'])
    })
    it('Should emit update:modelValue when input is emitted from el input when debounce is NOT active', async () => {
      wrapper = createWrapper({
        modelValue: ''
      })

      mpInputWrapper = findMpInput(wrapper)
      await mpInputWrapper.vm.$emit('input', 'test')
      await flushPromises()

      expect(wrapper.emitted()['update:modelValue'].length).toBe(1)
      expect(wrapper.emitted()['update:modelValue']).toStrictEqual([['test']])
    })
    it('Should fire handleChange when input is fired from el input when debounce is active', async (done) => {
      wrapper = createWrapper({
        modelValue: '',
        debounceTime: 1000
      })

      mpInputWrapper = findMpInput(wrapper)
      await mpInputWrapper.vm.$emit('input', 'test')

      setTimeout(() => {
        expect(wrapper.emitted()['update:modelValue'].length).toBe(1)
        expect(wrapper.emitted()['update:modelValue']).toStrictEqual([['test']])
        done()
      }, 1000)
    })
  })
})

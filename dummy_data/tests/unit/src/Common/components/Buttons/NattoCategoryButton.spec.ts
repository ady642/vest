import NattoCategoryButton from '@/Common/components/Buttons/NattoCategoryButton.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import useElementStubs from 'tests/unit/utils/useElementStubs'

const { ElButton } = useElementStubs()
const createWrapper = (
  label: string,
  active?: boolean,
  containsChildren?: boolean,
  disabled?: boolean
) =>
  wrapperFactory(NattoCategoryButton, {
    global: {
      stubs: {
        ElButton
      }
    },
    props: {
      label,
      active,
      containsChildren,
      disabled
    }
  })

let wrapper = createWrapper('test me')

describe('NattoCategoryButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = createWrapper('test me')
  })
  describe('bindings', () => {
    describe('props', () => {
      it('Should add close icon and active class when active props is true and whatever the value of containsChildren props is.', () => {
        wrapper = createWrapper('test me', true)
        let elButtonWrapper: VueWrapper<any> = wrapper.findComponent(ElButton)

        expect(elButtonWrapper).toBeTruthy()
        expect(elButtonWrapper.text()).toStrictEqual('test me')
        expect(elButtonWrapper.classes()).toHaveLength(2)
        expect(elButtonWrapper.classes('nto-btn')).toBe(true)
        expect(elButtonWrapper.classes('nto-btn-active')).toBe(true)
        expect(elButtonWrapper.attributes('icon')).toBeTruthy()
        expect(elButtonWrapper.attributes('icon')).toBe('el-icon-close')

        wrapper = createWrapper('test me', true, true)
        elButtonWrapper = wrapper.findComponent(ElButton)
        expect(elButtonWrapper).toBeTruthy()
        expect(elButtonWrapper.text()).toStrictEqual('test me')
        expect(elButtonWrapper.classes()).toHaveLength(2)
        expect(elButtonWrapper.classes('nto-btn')).toBe(true)
        expect(elButtonWrapper.classes('nto-btn-active')).toBe(true)
        expect(elButtonWrapper.attributes('icon')).toBeTruthy()
        expect(elButtonWrapper.attributes('icon')).toBe('el-icon-close')
      })

      it('Should add plus icon when containsChildren props is true and active is false.', () => {
        wrapper = createWrapper('test me', false, true)
        const elButtonWrapper: VueWrapper<any> = wrapper.findComponent(ElButton)

        expect(elButtonWrapper).toBeTruthy()
        expect(elButtonWrapper.text()).toStrictEqual('test me')
        expect(elButtonWrapper.classes()).toHaveLength(1)
        expect(elButtonWrapper.classes('nto-btn')).toBe(true)
        expect(elButtonWrapper.attributes('icon')).toBeTruthy()
        expect(elButtonWrapper.attributes('icon')).toBe('el-icon-plus')
      })
      it('Should not add icon when containsChildren props is false and active is false.', () => {
        wrapper = createWrapper('test me', false, false)
        const elButtonWrapper: VueWrapper<any> = wrapper.findComponent(ElButton)

        expect(elButtonWrapper).toBeTruthy()
        expect(elButtonWrapper.text()).toStrictEqual('test me')
        expect(elButtonWrapper.classes()).toHaveLength(1)
        expect(elButtonWrapper.classes('nto-btn')).toBe(true)
        expect(elButtonWrapper.attributes('icon')).toBeFalsy()
      })
    })

    describe('events', () => {
      it('Should fire click-button event when button is clicked', () => {
        wrapper = createWrapper('test me', false, true)
        const elButtonWrapper: VueWrapper<any> = wrapper.findComponent(ElButton)

        elButtonWrapper.trigger('click')
        expect(wrapper.emitted()['click-button'].length).toBe(1)
        expect(wrapper.emitted()['click-button']).toBeTruthy()
      })
    })
  })
  describe('rendering', () => {
    describe('props', () => {
      it('Should display the label props', () => {
        wrapper = createWrapper('test me', false, false)
        const elButtonWrapper: VueWrapper<any> = wrapper.findComponent(ElButton)

        expect(elButtonWrapper).toBeTruthy()
        expect(elButtonWrapper.text()).toStrictEqual('test me')
        expect(elButtonWrapper.classes()).toHaveLength(1)
        expect(elButtonWrapper.classes('nto-btn')).toBe(true)
        expect(elButtonWrapper.attributes('icon')).toBeFalsy()
      })

      it('Should disable the button when disabled props true', () => {
        wrapper = createWrapper('test me', false, false, true)
        const elButtonWrapper: VueWrapper<any> = wrapper.findComponent(ElButton)

        expect(elButtonWrapper).toBeTruthy()
        expect(elButtonWrapper.attributes('disabled')).toBeTruthy()
      })
    })
  })
})

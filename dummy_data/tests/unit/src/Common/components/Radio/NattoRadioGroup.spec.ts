import NattoRadioGroup from '@/Common/components/Radio/NattoRadioGroup.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'
import useElementsStubs from 'dummy_data/tests/unit/utils/useElementStubs'

/****
 * Wrapper types
 */
type NattoRadioGroupProps = {
  radioItems: {
    value: string | number | Record<string, any>
    label: string
  }[]
}

export type NattoRadioGroupWrapper = VueWrapper<
  ComponentPublicInstance<NattoRadioGroupProps>
>
/****
 * Wrapper finders
 */
const { MpRadio } = useStyleguideStubs()
const { ElRadioGroup } = useElementsStubs()

const findMpRadios = (wrapper: NattoRadioGroupWrapper) =>
  wrapper.findAllComponents(MpRadio)

/****
 * Wrapper creation
 */
const defaultProps: NattoRadioGroupProps = {
  radioItems: [
    {
      value: 1,
      label: 'First Value'
    },
    {
      value: 2,
      label: 'Second Value'
    },
    {
      value: 3,
      label: 'Third Value'
    }
  ]
}

const createWrapper = (props = defaultProps): NattoRadioGroupWrapper =>
  wrapperFactory(NattoRadioGroup, {
    props,
    global: {
      stubs: {
        MpRadio,
        ElRadioGroup
      }
    }
  })

let wrapper = createWrapper()
let mpRadiosWrapper = findMpRadios(wrapper)

describe('NattoRadioGroup', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    mpRadiosWrapper = findMpRadios(wrapper)
  })

  describe('bindings with ElRadio', () => {
    test('props bindings', () => {
      expect(mpRadiosWrapper[0].props()).toStrictEqual({ label: 1 })
      expect(mpRadiosWrapper[1].props()).toStrictEqual({ label: 2 })
      expect(mpRadiosWrapper[2].props()).toStrictEqual({ label: 3 })
    })
    it('should render labels', () => {
      const text = wrapper.text()

      expect(text).toContain('First Value')
      expect(text).toContain('Second Value')
      expect(text).toContain('Third Value')
    })
  })
})

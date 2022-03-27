import NattoDatePicker from '@/Common/components/Dates/NattoDatePicker.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import useElement from 'dummy_data/tests/unit/utils/useElementStubs'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import { WritableComputedRef } from 'vue'

type NattoDatePickerProps = {
  placeholder: string
  lockafter: string
  lockbefore: string
  defaultTime: Date
}

type NattoDatePickerSetup = {
  selectedDate: WritableComputedRef<string>
  disabledDate: (time: Date) => boolean
}

export type NattoDatePickerWrapper = VueWrapper<
  ComponentPublicInstance<NattoDatePickerProps, NattoDatePickerSetup>
>

const { ElDatePicker } = useElement()

const createWrapper = (
  modelValue: Date,
  placeholder: string,
  lockbefore?: Date,
  lockafter?: Date,
  defaultTime?: Date
) =>
  wrapperFactory(NattoDatePicker, {
    propsData: {
      modelValue,
      placeholder,
      lockbefore,
      lockafter,
      defaultTime
    },
    global: {
      stubs: { ElDatePicker }
    }
  })

let wrapper = createWrapper(new Date(1998, 5, 15, 10, 33, 30, 0), 'placehold1')

describe('NattoDatePicker', () => {
  beforeEach(() => {
    wrapper = createWrapper(
      new Date(1998, 5, 15, 10, 33, 30, 0),
      'placehold1',
      new Date(1998, 0, 1, 10, 33, 30, 0),
      new Date(1999, 11, 31, 10, 33, 30, 0)
    )
  })
  describe('bindings', () => {
    describe('props', () => {
      it('Should send correctly props to ElDatePicker component', () => {
        const elDatePicker: VueWrapper<any> =
          wrapper.findComponent(ElDatePicker)

        expect(elDatePicker.props('placeholder')).toBe('placehold1')
        expect(elDatePicker.props('modelValue')).toStrictEqual(
          new Date(1998, 5, 15, 10, 33, 30, 0)
        )
        expect(elDatePicker.props('defaultTime')).toBeUndefined()
      })
      it('disable date should return false for each date not inside the before and after props date period', () => {
        const elDatePicker: VueWrapper<any> =
          wrapper.findComponent(ElDatePicker)

        expect(
          elDatePicker.props('disabledDate')(new Date(1997, 10, 23))
        ).toBeTruthy()
        expect(
          elDatePicker.props('disabledDate')(new Date(2000, 0, 1))
        ).toBeTruthy()
        expect(
          elDatePicker.props('disabledDate')(
            new Date(1998, 1, 12, 10, 33, 30, 0)
          )
        ).toBeFalsy()
      })
      it('lockerafter and lockbefore can be undefined', () => {
        wrapper = createWrapper(
          new Date(1998, 5, 15, 10, 33, 30, 0),
          'placehold1'
        )

        const elDatePicker: VueWrapper<any> =
          wrapper.findComponent(ElDatePicker)

        expect(elDatePicker.props('lockafter')).toBeUndefined()
        expect(elDatePicker.props('lockbefore')).toBeUndefined()
        expect(
          elDatePicker.props('disabledDate')(
            new Date(1998, 1, 12, 10, 33, 30, 0)
          )
        ).toBeFalsy()
      })
    })
  })
})

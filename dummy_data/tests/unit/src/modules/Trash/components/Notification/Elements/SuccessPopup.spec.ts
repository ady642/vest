import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { createTrashStoreMock } from 'dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import SuccessPopup from '@/modules/Trash/components/Notification/Elements/SuccessPopup.vue'
import * as translationHelper from '@/Common/hooks/useTranslation'
import useStyleguide from '../../../../../../utils/useStyleguideStubs'

type SuccessPopupProps = {
  successed: number
  fileName: string
}

type SuccessPopupSetup = {
  isPlural: () => boolean
  description: string
  subDescription: string
}

export type SuccessPopupTypeWrapper = VueWrapper<
  ComponentPublicInstance<SuccessPopupProps, SuccessPopupSetup>
>

const defaultProps: SuccessPopupProps = {
  successed: 1,
  fileName: 'file_test.txt'
}

const storeMock = createTrashStoreMock()
const { MpButton } = useStyleguide()

const createWrapper = (
  store = storeMock,
  props = defaultProps
): SuccessPopupTypeWrapper =>
  wrapperFactory(SuccessPopup, {
    props: props,
    global: {
      plugins: [store],
      stubs: {
        MpButton
      }
    }
  })
let tMock = jest.fn()
let tcMock = jest.fn()

jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
  t: tMock,
  tc: tcMock
})
let wrapper = createWrapper()

describe('SuccessPopup', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    storeMock.dispatch = jest.fn()
    tMock = jest.fn()
    tcMock = jest.fn()
    jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
      t: tMock,
      tc: tcMock
    })
  })
  describe('binding', () => {
    describe('props', () => {
      const cases = [
        { prop: 'successed', expected: 1 },
        { prop: 'fileName', expected: 'file_test.txt' }
      ]

      test.each(cases)(
        'Should bind component props correctly',
        ({ prop, expected }) => {
          expect(wrapper.props(prop)).toEqual(expected)
        }
      )
    })
    describe('events', () => {
      it('Should trigger redirect-to-location event ', async () => {
        const btn = wrapper.find('.go-to-destination-cta')

        await btn.trigger('click')
        expect(wrapper.emitted('redirect-to-location')).toBeTruthy()
      })
    })
  })
})

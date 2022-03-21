import { VueWrapper } from '@vue/test-utils'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'
import { ComponentPublicInstance } from 'vue'
import FailedPopup from '@/modules/Trash/components/Notification/Elements/FailedPopup.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import * as translationHelper from '@/Common/hooks/useTranslation'

type FailedPopupProps = {
  canceled: number
  errored: number
}

type FailedPopupSetup = any

export type FailedPopupTypeWrapper = VueWrapper<
  ComponentPublicInstance<FailedPopupProps, FailedPopupSetup>
>

const defaultProps: FailedPopupProps = {
  canceled: 0,
  errored: 2
}

const storeMock = createTrashStoreMock()

const createWrapper = (
  store = storeMock,
  props = defaultProps
): FailedPopupTypeWrapper =>
  wrapperFactory(FailedPopup, {
    props: props,
    global: {
      plugins: [store],
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
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

describe('FailedPopup', () => {
  beforeEach(async () => {
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
        { prop: 'canceled', expected: 0 },
        { prop: 'errored', expected: 2 }
      ]

      test.each(cases)(
        'Should bind component props correctly',
        ({ prop, expected }) => {
          expect(wrapper.props(prop)).toEqual(expected)
        }
      )
    })
    describe('events', () => {
      it('Should trigger close event ', async () => {
        const btn = wrapper.find('.close-icon')

        await btn.trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
      })
    })
  })
})

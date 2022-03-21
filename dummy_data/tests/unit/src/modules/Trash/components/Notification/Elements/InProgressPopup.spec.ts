import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import InProgressPopup from '@/modules/Trash/components/Notification/Elements/InProgressPopup.vue'
import * as translationHelper from '@/Common/hooks/useTranslation'

type InProgressPopupProps = {
  total: number
  running: number
}

type InProgressPopupSetup = {
  isPlural: () => boolean
  description: string
  subDescription: string
}

export type InProgressPopupTypeWrapper = VueWrapper<
  ComponentPublicInstance<InProgressPopupProps, InProgressPopupSetup>
>

const defaultProps: InProgressPopupProps = {
  total: 1,
  running: 1
}

const storeMock = createTrashStoreMock()

const createWrapper = (
  store = storeMock,
  props = defaultProps
): InProgressPopupTypeWrapper =>
  wrapperFactory(InProgressPopup, {
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

describe('InProgressPopupPopup', () => {
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
        { prop: 'total', expected: 1 },
        { prop: 'running', expected: 1 }
      ]

      test.each(cases)(
        'Should bind component props correctly',
        ({ prop, expected }) => {
          expect(wrapper.props(prop)).toEqual(expected)
        }
      )
    })
  })
})

import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import TrashHeaderBackButton from '@/modules/Trash/components/Header/TrashHeaderBackButton.vue'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'
import TrashViewHeader from '@/modules/Trash/components/Header/TrashViewHeader.vue'
import { router } from '@kpmg/mypulse-shared-dependencies'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

export type TrashViewHeaderTypeWrapper = VueWrapper<ComponentPublicInstance>

const routerMock = router

const mainStoreMock = createTrashStoreMock()

const createWrapper = (store = mainStoreMock): TrashViewHeaderTypeWrapper =>
  wrapperFactory(TrashViewHeader, {
    global: {
      stubs: {
        TrashHeaderBackButton
      },
      plugins: [store],
      mocks: {
        $t: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

let wrapper = createWrapper()

describe('TrashViewHeader', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    routerMock.push = jest.fn()
  })
  describe('binding', () => {
    describe('events', () => {
      it('Should emit trash-back-click when back button is clicked ', async () => {
        const TrashHeaderBackButtonWrapper = wrapper.findComponent(
          TrashHeaderBackButton
        )

        await TrashHeaderBackButtonWrapper.vm.$emit('click')
        await wrapper.vm.$nextTick()
        expect(routerMock.push).toHaveBeenCalledWith({
          name: 'MainView'
        })
      })
    })
  })
})

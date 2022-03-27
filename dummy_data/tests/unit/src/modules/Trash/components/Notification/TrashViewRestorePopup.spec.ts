import { VueWrapper } from '@vue/test-utils'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import TrashDocument from '@/modules/Trash/models/Inputs/TrashDocument'
import { ComponentPublicInstance } from 'vue'
import { createTrashStoreMock } from 'dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { TrashDocumentAPILightMockList } from '../../mocks/TrashDocumentAPIMock'
import TrashViewRestorePopup from '@/modules/Trash/components/Notification/TrashViewRestorePopup.vue'
import SuccessPopup from '@/modules/Trash/components/Notification/Elements/SuccessPopup.vue'
import FailedPopup from '@/modules/Trash/components/Notification/Elements/FailedPopup.vue'
import InProgressPopup from '@/modules/Trash/components/Notification/Elements/InProgressPopup.vue'
import * as translationHelper from '@/Common/hooks/useTranslation'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import constants from '@/Common/constants'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn()
}))

type TrashViewRestorePopupProps = {
  duration: number
  pending: boolean
  success: boolean
  failed: boolean
  documents: TrashDocuments
  restoredDocument: TrashDocument
}

type TrashViewRestorePopupSetup = any

export type TrashViewRestorePopupTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    TrashViewRestorePopupProps,
    TrashViewRestorePopupSetup
  >
>

const documentsData = TrashDocuments.loaded(TrashDocumentAPILightMockList)

const defaultProps: TrashViewRestorePopupProps = {
  duration: 5000,
  pending: true,
  success: false,
  failed: false,
  documents: documentsData,
  restoredDocument: documentsData.collection[0]
}

const storeMock = createTrashStoreMock()

const createWrapper = (
  store = storeMock,
  props = defaultProps
): TrashViewRestorePopupTypeWrapper =>
  wrapperFactory(TrashViewRestorePopup, {
    props: props,
    global: {
      plugins: [store],
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      },
      stubs: {
        SuccessPopup,
        FailedPopup,
        InProgressPopup
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

describe('TrashViewRestorePopup', () => {
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
        { prop: 'duration', expected: 5000 },
        { prop: 'pending', expected: true },
        { prop: 'success', expected: false },
        { prop: 'failed', expected: false },
        { prop: 'documents', expected: documentsData },
        { prop: 'restoredDocument', expected: documentsData.collection[0] }
      ]

      test.each(cases)(
        'Should bind component props correctly',
        ({ prop, expected }) => {
          expect(wrapper.props(prop)).toEqual(expected)
        }
      )
    })
    describe('components', () => {
      describe('SuccessPopup', () => {
        describe('binding', () => {
          beforeEach(async () => {
            wrapper = createWrapper(storeMock, {
              duration: 5000,
              pending: false,
              success: true,
              failed: false,
              documents: documentsData,
              restoredDocument: documentsData.collection[0]
            })
            storeMock.dispatch = jest.fn()
          })
          describe('props', () => {
            it('Should bind successed prop correctly correctly', () => {
              const successPopupWrapper = wrapper.findComponent(SuccessPopup)

              expect(successPopupWrapper.props('fileName')).toEqual(
                wrapper.vm.restoredDocument.name
              )
            })
          })
          describe('events', () => {
            it('Should emit close event', async () => {
              const successPopupWrapper = wrapper.findComponent(SuccessPopup)

              await successPopupWrapper.vm.$emit('close')

              expect(wrapper.emitted('close')).toBeTruthy()
            })
            it('Should emit redirect-to-location event', async () => {
              const successPopupWrapper = wrapper.findComponent(SuccessPopup)

              await successPopupWrapper.vm.$emit('redirect-to-location')

              expect(trackEventFactory).toBeCalledWith(
                'tdv-notification-restore-cta'
              )

              expect(wrapper.emitted('redirect-to-location')).toBeTruthy()
            })
          })
        })
        describe('rendering', () => {
          beforeEach(() => {
            wrapper = createWrapper(storeMock, {
              duration: 5000,
              pending: false,
              success: true,
              failed: false,
              documents: documentsData,
              restoredDocument: documentsData.collection[0]
            })
            storeMock.dispatch = jest.fn()
          })
          it('Should display success popup when success is true', () => {
            const successPopupWrapper = wrapper.findComponent(SuccessPopup)

            expect(successPopupWrapper.exists()).toBeTruthy()
          })
        })
      })
      describe('FailedPopup', () => {
        describe('binding', () => {
          beforeEach(async () => {
            wrapper = createWrapper(storeMock, {
              duration: 5000,
              pending: false,
              success: false,
              failed: true,
              documents: documentsData,
              restoredDocument: documentsData.collection[0]
            })
            storeMock.dispatch = jest.fn()
          })

          describe('events', () => {
            it('Should emit close event', async () => {
              const FailedPopupWrapper = wrapper.findComponent(FailedPopup)

              await FailedPopupWrapper.vm.$emit('close')

              expect(wrapper.emitted('close')).toBeTruthy()
            })
          })
        })
        describe('rendering', () => {
          beforeEach(() => {
            wrapper = createWrapper(storeMock, {
              duration: 5000,
              pending: false,
              success: false,
              failed: true,
              documents: documentsData,
              restoredDocument: documentsData.collection[0]
            })
            storeMock.dispatch = jest.fn()
          })
          it('Should display failed popup when failed is true', () => {
            const FailedPopupWrapper = wrapper.findComponent(FailedPopup)

            expect(FailedPopupWrapper.exists()).toBeTruthy()
          })
        })
      })
      describe('InProgressPopup', () => {
        describe('binding', () => {
          const DOCUMENTS_IN_RESTORATION_COUNT = 4

          beforeEach(async () => {
            for (let i = 0; i < DOCUMENTS_IN_RESTORATION_COUNT; i++) {
              documentsData.collection[i].restorationStatus =
                constants.RESTORE_IN_PROGRESS
            }

            wrapper = createWrapper(storeMock, {
              duration: 5000,
              pending: true,
              success: false,
              failed: false,
              documents: documentsData,
              restoredDocument: documentsData.collection[0]
            })
            storeMock.dispatch = jest.fn()
          })
          describe('props', () => {
            it('Should bind running prop correctly', () => {
              const InProgressPopupWrapper =
                wrapper.findComponent(InProgressPopup)

              expect(InProgressPopupWrapper.props('running')).toEqual(
                DOCUMENTS_IN_RESTORATION_COUNT
              )
            })
          })
          describe('events', () => {
            it('Should emit cancel event', async () => {
              const InProgressPopupWrapper =
                wrapper.findComponent(InProgressPopup)

              await InProgressPopupWrapper.vm.$emit('cancelRestore')

              expect(wrapper.emitted('cancelRestore')).toBeTruthy()
            })
          })
        })
        describe('rendering', () => {
          beforeEach(() => {
            wrapper = createWrapper(storeMock, {
              duration: 5000,
              pending: true,
              success: false,
              failed: false,
              documents: documentsData,
              restoredDocument: documentsData.collection[0]
            })
            storeMock.dispatch = jest.fn()
          })
          it('Should display inprogress popup when pending is true', () => {
            const InProgressPopupWrapper =
              wrapper.findComponent(InProgressPopup)

            expect(InProgressPopupWrapper.exists()).toBeTruthy()
          })
        })
      })
    })
  })
})

import RestoreFileModalConfirmation from '@/modules/Trash/components/Modals/RestoreFileModalConfirmation.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'

/****
 * Wrapper types
 */
type RestoreFileModalConfirmationProps = {
  modelValue: boolean
  documentId: string
}

type RestoreFileModalConfirmationSetup = {
  isDeleteFolderModalOpened: boolean
  handleConfirmation: () => void
}

export type RestoreFileModalConfirmationWrapper = VueWrapper<
  ComponentPublicInstance<
    RestoreFileModalConfirmationProps,
    RestoreFileModalConfirmationSetup
  >
>

/****
 * Wrapper creation
 */
const defaultProps: RestoreFileModalConfirmationProps = {
  modelValue: true,
  documentId: '4521'
}

const storeMock = createTrashStoreMock()

const createWrapper = (
  props = defaultProps,
  store = storeMock
): RestoreFileModalConfirmationWrapper =>
  wrapperFactory(RestoreFileModalConfirmation, {
    props,
    global: {
      plugins: [store],
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

const findNattoDialogPopupWrapper = (
  wrapper: RestoreFileModalConfirmationWrapper
) => wrapper.findComponent(NattoDialogPopup)

let wrapper = createWrapper()

describe('RestoreFileModalConfirmation', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    storeMock.dispatch = jest.fn()
  })

  describe('bindings with NattoDialogPopup', () => {
    test('props bindings', () => {
      const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

      expect(nattoDialogPopupWrapper.props('modelValue')).toBe(true)
      expect(nattoDialogPopupWrapper.props('title')).toBe(
        'ged.trash.restore.confirmation.title'
      )
      expect(nattoDialogPopupWrapper.props('popupType')).toBe('error')
      expect(nattoDialogPopupWrapper.props('description')).toBe(
        'ged.trash.restore.confirmation.description'
      )
    })
    describe('events bindings', () => {
      it('should dispatch restoreFileByModal with documentId when NattoDialogPopup emit confirm-clicked and close the modal', async () => {
        // When NattoDialogPopup emit confirm-clicked
        const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

        await nattoDialogPopupWrapper.vm.$emit('confirm-clicked')
        await wrapper.vm.$nextTick()

        //expect(trackEventFactory).toBeCalledWith('adv-delete-file')
        // Then
        // expect(storeMock.dispatch).toHaveBeenCalledWith(
        //   'GED/Trash/restoreFileByModal',
        //   '4521'
        // )
        expect(wrapper.emitted('restore-confirm')).toHaveLength(1)
        expect(wrapper.emitted('restore-confirm')).toEqual([['4521']])
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
        expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
      })
      it('should close the modal when cancel button is clicked', async () => {
        // When NattoDialogPopup emit cancel-clicked
        const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

        await nattoDialogPopupWrapper.vm.$emit('cancel-clicked')

        // Then the modal must be closed
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
        expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]])
      })
    })
  })
})

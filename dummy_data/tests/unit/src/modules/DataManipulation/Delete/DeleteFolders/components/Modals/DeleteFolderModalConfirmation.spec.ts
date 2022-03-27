import DeleteFolderModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFolder/components/Modals/DeleteFolderModalConfirmation.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import { deleteFoldersModule } from '@/modules/DataManipulation/Delete/DeleteFolder/store'
import { createDeleteFolderStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

/****
 * Wrapper types
 */
type DeleteFolderModalConfirmationProps = {
  modelValue: boolean
  folderId: number
  folderName: string
}

type DeleteFolderModalConfirmationSetup = {
  isDeleteFolderModalOpened: boolean
  handleConfirmation: () => void
  title: string
  description: string
}

export type DeleteFolderModalConfirmationWrapper = VueWrapper<
  ComponentPublicInstance<
    DeleteFolderModalConfirmationProps,
    DeleteFolderModalConfirmationSetup
  >
>

/****
 * Wrapper creation
 */
const defaultProps: DeleteFolderModalConfirmationProps = {
  modelValue: true,
  folderId: 4521,
  folderName: 'home'
}

let storeMock = createDeleteFolderStoreMocked()

const createWrapper = (
  props = defaultProps,
  store = storeMock
): DeleteFolderModalConfirmationWrapper =>
  wrapperFactory(DeleteFolderModalConfirmation, {
    props,
    global: {
      plugins: [store]
    }
  })

const findNattoDialogPopupWrapper = (
  wrapper: DeleteFolderModalConfirmationWrapper
) => wrapper.findComponent(NattoDialogPopup)

let wrapper = createWrapper()

describe('DeleteFolderModalConfirmation', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    storeMock.dispatch = jest.fn()
  })

  describe('bindings with NattoDialogPopup', () => {
    test('props bindings', () => {
      const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

      expect(nattoDialogPopupWrapper.props('modelValue')).toBe(true)
      expect(nattoDialogPopupWrapper.props('title')).toBe(
        'Êtes-vous sûr de vouloir supprimer ce dossier ?'
      )
      expect(nattoDialogPopupWrapper.props('popupType')).toBe('error')
      expect(nattoDialogPopupWrapper.props('description')).toBe(
        'Si vous cliquez sur "Continuer", tous les fichiers et sous dossiers à partir du dossier "home" seront supprimés et envoyés à la corbeille.'
      )
    })
    describe('events bindings', () => {
      it('should dispatch deleteFolderByModal with folderId when NattoDialogPopup emit confirm-clicked and close the modal', async () => {
        // When NattoDialogPopup emit confirm-clicked
        const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

        await nattoDialogPopupWrapper.vm.$emit('confirm-clicked')
        await wrapper.vm.$nextTick()

        expect(trackEventFactory).toBeCalledWith('adv-delete-file')
        // Then DeleteFolderModalConfirmation should dispatch deleteFolderByModal
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          deleteFoldersModule('deleteFolderByModal'),
          4521
        )
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
        expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
      })
      it('should set error message and let the modal opened if error is catch when dispatch deleteFolderByModal', async () => {
        // Given deleteFolderByModal return an error
        storeMock = createDeleteFolderStoreMocked()
        storeMock.dispatch = jest.fn(() => Promise.reject('Error'))

        wrapper = createWrapper(defaultProps, storeMock)

        // When NattoDialogPopup emit confirm-clicked
        const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

        await nattoDialogPopupWrapper.vm.$emit('confirm-clicked')
        await wrapper.vm.$nextTick()

        expect(trackEventFactory).toBeCalledWith('adv-delete-file')
        // Then DeleteFolderModalConfirmation should dispatch deleteFolderByModal
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          deleteFoldersModule('deleteFolderByModal'),
          4521
        )
        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
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

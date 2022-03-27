import DeleteFileModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import NattoDialogPopup from '@/Common/components/Modals/NattoDialogPopup.vue'
import { deleteFileModule } from '@/modules/DataManipulation/Delete/DeleteFile/store'
import { createDeleteFileStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { searchModule } from '@/modules/Search/store'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import { isAcceptedFile } from '@/Common/helpers/file'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

/****
 * Wrapper types
 */
type DeleteFileModalConfirmationProps = {
  modelValue: boolean
  documentIds: string[]
  isSynchronizedDocument: boolean
}

type DeleteFileModalConfirmationSetup = {
  loading: boolean
  isDeletefileModalConfirmationOpened: boolean
  dispatchDeletefile: () => void
  handleCancelClick: () => void
  title: string
  description: string
}

export type DeleteFileModalConfirmationWrapper = VueWrapper<
  ComponentPublicInstance<
    DeleteFileModalConfirmationProps,
    DeleteFileModalConfirmationSetup
  >
>

/****
 * Wrapper creation
 */
const defaultProps: DeleteFileModalConfirmationProps = {
  modelValue: true,
  documentIds: ['4521'],
  isSynchronizedDocument: false
}

const storeMock = createDeleteFileStoreMocked()

const createWrapper = (
  props = defaultProps
): DeleteFileModalConfirmationWrapper =>
  wrapperFactory(DeleteFileModalConfirmation, {
    props,
    global: {
      plugins: [storeMock]
    }
  })

const findNattoDialogPopupWrapper = (
  wrapper: DeleteFileModalConfirmationWrapper
) => wrapper.findComponent(NattoDialogPopup)

let wrapper = createWrapper()

describe('DeleteFileModalConfirmation', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    storeMock.dispatch = jest.fn()
  })

  describe('bindings with NattoDialogPopup', () => {
    describe('props bindings', () => {
      test('static props', () => {
        wrapper = createWrapper()
        const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

        expect(nattoDialogPopupWrapper.props('modelValue')).toBe(true)
        expect(nattoDialogPopupWrapper.props('popupType')).toBe('error')
      })

      it.each([
        {
          documentIds: ['19', '27'],
          isSynchronizedDocument: false,
          description:
            'ged.dataManipulation.delete.modal.descriptionSimple with 2'
        },
        {
          documentIds: ['19', '27'],
          isSynchronizedDocument: true,
          description:
            'ged.dataManipulation.delete.modal.descriptionSimple with 2'
        },
        {
          documentIds: ['19'],
          isSynchronizedDocument: false,
          description:
            'ged.dataManipulation.delete.modal.descriptionSimple with 1'
        },
        {
          documentIds: ['19'],
          isSynchronizedDocument: true,
          description:
            'ged.dataManipulation.delete.modal.descriptionSyncStatus with 1'
        }
      ])(
        'should render the right description if the doc is sync or not',
        ({ isSynchronizedDocument, documentIds, description }) => {
          wrapper = createWrapper({
            ...defaultProps,
            isSynchronizedDocument,
            documentIds
          })
          const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

          expect(nattoDialogPopupWrapper.props('description')).toBe(description)
        }
      )
    })

    describe('events bindings', () => {
      it('should dispatch deleteFileByModal with fileId when NattoDialogPopup emit confirm-clicked', async () => {
        // When NattoDialogPopup emit confirm-clicked
        const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper)

        await nattoDialogPopupWrapper.vm.$emit('confirm-clicked')

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('delete-file-confirmed')).toHaveLength(1)

        // Then DeleteFileModalConfirmation should dispatch deleteFileByModal
        expect(storeMock.dispatch).toHaveBeenNthCalledWith(
          1,
          deleteFileModule('deleteFiles'),
          ['4521']
        )
        expect(storeMock.dispatch).toHaveBeenNthCalledWith(
          2,
          searchModule('fetchDocuments')
        )
        expect(trackEventFactory).toBeCalledWith('adv-delete-file')
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

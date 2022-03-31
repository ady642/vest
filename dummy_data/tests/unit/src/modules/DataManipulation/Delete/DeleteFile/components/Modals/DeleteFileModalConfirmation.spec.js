"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteFileModalConfirmation_vue_1 = require("@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoDialogPopup_vue_1 = require("@/Common/components/Modals/NattoDialogPopup.vue");
const store_1 = require("@/modules/DataManipulation/Delete/DeleteFile/store");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const store_2 = require("@/modules/Search/store");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
/****
 * Wrapper creation
 */
const defaultProps = {
    modelValue: true,
    documentIds: ['4521'],
    isSynchronizedDocument: false
};
const storeMock = (0, storeMock_1.createDeleteFileStoreMocked)();
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DeleteFileModalConfirmation_vue_1.default, {
    props,
    global: {
        plugins: [storeMock]
    }
});
const findNattoDialogPopupWrapper = (wrapper) => wrapper.findComponent(NattoDialogPopup_vue_1.default);
let wrapper = createWrapper();
describe('DeleteFileModalConfirmation', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        storeMock.dispatch = jest.fn();
    });
    describe('bindings with NattoDialogPopup', () => {
        describe('props bindings', () => {
            test('static props', () => {
                wrapper = createWrapper();
                const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
                expect(nattoDialogPopupWrapper.props('modelValue')).toBe(true);
                expect(nattoDialogPopupWrapper.props('popupType')).toBe('error');
            });
            it.each([
                {
                    documentIds: ['19', '27'],
                    isSynchronizedDocument: false,
                    description: 'ged.dataManipulation.delete.modal.descriptionSimple with 2'
                },
                {
                    documentIds: ['19', '27'],
                    isSynchronizedDocument: true,
                    description: 'ged.dataManipulation.delete.modal.descriptionSimple with 2'
                },
                {
                    documentIds: ['19'],
                    isSynchronizedDocument: false,
                    description: 'ged.dataManipulation.delete.modal.descriptionSimple with 1'
                },
                {
                    documentIds: ['19'],
                    isSynchronizedDocument: true,
                    description: 'ged.dataManipulation.delete.modal.descriptionSyncStatus with 1'
                }
            ])('should render the right description if the doc is sync or not', ({ isSynchronizedDocument, documentIds, description }) => {
                wrapper = createWrapper({
                    ...defaultProps,
                    isSynchronizedDocument,
                    documentIds
                });
                const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
                expect(nattoDialogPopupWrapper.props('description')).toBe(description);
            });
        });
        describe('events bindings', () => {
            it('should dispatch deleteFileByModal with fileId when NattoDialogPopup emit confirm-clicked', async () => {
                // When NattoDialogPopup emit confirm-clicked
                const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
                await nattoDialogPopupWrapper.vm.$emit('confirm-clicked');
                await wrapper.vm.$nextTick();
                expect(wrapper.emitted('delete-file-confirmed')).toHaveLength(1);
                // Then DeleteFileModalConfirmation should dispatch deleteFileByModal
                expect(storeMock.dispatch).toHaveBeenNthCalledWith(1, (0, store_1.deleteFileModule)('deleteFiles'), ['4521']);
                expect(storeMock.dispatch).toHaveBeenNthCalledWith(2, (0, store_2.searchModule)('fetchDocuments'));
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('adv-delete-file');
            });
            it('should close the modal when cancel button is clicked', async () => {
                // When NattoDialogPopup emit cancel-clicked
                const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
                await nattoDialogPopupWrapper.vm.$emit('cancel-clicked');
                // Then the modal must be closed
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]]);
            });
        });
    });
});
//# sourceMappingURL=DeleteFileModalConfirmation.spec.js.map
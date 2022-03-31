"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteFolderModalConfirmation_vue_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/components/Modals/DeleteFolderModalConfirmation.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoDialogPopup_vue_1 = require("@/Common/components/Modals/NattoDialogPopup.vue");
const store_1 = require("@/modules/DataManipulation/Delete/DeleteFolder/store");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
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
    folderId: 4521,
    folderName: 'home'
};
let storeMock = (0, storeMock_1.createDeleteFolderStoreMocked)();
const createWrapper = (props = defaultProps, store = storeMock) => (0, wrapperFactory_1.default)(DeleteFolderModalConfirmation_vue_1.default, {
    props,
    global: {
        plugins: [store]
    }
});
const findNattoDialogPopupWrapper = (wrapper) => wrapper.findComponent(NattoDialogPopup_vue_1.default);
let wrapper = createWrapper();
describe('DeleteFolderModalConfirmation', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        storeMock.dispatch = jest.fn();
    });
    describe('bindings with NattoDialogPopup', () => {
        test('props bindings', () => {
            const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
            expect(nattoDialogPopupWrapper.props('modelValue')).toBe(true);
            expect(nattoDialogPopupWrapper.props('title')).toBe('Êtes-vous sûr de vouloir supprimer ce dossier ?');
            expect(nattoDialogPopupWrapper.props('popupType')).toBe('error');
            expect(nattoDialogPopupWrapper.props('description')).toBe('Si vous cliquez sur "Continuer", tous les fichiers et sous dossiers à partir du dossier "home" seront supprimés et envoyés à la corbeille.');
        });
        describe('events bindings', () => {
            it('should dispatch deleteFolderByModal with folderId when NattoDialogPopup emit confirm-clicked and close the modal', async () => {
                // When NattoDialogPopup emit confirm-clicked
                const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
                await nattoDialogPopupWrapper.vm.$emit('confirm-clicked');
                await wrapper.vm.$nextTick();
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('adv-delete-file');
                // Then DeleteFolderModalConfirmation should dispatch deleteFolderByModal
                expect(storeMock.dispatch).toHaveBeenCalledWith((0, store_1.deleteFoldersModule)('deleteFolderByModal'), 4521);
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
            });
            it('should set error message and let the modal opened if error is catch when dispatch deleteFolderByModal', async () => {
                // Given deleteFolderByModal return an error
                storeMock = (0, storeMock_1.createDeleteFolderStoreMocked)();
                storeMock.dispatch = jest.fn(() => Promise.reject('Error'));
                wrapper = createWrapper(defaultProps, storeMock);
                // When NattoDialogPopup emit confirm-clicked
                const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
                await nattoDialogPopupWrapper.vm.$emit('confirm-clicked');
                await wrapper.vm.$nextTick();
                expect(analyticsLog_1.trackEventFactory).toBeCalledWith('adv-delete-file');
                // Then DeleteFolderModalConfirmation should dispatch deleteFolderByModal
                expect(storeMock.dispatch).toHaveBeenCalledWith((0, store_1.deleteFoldersModule)('deleteFolderByModal'), 4521);
                expect(wrapper.emitted('update:modelValue')).toBeFalsy();
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
//# sourceMappingURL=DeleteFolderModalConfirmation.spec.js.map
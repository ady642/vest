"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestoreFileModalConfirmation_vue_1 = require("@/modules/Trash/components/Modals/RestoreFileModalConfirmation.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoDialogPopup_vue_1 = require("@/Common/components/Modals/NattoDialogPopup.vue");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
/****
 * Wrapper creation
 */
const defaultProps = {
    modelValue: true,
    documentId: '4521'
};
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const createWrapper = (props = defaultProps, store = storeMock) => (0, wrapperFactory_1.default)(RestoreFileModalConfirmation_vue_1.default, {
    props,
    global: {
        plugins: [store],
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
const findNattoDialogPopupWrapper = (wrapper) => wrapper.findComponent(NattoDialogPopup_vue_1.default);
let wrapper = createWrapper();
describe('RestoreFileModalConfirmation', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        storeMock.dispatch = jest.fn();
    });
    describe('bindings with NattoDialogPopup', () => {
        test('props bindings', () => {
            const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
            expect(nattoDialogPopupWrapper.props('modelValue')).toBe(true);
            expect(nattoDialogPopupWrapper.props('title')).toBe('ged.trash.restore.confirmation.title');
            expect(nattoDialogPopupWrapper.props('popupType')).toBe('error');
            expect(nattoDialogPopupWrapper.props('description')).toBe('ged.trash.restore.confirmation.description');
        });
        describe('events bindings', () => {
            it('should dispatch restoreFileByModal with documentId when NattoDialogPopup emit confirm-clicked and close the modal', async () => {
                // When NattoDialogPopup emit confirm-clicked
                const nattoDialogPopupWrapper = findNattoDialogPopupWrapper(wrapper);
                await nattoDialogPopupWrapper.vm.$emit('confirm-clicked');
                await wrapper.vm.$nextTick();
                //expect(trackEventFactory).toBeCalledWith('adv-delete-file')
                // Then
                // expect(storeMock.dispatch).toHaveBeenCalledWith(
                //   'GED/Trash/restoreFileByModal',
                //   '4521'
                // )
                expect(wrapper.emitted('restore-confirm')).toHaveLength(1);
                expect(wrapper.emitted('restore-confirm')).toEqual([['4521']]);
                expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
                expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
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
//# sourceMappingURL=RestoreFileModalConfirmation.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const MessagePopup_vue_1 = require("@/modules/DataManipulation/Upload/components/InfosModal/MessagePopup.vue");
const NattoDialogPopup_vue_1 = require("@/Common/components/Modals/NattoDialogPopup.vue");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElButton, ElDialog } = (0, useElementStubs_1.default)();
const createWrapper = (title, description, popupType) => (0, wrapperFactory_1.default)(MessagePopup_vue_1.default, {
    propsData: {
        title,
        description,
        popupType
    },
    global: {
        stubs: { NattoDialogPopup: NattoDialogPopup_vue_1.default, ElButton, ElDialog }
    }
});
describe('MessagePopup', () => {
    describe('bindings', () => {
        describe('props', () => {
            it('Should pass title props without changes', () => {
                const wrapper = createWrapper("I'am a title", "I'am a description", 'error');
                const nattoDialogPopupWrapper = wrapper.findComponent(NattoDialogPopup_vue_1.default);
                expect(nattoDialogPopupWrapper.props().title).toBe("I'am a title");
            });
            it('Should pass description props without changes', () => {
                const wrapper = createWrapper("I'am a title", "I'am a description", 'error');
                const nattoDialogPopupWrapper = wrapper.findComponent(NattoDialogPopup_vue_1.default);
                expect(nattoDialogPopupWrapper.props().description).toBe("I'am a description");
            });
            it('Should pass popupType props without changes', () => {
                const wrapper = createWrapper("I'am a title", "I'am a description", 'error');
                const nattoDialogPopupWrapper = wrapper.findComponent(NattoDialogPopup_vue_1.default);
                expect(nattoDialogPopupWrapper.props().popupType).toBe('error');
            });
        });
    });
    describe('events', () => {
        it("Should fire 'cancel-clicked' when cancel button is clicked", () => {
            const wrapper = createWrapper("I'am a title", "I'am a description", 'error');
            const nattoDialogPopupWrapper = wrapper.findComponent(NattoDialogPopup_vue_1.default);
            nattoDialogPopupWrapper.vm.$emit('cancel-clicked');
            expect(wrapper.emitted('cancel-clicked')).toBeTruthy();
            expect(wrapper.emitted('cancel-clicked')).toHaveLength(1);
        });
        it("Should fire 'confirm-clicked' when confirm button is clicked", () => {
            const wrapper = createWrapper("I'am a title", "I'am a description", 'error');
            const nattoDialogPopupWrapper = wrapper.findComponent(NattoDialogPopup_vue_1.default);
            nattoDialogPopupWrapper.vm.$emit('confirm-clicked');
            expect(wrapper.emitted('confirm-clicked')).toBeTruthy();
            expect(wrapper.emitted('confirm-clicked')).toHaveLength(1);
        });
    });
});
//# sourceMappingURL=MessagePopup.spec.js.map
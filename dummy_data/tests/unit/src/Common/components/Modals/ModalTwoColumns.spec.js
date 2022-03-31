"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModalTwoColumns_vue_1 = require("@/Common/components/Modals/ModalTwoColumns.vue");
const NattoDialog_vue_1 = require("@/Common/components/Modals/NattoDialog.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElDialog } = (0, useElementStubs_1.default)();
const createWrapper = (modelValue = false, noPadding = false) => (0, wrapperFactory_1.default)(ModalTwoColumns_vue_1.default, {
    propsData: {
        modelValue,
        noPadding
    },
    global: {
        stubs: { NattoDialog: NattoDialog_vue_1.default, ElDialog }
    }
});
const findNattoDialog = (wrapper) => wrapper.findComponent(NattoDialog_vue_1.default);
let wrapper = createWrapper();
describe('ModalTwoColumns', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings', () => {
        describe('props', () => {
            it('Should pass modelValue props without changes', () => {
                // Construct a component with a value different than default false
                wrapper = createWrapper(true);
                // Check if ElDialog prop modelValue is true
                expect(findNattoDialog(wrapper).props().modelValue).toBe(true);
            });
        });
    });
    describe('rendering', () => {
        describe('noPadding prop', () => {
            it('modal should not had any padding', () => {
                const wrappper = createWrapper(true, true);
                const divSectionModal = wrappper.find('.modal-two-columns');
                expect(divSectionModal.classes('noPadding')).toBeTruthy();
            });
            it('modal should had a default padding', () => {
                const wrappper = createWrapper(false);
                const divSectionModal = wrappper.find('.modal-two-columns');
                expect(divSectionModal.classes('noPadding')).toBeFalsy();
            });
        });
    });
    describe('events', () => {
        test('ModalTwoColumns should trigger an update:modelValue event when ElDialog emits an update:modelValue event', () => {
            // When ElDialog emit an update:modelValue event (ModalTwoColumns <= ElDialog)
            const ElDialogWrapper = findNattoDialog(wrapper);
            ElDialogWrapper.vm.$emit('update:modelValue', true);
            // Then ModalTwoColumns should trigger an update:modelValue with same payload
            expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        });
        it('ModalTwoColumns should trigger an on-modal-close event when ElDialog emits an close event', () => {
            // When ElDialog emit an update:modelValue event (ModalTwoColumns <= ElDialog)
            const ElDialogWrapper = findNattoDialog(wrapper);
            ElDialogWrapper.vm.$emit('close');
            // Then ModalTwoColumns should trigger an update:modelValue with same payload
            expect(wrapper.emitted('on-modal-close')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=ModalTwoColumns.spec.js.map
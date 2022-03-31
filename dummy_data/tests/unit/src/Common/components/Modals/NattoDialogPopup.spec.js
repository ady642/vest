"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoDialogPopup_vue_1 = require("@/Common/components/Modals/NattoDialogPopup.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElDialog, ElButton } = (0, useElementStubs_1.default)();
const createWrapper = (modelValue, title, description, popupType, loading = false) => (0, wrapperFactory_1.default)(NattoDialogPopup_vue_1.default, {
    propsData: {
        modelValue,
        title,
        description,
        popupType,
        loading
    },
    global: {
        stubs: { ElDialog, ElButton }
    }
});
let wrapper = createWrapper(true, 'Hello World !', "i'am a big description", 'error');
describe('NattoDialogPopup', () => {
    describe('bindings with ElDialog', () => {
        it('should bind props correctly', () => {
            wrapper = createWrapper(true, 'Hello World !', "i'am a big description", 'error', true);
            const elDialogWrapper = wrapper.findComponent(ElDialog);
            expect(elDialogWrapper.attributes('close-on-click-modal')).toBe('false');
            expect(elDialogWrapper.attributes('close-on-press-escape')).toBe('false');
            expect(elDialogWrapper.attributes('show-close')).toBe('false');
        });
    });
    describe('bindings with ElButton', () => {
        it('should bind props correctly', () => {
            wrapper = createWrapper(true, 'Hello World !', "i'am a big description", 'error', true);
            const elButtonWrappers = wrapper.findAllComponents(ElButton);
            expect(elButtonWrappers[0].attributes('loading')).toBe('true');
            expect(elButtonWrappers[1].attributes('loading')).toBe('true');
        });
    });
    describe('bindings', () => {
        describe('events', () => {
            it("Should fire 'confirm-clicked' when confirm button is clicked", () => {
                wrapper = createWrapper(true, 'Hello World !', "i'am a big description", 'error');
                const elButtonWrappers = wrapper.findAllComponents(ElButton);
                elButtonWrappers[1].trigger('click');
                expect(wrapper.emitted('confirm-clicked')).toBeTruthy();
                expect(wrapper.emitted('confirm-clicked')).toHaveLength(1);
            });
            it("Should fire 'cancel-clicked' when cancel button is clicked", () => {
                wrapper = createWrapper(true, 'Hello World !', "i'am a big description", 'error');
                const elButtonWrappers = wrapper.findAllComponents(ElButton);
                elButtonWrappers[0].trigger('click');
                expect(wrapper.emitted('cancel-clicked')).toBeTruthy();
                expect(wrapper.emitted('cancel-clicked')).toHaveLength(1);
            });
            it("Should fire 'cancel-clicked' when user click outside", () => {
                wrapper = createWrapper(true, 'Hello World !', "i'am a big description", 'error');
                const elDialogWrapper = wrapper.findComponent(ElDialog);
                elDialogWrapper.trigger('close');
                expect(wrapper.emitted('cancel-clicked')).toBeTruthy();
                expect(wrapper.emitted('cancel-clicked')).toHaveLength(1);
            });
        });
    });
    describe('rendering', () => {
        describe('props', () => {
            it('Should add error class and display title and descriptions when props are sent.', () => {
                wrapper = createWrapper(true, 'Hello World !', "i'am a big description", 'error');
                const elButtonWrappers = wrapper.findAllComponents(ElButton);
                expect(elButtonWrappers.length).toBe(2);
                expect(elButtonWrappers[0].text()).toBe('Annuler');
                expect(elButtonWrappers[1].text()).toBe('Continuer');
                expect(elButtonWrappers[1].classes('btn-error')).toBeTruthy();
                const pWrappers = wrapper.find('p');
                expect(pWrappers.text()).toBe("i'am a big description");
                const spanWrappers = wrapper.find('span');
                expect(spanWrappers.classes('title-error')).toBeTruthy();
                expect(spanWrappers.text()).toBe('Hello World !');
            });
        });
    });
    describe('events', () => { });
});
//# sourceMappingURL=NattoDialogPopup.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoPrimaryCta_vue_1 = require("@/Common/components/Buttons/NattoPrimaryCta.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = (action, disabled) => (0, wrapperFactory_1.default)(NattoPrimaryCta_vue_1.default, {
    propsData: {
        action,
        disabled
    }
});
describe('natto-primary-cta', () => {
    describe('binding', () => {
        describe('Valider et suivant', () => {
            const wrapper = createWrapper('validateNext', false);
            const button = wrapper.find('.natto-primary-cta');
            const buttonText = wrapper.find('.btn-text');
            it('Should have the appropriate button label', () => {
                expect(buttonText.text()).toEqual('Valider et suivant');
            });
            it('Should emit validate event', async () => {
                await button.trigger('click');
                expect(wrapper.emitted('validate')).toBeTruthy();
            });
            describe('Diabled Button', () => {
                const wrapper = createWrapper('validateNext', true);
                const button = wrapper.find('.natto-primary-cta');
                it('Should be disbaled', () => {
                    expect(button.classes().find((x) => '.disabled-btn')).toBeTruthy();
                });
                it('Should not emit any events', async () => {
                    await button.trigger('click');
                    expect(wrapper.emitted('validate')).toBeFalsy();
                });
            });
        });
        describe('Valider', () => {
            const wrapper = createWrapper('validate', false);
            const button = wrapper.find('.natto-primary-cta');
            const buttonText = wrapper.find('.btn-text');
            it('Should have the appropriate button label', () => {
                expect(buttonText.text()).toEqual('Valider');
            });
            it('Should emit validate event', async () => {
                await button.trigger('click');
                expect(wrapper.emitted('validate')).toBeTruthy();
            });
            describe('Diabled Button', () => {
                const wrapper = createWrapper('validate', true);
                const button = wrapper.find('.natto-primary-cta');
                it('Should be disbaled', () => {
                    expect(button.classes().find((x) => '.disabled-btn')).toBeTruthy();
                });
                it('Should not emit any events', async () => {
                    await button.trigger('click');
                    expect(wrapper.emitted('validate')).toBeFalsy();
                });
            });
        });
        describe('Fermer', () => {
            const wrapper = createWrapper('finish', false);
            const button = wrapper.find('.natto-primary-cta');
            const buttonText = wrapper.find('.btn-text');
            it('Should have the appropriate button label', () => {
                expect(buttonText.text()).toEqual('Fermer');
            });
            it('Should emit validate event', async () => {
                await button.trigger('click');
                expect(wrapper.emitted('close')).toBeTruthy();
            });
            describe('Diabled Button', () => {
                const wrapper = createWrapper('finish', true);
                const button = wrapper.find('.natto-primary-cta');
                it('Should be disbaled', () => {
                    expect(button.classes().find((x) => '.disabled-btn')).toBeTruthy();
                });
                it('Should not emit any events', async () => {
                    await button.trigger('click');
                    expect(wrapper.emitted('close')).toBeFalsy();
                });
            });
        });
    });
});
//# sourceMappingURL=NattoPrimaryCta.spec.js.map
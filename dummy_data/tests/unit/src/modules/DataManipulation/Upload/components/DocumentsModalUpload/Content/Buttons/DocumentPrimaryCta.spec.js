"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentPrimaryCta_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/DocumentPrimaryCta.vue");
const NattoPrimaryCta_vue_1 = require("@/Common/components/Buttons/NattoPrimaryCta.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = (action, disabled) => (0, wrapperFactory_1.default)(DocumentPrimaryCta_vue_1.default, {
    propsData: {
        action,
        disabled
    },
    global: {
        stubs: {
            NattoPrimaryCta: NattoPrimaryCta_vue_1.default
        }
    }
});
describe('document-primary-cta', () => {
    describe('events', () => {
        describe('validate', () => {
            // it('Should emit validate event', async () => {
            //   const wrapper = createWrapper('validateNext', false)
            //   const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')
            //   await button.trigger('click')
            //   expect(wrapper.emitted('validate')).toBeTruthy()
            // })
        });
    });
    describe('binding', () => {
        describe('validate', () => {
            it('Should have teh same value ', () => {
                const wrapper = createWrapper('validateNext', false);
                expect(wrapper.vm.action).toEqual('validateNext');
                expect(wrapper.vm.disabled).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=DocumentPrimaryCta.spec.js.map
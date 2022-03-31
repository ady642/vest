"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const SecondaryCtaButton_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Buttons/SecondaryCtaButton.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { MpButton } = (0, useStyleguideStubs_1.default)();
const createWrapper = (folderName, disabled) => (0, wrapperFactory_1.default)(SecondaryCtaButton_vue_1.default, {
    propsData: {
        folderName,
        disabled
    },
    global: {
        stubs: {
            MpButton
        }
    }
});
describe('SecondaryCtaButton', () => {
    describe('bindings', () => {
        describe('props', () => {
            it('Should pass label props when folderName props is passed', () => {
                const wrapper = createWrapper('Achats');
                const bWrapper = wrapper.findComponent(MpButton);
                expect(bWrapper.text()).toStrictEqual('ged.upload.uploadModal.uploadAll “Achats”');
                expect(bWrapper.props('disabled')).toBeFalsy();
            });
            it('Should pass disabled props when disabled props is passed', () => {
                const wrapper = createWrapper('Achats', true);
                const bWrapper = wrapper.findComponent(MpButton);
                expect(bWrapper.props('disabled')).toBeTruthy();
            });
        });
    });
    describe('events', () => {
        it("Should fire 'clicked' when click-button is emitted", () => {
            const wrapper = createWrapper('Achats');
            const bWrapper = wrapper.findComponent(MpButton);
            bWrapper.trigger('click');
            expect(wrapper.emitted()['click'].length).toBe(1);
        });
    });
});
//# sourceMappingURL=SecondaryCtaButton.spec.js.map
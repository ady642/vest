"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoUploadDropDown_vue_1 = require("@/Common/components/Upload/Dropdown/NattoUploadDropDown.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoUploadBtn = {
    template: '<div><slot></slot></div>',
    name: 'ElUpload',
    props: ['isDrag', 'targetInput']
};
const createWrapper = () => (0, wrapperFactory_1.default)(NattoUploadDropDown_vue_1.default, {
    global: {
        stubs: {
            NattoUploadBtn
        }
    }
});
describe('natto-upload-dropdown', () => {
    describe('events', () => {
        it('Should emit on-change-files event on NattoUploadBtn click', async () => {
            const wrapper = createWrapper();
            const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn);
            await NattoUploadBtnWrapper.vm.$emit('on-files-change');
            expect(wrapper.emitted('on-files-change')).toBeTruthy();
        });
    });
    describe('binding', () => {
        it('isDrag shoud be false', () => {
            const wrapper = createWrapper();
            const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn);
            expect(NattoUploadBtnWrapper.vm.isDrag).toEqual(false);
        });
        it('target input should be .natto-upload-box input[type=file]', () => {
            const wrapper = createWrapper();
            const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn);
            expect(NattoUploadBtnWrapper.vm.targetInput).toEqual('.dropdown-upload-btn input[type=file]');
        });
    });
});
//# sourceMappingURL=NattoUploadDropDown.spec.js.map
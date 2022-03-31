"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoUploadBtn_vue_1 = require("@/Common/components/Upload/Buttons/NattoUploadBtn.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const ElUpload = {
    template: '<div><slot></slot></div>',
    name: 'ElUpload',
    props: ['httpRequest', 'onChange', 'fileList', 'showFileList']
};
const createWrapper = () => (0, wrapperFactory_1.default)(NattoUploadBtn_vue_1.default, {
    global: {
        stubs: {
            ElUpload
        }
    }
});
describe('natto-upload-btn', () => {
    describe('binding', () => {
        it('shoud have the same httpRequest property', () => {
            const wrapper = createWrapper();
            const ElUploadWrapper = wrapper.findComponent(ElUpload);
            expect(ElUploadWrapper.vm.httpRequest).toBe(wrapper.vm.emitFilesEvent);
        });
        it('shoud have the same fileList property', () => {
            const wrapper = createWrapper();
            const ElUploadWrapper = wrapper.findComponent(ElUpload);
            expect(ElUploadWrapper.vm.fileList).toBe(wrapper.vm.fileList);
        });
        it('shoud have showFileList as false', () => {
            const wrapper = createWrapper();
            const ElUploadWrapper = wrapper.findComponent(ElUpload);
            expect(ElUploadWrapper.vm.showFileList).toEqual(false);
        });
    });
});
//# sourceMappingURL=NattoUploadBtn.spec.js.map
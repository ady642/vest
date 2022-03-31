"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentsUploadBox_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBox.vue");
const NattoUploadBox_vue_1 = require("@/Common/components/Upload/Box/NattoUploadBox.vue");
const createWrapper = (supportedTypes, disabled) => (0, wrapperFactory_1.default)(DocumentsUploadBox_vue_1.default, {
    propsData: {
        supportedTypes,
        disabled
    },
    global: {
        stubs: {
            NattoUploadBox: NattoUploadBox_vue_1.default
        }
    }
});
describe('document-upload-box', () => {
    describe('binding', () => {
        it('Should pass the correct values', async () => {
            const wrapper = createWrapper(['ext1', 'ext2'], false);
            const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBox_vue_1.default);
            expect(NattoUploadBtnWrapper.vm.disabled).toEqual(NattoUploadBtnWrapper.vm.disabled);
            expect(NattoUploadBtnWrapper.vm.supportedTypes).toHaveLength(2);
        });
    });
});
//# sourceMappingURL=DocumentUploadBox.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsUploadBtn_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue");
const NattoUploadDropDown_vue_1 = require("@/Common/components/Upload/Dropdown/NattoUploadDropDown.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoUploadFilesBtn_vue_1 = require("@/Common/components/Upload/Buttons/NattoUploadFilesBtn.vue");
const createWrapper = (supportedTypes, disabled, canUploadFiles, hasAccessDs, isMainViewBtn) => (0, wrapperFactory_1.default)(DocumentsUploadBtn_vue_1.default, {
    propsData: {
        supportedTypes,
        disabled,
        canUploadFiles,
        hasAccessDs,
        isMainViewBtn
    },
    global: {
        stubs: {
            NattoUploadDropdown: NattoUploadDropDown_vue_1.default,
            NattoUploadFilesBtn: NattoUploadFilesBtn_vue_1.default
        },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let wrapper = createWrapper(['ext1', 'ext2'], false, true, true, true);
describe('document-upload-btn', () => {
    beforeEach(() => {
        wrapper = createWrapper(['ext1', 'ext2'], false, true, true, true);
    });
    describe('binding', () => {
        it('Should have the correct values passed', async () => {
            const NattoUploadFilesBtnWrapper = wrapper.findComponent(NattoUploadFilesBtn_vue_1.default);
            expect(wrapper.props('disabled')).toEqual(NattoUploadFilesBtnWrapper.props('disabled'));
        });
        it('Should have the correct  canUploadFiles value passed', async () => {
            const NattoUploadFilesBtnWrapper = wrapper.findComponent(NattoUploadFilesBtn_vue_1.default);
            expect(wrapper.props('canUploadFiles')).toEqual(NattoUploadFilesBtnWrapper.props('canUploadFiles'));
        });
        it('Should have the correct  hasAccessDs value passed', async () => {
            const NattoUploadFilesBtnWrapper = wrapper.findComponent(NattoUploadFilesBtn_vue_1.default);
            expect(wrapper.props('hasAccessDs')).toEqual(NattoUploadFilesBtnWrapper.props('hasAccessDs'));
        });
        it('Should have the correct  hasAccessDs value passed', async () => {
            const NattoUploadFilesBtnWrapper = wrapper.findComponent(NattoUploadFilesBtn_vue_1.default);
            expect(wrapper.props('isMainViewBtn')).toEqual(NattoUploadFilesBtnWrapper.props('isMainViewBtn'));
        });
    });
});
//# sourceMappingURL=DocumentUploadBtn.spec.js.map
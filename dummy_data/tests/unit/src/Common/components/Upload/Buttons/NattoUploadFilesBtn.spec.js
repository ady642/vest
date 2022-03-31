"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoIcon_vue_1 = require("@/Common/components/Icons/NattoIcon.vue");
const NattoUploadBtn_vue_1 = require("@/Common/components/Upload/Buttons/NattoUploadBtn.vue");
const NattoUploadFilesBtn_vue_1 = require("@/Common/components/Upload/Buttons/NattoUploadFilesBtn.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { MpButton } = (0, useStyleguideStubs_1.default)();
const defaultProps = {
    icon: 'icon-value',
    buttoninnerText: 'btn inner text',
    disabled: false,
    canUploadFiles: true,
    hasAccessDs: true,
    isMainViewBtn: true
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoUploadFilesBtn_vue_1.default, {
    props,
    global: {
        stubs: {
            NattoUploadBtn: NattoUploadBtn_vue_1.default,
            NattoIcon: NattoIcon_vue_1.default,
            MpButton,
            ElUpload: {}
        },
        renderStubDefaultSlot: true
    }
});
let wrapper = createWrapper();
describe('NattoUploadFilesBtn', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('binding', () => {
        it('Should pass prop disabled correctly to natto-upload-btn', () => {
            const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn_vue_1.default);
            expect(wrapper.props('disabled')).toBe(NattoUploadBtnWrapper.props('disabled'));
        });
    });
    describe('rendring', () => {
        it('Should display the correct button text', () => {
            const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn_vue_1.default);
            const innerText = NattoUploadBtnWrapper.find('.btn-text');
            expect(innerText.text()).toBe(wrapper.props('buttoninnerText'));
        });
        describe('In arbo view', () => {
            const disabledCases = [
                {
                    disabled: true,
                    canUploadFiles: true,
                    hasAccessDs: true,
                    isMainViewBtn: false,
                    expectedValue: true
                },
                {
                    disabled: false,
                    canUploadFiles: false,
                    hasAccessDs: true,
                    isMainViewBtn: false,
                    expectedValue: true
                },
                {
                    disabled: false,
                    canUploadFiles: true,
                    hasAccessDs: false,
                    isMainViewBtn: false,
                    expectedValue: true
                }
            ];
            test.each(disabledCases)('disabled cases', ({ disabled, canUploadFiles, hasAccessDs, isMainViewBtn, expectedValue }) => {
                // Given props are set
                wrapper = createWrapper({
                    icon: 'icon-value',
                    buttoninnerText: 'btn inner text',
                    disabled,
                    canUploadFiles,
                    hasAccessDs,
                    isMainViewBtn
                });
                const btnWrapper = wrapper.findComponent(MpButton);
                expect(btnWrapper.props('disabled')).toBe(expectedValue);
            });
        });
        it('Should be hidden when hasAccessDs is false', () => {
            wrapper = createWrapper({
                icon: 'icon-value',
                buttoninnerText: 'btn inner text',
                disabled: false,
                canUploadFiles: true,
                hasAccessDs: false,
                isMainViewBtn: true
            });
            const NattoUploadBtnWrapper = wrapper.findComponent(NattoUploadBtn_vue_1.default);
            expect(NattoUploadBtnWrapper.exists()).toBe(false);
        });
    });
    describe('events', () => {
        it('should emit on-files-change on natto-upload-btn files change event', async () => {
            const NattoUploadBtnWrapper = await wrapper.findComponent(NattoUploadBtn_vue_1.default);
            NattoUploadBtnWrapper.vm.$emit('on-files-change');
            expect(wrapper.emitted('on-files-change')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=NattoUploadFilesBtn.spec.js.map
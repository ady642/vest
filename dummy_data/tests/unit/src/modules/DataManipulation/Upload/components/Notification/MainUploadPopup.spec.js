"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainUploadPopup_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/MainUploadPopup.vue");
const InProgressUploadPopup_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/InProgressUploadPopup.vue");
const FailedUploadPopup_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/FailedUploadPopup.vue");
const SuccessUploadPopup_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/SuccessUploadPopup.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FileUploadMock_1 = require("../../__mocks__/FileUploadMock");
const translationHelper = require("@/Common/hooks/useTranslation");
const createWrapper = ({ loading, duration, files }) => (0, wrapperFactory_1.default)(MainUploadPopup_vue_1.default, {
    propsData: {
        loading,
        duration,
        files
    },
    global: {
        stubs: {
            SuccessUploadPopup: SuccessUploadPopup_vue_1.default,
            FailedUploadPopup: FailedUploadPopup_vue_1.default,
            InProgressUploadPopup: InProgressUploadPopup_vue_1.default
        }
    }
});
let tMock = jest.fn();
let tcMock = jest.fn();
jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
    t: tMock,
    tc: tcMock
});
describe('InProgressUploadPopup', () => {
    describe('binding', () => {
        it('Should bind correct values and display in-progress when files are running and loading true', () => {
            const wrapper = createWrapper({
                loading: true,
                duration: 1000,
                files: FileUploadMock_1.filesProgressCase
            });
            const inProgressUploadPopupWrapper = wrapper.findComponent(InProgressUploadPopup_vue_1.default);
            expect(inProgressUploadPopupWrapper.props('total')).toBe(3);
            expect(inProgressUploadPopupWrapper.props('running')).toBe(1);
            expect(inProgressUploadPopupWrapper.props('loading')).toBe(true);
        });
        it('Should bind correct values and display success popup', () => {
            const wrapper = createWrapper({
                loading: true,
                duration: 1000,
                files: FileUploadMock_1.filesSuccessCase
            });
            const successUploadPopupWrapper = wrapper.findComponent(SuccessUploadPopup_vue_1.default);
            expect(successUploadPopupWrapper.props('successed')).toBe(3);
        });
        it('Should bind correct values and display failed popup', () => {
            const wrapper = createWrapper({
                loading: true,
                duration: 1000,
                files: FileUploadMock_1.filesFailedCase
            });
            const failedUploadPopupWrapper = wrapper.findComponent(FailedUploadPopup_vue_1.default);
            expect(failedUploadPopupWrapper.props('errored')).toBe(1);
            expect(failedUploadPopupWrapper.props('canceled')).toBe(1);
            expect(failedUploadPopupWrapper.props('successed')).toBe(1);
        });
        it('Should run function after duration when all files uploaded', async () => {
            jest.useFakeTimers();
            const duration = 1000;
            const wrapper = createWrapper({
                loading: true,
                duration: duration,
                files: FileUploadMock_1.filesProgressCase
            });
            wrapper.setProps({ files: FileUploadMock_1.filesSuccessCase });
            await wrapper.vm.$nextTick();
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
        });
    });
});
//# sourceMappingURL=MainUploadPopup.spec.js.map
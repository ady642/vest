"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoUploadStateIcon_vue_1 = require("@/Common/components/Items/NattoUploadStateIcon.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const WarningIcon_vue_1 = require("@/Common/components/Icons/WarningIcon.vue");
const LoadedIcon_vue_1 = require("@/Common/components/Icons/LoadedIcon.vue");
const LoadingIcon_vue_1 = require("@/Common/components/Icons/LoadingIcon.vue");
const PendingIcon_vue_1 = require("@/Common/components/Icons/PendingIcon.vue");
const FileIcon_vue_1 = require("@/Common/components/Icons/FileIcon.vue");
const createWrapper = (statusIcon) => (0, wrapperFactory_1.default)(NattoUploadStateIcon_vue_1.default, {
    global: {
        stubs: {
            WarningIcon: WarningIcon_vue_1.default,
            LoadedIcon: LoadedIcon_vue_1.default,
            LoadingIcon: LoadingIcon_vue_1.default,
            PendingIcon: PendingIcon_vue_1.default
        }
    },
    propsData: {
        statusIcon
    }
});
describe('NattoUploadStateIcon', () => {
    describe('binding', () => {
        it('Should display warning icon when state is canceled', () => {
            const wrapper = createWrapper(FileUpload_1.StateUpload.CANCELED);
            const NattoUploadStateIconWrapper = wrapper.find('.warning');
            expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0);
        });
        it('Should display warning icon when state is errored', () => {
            const wrapper = createWrapper(FileUpload_1.StateUpload.ERROR);
            const NattoUploadStateIconWrapper = wrapper.find('.warning');
            expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0);
        });
        it('Should display loading icon when state is loading', () => {
            const wrapper = createWrapper(FileUpload_1.StateUpload.UPLOADING);
            const NattoUploadStateIconWrapper = wrapper.find('.loader');
            expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0);
        });
        it('Should display loading icon when state is pending', () => {
            const wrapper = createWrapper(FileUpload_1.StateUpload.PENDING);
            const NattoUploadStateIconWrapper = wrapper.find('.pending');
            expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0);
        });
        it('Should display loaded icon when state is loaded', () => {
            const wrapper = createWrapper(FileUpload_1.StateUpload.UPLOADED);
            const NattoUploadStateIconWrapper = wrapper.find('.success');
            expect(NattoUploadStateIconWrapper.classes().length).toBeGreaterThan(0);
        });
        it('Should display file icon when state is not set', () => {
            const wrapper = createWrapper();
            const fileIconWrapper = wrapper.findComponent(FileIcon_vue_1.default);
            expect(fileIconWrapper.exists()).toBe(true);
        });
    });
});
//# sourceMappingURL=NattoUploadStateIcon.spec.js.map
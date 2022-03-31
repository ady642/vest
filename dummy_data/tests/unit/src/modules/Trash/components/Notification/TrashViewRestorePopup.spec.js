"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashDocuments_1 = require("@/modules/Trash/models/Inputs/TrashDocuments");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const TrashDocumentAPIMock_1 = require("../../mocks/TrashDocumentAPIMock");
const TrashViewRestorePopup_vue_1 = require("@/modules/Trash/components/Notification/TrashViewRestorePopup.vue");
const SuccessPopup_vue_1 = require("@/modules/Trash/components/Notification/Elements/SuccessPopup.vue");
const FailedPopup_vue_1 = require("@/modules/Trash/components/Notification/Elements/FailedPopup.vue");
const InProgressPopup_vue_1 = require("@/modules/Trash/components/Notification/Elements/InProgressPopup.vue");
const translationHelper = require("@/Common/hooks/useTranslation");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
const constants_1 = require("@/Common/constants");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn()
}));
const documentsData = TrashDocuments_1.default.loaded(TrashDocumentAPIMock_1.TrashDocumentAPILightMockList);
const defaultProps = {
    duration: 5000,
    pending: true,
    success: false,
    failed: false,
    documents: documentsData,
    restoredDocument: documentsData.collection[0]
};
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const createWrapper = (store = storeMock, props = defaultProps) => (0, wrapperFactory_1.default)(TrashViewRestorePopup_vue_1.default, {
    props: props,
    global: {
        plugins: [store],
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        },
        stubs: {
            SuccessPopup: SuccessPopup_vue_1.default,
            FailedPopup: FailedPopup_vue_1.default,
            InProgressPopup: InProgressPopup_vue_1.default
        }
    }
});
let tMock = jest.fn();
let tcMock = jest.fn();
jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
    t: tMock,
    tc: tcMock
});
let wrapper = createWrapper();
describe('TrashViewRestorePopup', () => {
    beforeEach(async () => {
        wrapper = createWrapper();
        storeMock.dispatch = jest.fn();
        tMock = jest.fn();
        tcMock = jest.fn();
        jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
            t: tMock,
            tc: tcMock
        });
    });
    describe('binding', () => {
        describe('props', () => {
            const cases = [
                { prop: 'duration', expected: 5000 },
                { prop: 'pending', expected: true },
                { prop: 'success', expected: false },
                { prop: 'failed', expected: false },
                { prop: 'documents', expected: documentsData },
                { prop: 'restoredDocument', expected: documentsData.collection[0] }
            ];
            test.each(cases)('Should bind component props correctly', ({ prop, expected }) => {
                expect(wrapper.props(prop)).toEqual(expected);
            });
        });
        describe('components', () => {
            describe('SuccessPopup', () => {
                describe('binding', () => {
                    beforeEach(async () => {
                        wrapper = createWrapper(storeMock, {
                            duration: 5000,
                            pending: false,
                            success: true,
                            failed: false,
                            documents: documentsData,
                            restoredDocument: documentsData.collection[0]
                        });
                        storeMock.dispatch = jest.fn();
                    });
                    describe('props', () => {
                        it('Should bind successed prop correctly correctly', () => {
                            const successPopupWrapper = wrapper.findComponent(SuccessPopup_vue_1.default);
                            expect(successPopupWrapper.props('fileName')).toEqual(wrapper.vm.restoredDocument.name);
                        });
                    });
                    describe('events', () => {
                        it('Should emit close event', async () => {
                            const successPopupWrapper = wrapper.findComponent(SuccessPopup_vue_1.default);
                            await successPopupWrapper.vm.$emit('close');
                            expect(wrapper.emitted('close')).toBeTruthy();
                        });
                        it('Should emit redirect-to-location event', async () => {
                            const successPopupWrapper = wrapper.findComponent(SuccessPopup_vue_1.default);
                            await successPopupWrapper.vm.$emit('redirect-to-location');
                            expect(analyticsLog_1.trackEventFactory).toBeCalledWith('tdv-notification-restore-cta');
                            expect(wrapper.emitted('redirect-to-location')).toBeTruthy();
                        });
                    });
                });
                describe('rendering', () => {
                    beforeEach(() => {
                        wrapper = createWrapper(storeMock, {
                            duration: 5000,
                            pending: false,
                            success: true,
                            failed: false,
                            documents: documentsData,
                            restoredDocument: documentsData.collection[0]
                        });
                        storeMock.dispatch = jest.fn();
                    });
                    it('Should display success popup when success is true', () => {
                        const successPopupWrapper = wrapper.findComponent(SuccessPopup_vue_1.default);
                        expect(successPopupWrapper.exists()).toBeTruthy();
                    });
                });
            });
            describe('FailedPopup', () => {
                describe('binding', () => {
                    beforeEach(async () => {
                        wrapper = createWrapper(storeMock, {
                            duration: 5000,
                            pending: false,
                            success: false,
                            failed: true,
                            documents: documentsData,
                            restoredDocument: documentsData.collection[0]
                        });
                        storeMock.dispatch = jest.fn();
                    });
                    describe('events', () => {
                        it('Should emit close event', async () => {
                            const FailedPopupWrapper = wrapper.findComponent(FailedPopup_vue_1.default);
                            await FailedPopupWrapper.vm.$emit('close');
                            expect(wrapper.emitted('close')).toBeTruthy();
                        });
                    });
                });
                describe('rendering', () => {
                    beforeEach(() => {
                        wrapper = createWrapper(storeMock, {
                            duration: 5000,
                            pending: false,
                            success: false,
                            failed: true,
                            documents: documentsData,
                            restoredDocument: documentsData.collection[0]
                        });
                        storeMock.dispatch = jest.fn();
                    });
                    it('Should display failed popup when failed is true', () => {
                        const FailedPopupWrapper = wrapper.findComponent(FailedPopup_vue_1.default);
                        expect(FailedPopupWrapper.exists()).toBeTruthy();
                    });
                });
            });
            describe('InProgressPopup', () => {
                describe('binding', () => {
                    const DOCUMENTS_IN_RESTORATION_COUNT = 4;
                    beforeEach(async () => {
                        for (let i = 0; i < DOCUMENTS_IN_RESTORATION_COUNT; i++) {
                            documentsData.collection[i].restorationStatus =
                                constants_1.default.RESTORE_IN_PROGRESS;
                        }
                        wrapper = createWrapper(storeMock, {
                            duration: 5000,
                            pending: true,
                            success: false,
                            failed: false,
                            documents: documentsData,
                            restoredDocument: documentsData.collection[0]
                        });
                        storeMock.dispatch = jest.fn();
                    });
                    describe('props', () => {
                        it('Should bind running prop correctly', () => {
                            const InProgressPopupWrapper = wrapper.findComponent(InProgressPopup_vue_1.default);
                            expect(InProgressPopupWrapper.props('running')).toEqual(DOCUMENTS_IN_RESTORATION_COUNT);
                        });
                    });
                    describe('events', () => {
                        it('Should emit cancel event', async () => {
                            const InProgressPopupWrapper = wrapper.findComponent(InProgressPopup_vue_1.default);
                            await InProgressPopupWrapper.vm.$emit('cancelRestore');
                            expect(wrapper.emitted('cancelRestore')).toBeTruthy();
                        });
                    });
                });
                describe('rendering', () => {
                    beforeEach(() => {
                        wrapper = createWrapper(storeMock, {
                            duration: 5000,
                            pending: true,
                            success: false,
                            failed: false,
                            documents: documentsData,
                            restoredDocument: documentsData.collection[0]
                        });
                        storeMock.dispatch = jest.fn();
                    });
                    it('Should display inprogress popup when pending is true', () => {
                        const InProgressPopupWrapper = wrapper.findComponent(InProgressPopup_vue_1.default);
                        expect(InProgressPopupWrapper.exists()).toBeTruthy();
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=TrashViewRestorePopup.spec.js.map
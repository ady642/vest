"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchPage_vue_1 = require("@/modules/Search/pages/SearchPage.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentsUploadModal_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/DocumentsUploadModal.vue");
const vuex_1 = require("vuex");
const DefaultLayout_vue_1 = require("@/Common/layouts/DefaultLayout.vue");
const store_1 = require("@/modules/Search/store");
const store_2 = require("@/modules/DataManipulation/store");
const store_3 = require("@/modules/DataManipulation/Upload/store");
const DocumentsPaginator_1 = require("@/modules/Search/models/Documents/Query/DocumentsPaginator");
const FileUploadMock_1 = require("../../DataManipulation/Upload/__mocks__/FileUploadMock");
const getterHelpers_1 = require("@/modules/Search/store/helpers/getterHelpers");
const dispatchHelpers_1 = require("@/modules/Search/store/helpers/dispatchHelpers");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const routerMock = mypulse_shared_dependencies_1.router;
const mockTest = jest.fn();
jest.mock('@/modules/Search/store/helpers', () => () => ({
    ...(0, getterHelpers_1.default)(),
    ...(0, dispatchHelpers_1.default)(),
    addFetchDocumentsSubscriber: mockTest
}));
const mockGoToMainView = jest.fn();
jest.mock('@/modules/Search/navigator/useSearchNavigator', () => () => ({
    goToMainView: mockGoToMainView
}));
const storeMock = (0, vuex_1.createStore)({
    modules: {
        GED: {
            namespaced: true,
            modules: {
                Search: {
                    ...store_1.default,
                    actions: {
                        ...store_1.default.actions,
                        setFileState: jest.fn(),
                        setFileDestination: jest.fn(),
                        setPaginator: jest.fn(),
                        fetchDocuments: jest.fn()
                    }
                },
                DataManipulation: {
                    ...store_2.default,
                    modules: {
                        Upload: store_3.default
                    }
                }
            }
        }
    }
});
const RouterView = {
    template: '<div />',
    name: 'RouterView',
    props: ['isDocumentUploadModalOpened']
};
const createWrapper = () => (0, wrapperFactory_1.default)(SearchPage_vue_1.default, {
    global: {
        plugins: [storeMock],
        stubs: { DefaultLayout: DefaultLayout_vue_1.default, RouterView }
    }
});
let wrapper = createWrapper();
const findRouterView = (wrapper) => wrapper.findComponent(RouterView);
const findDocumentsUploadModal = (wrapper) => wrapper.findComponent(DocumentsUploadModal_vue_1.default);
describe('SearchPage', () => {
    beforeEach(() => {
        // Given Search.vue is mounted
        wrapper = createWrapper();
        storeMock.dispatch = jest.fn();
        mockGoToMainView.mockClear();
    });
    describe('on created', () => {
        it('should subscribe to fetchDocuments action', async () => {
            await wrapper.vm.$nextTick();
            expect(mockTest).toHaveBeenCalled();
        });
        it.each(['/trash', '/bank', 'documents/trash'])('openUploadModal when route is %s', async (currentRoute) => {
            routerMock.currentRoute.value.path = currentRoute;
            wrapper.vm.openUploadModal();
            await wrapper.vm.$nextTick();
            expect(mockGoToMainView).toHaveBeenCalledWith({
                openFilesUploadModal: true
            });
        });
        it.each(['/documents', '/documents/arbo'])('openUploadModal when route is %s', async (currentRoute) => {
            routerMock.currentRoute.value.path = currentRoute;
            wrapper.vm.openUploadModal();
            await wrapper.vm.$nextTick();
            expect(mockGoToMainView).not.toHaveBeenCalled();
            const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
            expect(documentsUploadModalWrapper.props().modelValue).toBe(true);
        });
    });
    describe('events', () => {
        describe('events from RouterView', () => {
            it('Should bind payload from update:isDocumentUploadModalOpened event with modelValue DocumentsUploadModal property', async () => {
                // When RouterView receive an update:isDocumentUploadModalOpened event with true as payload
                const routerViewWrapper = findRouterView(wrapper);
                await routerViewWrapper.vm.$emit('update:isDocumentUploadModalOpened', true);
                // Then modelValue property of DocumentsUploadModal must be true
                const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                expect(documentsUploadModalWrapper.props().modelValue).toBe(true);
                expect(storeMock.dispatch).toHaveBeenCalledWith(`${(0, store_3.uploadModule)('closeGedNotification')}`);
            });
            it('Should bind payload from disable-selection-categories event with disabledCategories DocumentsUploadModal property', async () => {
                // When RouterView receive a disable-selection-categories event with true as payload
                const routerViewWrapper = findRouterView(wrapper);
                await routerViewWrapper.vm.$emit('disable-selection-categories', true);
                // Then disabledCategories property of DocumentsUploadModal must be true
                const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                expect(documentsUploadModalWrapper.props().disabledCategories).toBe(true);
            });
            it('Should bind payload from upload-all-files-same-folder event with triggerUploadAllFiles DocumentsUploadModal property', async () => {
                // When RouterView receive a disable-selection-categories event with true as payload
                const routerViewWrapper = findRouterView(wrapper);
                await routerViewWrapper.vm.$emit('upload-all-files-same-folder');
                // Then triggerUploadAllFiles property of DocumentsUploadModal must be true
                const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                expect(documentsUploadModalWrapper.props().triggerUploadAllFiles).toBe(true);
            });
        });
        describe('events from DocumentsUploadModal', () => {
            it('Should bind payload from update:modelValue event with isDocumentUploadModalOpened RouterView property', async () => {
                // When RouterView receive a on-selected-folder-change event with 27 as payload
                const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                await documentsUploadModalWrapper.vm.$emit('update:modelValue', true);
                // Then isDocumentUploadModalOpened property of RouterView must be true
                const routerViewWrapper = findRouterView(wrapper);
                expect(routerViewWrapper.props().isDocumentUploadModalOpened).toBe(true);
            });
            it('Should dispatch setPaginator, fetchDocuments and fetchDocumentsTotalCount actions, when reset is emitted', async () => {
                // When DocumentsUploadModal emit reset
                const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                await documentsUploadModalWrapper.vm.$emit('reset');
                // Then setPaginator and fetchDocuments  actions must be dispatched
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/setPaginator', new DocumentsPaginator_1.default());
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocuments');
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocumentsTotalCount');
            });
            describe('showPopup', () => {
                it('Should call setGedNotifications when on-files-dropped event fired (all-files-authorized)', async () => {
                    storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock_1.filesProgressCase;
                    await wrapper.vm.$nextTick();
                    const routerViewWrapper = findRouterView(wrapper);
                    await routerViewWrapper.vm.$emit('on-files-dropped');
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(1, `${(0, store_3.uploadModule)('closeGedNotification')}`);
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(2, `${(0, store_3.uploadModule)('setGedNotification')}`, 'the notification');
                });
                it('Should call setGedNotifications when on-files-dropped event fired (some-files-authorized-other-no)', async () => {
                    storeMock.state.GED.DataManipulation.Upload.files = [
                        ...FileUploadMock_1.filesProgressCase,
                        ...FileUploadMock_1.filesFailedCase
                    ];
                    await wrapper.vm.$nextTick();
                    const routerViewWrapper = findRouterView(wrapper);
                    await routerViewWrapper.vm.$emit('on-files-dropped');
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(1, `${(0, store_3.uploadModule)('closeGedNotification')}`);
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(2, `${(0, store_3.uploadModule)('setGedNotification')}`, 'the notification');
                });
                it('Should call setGedNotifications when on-files-dropped event fired (all-files-are-unauthorized)', async () => {
                    storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock_1.filesFailedCase;
                    await wrapper.vm.$nextTick();
                    const routerViewWrapper = findRouterView(wrapper);
                    await routerViewWrapper.vm.$emit('on-files-dropped');
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(1, `${(0, store_3.uploadModule)('closeGedNotification')}`);
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(2, `${(0, store_3.uploadModule)('setGedNotification')}`, 'the notification');
                });
                it('Should not call setGedNotifications when on-files-dropped event fired (all-files-are-already-uploaded', async () => {
                    storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock_1.FileUploadMock;
                    await wrapper.vm.$nextTick();
                    const routerViewWrapper = findRouterView(wrapper);
                    await routerViewWrapper.vm.$emit('on-files-dropped');
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(1, `${(0, store_3.uploadModule)('closeGedNotification')}`);
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(2, `${(0, store_3.uploadModule)('setGedNotification')}`, 'the notification');
                });
                it('Should dispatch setPaginator, fetchDocuments, fetchDocumentsTotalCount and setGedNotifications actions, when reset is emitted', async () => {
                    storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock_1.filesProgressCase;
                    await wrapper.vm.$nextTick();
                    // When DocumentsUploadModal emit reset
                    const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                    await documentsUploadModalWrapper.vm.$emit('reset');
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(1, `${(0, store_3.uploadModule)('closeGedNotification')}`);
                    expect(storeMock.dispatch).toHaveBeenNthCalledWith(2, `${(0, store_3.uploadModule)('setGedNotification')}`, 'the notification');
                    // Then setPaginator and fetchDocuments  actions must be dispatched
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/setPaginator', new DocumentsPaginator_1.default());
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocuments');
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocumentsTotalCount');
                    expect(global.ElNotification).toHaveBeenCalled();
                });
                it('Should dispatch only setPaginator, fetchDocuments, fetchDocumentsTotalCount actions, when reset is emitted with every files are finished', async () => {
                    storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock_1.FileUploadMock;
                    await wrapper.vm.$nextTick();
                    // When DocumentsUploadModal emit reset
                    const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                    await documentsUploadModalWrapper.vm.$emit('reset');
                    expect(storeMock.dispatch).not.toHaveBeenCalledWith(`${(0, store_3.uploadModule)('closeGedNotification')}`);
                    expect(storeMock.dispatch).not.toHaveBeenCalledWith(`${(0, store_3.uploadModule)('setGedNotification')}`, 'the notification');
                    // Then setPaginator and fetchDocuments  actions must be dispatched
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/setPaginator', new DocumentsPaginator_1.default());
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocuments');
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocumentsTotalCount');
                });
                it('Should dispatch setPaginator, fetchDocuments, fetchDocumentsTotalCount and setGedNotifications actions, when reset is emitted and files are failling to upload', async () => {
                    storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock_1.filesFailedCase;
                    await wrapper.vm.$nextTick();
                    // When DocumentsUploadModal emit reset
                    const documentsUploadModalWrapper = findDocumentsUploadModal(wrapper);
                    await documentsUploadModalWrapper.vm.$emit('reset');
                    // Then setPaginator and fetchDocuments  actions must be dispatched
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/setPaginator', new DocumentsPaginator_1.default());
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocuments');
                    expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/fetchDocumentsTotalCount');
                    expect(global.ElNotification).toHaveBeenCalled();
                });
            });
        });
    });
});
//# sourceMappingURL=SearchPage.spec.js.map
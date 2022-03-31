"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GedCardContent_vue_1 = require("@/Common/components/Home/Card/GedCardContent/GedCardContent.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Shortcuts_vue_1 = require("@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcuts.vue");
const NoAccessBox_vue_1 = require("@/Common/components/Home/Card/GedCardContent/NoAccess/NoAccessBox.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const createStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createStoreMock");
const GedCardUploadBox_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/GedCardUploadBox.vue");
const NattoDropZone_vue_1 = require("@/Common/components/Upload/NattoDropZone.vue");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
/****
 * Wrapper finders
 */
const findShortcuts = (wrapper) => wrapper.findComponent(Shortcuts_vue_1.default);
const findNoAccess = (wrapper) => wrapper.findComponent(NoAccessBox_vue_1.default);
const findGedCardUploadBox = (wrapper) => wrapper.findComponent(GedCardUploadBox_vue_1.default);
const findNattoDropZone = (wrapper) => wrapper.findComponent(NattoDropZone_vue_1.default);
/****
 * Wrapper creation
 */
const createWrapper = (store = (0, storeMock_1.createSearchStoreMocked)()) => (0, wrapperFactory_1.default)(GedCardContent_vue_1.default, {
    global: {
        plugins: [store],
        mocks: {
            $t: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        },
        stubs: {
            NattoDropZone: NattoDropZone_vue_1.default
        }
    }
});
let wrapper = createWrapper();
let shortcutsWrapper = findShortcuts(wrapper);
let gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper);
let noAccessWrapper = findNoAccess(wrapper);
let nattoDropZoneWrapper = findNattoDropZone(wrapper);
describe('GedCardContent', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        shortcutsWrapper = findShortcuts(wrapper);
        gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper);
        noAccessWrapper = findNoAccess(wrapper);
        nattoDropZoneWrapper = findNattoDropZone(wrapper);
    });
    describe('rendering', () => {
        expect(wrapper.text()).toContain('ged.title');
    });
    describe('bindings with Shortcut', () => {
        describe('props bindings ', () => {
            test('Shortcuts', async () => {
                wrapper = createWrapper((0, storeMock_1.createSearchStoreMocked)({ folders: (0, FoldersDataMock_1.default)().FoldersData }));
                shortcutsWrapper = findShortcuts(wrapper);
                expect(shortcutsWrapper.props('folders')).toEqual((0, FoldersDataMock_1.default)().FoldersData);
            });
            test('GedCardUploadBox', async () => {
                wrapper = createWrapper((0, storeMock_1.createSearchStoreMocked)({ folders: (0, FoldersDataMock_1.default)().FoldersData }));
                gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper);
                expect(gedCardUploadBoxWrapper.props('isUploading')).toBeFalsy();
            });
        });
        describe('rendering', () => {
            it('Should display no-access component and hide other components when there is no folder', () => {
                wrapper = createWrapper();
                noAccessWrapper = findNoAccess(wrapper);
                expect(noAccessWrapper.exists()).toBeTruthy();
                expect(shortcutsWrapper.exists()).toBeFalsy();
                expect(gedCardUploadBoxWrapper.exists()).toBeFalsy();
            });
            it('Should display shortcuts and upload box components when there is some folders', () => {
                wrapper = createWrapper((0, storeMock_1.createSearchStoreMocked)({
                    folders: (0, FoldersDataMock_1.default)().FoldersData
                }));
                noAccessWrapper = findNoAccess(wrapper);
                shortcutsWrapper = findShortcuts(wrapper);
                gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper);
                expect(noAccessWrapper.exists()).toBeFalsy();
                expect(shortcutsWrapper.exists()).toBeTruthy();
                expect(gedCardUploadBoxWrapper.exists()).toBeTruthy();
            });
        });
    });
    describe('bindings with GedCardUploadBox', () => {
        test('props bindings', () => {
            wrapper = createWrapper((0, storeMock_1.createSearchStoreMocked)({
                folders: (0, FoldersDataMock_1.default)().FoldersData
            }));
            gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper);
            expect(gedCardUploadBoxWrapper.props('isUploading')).toBe(false);
        });
        describe('events', () => {
            it('should NOT go to MainView when upload in progress', async () => {
                const wrapper = createWrapper((0, createStoreMock_1.createFileStoreMock)({
                    isUploading: true,
                    folders: (0, FoldersDataMock_1.default)().FoldersData
                }));
                gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper);
                await gedCardUploadBoxWrapper.vm.$emit('click');
                expect(mypulse_shared_dependencies_1.router.push).toHaveBeenCalledTimes(0);
            });
            it('should go to MainView with windows explorer opened when no upload in progress', async () => {
                const wrapper = createWrapper((0, createStoreMock_1.createFileStoreMock)({
                    isUploading: false,
                    folders: (0, FoldersDataMock_1.default)().FoldersData
                }));
                gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper);
                await gedCardUploadBoxWrapper.vm.$emit('click');
                expect(mypulse_shared_dependencies_1.router.push).toHaveBeenCalledWith({
                    name: 'MainView',
                    query: { openSelectFilesWindow: true }
                });
            });
        });
    });
    describe('bindings with NattoDropZone', () => {
        it('should dispatch setFiles action and go to Main view when NattoDropZone emit files-changes event', async () => {
            const storeFileModule = (0, createStoreMock_1.createFileStoreMock)();
            storeFileModule.dispatch = jest.fn();
            wrapper = createWrapper(storeFileModule);
            const fileList = [
                new File([''], 'File1'),
                new File([''], 'File1')
            ];
            nattoDropZoneWrapper = findNattoDropZone(wrapper);
            await nattoDropZoneWrapper.vm.$emit('files-changes', fileList);
            expect(storeFileModule.dispatch).toHaveBeenCalledWith('GED/DataManipulation/Upload/setFiles', [
                {
                    destination: null,
                    errorDescription: {},
                    file: new File([''], 'File1'),
                    state: 0
                },
                {
                    destination: null,
                    errorDescription: {},
                    file: new File([''], 'File1'),
                    state: 0
                }
            ]);
            expect(mypulse_shared_dependencies_1.router.push).toHaveBeenCalledWith({
                name: 'MainView',
                query: { openWhoUploadModal: true }
            });
        });
    });
});
//# sourceMappingURL=GedCardContent.spec.js.map
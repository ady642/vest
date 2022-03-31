"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const NattoFoldersBrowser_vue_1 = require("@/Common/components/Navigation/NattoFoldersBrowser.vue");
const UploadDocumentNavigator_vue_1 = require("@/modules/DataManipulation/Upload/components/Navigation/UploadDocumentNavigator.vue");
const { FoldersData } = (0, FoldersDataMock_1.default)();
const { ElScrollbar } = (0, useElementStubs_1.default)();
const createWrapper = (folders, searchFolderId, height, disabled) => (0, wrapperFactory_1.default)(UploadDocumentNavigator_vue_1.default, {
    props: {
        folders,
        searchFolderId,
        height,
        disabled
    },
    global: {
        stubs: {
            NattoFoldersBrowser: NattoFoldersBrowser_vue_1.default,
            ElScrollbar
        }
    }
});
let wrapper = createWrapper(FoldersData, 1122, 160, false);
describe('UploadDocumentNavigator', () => {
    beforeEach(() => {
        wrapper = createWrapper(FoldersData, 1122, 160, false);
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should have a correct folders binding', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                expect(NattoFoldersBrowserWrapper.props('folders')).toHaveLength(1);
            });
            it('Should have the correct height value', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                expect(NattoFoldersBrowserWrapper.props('height')).toEqual(160);
            });
            it('Should pass the correct disabled prop to child component', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                expect(NattoFoldersBrowserWrapper.props('disabled')).toEqual(wrapper.vm.disabled);
            });
        });
        describe('events', () => {
            it('should fire update:searchFolderId when natto-folders-browser fire browser-folder-selected', () => {
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55);
                expect(wrapper.emitted('update:searchFolderId')).toBeTruthy();
                expect(wrapper.emitted()['update:searchFolderId'][0]).toStrictEqual([
                    55
                ]);
            });
            it('should not fire update:selectedFolderToUpload when natto-folders-browser fire browser-folder-selected and disabled is true', () => {
                const wrapper = createWrapper(FoldersData, 1122, 160, true);
                const NattoFoldersBrowserWrapper = wrapper.findComponent(NattoFoldersBrowser_vue_1.default);
                NattoFoldersBrowserWrapper.vm.$emit('browser-folder-selected', 55);
                expect(wrapper.emitted('update:selectedFolderToUpload')).toBeFalsy();
            });
        });
    });
});
//# sourceMappingURL=UploadDocumentNavigator.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoFoldersBrowser_vue_1 = require("@/Common/components/Navigation/NattoFoldersBrowser.vue");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const GedSyncStatusIcon_vue_1 = require("@/Common/components/Icons/GedSyncStatusIcon.vue");
const { FoldersData } = (0, FoldersDataMock_1.default)();
const { ElScrollbar } = (0, useElementStubs_1.default)();
const createWrapper = (folders, height, disabled, inUpload) => (0, wrapperFactory_1.default)(NattoFoldersBrowser_vue_1.default, {
    props: {
        folders,
        height,
        disabled,
        inUpload
    },
    global: {
        stubs: {
            ElScrollbar,
            GedSyncStatusIcon: GedSyncStatusIcon_vue_1.default
        }
    }
});
let wrapper = createWrapper(FoldersData.collection, 160, true, false);
describe('natto-folders-browser', () => {
    beforeEach(() => {
        wrapper = createWrapper(FoldersData.collection, 160, true, false);
    });
    describe('rendering', () => {
        it('Should display folders in alphabetical order', () => {
            const items = wrapper.findAll('.item-content__name__text');
            expect(items[0].text()).toBe('A classer');
            expect(items[1].text()).toBe('Achats');
            expect(items[2].text()).toBe('Autres');
            expect(items[3].text()).toBe('Banque');
            expect(items[4].text()).toBe('Ventes');
        });
        it('Should rerender folders if folders prop change', async () => {
            await wrapper.setProps({
                folders: [
                    new Folder_1.default({
                        id: 9999,
                        name: 'Ventes',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    }),
                    new Folder_1.default({
                        id: 1001,
                        name: 'KPMG',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    })
                ]
            });
            const items = wrapper.findAll('.item-content__name__text');
            expect(items[0].text()).toBe('KPMG');
            expect(items[1].text()).toBe('Ventes');
        });
        it('Should have the class folder-item-disabled when disabled is true', () => {
            const folderItemWrapper = wrapper.find('.folder-item-disabled');
            expect(folderItemWrapper.exists).toBeTruthy();
        });
    });
    describe('binding', () => {
        it('Should have a correct folders binding', () => {
            expect(wrapper.vm.folders.length).toEqual(FoldersData.collection.length);
        });
        it('Should have the correct height value', () => {
            expect(wrapper.vm.height).toEqual(160);
        });
    });
    describe('events', () => {
        it('Should emit browser-folder-selected event with correct payload', async () => {
            const folderItemWrapper = wrapper.find('.folderItem');
            await folderItemWrapper.trigger('click');
            expect(wrapper.emitted('browser-folder-selected')).toBeTruthy();
            expect(wrapper.emitted()['browser-folder-selected']).toHaveLength(1);
        });
    });
});
//# sourceMappingURL=NattoFoldersBrowser.spec.js.map
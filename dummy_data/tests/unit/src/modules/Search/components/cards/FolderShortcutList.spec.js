"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FolderShortcutList_vue_1 = require("@/modules/Search/components/Cards/FolderShortcutList.vue");
const FolderCard_vue_1 = require("@/modules/Search/components/Cards/FolderCard.vue");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const ArboExploreButton_vue_1 = require("@/modules/Search/components/Buttons/ArboExploreButton.vue");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn()
}));
const createWrapper = (folderShortcuts = Folders_1.default.loading().collection) => (0, wrapperFactory_1.default)(FolderShortcutList_vue_1.default, {
    global: {
        stubs: {
            FolderCard: FolderCard_vue_1.default,
            ArboExploreButton: ArboExploreButton_vue_1.default
        },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    },
    props: {
        folderShortcuts
    }
});
describe('FolderShortcutList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('bindings with ArboExploreButton', () => {
        it('should fire explore-more-clicked on explore btn click', async () => {
            const wrapper = createWrapper(Folders_1.default.loaded([
                {
                    id: 1122,
                    name: 'Comptabilité',
                    parent: { id: 0 },
                    children: [],
                    properties: {},
                    permissions: []
                },
                {
                    id: 1233,
                    name: 'Gestion Sociale',
                    parent: { id: 0 },
                    children: [],
                    properties: {},
                    permissions: []
                }
            ]).collection);
            const exploreBtnWrapper = wrapper.findComponent(ArboExploreButton_vue_1.default);
            await exploreBtnWrapper.vm.$emit('click');
            expect(wrapper.emitted()['explore-more-clicked']).toBeTruthy();
        });
    });
    describe('bindings', () => {
        describe('props', () => {
            it('Should send correct folder when send folders props', () => {
                const wrapper = createWrapper(Folders_1.default.loaded([
                    {
                        id: 1122,
                        name: 'Comptabilité',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    },
                    {
                        id: 1233,
                        name: 'Gestion Sociale',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    }
                ]).collection);
                const shortcutCardWrappper = wrapper.findAllComponents(FolderCard_vue_1.default);
                expect(shortcutCardWrappper[0].vm.folder).toEqual({
                    id: 1122,
                    name: 'Comptabilité',
                    parentId: 0,
                    children: [],
                    properties: {},
                    permissions: []
                });
                expect(shortcutCardWrappper[1].vm.folder).toEqual({
                    id: 1233,
                    name: 'Gestion Sociale',
                    parentId: 0,
                    children: [],
                    properties: {},
                    permissions: []
                });
            });
        });
        describe('events', () => {
            it('Should fire folder-shortcut-click event when click event is fired', () => {
                const wrapper = createWrapper(Folders_1.default.loaded([
                    {
                        id: 1122,
                        name: 'Comptabilité',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    },
                    {
                        id: 1233,
                        name: 'Gestion Sociale',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    }
                ]).collection);
                const shortcutCardWrappper = wrapper.findAllComponents(FolderCard_vue_1.default);
                shortcutCardWrappper[0].vm.$emit('folder-click', 1122);
                expect(wrapper.emitted()['folder-shortcut-click']).toBeTruthy();
                expect(wrapper.emitted()['folder-shortcut-click']).toHaveLength(1);
                expect(wrapper.emitted()['folder-shortcut-click'][0]).toEqual([
                    {
                        shortcutFolder: {
                            id: 1122,
                            name: 'Comptabilité',
                            parentId: 0,
                            children: [],
                            properties: {},
                            permissions: []
                        },
                        shortcutIndex: 0
                    }
                ]);
            });
        });
    });
    describe('rendering', () => {
        describe('props', () => {
            it('Should dispaly folders when send folders props', () => {
                const wrapper = createWrapper(Folders_1.default.loaded([
                    {
                        id: 1122,
                        name: 'Comptabilité',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    },
                    {
                        id: 1233,
                        name: 'Gestion Sociale',
                        parent: { id: 0 },
                        children: [],
                        properties: {},
                        permissions: []
                    }
                ]).collection);
                const shortcutCardWrappper = wrapper.findAllComponents(FolderCard_vue_1.default);
                expect(shortcutCardWrappper).toHaveLength(2);
            });
        });
    });
});
//# sourceMappingURL=FolderShortcutList.spec.js.map
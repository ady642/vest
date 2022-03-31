"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortcutsGrid_vue_1 = require("@/modules/Search/components/Shortcuts/ShortcutsGrid.vue");
const ShortcutCard_vue_1 = require("@/modules/Search/components/Shortcuts/ShortcutCard.vue");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = (folders = Folders_1.default.loading()) => (0, wrapperFactory_1.default)(ShortcutsGrid_vue_1.default, {
    global: {
        stubs: {
            ShortcutCard: ShortcutCard_vue_1.default
        }
    },
    propsData: {
        folders
    },
    shallow: true
});
describe('DocumentsViewHeader', () => {
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
                ]));
                const shortcutCardWrappper = wrapper.findAllComponents(ShortcutCard_vue_1.default);
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
                ]));
                const shortcutCardWrappper = wrapper.findAllComponents(ShortcutCard_vue_1.default);
                shortcutCardWrappper[0].vm.$emit('click', 1122);
                expect(wrapper.emitted()['folder-shortcut-click']).toBeTruthy();
                expect(wrapper.emitted()['folder-shortcut-click']).toHaveLength(1);
                expect(wrapper.emitted()['folder-shortcut-click'][0]).toStrictEqual([
                    1122
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
                ]));
                const shortcutCardWrappper = wrapper.findAllComponents(ShortcutCard_vue_1.default);
                expect(shortcutCardWrappper).toHaveLength(2);
            });
        });
    });
});
//# sourceMappingURL=ShortcutsGrid.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortcutCard_vue_1 = require("@/modules/Search/components/Shortcuts/ShortcutCard.vue");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const NattoCard_vue_1 = require("@/Common/components/Cards/NattoCard.vue");
const { ElCard } = (0, useElementStubs_1.default)();
const createWrapper = (folder) => (0, wrapperFactory_1.default)(ShortcutCard_vue_1.default, {
    global: {
        stubs: {
            NattoCard: NattoCard_vue_1.default,
            ElCard
        }
    },
    propsData: {
        folder
    }
});
describe('ShortcutsCard', () => {
    describe('binding', () => {
        it('NattoCard classes prop should contains computed value when send folder props', () => {
            const wrapper = createWrapper(new Folder_1.default({
                id: 1122,
                name: 'Comptabilité',
                parent: { id: 0 },
                children: [],
                properties: {},
                permissions: []
            }));
            const nattoCardWrapper = wrapper.findComponent(NattoCard_vue_1.default);
            expect(nattoCardWrapper.attributes('class')).toContain('shortcut-card compta');
        });
        it('folder icon div class should contains computed value when send folder props', () => {
            const wrapper = createWrapper(new Folder_1.default({
                id: 1122,
                name: 'Comptabilité',
                parent: { id: 0 },
                children: [],
                properties: {},
                permissions: []
            }));
            const iconWrapper = wrapper.find('.folder-icon');
            expect(iconWrapper.classes()[0]).toBe('folder-icon');
            expect(iconWrapper.classes()[1]).toBe('compta');
        });
        describe('props', () => {
            it('Should display folder name when send folder props', () => {
                const wrapper = createWrapper(new Folder_1.default({
                    id: 1122,
                    name: 'Comptabilité',
                    parent: { id: 0 },
                    children: [],
                    properties: {},
                    permissions: []
                }));
                const spanWrapper = wrapper.findAll('span');
                expect(spanWrapper.length).toBe(2);
                expect(spanWrapper[1].text()).toBe('Comptabilité');
            });
        });
    });
});
//# sourceMappingURL=ShortcutsCard.spec.js.map
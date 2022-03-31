"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FolderCard_vue_1 = require("@/modules/Search/components/Cards/FolderCard.vue");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoShortcutCard_vue_1 = require("@/Common/components/Cards/NattoShortcutCard.vue");
const defaultProps = {
    folder: new Folder_1.default({
        id: 1122,
        name: 'Comptabilité',
        parent: { id: 0 },
        children: [],
        properties: {
            isShortcut: 'Shortcut name'
        },
        permissions: []
    })
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(FolderCard_vue_1.default, {
    props
});
const findNattoShortcutCard = (wrapper) => wrapper.findComponent(NattoShortcutCard_vue_1.default);
let wrapper = createWrapper();
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
describe('FolderCard', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
    });
    describe('binding with NattoShortcutCard', () => {
        it('props bindings', () => {
            expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('documents');
            expect(nattoShortcutCardWrapper.props('text')).toBe('Shortcut name');
        });
        describe('events', () => {
            it('Should fire folder-click on when shortcut card emit click', async () => {
                await nattoShortcutCardWrapper.vm.$emit('click');
                expect(wrapper.emitted()['folder-click']).toBeTruthy();
                expect(wrapper.emitted()['folder-click']).toHaveLength(1);
            });
        });
    });
});
//# sourceMappingURL=FolderCard.spec.js.map
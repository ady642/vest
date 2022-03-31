"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shortcut_vue_1 = require("@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcut.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoShortcutCard_vue_1 = require("@/Common/components/Cards/NattoShortcutCard.vue");
/****
 * Wrapper finders
 */
const findNattoShortcutCard = (wrapper) => wrapper.findComponent(NattoShortcutCard_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    folderName: 'test'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(Shortcut_vue_1.default, {
    props
});
let wrapper = createWrapper();
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
describe('Shortcut', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
    });
    describe('bindings with NattoDialogPopup', () => {
        test('props bindings', () => {
            expect(nattoShortcutCardWrapper.props('text')).toBe('test');
            expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('documents');
        });
    });
});
//# sourceMappingURL=Shortcut.spec.js.map
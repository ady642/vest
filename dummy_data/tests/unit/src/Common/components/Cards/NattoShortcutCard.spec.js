"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoShortcutCard_vue_1 = require("@/Common/components/Cards/NattoShortcutCard.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoCard_vue_1 = require("@/Common/components/Cards/NattoCard.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { MpIcon } = (0, useStyleguideStubs_1.default)();
const { ElCard } = (0, useElementStubs_1.default)();
/****
 * Wrapper finders
 */
const findNattoCard = (wrapper) => wrapper.findComponent(NattoCard_vue_1.default);
const findMpIcon = (wrapper) => wrapper.findComponent(MpIcon);
/****
 * Wrapper creation
 */
const defaultProps = {
    text: 'test',
    prependIcon: 'delete',
    type: 'primary'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoShortcutCard_vue_1.default, {
    props,
    global: {
        stubs: {
            NattoCard: NattoCard_vue_1.default,
            ElCard,
            MpIcon
        },
        directives: { Loading: {} }
    }
});
let wrapper = createWrapper();
let nattoCardWrapper = findNattoCard(wrapper);
let mpIconWrapper = findMpIcon(wrapper);
describe('NattoShortcutCard', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoCardWrapper = findNattoCard(wrapper);
        mpIconWrapper = findMpIcon(wrapper);
    });
    describe('bindings with NattoCard', () => {
        test('props bindings', () => {
            expect(wrapper.text()).toContain('test');
            expect(nattoCardWrapper.classes()).toContain('primary');
            expect(mpIconWrapper.props('name')).toBe('delete');
        });
    });
});
//# sourceMappingURL=NattoShortcutCard.spec.js.map
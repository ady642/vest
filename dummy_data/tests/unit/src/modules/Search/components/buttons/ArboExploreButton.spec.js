"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArboExploreButton_vue_1 = require("@/modules/Search/components/Buttons/ArboExploreButton.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoShortcutCard_vue_1 = require("@/Common/components/Cards/NattoShortcutCard.vue");
const createWrapper = () => (0, wrapperFactory_1.default)(ArboExploreButton_vue_1.default, {
    global: {
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
const findNattoShortcutCard = (wrapper) => wrapper.findComponent(NattoShortcutCard_vue_1.default);
let wrapper = createWrapper();
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
describe('ArboExploreButton', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
    });
    describe('binding with NattoShortcutCard', () => {
        it('props bindings', () => {
            expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('reader');
            expect(nattoShortcutCardWrapper.props('text')).toBe('ged.search.arboCard.buttons.exploreMore');
            expect(nattoShortcutCardWrapper.props('type')).toBe('secondary');
        });
    });
});
//# sourceMappingURL=ArboExploreButton.spec.js.map
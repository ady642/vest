"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoCard_vue_1 = require("@/Common/components/Cards/NattoCard.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { MpInCard } = (0, useStyleguideStubs_1.default)();
const createWrapper = (defaultSlot = '<div>I fill the default slot</div>') => (0, wrapperFactory_1.default)(NattoCard_vue_1.default, {
    slots: {
        default: defaultSlot
    },
    global: {
        stubs: { MpInCard }
    }
});
let wrapper = createWrapper();
describe('NattoCard', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('rendering', () => {
        it('should render the default slot', () => {
            wrapper = createWrapper('<div>Je suis le default slot</div>');
            expect(wrapper.html()).toContain('Je suis le default slot');
        });
    });
});
//# sourceMappingURL=NattoCard.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoBadge_vue_1 = require("/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Badges/NattoBadge.vue");
const wrapperFactory_1 = require("tests/unit/utils/wrapperFactory");
const defaultProps = {
    value: 1
};
const createWrapper = ({ props = defaultProps, slots = defaultSlots } = {}) => (0, wrapperFactory_1.default)(NattoBadge_vue_1.default, {
    props,
    slots
});
let wrapper = createWrapper();
let findElBadge = (wrapper) => wrapper.findComponent(ElBadge);
let ElBadgeWrapper = findElBadge(wrapper);
describe(NattoBadge_vue_1.default, () => {
    beforeEach(() => {
        wrapper = createWrapper();
        ElBadgeWrapper = findElBadge(wrapper);
    });
    describe('binding with ElBadge', () => {
        test('static props', () => {
            expect(ElBadgeWrapper.attributes('hidden')).toBe(true)
                , expect(ElBadgeWrapper.attributes('value')).toBe(true);
        });
    });
    describe('rendering', () => {
        it('should render the undefined slot', () => {
            expect(wrapper.html()).toContain('I fill the undefined slot');
        });
    });
});
//# sourceMappingURL=NattoBadge.spec.js.map
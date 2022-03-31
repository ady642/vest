"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoTag_vue_1 = require("/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Tags/NattoTag.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const defaultProps = {
    closable: true
};
const createWrapper = ({ props = defaultProps, slots = defaultSlots } = {}) => (0, wrapperFactory_1.default)(NattoTag_vue_1.default, {
    props,
    slots
});
let wrapper = createWrapper();
let findElTag = (wrapper) => wrapper.findComponent(ElTag);
let ElTagWrapper = findElTag(wrapper);
describe(NattoTag_vue_1.default, () => {
    beforeEach(() => {
        wrapper = createWrapper();
        ElTagWrapper = findElTag(wrapper);
    });
    describe('binding with ElTag', () => {
        test('static props', () => {
            expect(ElTagWrapper.attributes('class')).toBe(true)
                , expect(ElTagWrapper.attributes('closable')).toBe(true);
        });
    });
    describe('rendering', () => {
        it('should render the undefined slot', () => {
            expect(wrapper.html()).toContain('I fill the undefined slot');
        });
    });
});
//# sourceMappingURL=NattoTag.spec.js.map
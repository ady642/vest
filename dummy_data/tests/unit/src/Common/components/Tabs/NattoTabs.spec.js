"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoTabs_vue_1 = require("/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Tabs/NattoTabs.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const defaultProps = {
    items: undefined, stretch: true
};
const createWrapper = ({ props = defaultProps, } = {}) => (0, wrapperFactory_1.default)(NattoTabs_vue_1.default, {
    props
});
let wrapper = createWrapper();
let findMpTabs = (wrapper) => wrapper.findComponent(MpTabs);
let MpTabsWrapper = findMpTabs(wrapper);
describe(NattoTabs_vue_1.default, () => {
    beforeEach(() => {
        wrapper = createWrapper();
        MpTabsWrapper = findMpTabs(wrapper);
    });
    describe('binding with MpTabs', () => {
        test('static props', () => {
            expect(MpTabsWrapper.attributes('tab-items')).toBe(true)
                , expect(MpTabsWrapper.attributes('stretch')).toBe(true);
        });
    });
    describe('events', () => {
        it('should emit tab-click when MpTabs emits tab-click', () => {
            await MpTabsWrapper.vm.$emit(tab - click);
            expect(wrapper.emitted('my-event')).toHaveLength(1);
        });
    });
});
//# sourceMappingURL=NattoTabs.spec.js.map
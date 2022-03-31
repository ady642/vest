"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PreviewCTAContainer_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewCTAContainer.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoTooltip_vue_1 = require("@/Common/components/Tooltips/NattoTooltip.vue");
/****
 * Wrapper finders
 */
const findNattoTooltip = (wrapper) => wrapper.findComponent(NattoTooltip_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    tooltipContent: 'test',
    disabled: false
};
const createWrapper = (props = defaultProps, defaultSlot = '<div>test slot</div>') => (0, wrapperFactory_1.default)(PreviewCTAContainer_vue_1.default, {
    props,
    slots: {
        default: defaultSlot
    },
    global: {
        renderStubDefaultSlot: true
    }
});
let wrapper = createWrapper();
let nattoTooltipWrapper = findNattoTooltip(wrapper);
describe('PreviewCTAContainer', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoTooltipWrapper = findNattoTooltip(wrapper);
    });
    describe('bindings with NattoTooltip', () => {
        test('props bindings', () => {
            expect(nattoTooltipWrapper.props('content')).toBe('test');
            expect(nattoTooltipWrapper.props('disabled')).toBe(false);
        });
        it('should render the default slot', () => {
            expect(wrapper.text()).toContain('test slot');
        });
        describe('events', () => {
            it('should emit click when container is clicked', () => { });
        });
    });
});
//# sourceMappingURL=PreviewCTAContainer.spec.js.map
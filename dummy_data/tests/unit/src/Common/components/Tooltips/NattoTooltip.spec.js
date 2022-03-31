"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoTooltip_vue_1 = require("@/Common/components/Tooltips/NattoTooltip.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
/****
 * Wrapper finders
 */
const { ElTooltip } = (0, useElementStubs_1.default)();
const findElTooltip = (wrapper) => wrapper.findComponent(ElTooltip);
/****
 * Wrapper creation
 */
const defaultProps = {
    disabled: false,
    placement: 'right',
    content: 'columbo'
};
const createWrapper = ({ props = defaultProps, defaultSlot = '<div/>', contentSlot = '<div/>' } = {}) => (0, wrapperFactory_1.default)(NattoTooltip_vue_1.default, {
    props,
    slots: {
        default: defaultSlot,
        content: contentSlot
    },
    global: {
        stubs: {
            ElTooltip
        }
    }
});
let wrapper = createWrapper();
let elTooltipWrapper = findElTooltip(wrapper);
describe('NattoTooltip', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        elTooltipWrapper = findElTooltip(wrapper);
    });
    describe('bindings with NattoDialogPopup', () => {
        test('props bindings', () => {
            expect(elTooltipWrapper.attributes('disabled')).toBe('false');
            expect(elTooltipWrapper.attributes('placement')).toBe('right');
            expect(elTooltipWrapper.attributes('content')).toBe('columbo');
        });
        describe('rendering', () => {
            it('should render the default slot', () => {
                wrapper = createWrapper({
                    defaultSlot: '<div>columbo</div>'
                });
                expect(wrapper.text()).toContain('columbo');
            });
            it('should not render the content slot if the content prop is set', () => {
                wrapper = createWrapper({
                    props: {
                        content: 'test'
                    },
                    contentSlot: 'je ne dois pas apparaitre'
                });
                expect(wrapper.text()).not.toContain('je ne dois pas apparaitre');
            });
            it('should render the content slot if the content prop is not set', () => {
                wrapper = createWrapper({
                    props: {
                        content: ''
                    },
                    contentSlot: 'je dois apparaitre'
                });
                expect(wrapper.text()).toContain('je dois apparaitre');
            });
        });
    });
});
//# sourceMappingURL=NattoTooltip.spec.js.map
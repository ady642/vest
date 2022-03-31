"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoHighlighter_vue_1 = require("@/Common/components/Hightlighter/NattoHighlighter.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
/****
 * Wrapper finders
 */
const { MpHighlight } = (0, useStyleguideStubs_1.default)();
const findMpHighlight = (wrapper) => wrapper.findComponent(MpHighlight);
/****
 * Wrapper creation
 */
const defaultProps = {
    text: 'je suis columbo',
    query: 'columbo'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoHighlighter_vue_1.default, {
    props,
    global: {
        stubs: {
            MpHighlight
        }
    }
});
let wrapper = createWrapper();
let mpHighlightWrapper = findMpHighlight(wrapper);
describe('NattoHighlighter', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        mpHighlightWrapper = findMpHighlight(wrapper);
    });
    describe('rendering', () => {
        it('should contain 2 children when the text is "je suis columbo" (2 parts [je suis, columbo])', () => {
            expect(wrapper.findAll('.natto-highlighter__container > *')).toHaveLength(2);
        });
        it('should render the text without the query', () => {
            expect(wrapper.text()).toContain('je suis');
            expect(wrapper.text()).not.toContain('columbo');
        });
    });
    describe('bindings with MpHighlight', () => {
        describe('rendering', () => {
            it('should render MpHighlight only once because the query "columbo" appear one time in the text', () => {
                expect(wrapper.findAllComponents(MpHighlight)).toHaveLength(1);
            });
            it('should not render any MpHighlight component when the query does not match any part of the text', () => {
                wrapper = createWrapper({ text: 'je suis columbo', query: 'peter' });
                expect(findMpHighlight(wrapper).exists()).toBe(false);
            });
        });
        test('props bindings', () => {
            expect(mpHighlightWrapper.attributes('text')).toBe('columbo');
        });
    });
});
//# sourceMappingURL=NattoHighlighter.spec.js.map
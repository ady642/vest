"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArboCardTitle_vue_1 = require("@/modules/Search/components/Cards/ArboCardTitle.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
/****
 * Wrapper creation
 */
const defaultProps = {
    title: ''
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(ArboCardTitle_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('ArboCardTitle', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('rendering', () => {
        it('should render the title', () => {
            wrapper = createWrapper({ title: 'test' });
            expect(wrapper.text()).toContain('test');
        });
    });
});
//# sourceMappingURL=ArboCardTitle.spec.js.map
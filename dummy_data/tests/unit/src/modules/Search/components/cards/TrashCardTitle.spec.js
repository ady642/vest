"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashCardTitle_vue_1 = require("@/modules/Trash/components/Cards/TrashCardTitle.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
/****
 * Wrapper creation
 */
const defaultProps = {
    title: ''
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(TrashCardTitle_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('TrashCardTitle', () => {
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
//# sourceMappingURL=TrashCardTitle.spec.js.map
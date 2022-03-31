"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const ArboDescription_vue_1 = require("@/modules/Search/components/Cards/ArboDescription.vue");
const defaultProps = {
    description: 'folder description'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(ArboDescription_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('ArboDescription', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('binding', () => {
        it('Should bind Contentdescription correctly ', () => {
            expect(wrapper.props('description')).toStrictEqual(defaultProps.description);
        });
    });
});
//# sourceMappingURL=ArboDescription.spec.js.map
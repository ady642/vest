"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoTree_vue_1 = require("/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Trees/NattoTree.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = ({} = {}) => (0, wrapperFactory_1.default)(NattoTree_vue_1.default);
let wrapper = createWrapper();
let findElTree = (wrapper) => wrapper.findComponent(ElTree);
let ElTreeWrapper = findElTree(wrapper);
describe(NattoTree_vue_1.default, () => {
    beforeEach(() => {
        wrapper = createWrapper();
        ElTreeWrapper = findElTree(wrapper);
    });
    describe('binding with ElTree', () => {
        test('static props', () => {
            expect(ElTreeWrapper.attributes('expand-on')).toBe(true)
                , expect(ElTreeWrapper.attributes('empty-text')).toBe(true);
        });
    });
});
//# sourceMappingURL=NattoTree.spec.js.map
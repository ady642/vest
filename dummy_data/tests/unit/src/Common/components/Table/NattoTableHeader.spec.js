"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoTableHeader_vue_1 = require("@/Common/components/Table/NattoTableHeader.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = (defaultSlot = '<div>default slot</div>') => (0, wrapperFactory_1.default)(NattoTableHeader_vue_1.default, {
    slots: {
        default: defaultSlot
    }
});
let wrapper = createWrapper();
describe('NattoTableHeader', () => {
    describe('rendering', () => {
        it('should have a bold text if the mouse is over the text', async () => {
            wrapper = createWrapper();
            expect(wrapper.text()).toContain('default slot');
        });
    });
});
//# sourceMappingURL=NattoTableHeader.spec.js.map
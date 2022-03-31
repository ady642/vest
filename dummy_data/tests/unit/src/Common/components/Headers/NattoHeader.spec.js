"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoHeader_vue_1 = require("@/Common/components/Header/NattoHeader.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { MpTitle } = (0, useStyleguideStubs_1.default)();
const createWrapper = ({ slots = {
    subHeader: '<div>Je suis le subHeader</div>',
    cta: '<div>Je suis les CTAs</div>'
} } = {}) => (0, wrapperFactory_1.default)(NattoHeader_vue_1.default, {
    slots,
    global: {
        stubs: {
            MpTitle
        }
    }
});
const wrapper = createWrapper();
describe('NattoHeader', () => {
    describe('rendering', () => {
        it('should fill the slots', () => {
            console.log(wrapper.text());
            expect(wrapper.text()).toContain('Je suis le subHeader');
            expect(wrapper.text()).toContain('Je suis les CTAs');
        });
    });
});
//# sourceMappingURL=NattoHeader.spec.js.map
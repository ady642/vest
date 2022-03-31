"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentIcon_vue_1 = require("@/Common/components/Icons/DocumentIcon.vue");
const NattoIcon_vue_1 = require("@/Common/components/Icons/NattoIcon.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = ({ src }) => (0, wrapperFactory_1.default)(DocumentIcon_vue_1.default, {
    props: { src }
});
let wrapper = createWrapper({ src: 'test' });
const findNattoIcon = (wrapper) => wrapper.findComponent(NattoIcon_vue_1.default);
describe('DocumentIcon', () => {
    describe('bindings', () => {
        describe('props', () => {
            it('should pass the src prop to NattoIcon child', () => {
                wrapper = createWrapper({ src: '@/assets/Icons/myIcon.svg' });
                const nattoIconWrapper = findNattoIcon(wrapper);
                expect(nattoIconWrapper.props().src).toBe('@/assets/Icons/myIcon.svg');
            });
        });
    });
});
//# sourceMappingURL=DocumentIcon.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DotIcon_vue_1 = require("@/Common/components/Icons/DotIcon.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentIcon_vue_1 = require("@/Common/components/Icons/DocumentIcon.vue");
const Dot_svg_1 = require("@/assets/Icons/Dot.svg");
const createWrapper = () => (0, wrapperFactory_1.default)(DotIcon_vue_1.default);
let wrapper = createWrapper();
describe('DotIcon', () => {
    describe('bindings', () => {
        it('DotSvg <=> src', () => {
            wrapper = createWrapper();
            const documentIconWrapper = wrapper.findComponent(DocumentIcon_vue_1.default);
            expect(documentIconWrapper.vm.src).toBe(Dot_svg_1.default);
        });
    });
});
//# sourceMappingURL=DotIcon.spec.js.map
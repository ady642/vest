"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("../../../../../utils/wrapperFactory");
const BasicLayout_vue_1 = require("@/modules/Search/components/Layouts/BasicLayout.vue");
const createWrapper = (headerSlot, contentSlot) => (0, wrapperFactory_1.default)(BasicLayout_vue_1.default, {
    slots: {
        header: headerSlot,
        content: contentSlot
    }
});
describe('BasicLayout', () => {
    describe('rendering', () => {
        it('Should render header slot', () => {
            const wrapper = createWrapper('<div>header slot</div>', '<div> content slot</div>');
            const pWrapper = wrapper.find('.basic-layout__header');
            expect(pWrapper.text()).toBe('header slot');
        });
        it('Should render content slot', () => {
            const wrapper = createWrapper('<div>header slot</div>', '<div>content slot</div>');
            const pWrapper = wrapper.find('.basic-layout__content');
            expect(pWrapper.text()).toBe('content slot');
        });
    });
});
//# sourceMappingURL=BasicLayout.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilenameText_vue_1 = require("@/Common/components/Text/FilenameText.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = (filename) => (0, wrapperFactory_1.default)(FilenameText_vue_1.default, {
    propsData: {
        filename
    },
    shallow: true
});
describe('FilenameText', () => {
    describe('binding', () => {
        describe('props', () => {
            it('Should display filename formated when send filename props with length > 45', () => {
                const wrapper = createWrapper('nomdefichiersuuuupeeeeeeeeeeeeeeeeeeeerlongggg!!.pdf');
                const spanWrapper = wrapper.findAll('span');
                expect(spanWrapper.length).toBe(1);
                expect(spanWrapper[0].text()).toBe('nomdefichiersuuuupee...gggg!!.pdf');
            });
            it('Should display filename formated when send filename props with length < 45', () => {
                const wrapper = createWrapper('nomdefichier.pdf');
                const spanWrapper = wrapper.findAll('span');
                expect(spanWrapper.length).toBe(1);
                expect(spanWrapper[0].text()).toBe('nomdefichier.pdf');
            });
        });
    });
});
//# sourceMappingURL=FilenameText.spec.js.map
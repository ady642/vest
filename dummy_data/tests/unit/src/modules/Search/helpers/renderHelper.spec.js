"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderHelper_1 = require("@/Common/helpers/renderHelper");
const vue_1 = require("vue");
const testComponennt = (0, vue_1.defineComponent)({
    props: ['total'],
    template: `
     <span>test params {{ total }}.</span>`
});
describe('renderHelper', () => {
    describe('binding', () => {
        it('Should pass props', () => {
            var renderedComponent = renderHelper_1.default.render(testComponennt, {
                total: 99
            });
            expect(renderedComponent?.props?.total).toBe(99);
        });
    });
});
//# sourceMappingURL=renderHelper.spec.js.map
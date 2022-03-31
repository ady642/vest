"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const convertStringPropsToObject = (propsString) => {
    return JSON.parse(propsString);
};
describe('convertStringPropsToObject', () => {
    it('should add double quotes on properties', () => {
        expect((0, utils_1.addDoubleQuotes)(`{ value: { type: Number, required: true } }`)).toEqual(`{ "value": { "type": "Number", "required": "true" } }`);
    });
    it('should return an object', () => {
        expect(convertStringPropsToObject(`{ "value": { "type": "Number", "required": "true" } }`))
            .toEqual({ value: { type: "Number", required: "true" } });
    });
});
//# sourceMappingURL=UnitTestFactory.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const UnitTestFactory_1 = require("../../templates/UnitTestFactory");
const fs = require("fs");
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
    it('should return the children', () => {
        const path = './dummy_data/src/Common/components/Buttons/NattoCategoryButton.vue';
        const data = fs.readFileSync(path, 'utf8');
        const children = new UnitTestFactory_1.default(path, data).children;
        expect(children).toEqual([{ name: 'ElButton', events: [],
                props: [
                    { name: 'loading', type: 'boolean' },
                    { name: 'disabled', type: 'boolean' },
                    { name: 'type', type: 'boolean' },
                    { name: 'native-type', type: 'boolean' }
                ]
            }]);
    });
});
//# sourceMappingURL=UnitTestFactory.spec.js.map
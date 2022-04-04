import {addDoubleQuotes} from "../../utils";
import * as fs from 'fs';
import UnitTestFactory from "../../templates/UnitTestFactory";

const convertStringPropsToObject = (propsString: string): string => {
    return JSON.parse(propsString);
};

describe('convertStringPropsToObject', () => {
    it('should add double quotes on properties', () => {
        expect(addDoubleQuotes(`{ value: { type: Number, required: true } }`)).toEqual(
            `{ "value": { "type": "Number", "required": "true" } }`);
    });

    it('should return an object', () => {
        expect(convertStringPropsToObject(`{ "value": { "type": "Number", "required": "true" } }`))
            .toEqual({ value: { type: "Number", required: "true" } });
    });
});

describe('UnitTestFactory', () => {
    it('should the good constructor for Props in function of the vue component (setup normal or script setup)', () => {
        const path = './dummy_data/components/Badges/NattoBadge.vue';
        const vueCode = fs.readFileSync(path, 'utf8');

        expect(new UnitTestFactory(path, vueCode).propsFactory.props).toStrictEqual([
            { name: 'value', type: 'Number' }
        ]);
    });
});


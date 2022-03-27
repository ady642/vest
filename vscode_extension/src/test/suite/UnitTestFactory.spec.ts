import {addDoubleQuotes} from "../../utils";
import UnitTestFactory from "../../templates/UnitTestFactory";
import * as fs from 'fs';

const convertStringPropsToObject = (propsString: string): string => {
    return JSON.parse(propsString)
}

describe('convertStringPropsToObject', () => {
    it('should add double quotes on properties', () => {
        expect(addDoubleQuotes(`{ value: { type: Number, required: true } }`)).toEqual(
            `{ "value": { "type": "Number", "required": "true" } }`)
    })

    it('should return an object', () => {
        expect(convertStringPropsToObject(`{ "value": { "type": "Number", "required": "true" } }`))
            .toEqual({ value: { type: "Number", required: "true" } })
    })

    it('should return the children', () => {
        const path = './dummy_data/src/Common/components/Buttons/NattoCategoryButton.vue'
        const data = fs.readFileSync(path, 'utf8')

        const children = new UnitTestFactory(path, data).children
        expect(children).toEqual([{ name: 'ElButton', events: [],
            props: [
                { name: 'loading', type: 'boolean' },
                { name: 'disabled', type: 'boolean' },
                { name: 'type', type: 'boolean' },
                { name: 'native-type', type: 'boolean' }
            ]
        }])
    })
})


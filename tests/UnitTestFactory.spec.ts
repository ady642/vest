import {addDoubleQuotes} from "../utils";

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
})


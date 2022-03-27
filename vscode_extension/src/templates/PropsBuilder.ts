import {addDoubleQuotes, convertObjToArrayOfObj, findClosingMatchIndex} from "../utils";

export type propVueType = { type: string, required?: boolean } | 'Number' | 'Boolean' | 'String';

export type propType = {
    name: string
    type: 'number' | 'boolean' | 'string'
};

class PropsBuilder {
    props: propType[]

    constructor(vueCode: string) {
        const stringSearched = 'props: ';
        const propsIndex = vueCode.indexOf(stringSearched);

        if(propsIndex === -1) {
            this.props = [];
        }

        const propsOpeningBrace = vueCode.indexOf(stringSearched) + stringSearched.length;
        const propsClosingBrace = findClosingMatchIndex(vueCode,  propsOpeningBrace);

        const propsString = vueCode.substring(propsOpeningBrace, propsClosingBrace + 1);
        const propsStringifies = addDoubleQuotes(propsString);
        const propsObject = JSON.parse(propsStringifies);
        const propsList = convertObjToArrayOfObj(propsObject);

        this.props = propsList.map((prop) => {
            const name = Object.keys(prop)[0];
            const value = Object.values(prop)[0] as propVueType;

            if(typeof value === 'object') {
                return {name, type: value?.type};
            }

            return { name, type: value.toLowerCase()};
        }) as propType[];
    }

    buildPropsIt() {
        return `
        describe('binding with ${children[0].name}', () => {
                        test('static props', () => {
                          ${children[0].props.map((prop) => `expect(${children[0].name}Wrapper.attributes('${prop.name}')).toBe(${this.getDefaultValueByType(prop.type)})\n`)} })
                      })
        `
    }
}

export default PropsBuilder

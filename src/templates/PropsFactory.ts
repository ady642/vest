import {addDoubleQuotes, convertObjToArrayOfObj, findClosingMatchIndex} from "../utils";
import {childType} from "./ChildrenFactory";

export type propVueType = { type: string, required?: boolean } | 'Number' | 'Boolean' | 'String';

type possibleTypes = 'number' | 'boolean' | 'string' | 'array';

export type propType = {
    name: string
    type: possibleTypes
};

class PropsFactory {
    props: propType[];

    constructor(vueCode: string) {
        const { propsIndex, stringSearched } = this.findPropsIndex(vueCode);

        if(propsIndex === -1) {
            this.props = [];
            return;
        }

        const propsOpeningBrace = propsIndex + stringSearched.length;
        const propsClosingBrace = findClosingMatchIndex(vueCode,  propsOpeningBrace);
        const propsString = vueCode.substring(propsOpeningBrace, propsClosingBrace + 1);
        const propsStringifies = addDoubleQuotes(propsString);

        const asIndex = propsStringifies.indexOf("as");
        const propsWithoutAs = asIndex === -1 ? propsStringifies :
            propsStringifies.substring(0, propsStringifies.indexOf('"as"')) +
            propsStringifies.substring(propsStringifies.indexOf('>')+1)
        ;

        const propsObject = JSON.parse(propsWithoutAs);
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

    private findPropsIndex(vueCode: string): { propsIndex: number, stringSearched: string } {
        const isScriptSetupRegex = /(?=.*script)(?=.*setup).*/g;

        const stringSearched = isScriptSetupRegex.test(vueCode) ? 'defineProps(': 'props: ';
        const propsIndex = vueCode.indexOf(stringSearched);

        return { propsIndex, stringSearched };
    }

    buildPropsIt(children: childType[]) {
        return `
        ${children.map((child) => `
          describe('binding with ${child.name}', () => {
            test('static props', () => {
              ${child.props.map((prop) => `expect(${child.name}Wrapper.attributes('${prop.name}')).toBe(${this.getDefaultValueByType(prop.type)})`).join('\n')} })
          })
        `)}
        `;
    }

    getDefaultValueByType(type: possibleTypes) {
        const mappingDefaultValue = {
            'number': 1,
            'boolean': true,
            'string': "'test string'",
            'array': '[]'
        };

        return mappingDefaultValue[type];
    }

    getType(type: possibleTypes) {
        const mappingType = {
            'number': 'number',
            'boolean': 'boolean',
            'string': 'string',
            'array': 'any[]'
        };

        return mappingType[type];
    }

    getDefaultProps(componentName: string) {
        return this.props.length > 0 ? `
            type ${componentName}Props = {
              ${this.props.map((prop) => `${prop.name}: ${this.getType(prop.type.toLowerCase() as possibleTypes)}`).join(';\n')}
            }
            
            const defaultProps: ${componentName}Props = {
              ${this.props.map((prop) => `${prop.name}: ${this.getDefaultValueByType(prop.type.toLowerCase() as possibleTypes)}`)}
            }  
        ` : '';
    }
}

export default PropsFactory;

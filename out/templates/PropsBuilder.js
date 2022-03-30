"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class PropsBuilder {
    constructor(vueCode) {
        const stringSearched = 'props: ';
        const propsIndex = vueCode.indexOf(stringSearched);
        if (propsIndex === -1) {
            this.props = [];
        }
        const propsOpeningBrace = vueCode.indexOf(stringSearched) + stringSearched.length;
        const propsClosingBrace = (0, utils_1.findClosingMatchIndex)(vueCode, propsOpeningBrace);
        const propsString = vueCode.substring(propsOpeningBrace, propsClosingBrace + 1);
        const propsStringifies = (0, utils_1.addDoubleQuotes)(propsString);
        const propsObject = JSON.parse(propsStringifies);
        const propsList = (0, utils_1.convertObjToArrayOfObj)(propsObject);
        this.props = propsList.map((prop) => {
            const name = Object.keys(prop)[0];
            const value = Object.values(prop)[0];
            if (typeof value === 'object') {
                return { name, type: value?.type };
            }
            return { name, type: value.toLowerCase() };
        });
    }
    buildPropsIt(children) {
        return `
        ${children.map((child) => `
                describe('binding with ${child.name}', () => {
            test('static props', () => {
              ${child.props.map((prop) => `expect(${child.name}Wrapper.attributes('${prop.name}')).toBe(${this.getDefaultValueByType(prop.type)})\n`)} })
          })
        `)}
        `;
    }
    getDefaultValueByType(type) {
        const mappingDefaultValue = {
            'number': 1,
            'boolean': true,
            'string': 'test string'
        };
        return mappingDefaultValue[type];
    }
    getDefaultProps(componentName) {
        return this.props.length > 0 ? `
            type ${componentName}Props = {
              ${this.props.map((prop) => `${prop.name}: ${prop.type.toLowerCase()}`)}
            }
            
            const defaultProps: ${componentName}Props = {
              ${this.props.map((prop) => `${prop.name}: ${this.getDefaultValueByType(prop.type.toLowerCase())}`)}
            }  
        ` : '';
    }
}
exports.default = PropsBuilder;
//# sourceMappingURL=PropsBuilder.js.map
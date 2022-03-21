import {addDoubleQuotes, convertObjToArrayOfObj, findClosingBracketMatchIndex} from "../utils";

type paramsType = {
    componentName: string
    path: string
}

type propVueType = { type: string, required?: boolean } | 'Number' | 'Boolean' | 'String'

type propType = {
    name: string
    type: string
}

type eventType = {
    name: string
    output: {
        type: 'event' | 'externalCall' | 'dispatch' | 'changeChildProp'
    }
}

class UnitTestFactory {
    test: string

    constructor(name: string, vueCode: string) {
        const imports = this.buildImports(name, './')
        const createWrapper = this.buildCreateWrapper(name, this.getProps(vueCode)) // Find props
        const testsSuite = this.buildTestSuites(name, [{ name: 'ElBadge', props: [{ name: 'value', type: 'boolean' }] }]) // Find children

        this.test = imports + createWrapper + testsSuite
    }

    private getProps(vueCode: string): propType[] {
        const stringSearched = 'props: '
        const propsOpeningBrace = vueCode.indexOf(stringSearched) + stringSearched.length
        const propsClosingBrace = findClosingBracketMatchIndex(vueCode,  propsOpeningBrace)

        const propsString = vueCode.substring(propsOpeningBrace, propsClosingBrace + 1)
        const propsStringifies = addDoubleQuotes(propsString)
        const propsObject = JSON.parse(propsStringifies)
        const propsList = convertObjToArrayOfObj(propsObject)

        return propsList.map((prop) => {
            const name = Object.keys(prop)[0]
            const value = Object.values(prop)[0] as propVueType

            if(typeof value === 'object') {
                return {name, type: value?.type}
            }

            return { name, type: value}
        })
    }

    private buildImports(name: string, path: string) {
        return `
            import ${name} from ${path}
            import wrapperFactory from 'tests/unit/utils/wrapperFactory'
            import useElement from 'tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'
        `
    }

    private getDefaultValueByType(type) {
        const mappingDefaultValue = {
            'Number': 1,
            'Boolean': true,
            'String': 'test string'
        }

        return mappingDefaultValue[type]
    }


    private buildCreateWrapper(name, props: propType[]) {
        return `
            type ${name}Props = {
              ${props.map((prop) => `${prop.name}: ${prop.type.toLowerCase()}`)}
            }
            
            const defaultProps: ${name}Props = {
              ${props.map((prop) => `${prop.name}: ${this.getDefaultValueByType(prop.type)}`)}
            }    
        
            const createWrapper = ({
              props = defaultProps,
            } = {}) =>
              wrapperFactory(${name}, {
                props
              })
              
            let wrapper = createWrapper()
        `
    }

    private buildTestSuites(name: string, children: { name: string, props: propType[], events?: eventType[] }[]) {
        return `
                ${children.map((child) => `
                    let ${child.name}Wrapper = find${child.name}(wrapper)
                `)}

                describe(${name}, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        ${children.map((child) => `
                             ${child.name}Wrapper = find${child.name}(wrapper)
                        `)}
                     })

                      describe('binding with ${children[0].name}', () => {
                        test('static props', () => {
                          ${children[0].props.map((prop) => `
                            expect(${children[0].name}Wrapper.attributes(${prop.name})).toBe(${this.getDefaultValueByType(prop.type)})
                          `)
                        })
                      })

                      describe('rendering', () => {
                        it('should render the default slot', () => {
                        expect(wrapper.html()).toContain('I fill the default slot')
                      })
                })
        })
        `
    }
}


export default UnitTestFactory

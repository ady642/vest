import {addDoubleQuotes, convertObjToArrayOfObj, findClosingMatchIndex, pascalize} from "../utils";

type paramsType = {
    componentName: string
    path: string
}

type propVueType = { type: string, required?: boolean } | 'Number' | 'Boolean' | 'String'

type propType = {
    name: string
    type: string
}

type childType = {
    name: string,
    props: propType[]
}

type slotsType = string[]

type eventType = {
    name: string
    output: {
        type: 'event' | 'externalCall' | 'dispatch' | 'changeChildProp'
    }
}

class UnitTestFactory {
    test: string
    slots: slotsType

    constructor(name: string, vueCode: string) {
        this.slots = this.getSlots(vueCode)
        const imports = this.buildImports(name, './')
        const createWrapper = this.buildCreateWrapper(name, this.getProps(vueCode)) // Find props
        const testsSuite = this.buildTestSuites(name, this.getChildren(vueCode)) // Find children

        this.test = imports + createWrapper + testsSuite
    }

    private getSlots(vueCode: string): slotsType {
        const slots = vueCode.match(/<slot \/>/gm)

        return slots?.map((slot) => slot.match(/"([a-z]*)"/) ? slot.match(/"([a-z]*)"/)[0] : 'default') ?? []
    }

    private getProps(vueCode: string): propType[] {
        const stringSearched = 'props: '
        const propsIndex = vueCode.indexOf(stringSearched)

        if(propsIndex === -1) {
            return []
        }

        const propsOpeningBrace = vueCode.indexOf(stringSearched) + stringSearched.length
        const propsClosingBrace = findClosingMatchIndex(vueCode,  propsOpeningBrace)

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

    getChildren(vueCode: string): childType[] {
        const htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img'

        const regexComponentInKebabCase = new RegExp(`<(?!/|${htmlTags})([^]*|[^>])*>`, 'gm')
        const componentsTags = vueCode.match(regexComponentInKebabCase)
        const componentsNameInPascalCase = componentsTags.map((componentTag) => {
          const name = pascalize(componentTag.match(/<([a-z][A-Z]+)(-[a-z]+)?([A-Z]+)?/gi)[0].substring(1))
          const props = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm).map((prop) => ({ name: prop.substring(1), type: 'boolean' }))

          return {
            name, props
          }
        })

        return componentsNameInPascalCase
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
            'number': 1,
            'boolean': true,
            'string': 'test string'
        }

        return mappingDefaultValue[type]
    }


    private buildCreateWrapper(name, props: propType[]) {
        const propTypes = props.length > 0 ? `
                        type ${name}Props = {
              ${props.map((prop) => `${prop.name}: ${prop.type.toLowerCase()}`)}
            }
            
            const defaultProps: ${name}Props = {
              ${props.map((prop) => `${prop.name}: ${this.getDefaultValueByType(prop.type.toLowerCase())}`)}
            }  
        ` : ''

        const creationWrapper = `
            const createWrapper = ({
                ${ props.length > 0 ? 'props = defaultProps,': '' }
              ${ this.slots.length > 0 ? 'slots = defaultSlots': '' }
            } = {}) =>
              wrapperFactory(${name} ${props.length > 0 || this.slots.length > 0 ? `, {
                ${ props.length > 0 ? 'props': '' }
                ${ this.slots?.length > 0 ? 'slots': '' }
              }`: ''})
              
            let wrapper = createWrapper()
        `

        return propTypes + creationWrapper
    }

    private buildSlotsIt() {
        if(this.slots.length === 0) {
            return ''
        }

        return `describe('rendering', () => {
            ${this.slots.map((slot) => 
             `it('should render the ${slot} slot', () => {
               expect(wrapper.html()).toContain('I fill the ${slot} slot')
             })`
            )}
        })`
    }

    private buildTestSuites(name: string, children: { name: string, props: propType[], events?: eventType[] }[]) {
        return `
                ${children.map((child) => `
                    let ${child.name}Wrapper = find${child.name}(wrapper)
                `)}

                describe(${name}, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        ${children.map((child) => `${child.name}Wrapper = find${child.name}(wrapper)`)}
                     })

                      describe('binding with ${children[0].name}', () => {
                        test('static props', () => {
                          ${children[0].props.map((prop) => `expect(${children[0].name}Wrapper.attributes(${prop.name})).toBe(${this.getDefaultValueByType(prop.type)})\n`)})
                      })
                      
                      ${this.buildSlotsIt()}        
                })
        `
    }
}


export default UnitTestFactory

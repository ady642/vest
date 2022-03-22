import {addDoubleQuotes, convertObjToArrayOfObj, findClosingMatchIndex, getFileName, pascalize} from "../utils";

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

const htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img|span'

//TODO: GET REAL NAME EVENT EMITTED
//TODO: GET REAL TYPE OF PROPS CHILD

class UnitTestFactory {
    name: string
    path: string
    vueCode: string
    slots: slotsType
    events: eventType[]
    props: propType[]
    componentsTags: string[]
    children: childType[]
    test: string

    constructor(path: string, vueCode: string) {
        const regexComponentInKebabCase = new RegExp(`<(?!\\/|${htmlTags})([^|[^>])*>`, 'g')
        this.componentsTags = vueCode.match(regexComponentInKebabCase)
        this.children = this.getChildren()
        this.vueCode = vueCode
        this.path = path
        this.name = getFileName(path)

        this.slots = this.getSlots()
        this.events = this.getEvents()
        this.props = this.getProps()

        const imports = this.buildImports()
        const createWrapper = this.buildCreateWrapper() // Find props
        const findWrappers = this.buildFindWrappers()
        const testsSuite = this.buildTestSuites(this.getChildren()) // Find children

        this.test = imports + createWrapper + findWrappers + testsSuite
    }

    private getEvents(): eventType[] {
        const tagWithEvent = this.vueCode.match(/<[a-z]+(.*@[a-z]+=.*)/g)

        console.log(tagWithEvent)

        return [
            { name: 'click', output: { type: 'event' } }
        ]
    }

    private getSlots(): slotsType {
        const slots = this.vueCode.match(/<slot \/>/gm)

        return slots?.map((slot) => slot.match(/"([a-z]*)"/) ? slot.match(/"([a-z]*)"/)[0] : 'default') ?? []
    }

    private getProps(): propType[] {
        const stringSearched = 'props: '
        const propsIndex = this.vueCode.indexOf(stringSearched)

        if(propsIndex === -1) {
            return []
        }

        const propsOpeningBrace = this.vueCode.indexOf(stringSearched) + stringSearched.length
        const propsClosingBrace = findClosingMatchIndex(this.vueCode,  propsOpeningBrace)

        const propsString = this.vueCode.substring(propsOpeningBrace, propsClosingBrace + 1)
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

    getChildren(): childType[] {
        return this.componentsTags.map((componentTag) => {
            const name = pascalize(componentTag.match(/<([a-z][A-Z]+)(-[a-z][A-Z]+)+/gmi)[0].substring(1))
            const propsString = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm)
            const props = propsString ? propsString.map((prop) => ({name: prop.substring(1), type: 'boolean'})) : []
            const eventsString = componentTag.match(/@([a-z]*)(-[a-z]+)?/gm)
            const events: eventType[] = eventsString ? eventsString.map((event) => ({ name: event.substring(1), output: { type: 'event' } })) : []

            return {
                name, props, events
            }
        })
    }

    private buildImports() {
        return `
            import ${this.name} from '${this.path}'
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


    private buildCreateWrapper() {
        const propTypes = this.props.length > 0 ? `
            type ${this.name}Props = {
              ${this.props.map((prop) => `${prop.name}: ${prop.type.toLowerCase()}`)}
            }
            
            const defaultProps: ${this.name}Props = {
              ${this.props.map((prop) => `${prop.name}: ${this.getDefaultValueByType(prop.type.toLowerCase())}`)}
            }  
        ` : ''

        const creationWrapper = `
            const createWrapper = ({
                ${ this.props.length > 0 ? 'props = defaultProps,': '' }
              ${ this.slots.length > 0 ? 'slots = defaultSlots': '' }
            } = {}) =>
              wrapperFactory(${this.name} ${this.props.length > 0 || this.slots.length > 0 ? `, {
                ${ this.props.length > 0 ? 'props': '' }
                ${ this.slots?.length > 0 ? 'slots': '' }
              }`: ''})
              
            let wrapper = createWrapper()
        `

        return propTypes + creationWrapper
    }

    private buildFindWrappers() {
        return `${this.children.map((child) => `
                let find${child.name} = (wrapper) => wrapper.findComponent(${child.name})
        `)}`
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

    private buildEventsIt(child: { name: string, props: propType[], events?: eventType[] }) {
        if(child.events.length === 0) {
            return ''
        }

        const chooseAction = (type: string) => {
            return type === 'event' ? 'emit': 'dispatch'
        }

        return `describe('events', () => {
            ${child.events.map((event) =>
            `it('should ${chooseAction(event.output.type)} when ${child.name} emits ${event.name}', () => {
                await ${child.name}Wrapper.vm.$emit(${event.name})
                expect(wrapper.emitted('my-event')).toHaveLength(1)
             })`
            )}
        })`
    }

    private buildTestSuites(children: { name: string, props: propType[], events?: eventType[] }[]) {
        return `
                ${children.map((child) => `
                    let ${child.name}Wrapper = find${child.name}(wrapper)
                `)}

                describe(${this.name}, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        ${children.map((child) => `${child.name}Wrapper = find${child.name}(wrapper)\n`)}
                     })

                      describe('binding with ${children[0].name}', () => {
                        test('static props', () => {
                          ${children[0].props.map((prop) => `expect(${children[0].name}Wrapper.attributes(${prop.name})).toBe(${this.getDefaultValueByType(prop.type)})\n`)})
                      })
                      
                      ${this.buildSlotsIt()}       
                      
                    ${children.map((child) => `
                        ${this.buildEventsIt(child)}
                    `)}
                })
                
                
        `
    }
}


export default UnitTestFactory

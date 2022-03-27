"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img|span';
// TODO: GET REAL TYPE OF EVENT HANDLER
// TODO: GET REAL NAME EVENT EMITTED IF IS EMIT TYPE
// TODO: CREATE TEMPLATE IF IS DISPATCH
// TODO: GET REAL TYPE OF PROPS CHILD
// TODO: IF COMPONENT TAG IS PascalCase it causes an error
class UnitTestFactory {
    constructor(path, vueCode) {
        const regexComponentInKebabCase = new RegExp(`<(?!\\/|${htmlTags})([^|[^>])*>`, 'g');
        this.componentsTags = vueCode.match(regexComponentInKebabCase) ?? [];
        this.children = this.getChildren();
        this.vueCode = vueCode;
        this.path = path;
        this.name = (0, utils_1.getFileName)(path);
        this.slots = this.getSlots();
        this.events = this.getEvents();
        this.props = this.getProps();
        const imports = this.buildImports();
        const createWrapper = this.buildCreateWrapper(); // Find props
        const findWrappers = this.buildFindWrappers();
        const testsSuite = this.buildTestSuites(this.getChildren()); // Find children
        this.test = imports + createWrapper + findWrappers + testsSuite;
    }
    getEvents() {
        return [
            { name: 'click', output: { type: 'event' } }
        ];
    }
    getSlots() {
        const slots = this.vueCode.match(/<slot \/>/gm);
        const matchSlots = (slot) => slot.match(/"([a-z]*)"/) ?? [];
        return slots?.map((slot) => matchSlots(slot) ? matchSlots(slot)[0] : 'default') ?? [];
    }
    getProps() {
        const stringSearched = 'props: ';
        const propsIndex = this.vueCode.indexOf(stringSearched);
        if (propsIndex === -1) {
            return [];
        }
        const propsOpeningBrace = this.vueCode.indexOf(stringSearched) + stringSearched.length;
        const propsClosingBrace = (0, utils_1.findClosingMatchIndex)(this.vueCode, propsOpeningBrace);
        const propsString = this.vueCode.substring(propsOpeningBrace, propsClosingBrace + 1);
        const propsStringifies = (0, utils_1.addDoubleQuotes)(propsString);
        const propsObject = JSON.parse(propsStringifies);
        const propsList = (0, utils_1.convertObjToArrayOfObj)(propsObject);
        return propsList.map((prop) => {
            const name = Object.keys(prop)[0];
            const value = Object.values(prop)[0];
            if (typeof value === 'object') {
                return { name, type: value?.type };
            }
            return { name, type: value.toLowerCase() };
        });
    }
    getChildren() {
        return this.componentsTags.map((componentTag) => {
            const componentTagMatch = componentTag.match(/<([a-z][A-Z]+)(-[a-z][A-Z]+)+/gmi) ?? [];
            const name = (0, utils_1.pascalize)(componentTagMatch[0].substring(1));
            const propsString = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm);
            const props = propsString ? propsString.map((prop) => ({ name: prop.substring(1), type: 'boolean' })) : [];
            const eventsString = componentTag.match(/@([a-z]*)(-[a-z]+)?/gm);
            const events = eventsString ? eventsString.map((event) => ({ name: event.substring(1), output: { type: 'event' } })) : [];
            return {
                name, props, events
            };
        });
    }
    buildImports() {
        return `
            import ${this.name} from '${this.path}'
            import wrapperFactory from 'tests/unit/utils/wrapperFactory'
            import useElement from 'tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'
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
    buildCreateWrapper() {
        const propTypes = this.props.length > 0 ? `
            type ${this.name}Props = {
              ${this.props.map((prop) => `${prop.name}: ${prop.type.toLowerCase()}`)}
            }
            
            const defaultProps: ${this.name}Props = {
              ${this.props.map((prop) => `${prop.name}: ${this.getDefaultValueByType(prop.type.toLowerCase())}`)}
            }  
        ` : '';
        const creationWrapper = `
            const createWrapper = ({
                ${this.props.length > 0 ? 'props = defaultProps,' : ''}
              ${this.slots.length > 0 ? 'slots = defaultSlots' : ''}
            } = {}) =>
              wrapperFactory(${this.name} ${this.props.length > 0 || this.slots.length > 0 ? `, {
                ${this.props.length > 0 ? 'props' : ''}
                ${this.slots?.length > 0 ? 'slots' : ''}
              }` : ''})
              
            let wrapper = createWrapper()
        `;
        return propTypes + creationWrapper;
    }
    buildFindWrappers() {
        return `${this.children.map((child) => `
                let find${child.name} = (wrapper) => wrapper.findComponent(${child.name})
        `)}`;
    }
    buildSlotsIt() {
        if (this.slots.length === 0) {
            return '';
        }
        return `describe('rendering', () => {
            ${this.slots.map((slot) => `it('should render the ${slot} slot', () => {
               expect(wrapper.html()).toContain('I fill the ${slot} slot')
             })`)}
        })`;
    }
    buildEventsIt(child) {
        if (child.events?.length === 0) {
            return '';
        }
        const chooseAction = (type) => {
            return type === 'event' ? 'emit' : 'dispatch';
        };
        return `describe('events', () => {
            ${child.events?.map((event) => `it('should ${chooseAction(event.output.type)} ${event.name} when ${child.name} emits ${event.name}', () => {
                await ${child.name}Wrapper.vm.$emit(${event.name})
                expect(wrapper.emitted('my-event')).toHaveLength(1)
             })`)}
        })`;
    }
    buildTestSuites(children) {
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
                          ${children[0].props.map((prop) => `expect(${children[0].name}Wrapper.attributes('${prop.name}')).toBe(${this.getDefaultValueByType(prop.type)})\n`)} })
                      })
                      
                      ${this.buildSlotsIt()}       
                      
                    ${children.map((child) => `
                        ${this.buildEventsIt(child)}
                    `)}
                })
                
                
        `;
    }
}
exports.default = UnitTestFactory;
//# sourceMappingURL=UnitTestFactory.js.map
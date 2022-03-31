"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const PropsFactory_1 = require("./PropsFactory");
const ChildrenFactory_1 = require("./ChildrenFactory");
const EventFactory_1 = require("./EventFactory/EventFactory");
const SlotsFactory_1 = require("./SlotsFactory/SlotsFactory");
// TODO: GET REAL TYPE OF EVENT HANDLER
// TODO: GET REAL NAME EVENT EMITTED IF IS EMIT TYPE
// TODO: CREATE TEMPLATE IF IS DISPATCH
// TODO: GET REAL TYPE OF PROPS CHILD
// TODO: IF COMPONENT TAG IS PascalCase it causes an error
class UnitTestFactory {
    constructor(path, vueCode) {
        this.path = path;
        this.name = (0, utils_1.getFileName)(path);
        this.slotsFactory = new SlotsFactory_1.default(vueCode);
        this.propsFactory = new PropsFactory_1.default(vueCode);
        this.childrenFactory = new ChildrenFactory_1.default(vueCode);
        this.eventsFactory = new EventFactory_1.default(vueCode);
        this.test = this.buildTestSuites();
    }
    buildImports() {
        return `
            import ${this.name} from '${this.path}'
            import wrapperFactory from 'tests/unit/utils/wrapperFactory'
            import useElement from 'tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'
        `;
    }
    buildCreateWrapper() {
        const creationWrapper = `
            const createWrapper = ({
                ${this.propsFactory.props.length > 0 ? 'props = defaultProps,' : ''}
              ${this.slotsFactory.slots.length > 0 ? 'slots = defaultSlots' : ''}
            } = {}) =>
              wrapperFactory(${this.name} ${this.propsFactory.props.length > 0 || this.slotsFactory.slots.length > 0 ? `, {
                ${this.propsFactory.props.length > 0 ? 'props' : ''}
                ${this.slotsFactory.slots?.length > 0 ? 'slots' : ''}
              }` : ''})
              
            let wrapper = createWrapper()
        `;
        return this.propsFactory.getDefaultProps(this.name) + creationWrapper;
    }
    async lintTestSuites() {
        return this.test;
    }
    buildTestSuites() {
        const imports = this.buildImports();
        const createWrapper = this.buildCreateWrapper();
        const findWrappers = this.childrenFactory.buildFindWrappers();
        const testsSuite = `
                ${this.childrenFactory.children.map((child) => `
                    let ${child.name}Wrapper = find${child.name}(wrapper)
                `)}

                describe(${this.name}, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        ${this.childrenFactory.children.map((child) => `${child.name}Wrapper = find${child.name}(wrapper)\n`)}
                     })

                     ${this.propsFactory.buildPropsIt(this.childrenFactory.children)}
                     
                      ${this.slotsFactory.buildSlotsIt()}       
                      
                    ${this.childrenFactory.children.map((child) => `
                        ${this.eventsFactory.buildEventsIt(child)}
                    `)}
                })
                
                
        `;
        return imports + createWrapper + findWrappers + testsSuite;
    }
}
exports.default = UnitTestFactory;
//# sourceMappingURL=UnitTestFactory.js.map
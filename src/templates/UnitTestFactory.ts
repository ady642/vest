import { getFileName } from "../utils";
import PropsFactory from "./PropsFactory";
import ChildrenFactory from "./ChildrenFactory";
import EventFactory from "./EventFactory/EventFactory";
import SlotsFactory from "./SlotsFactory/SlotsFactory";
import {lint} from "../lint";


// TODO: GET REAL TYPE OF EVENT HANDLER
// TODO: GET REAL NAME EVENT EMITTED IF IS EMIT TYPE
// TODO: CREATE TEMPLATE IF IS DISPATCH
// TODO: GET REAL TYPE OF PROPS CHILD
// TODO: IF COMPONENT TAG IS PascalCase it causes an error

class UnitTestFactory {
    name: string;
    path: string;
    propsFactory: PropsFactory;
    slotsFactory: SlotsFactory;
    childrenFactory: ChildrenFactory;
    eventsFactory: EventFactory;
    test: string;

    constructor(path: string, vueCode: string) {
        this.path = path;
        this.name = getFileName(path);

        this.slotsFactory = new SlotsFactory(vueCode);
        this.propsFactory = new PropsFactory(vueCode);
        this.childrenFactory = new ChildrenFactory(vueCode);
        this.eventsFactory = new EventFactory(vueCode);

        this.test = this.buildTestSuites();
    }

    private buildImports() {
        return `
            import ${this.name} from '${this.path}'
            import wrapperFactory from 'tests/unit/utils/wrapperFactory'
            import useElement from 'tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'
        `;
    }

    private buildCreateWrapper() {
        const creationWrapper = `
            const createWrapper = ({
                ${ this.propsFactory.props.length > 0 ? 'props = defaultProps,': '' }
              ${ this.slotsFactory.slots.length > 0 ? 'slots = defaultSlots': '' }
            } = {}) =>
              wrapperFactory(${this.name} ${this.propsFactory.props.length > 0 || this.slotsFactory.slots.length > 0 ? `, {
                ${ this.propsFactory.props.length > 0 ? 'props': '' }
                ${ this.slotsFactory.slots?.length > 0 ? 'slots': '' }
              }`: ''})
              
            let wrapper = createWrapper()
        `;

        return this.propsFactory.getDefaultProps(this.name) + creationWrapper;
    }

    public async lintTestSuites () {
        return await lint(this.test);
    }

    private buildTestSuites() {
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


export default UnitTestFactory;

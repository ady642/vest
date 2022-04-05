import { getFileName } from "../utils";
import PropsFactory from "./PropsFactory";
import ChildrenFactory, { childType } from "./ChildrenFactory";
import EventFactory from "./EventFactory/EventFactory";
import SlotsFactory from "./SlotsFactory/SlotsFactory";

// TODO: GET REAL TYPE OF EVENT HANDLER

// TODO: GET REAL NAME EVENT EMITTED IF IS EMIT TYPE (FROM EMITS list)

// TODO: CREATE TEMPLATE STRING IF IS A DISPATCH HANDLER

// TODO: GET REAL TYPE OF PROPS CHILD

class UnitTestFactory {
    name: string;
    path: string;
    propsFactory: PropsFactory;
    slotsFactory: SlotsFactory;
    childrenFactory: ChildrenFactory;
    test: string;

    constructor(path: string, vueCode: string) {
        this.path = path;
        this.name = getFileName(path);

        this.propsFactory = new PropsFactory(vueCode);
        this.slotsFactory = new SlotsFactory(vueCode);
        this.childrenFactory = new ChildrenFactory(vueCode);

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
                ${ this.propsFactory.props.length > 0 ? 'props,': '' }
                ${ this.slotsFactory.slots?.length > 0 ? 'slots,': '' }
                global: {
                    ${ this.childrenFactory.elChildren().length > 0 ? `stubs: ${this.childrenFactory.elChildren().flatMap(child => child.name)}`: '' }
                }
              }`: ''})
              
            let wrapper = createWrapper()
        `;

        return creationWrapper;
    }

    public async lintTestSuites () {
        return this.test;
    }

    private buildTestSuites() {
        const imports = this.buildImports();
        const defaultProps = this.propsFactory.getDefaultProps(this.name);
        const defaultSlots = this.slotsFactory.getDefaultSlots();
        const createWrapper = this.buildCreateWrapper();
        const findWrappers = this.childrenFactory.buildFindWrappers();

        const testsSuite = `
                describe(${this.name}, () => {
                    beforeEach(() => {
                       wrapper = createWrapper()
                       ${this.childrenFactory.children.map((child) => `${child.name}Wrapper = find${child.name}(wrapper)`).join('\n')}
                    })

                    ${this.propsFactory.buildPropsIt(this.childrenFactory.children)}
                     
                    ${this.slotsFactory.buildSlotsIt()}       
                      
                    ${this.childrenFactory.children.map((child) => `
                        ${child.eventFactory?.buildEventsIt()}
                    `).join('\n')}
                })  
        `;

        return imports + defaultProps + defaultSlots + createWrapper + findWrappers + testsSuite;
    }
}


export default UnitTestFactory;


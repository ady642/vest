import { getFileName, pascalize } from "../utils";
import PropsBuilder, {propType} from "./PropsBuilder";

type childType = {
    name: string,
    props: propType[]
};

type slotsType = string[];

export type eventType = {
    name: string
    output: {
        type: 'event' | 'externalCall' | 'dispatch' | 'changeChildProp'
    }
};

const htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img|span';

// TODO: GET REAL TYPE OF EVENT HANDLER
// TODO: GET REAL NAME EVENT EMITTED IF IS EMIT TYPE
// TODO: CREATE TEMPLATE IF IS DISPATCH
// TODO: GET REAL TYPE OF PROPS CHILD
// TODO: IF COMPONENT TAG IS PascalCase it causes an error

class UnitTestFactory {
    name: string;
    path: string;
    vueCode: string;
    slots: slotsType;
    events: eventType[];
    propsBuilder: PropsBuilder;
    componentsTags: string[];
    children: childType[];
    test: string;

    constructor(path: string, vueCode: string) {
        const regexComponentInKebabCase = new RegExp(`<(?!\\/|${htmlTags})([^|[^>])*>`, 'g');
        this.componentsTags = vueCode.match(regexComponentInKebabCase) ?? [];
        this.children = this.getChildren();
        this.vueCode = vueCode;
        this.path = path;
        this.name = getFileName(path);

        this.slots = this.getSlots();
        this.events = this.getEvents();
        this.propsBuilder = new PropsBuilder(vueCode);

        const imports = this.buildImports();
        const createWrapper = this.buildCreateWrapper(); // Find props
        const findWrappers = this.buildFindWrappers();
        const testsSuite = this.buildTestSuites(this.getChildren()); // Find children

        this.test = imports + createWrapper + findWrappers + testsSuite;
    }

    private getEvents(): eventType[] {
        return [
            { name: 'click', output: { type: 'event' } }
        ];
    }

    private getSlots(): slotsType {
        const slots = this.vueCode.match(/<slot \/>/gm);

        const matchSlots = (slot: string) => slot.match(/"([a-z]*)"/) ?? [];

        return slots?.map((slot) => matchSlots(slot) ? matchSlots(slot)[0] : 'default') ?? [];
    }

    getChildren(): childType[] {
        return this.componentsTags.map((componentTag) => {
            const componentTagMatch = componentTag.match(/<([a-z][A-Z]+)(-[a-z][A-Z]+)+/gmi) ?? [];
            const name = pascalize(componentTagMatch[0].substring(1));
            const propsString = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm);
            const props = propsString ? propsString.map((prop) => ({name: prop.substring(1), type: 'boolean'})) : [];
            const eventsString = componentTag.match(/@([a-z]*)(-[a-z]+)?/gm);
            const events: eventType[] = eventsString ? eventsString.map((event) => ({ name: event.substring(1), output: { type: 'event' } })) : [];

            return {
                name, props, events
            };
        }) as childType[];
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
                ${ this.propsBuilder.props.length > 0 ? 'props = defaultProps,': '' }
              ${ this.slots.length > 0 ? 'slots = defaultSlots': '' }
            } = {}) =>
              wrapperFactory(${this.name} ${this.propsBuilder.props.length > 0 || this.slots.length > 0 ? `, {
                ${ this.propsBuilder.props.length > 0 ? 'props': '' }
                ${ this.slots?.length > 0 ? 'slots': '' }
              }`: ''})
              
            let wrapper = createWrapper()
        `;

        return this.propsBuilder.getDefaultProps(this.name) + creationWrapper;
    }

    private buildFindWrappers() {
        return `${this.children.map((child) => `
                let find${child.name} = (wrapper) => wrapper.findComponent(${child.name})
        `)}`;
    }

    private buildSlotsIt() {
        if(this.slots.length === 0) {
            return '';
        }

        return `describe('rendering', () => {
            ${this.slots.map((slot) => 
             `it('should render the ${slot} slot', () => {
               expect(wrapper.html()).toContain('I fill the ${slot} slot')
             })`
            )}
        })`;
    }

    private buildEventsIt(child: { name: string, props: propType[], events?: eventType[] }) {
        if(child.events?.length === 0) {
            return '';
        }

        const chooseAction = (type: string) => {
            return type === 'event' ? 'emit': 'dispatch';
        };

        return `describe('events', () => {
            ${child.events?.map((event) =>
            `it('should ${chooseAction(event.output.type)} ${event.name} when ${child.name} emits ${event.name}', () => {
                await ${child.name}Wrapper.vm.$emit(${event.name})
                expect(wrapper.emitted('my-event')).toHaveLength(1)
             })`
            )}
        })`;
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

                     ${this.propsBuilder.buildPropsIt(children)}
                     
                      ${this.buildSlotsIt()}       
                      
                    ${children.map((child) => `
                        ${this.buildEventsIt(child)}
                    `)}
                })
                
                
        `;
    }
}


export default UnitTestFactory;

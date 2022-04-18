import {pascalize} from "../utils";
import {propType} from "./PropsFactory";
import EventFactory, {eventType} from "./EventFactory/EventFactory";

export type childType = {
    name: string,
    props: propType[]
    eventFactory?: EventFactory
};

const htmlTags = 'template|slot|div|string|script|style|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img|span';

const elementPlusRegexMatch = /^El+([A-Z])/;
const myPulseRegexMatch = /^Mp+([A-Z])/;
class ChildrenFactory {
    children: childType[];

    constructor(vueCode: string) {
        const regexComponentInKebabCase = new RegExp(`<(?!\/|script|style|slot|template|(div([^@:])*>))([^|[^>])*>`, 'gm');
        const componentsTags = vueCode.match(regexComponentInKebabCase) ?? [];

        this.children = componentsTags.map((componentTag) => {
            const nameInKebabOrPascalCase = componentTag.match(/<([a-zA-Z-]+)/) ?? [];
            const name = pascalize(nameInKebabOrPascalCase[0].substring(1));
            const propsString = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm);
            const props = propsString ? propsString.map((prop) => ({name: prop.substring(1), type: 'boolean'})) : [];

            const eventFactory = new EventFactory(componentTag, name, vueCode);

            return {
                name,
                props,
                eventFactory
            };
        }) as childType[];
    }

    buildFindWrappers() {
        return `${this.children.map((child) => `
                ${ elementPlusRegexMatch.test(child.name) ? `const { ${child.name} } = useElement()`: '' }
                ${ myPulseRegexMatch.test(child.name) ? `const { ${child.name} } = useStyleguide()`: '' }
                let find${child.name} = (wrapper) => wrapper.findComponent(${child.name})
                let ${child.name}Wrapper = find${child.name}(wrapper)
        `)}`;
    }

    elChildren() {
        return this.children.filter((child) => elementPlusRegexMatch.test(child.name));
    }
}

export default ChildrenFactory;

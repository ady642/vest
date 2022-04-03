import {pascalize} from "../utils";
import {propType} from "./PropsFactory";
import {eventType} from "./EventFactory/EventFactory";

export type childType = {
    name: string,
    props: propType[]
    events?: eventType[]
};

const htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img|span';

const elementPlusRegexMatch = /^El+([A-Z])/;
class ChildrenFactory {
    children: childType[];

    constructor(vueCode: string) {
        const regexComponentInKebabCase = new RegExp(`<(?!\\/|${htmlTags})([^|[^>])*>`, 'g');
        const componentsTags = vueCode.match(regexComponentInKebabCase) ?? [];

        this.children = componentsTags.map((componentTag) => {
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

    buildFindWrappers() {
        return `${this.children.map((child) => `
                ${ elementPlusRegexMatch.test(child.name) ? `const { ${child.name} } = useElement()`: '' }
                let find${child.name} = (wrapper) => wrapper.findComponent(${child.name})
                let ${child.name}Wrapper = find${child.name}(wrapper)
        `)}`;
    }

    elChildren() {
        return this.children.filter((child) => elementPlusRegexMatch.test(child.name));
    }
}

export default ChildrenFactory;

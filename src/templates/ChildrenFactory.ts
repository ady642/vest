import {pascalize} from "../utils";
import {propType} from "./PropsFactory";
import EventFactory, {eventType} from "./EventFactory/EventFactory";

export type childType = {
    name: string,
    props: propType[]
    eventFactory?: EventFactory
    className?: string
};

function getMatches(string: any, regex: any, index: number) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

const htmlTags = ['div','string','section','a','button','p','select','textarea','main','head','h1','h2','h3','header','i','iframe','img','span'];
const htmlTagsRegex = htmlTags.join('|');

const elementPlusRegexMatch = /^El+([A-Z])/;
const myPulseRegexMatch = /^Mp+([A-Z])/;
class ChildrenFactory {
    children: childType[];

    constructor(vueCode: string) {
        const regexComponentInKebabCase = new RegExp(`<(?!\/|script|style|slot|template|((${htmlTagsRegex})([^@:])*>))([^|[^>])*>`, 'gm');
        const componentsTags = vueCode.match(regexComponentInKebabCase) ?? [];

        this.children = componentsTags.map((componentTag) => {
            const nameInKebabOrPascalCase = componentTag.match(/<([a-zA-Z-]+)/) ?? [];
            const name = pascalize(nameInKebabOrPascalCase[0].substring(1));
            const propsString = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm);
            const props = propsString ? propsString.map((prop) => ({name: prop.substring(1), type: 'boolean'})) : [];
            const className = getMatches(componentTag, /class="(.*?)"/gm, 1)[0];
            const eventFactory = new EventFactory(componentTag, name, vueCode);

            return {
                name,
                className,
                props,
                eventFactory
            };
        }) as childType[];
    }

    private buildFindWrapper(child: childType) {
        return htmlTags.includes(child.name.toLowerCase()) ?
            `wrapper.find('.${child.className}')`:
            `wrapper.findComponent(${child.name})`;
    }

    buildFindWrappers() {
        return `${this.children.map((child) => `
                ${ elementPlusRegexMatch.test(child.name) ? `const { ${child.name} } = useElement()`: '' }
                ${ myPulseRegexMatch.test(child.name) ? `const { ${child.name} } = useStyleguide()`: '' }
                let find${child.name} = (wrapper) => ${this.buildFindWrapper(child)}
                let ${child.name}Wrapper = find${child.name}(wrapper)
        `)}`;
    }

    elChildren() {
        return this.children.filter((child) => elementPlusRegexMatch.test(child.name));
    }
}

export default ChildrenFactory;

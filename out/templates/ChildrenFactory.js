"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img|span';
const elementPlusRegexMatch = /^El+([A-Z])/;
class ChildrenFactory {
    constructor(vueCode) {
        const regexComponentInKebabCase = new RegExp(`<(?!\\/|${htmlTags})([^|[^>])*>`, 'g');
        const componentsTags = vueCode.match(regexComponentInKebabCase) ?? [];
        this.children = componentsTags.map((componentTag) => {
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
    buildFindWrappers() {
        return `${this.children.map((child) => `
                ${elementPlusRegexMatch.test(child.name) ? `const { ${child.name} } = useElement()` : ''}
                let find${child.name} = (wrapper) => wrapper.findComponent(${child.name})
                let ${child.name}Wrapper = find${child.name}(wrapper)
        `)}`;
    }
    elChildren() {
        return this.children.filter((child) => elementPlusRegexMatch.test(child.name));
    }
}
exports.default = ChildrenFactory;
//# sourceMappingURL=ChildrenFactory.js.map
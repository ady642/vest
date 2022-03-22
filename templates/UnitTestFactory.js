"use strict";
exports.__esModule = true;
var utils_1 = require("../utils");
var htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img|span';
//TODO: GET REAL NAME EVENT EMITTED
//TODO: GET REAL TYPE OF PROPS CHILD
var UnitTestFactory = /** @class */ (function () {
    function UnitTestFactory(path, vueCode) {
        var regexComponentInKebabCase = new RegExp("<(?!\\/|".concat(htmlTags, ")([^|[^>])*>"), 'g');
        this.componentsTags = vueCode.match(regexComponentInKebabCase);
        this.children = this.getChildren();
        this.vueCode = vueCode;
        this.path = path;
        this.name = (0, utils_1.getFileName)(path);
        this.slots = this.getSlots();
        this.events = this.getEvents();
        this.props = this.getProps();
        var imports = this.buildImports();
        var createWrapper = this.buildCreateWrapper(); // Find props
        var findWrappers = this.buildFindWrappers();
        var testsSuite = this.buildTestSuites(this.getChildren()); // Find children
        this.test = imports + createWrapper + findWrappers + testsSuite;
    }
    UnitTestFactory.prototype.getEvents = function () {
        var tagWithEvent = this.vueCode.match(/<[a-z]+(.*@[a-z]+=.*)/g);
        console.log(tagWithEvent);
        return [
            { name: 'click', output: { type: 'event' } }
        ];
    };
    UnitTestFactory.prototype.getSlots = function () {
        var _a;
        var slots = this.vueCode.match(/<slot \/>/gm);
        return (_a = slots === null || slots === void 0 ? void 0 : slots.map(function (slot) { return slot.match(/"([a-z]*)"/) ? slot.match(/"([a-z]*)"/)[0] : 'default'; })) !== null && _a !== void 0 ? _a : [];
    };
    UnitTestFactory.prototype.getProps = function () {
        var stringSearched = 'props: ';
        var propsIndex = this.vueCode.indexOf(stringSearched);
        if (propsIndex === -1) {
            return [];
        }
        var propsOpeningBrace = this.vueCode.indexOf(stringSearched) + stringSearched.length;
        var propsClosingBrace = (0, utils_1.findClosingMatchIndex)(this.vueCode, propsOpeningBrace);
        var propsString = this.vueCode.substring(propsOpeningBrace, propsClosingBrace + 1);
        var propsStringifies = (0, utils_1.addDoubleQuotes)(propsString);
        var propsObject = JSON.parse(propsStringifies);
        var propsList = (0, utils_1.convertObjToArrayOfObj)(propsObject);
        return propsList.map(function (prop) {
            var name = Object.keys(prop)[0];
            var value = Object.values(prop)[0];
            if (typeof value === 'object') {
                return { name: name, type: value === null || value === void 0 ? void 0 : value.type };
            }
            return { name: name, type: value };
        });
    };
    UnitTestFactory.prototype.getChildren = function () {
        return this.componentsTags.map(function (componentTag) {
            var name = (0, utils_1.pascalize)(componentTag.match(/<([a-z][A-Z]+)(-[a-z][A-Z]+)+/gmi)[0].substring(1));
            var propsString = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm);
            var props = propsString ? propsString.map(function (prop) { return ({ name: prop.substring(1), type: 'boolean' }); }) : [];
            var eventsString = componentTag.match(/@([a-z]*)(-[a-z]+)?/gm);
            var events = eventsString ? eventsString.map(function (event) { return ({ name: event.substring(1), output: { type: 'event' } }); }) : [];
            return {
                name: name,
                props: props,
                events: events
            };
        });
    };
    UnitTestFactory.prototype.buildImports = function () {
        return "\n            import ".concat(this.name, " from '").concat(this.path, "'\n            import wrapperFactory from 'tests/unit/utils/wrapperFactory'\n            import useElement from 'tests/unit/utils/useElementStubs'\n            import { VueWrapper } from '@vue/test-utils'\n        ");
    };
    UnitTestFactory.prototype.getDefaultValueByType = function (type) {
        var mappingDefaultValue = {
            'number': 1,
            'boolean': true,
            'string': 'test string'
        };
        return mappingDefaultValue[type];
    };
    UnitTestFactory.prototype.buildCreateWrapper = function () {
        var _this = this;
        var _a;
        var propTypes = this.props.length > 0 ? "\n            type ".concat(this.name, "Props = {\n              ").concat(this.props.map(function (prop) { return "".concat(prop.name, ": ").concat(prop.type.toLowerCase()); }), "\n            }\n            \n            const defaultProps: ").concat(this.name, "Props = {\n              ").concat(this.props.map(function (prop) { return "".concat(prop.name, ": ").concat(_this.getDefaultValueByType(prop.type.toLowerCase())); }), "\n            }  \n        ") : '';
        var creationWrapper = "\n            const createWrapper = ({\n                ".concat(this.props.length > 0 ? 'props = defaultProps,' : '', "\n              ").concat(this.slots.length > 0 ? 'slots = defaultSlots' : '', "\n            } = {}) =>\n              wrapperFactory(").concat(this.name, " ").concat(this.props.length > 0 || this.slots.length > 0 ? ", {\n                ".concat(this.props.length > 0 ? 'props' : '', "\n                ").concat(((_a = this.slots) === null || _a === void 0 ? void 0 : _a.length) > 0 ? 'slots' : '', "\n              }") : '', ")\n              \n            let wrapper = createWrapper()\n        ");
        return propTypes + creationWrapper;
    };
    UnitTestFactory.prototype.buildFindWrappers = function () {
        return "".concat(this.children.map(function (child) { return "\n                let find".concat(child.name, " = (wrapper) => wrapper.findComponent(").concat(child.name, ")\n        "); }));
    };
    UnitTestFactory.prototype.buildSlotsIt = function () {
        if (this.slots.length === 0) {
            return '';
        }
        return "describe('rendering', () => {\n            ".concat(this.slots.map(function (slot) {
            return "it('should render the ".concat(slot, " slot', () => {\n               expect(wrapper.html()).toContain('I fill the ").concat(slot, " slot')\n             })");
        }), "\n        })");
    };
    UnitTestFactory.prototype.buildEventsIt = function (child) {
        if (child.events.length === 0) {
            return '';
        }
        var chooseAction = function (type) {
            return type === 'event' ? 'emit' : 'dispatch';
        };
        return "describe('events', () => {\n            ".concat(child.events.map(function (event) {
            return "it('should ".concat(chooseAction(event.output.type), " when ").concat(child.name, " emits ").concat(event.name, "', () => {\n                await ").concat(child.name, "Wrapper.vm.$emit(").concat(event.name, ")\n                expect(wrapper.emitted('my-event')).toHaveLength(1)\n             })");
        }), "\n        })");
    };
    UnitTestFactory.prototype.buildTestSuites = function (children) {
        var _this = this;
        return "\n                ".concat(children.map(function (child) { return "\n                    let ".concat(child.name, "Wrapper = find").concat(child.name, "(wrapper)\n                "); }), "\n\n                describe(").concat(this.name, ", () => {\n                     beforeEach(() => {\n                        wrapper = createWrapper()\n                        ").concat(children.map(function (child) { return "".concat(child.name, "Wrapper = find").concat(child.name, "(wrapper)\n"); }), "\n                     })\n\n                      describe('binding with ").concat(children[0].name, "', () => {\n                        test('static props', () => {\n                          ").concat(children[0].props.map(function (prop) { return "expect(".concat(children[0].name, "Wrapper.attributes(").concat(prop.name, ")).toBe(").concat(_this.getDefaultValueByType(prop.type), ")\n"); }), ")\n                      })\n                      \n                      ").concat(this.buildSlotsIt(), "       \n                      \n                    ").concat(children.map(function (child) { return "\n                        ".concat(_this.buildEventsIt(child), "\n                    "); }), "\n                })\n                \n                \n        ");
    };
    return UnitTestFactory;
}());
exports["default"] = UnitTestFactory;

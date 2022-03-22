"use strict";
exports.__esModule = true;
var utils_1 = require("../utils");
var UnitTestFactory = /** @class */ (function () {
    function UnitTestFactory(name, vueCode) {
        this.slots = this.getSlots(vueCode);
        var imports = this.buildImports(name, './');
        var createWrapper = this.buildCreateWrapper(name, this.getProps(vueCode)); // Find props
        var testsSuite = this.buildTestSuites(name, this.getChildren(vueCode)); // Find children
        this.test = imports + createWrapper + testsSuite;
    }
    UnitTestFactory.prototype.getSlots = function (vueCode) {
        var _a;
        var slots = vueCode.match(/<slot \/>/gm);
        return (_a = slots === null || slots === void 0 ? void 0 : slots.map(function (slot) { return slot.match(/"([a-z]*)"/) ? slot.match(/"([a-z]*)"/)[0] : 'default'; })) !== null && _a !== void 0 ? _a : [];
    };
    UnitTestFactory.prototype.getProps = function (vueCode) {
        var stringSearched = 'props: ';
        var propsIndex = vueCode.indexOf(stringSearched);
        if (propsIndex === -1) {
            return [];
        }
        var propsOpeningBrace = vueCode.indexOf(stringSearched) + stringSearched.length;
        var propsClosingBrace = (0, utils_1.findClosingMatchIndex)(vueCode, propsOpeningBrace);
        var propsString = vueCode.substring(propsOpeningBrace, propsClosingBrace + 1);
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
    UnitTestFactory.prototype.getChildren = function (vueCode) {
        var htmlTags = 'template|slot|script|style|div|section|a|button|p|select|textarea|main|head|h1|h2|h3|header|i|iframe|img';
        var regexComponentInKebabCase = new RegExp("<(?!/|".concat(htmlTags, ")([^]*|[^>])*>"), 'gm');
        var componentsTags = vueCode.match(regexComponentInKebabCase);
        var componentsNameInPascalCase = componentsTags.map(function (componentTag) {
            var name = (0, utils_1.pascalize)(componentTag.match(/<([a-z][A-Z]+)(-[a-z]+)?([A-Z]+)?/gi)[0].substring(1));
            var props = componentTag.match(/:([a-z]*)(-[a-z]+)?/gm).map(function (prop) { return ({ name: prop.substring(1), type: 'boolean' }); });
            return {
                name: name,
                props: props
            };
        });
        return componentsNameInPascalCase;
    };
    UnitTestFactory.prototype.buildImports = function (name, path) {
        return "\n            import ".concat(name, " from ").concat(path, "\n            import wrapperFactory from 'tests/unit/utils/wrapperFactory'\n            import useElement from 'tests/unit/utils/useElementStubs'\n            import { VueWrapper } from '@vue/test-utils'\n        ");
    };
    UnitTestFactory.prototype.getDefaultValueByType = function (type) {
        var mappingDefaultValue = {
            'number': 1,
            'boolean': true,
            'string': 'test string'
        };
        return mappingDefaultValue[type];
    };
    UnitTestFactory.prototype.buildCreateWrapper = function (name, props) {
        var _this = this;
        var _a;
        var propTypes = props.length > 0 ? "\n                        type ".concat(name, "Props = {\n              ").concat(props.map(function (prop) { return "".concat(prop.name, ": ").concat(prop.type.toLowerCase()); }), "\n            }\n            \n            const defaultProps: ").concat(name, "Props = {\n              ").concat(props.map(function (prop) { return "".concat(prop.name, ": ").concat(_this.getDefaultValueByType(prop.type.toLowerCase())); }), "\n            }  \n        ") : '';
        var creationWrapper = "\n            const createWrapper = ({\n                ".concat(props.length > 0 ? 'props = defaultProps,' : '', "\n              ").concat(this.slots.length > 0 ? 'slots = defaultSlots' : '', "\n            } = {}) =>\n              wrapperFactory(").concat(name, " ").concat(props.length > 0 || this.slots.length > 0 ? ", {\n                ".concat(props.length > 0 ? 'props' : '', "\n                ").concat(((_a = this.slots) === null || _a === void 0 ? void 0 : _a.length) > 0 ? 'slots' : '', "\n              }") : '', ")\n              \n            let wrapper = createWrapper()\n        ");
        return propTypes + creationWrapper;
    };
    UnitTestFactory.prototype.buildSlotsIt = function () {
        if (this.slots.length === 0) {
            return '';
        }
        return "describe('rendering', () => {\n            ".concat(this.slots.map(function (slot) {
            return "it('should render the ".concat(slot, " slot', () => {\n               expect(wrapper.html()).toContain('I fill the ").concat(slot, " slot')\n             })");
        }), "\n        })");
    };
    UnitTestFactory.prototype.buildTestSuites = function (name, children) {
        var _this = this;
        return "\n                ".concat(children.map(function (child) { return "\n                    let ".concat(child.name, "Wrapper = find").concat(child.name, "(wrapper)\n                "); }), "\n\n                describe(").concat(name, ", () => {\n                     beforeEach(() => {\n                        wrapper = createWrapper()\n                        ").concat(children.map(function (child) { return "".concat(child.name, "Wrapper = find").concat(child.name, "(wrapper)"); }), "\n                     })\n\n                      describe('binding with ").concat(children[0].name, "', () => {\n                        test('static props', () => {\n                          ").concat(children[0].props.map(function (prop) { return "expect(".concat(children[0].name, "Wrapper.attributes(").concat(prop.name, ")).toBe(").concat(_this.getDefaultValueByType(prop.type), ")\n"); }), ")\n                      })\n                      \n                      ").concat(this.buildSlotsIt(), "        \n                })\n        ");
    };
    return UnitTestFactory;
}());
exports["default"] = UnitTestFactory;

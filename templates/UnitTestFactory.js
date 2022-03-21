"use strict";
exports.__esModule = true;
var utils_1 = require("../utils");
var UnitTestFactory = /** @class */ (function () {
    function UnitTestFactory(name, vueCode) {
        var imports = this.buildImports(name, './');
        var createWrapper = this.buildCreateWrapper(name, this.getProps(vueCode)); // Find props
        var testsSuite = this.buildTestSuites(name, [{ name: 'ElBadge', props: [{ name: 'value', type: 'boolean' }] }]); // Find children
        this.test = imports + createWrapper + testsSuite;
    }
    UnitTestFactory.prototype.getProps = function (vueCode) {
        var stringSearched = 'props: ';
        var propsOpeningBrace = vueCode.indexOf(stringSearched) + stringSearched.length;
        var propsClosingBrace = (0, utils_1.findClosingBracketMatchIndex)(vueCode, propsOpeningBrace);
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
    UnitTestFactory.prototype.buildImports = function (name, path) {
        return "\n            import ".concat(name, " from ").concat(path, "\n            import wrapperFactory from 'tests/unit/utils/wrapperFactory'\n            import useElement from 'tests/unit/utils/useElementStubs'\n            import { VueWrapper } from '@vue/test-utils'\n        ");
    };
    UnitTestFactory.prototype.getDefaultValueByType = function (type) {
        var mappingDefaultValue = {
            'Number': 1,
            'Boolean': true,
            'String': 'test string'
        };
        return mappingDefaultValue[type];
    };
    UnitTestFactory.prototype.buildCreateWrapper = function (name, props) {
        var _this = this;
        return "\n            type ".concat(name, "Props = {\n              ").concat(props.map(function (prop) { return "".concat(prop.name, ": ").concat(prop.type.toLowerCase()); }), "\n            }\n            \n            const defaultProps: ").concat(name, "Props = {\n              ").concat(props.map(function (prop) { return "".concat(prop.name, ": ").concat(_this.getDefaultValueByType(prop.type)); }), "\n            }    \n        \n            const createWrapper = ({\n              props = defaultProps,\n            } = {}) =>\n              wrapperFactory(").concat(name, ", {\n                props\n              })\n              \n            let wrapper = createWrapper()\n        ");
    };
    UnitTestFactory.prototype.buildTestSuites = function (name, children) {
        var _this = this;
        return "\n                ".concat(children.map(function (child) { return "\n                    let ".concat(child.name, "Wrapper = find").concat(child.name, "(wrapper)\n                "); }), "\n\n                describe(").concat(name, ", () => {\n                     beforeEach(() => {\n                        wrapper = createWrapper()\n                        ").concat(children.map(function (child) { return "\n                             ".concat(child.name, "Wrapper = find").concat(child.name, "(wrapper)\n                        "); }), "\n                     })\n\n                      describe('binding with ").concat(children[0].name, "', () => {\n                        test('static props', () => {\n                          ").concat(children[0].props.map(function (prop) { return "\n                            expect(".concat(children[0].name, "Wrapper.attributes(").concat(prop.name, ")).toBe(").concat(_this.getDefaultValueByType(prop.type), ")\n                          "); }), ")\n                      })\n\n                      describe('rendering', () => {\n                        it('should render the default slot', () => {\n                        expect(wrapper.html()).toContain('I fill the default slot')\n                      })\n                })\n        })\n        ");
    };
    return UnitTestFactory;
}());
exports["default"] = UnitTestFactory;

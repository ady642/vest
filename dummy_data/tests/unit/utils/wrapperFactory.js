"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("@vue/test-utils");
const lodash_1 = require("lodash");
const translationMock = (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key;
const defaultOptions = (options) => ({
    global: {
        directives: {
            Loading: options?.global?.directives?.Loading ?? {}
        },
        mocks: {
            $t: translationMock,
            $tc: translationMock
        }
    }
});
const wrapperFactory = (vueComponent, options) => (0, test_utils_1.shallowMount)(vueComponent, (0, lodash_1.merge)(options ?? {}, defaultOptions(options)));
exports.default = wrapperFactory;
//# sourceMappingURL=wrapperFactory.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_1 = require("@/locales/en");
const fr_1 = require("@/locales/fr");
const objectHelper_1 = require("dummy_data/tests/unit/utils/objectHelper");
describe('translation', () => {
    test('Check that all locale present in both languages', () => {
        const enKeys = (0, objectHelper_1.keyify)(en_1.default);
        const frKeys = (0, objectHelper_1.keyify)(fr_1.default);
        const missingKeys = enKeys.filter((key) => !frKeys.includes(key));
        const extraKeys = frKeys.filter((key) => !enKeys.includes(key));
        if (missingKeys.length != 0) {
            fail(`'${missingKeys}' exist in 'en' translation but not exist in 'fr' translation.`);
        }
        if (extraKeys.length != 0) {
            fail(`'${extraKeys}' exist in 'fr' translation but not exist in 'en' translation.`);
        }
    });
});
//# sourceMappingURL=translation.spec.js.map
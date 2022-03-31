"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownloadIcon_vue_1 = require("@/Common/components/Icons/DownloadIcon.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { MpIcon } = (0, useStyleguideStubs_1.default)();
const createWrapper = () => (0, wrapperFactory_1.default)(DownloadIcon_vue_1.default, {
    global: {
        stubs: {
            MpIcon
        }
    }
});
const wrapper = createWrapper();
describe('DownloadIcon', () => {
    describe('bindings', () => {
        test('props binding', () => {
            const mpIconWrapper = (0, finders_1.findMpIcon)(wrapper);
            expect(mpIconWrapper.props('name')).toBe('download');
        });
    });
});
//# sourceMappingURL=DownloadIcon.spec.js.map
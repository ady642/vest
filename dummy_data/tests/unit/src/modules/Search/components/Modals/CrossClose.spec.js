"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrossClose_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/CrossClose.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
/****
 * Wrapper creation
 */
const { MpIcon } = (0, useStyleguideStubs_1.default)();
const createWrapper = () => (0, wrapperFactory_1.default)(CrossClose_vue_1.default, {
    global: {
        renderStubDefaultSlot: true,
        stubs: {
            MpIcon
        }
    }
});
let wrapper = createWrapper();
let previewCTAContainer = (0, finders_1.findPreviewCTAContainer)(wrapper);
let mpIconWrapper = (0, finders_1.findMpIcon)(wrapper);
describe('CrossClose', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        previewCTAContainer = (0, finders_1.findPreviewCTAContainer)(wrapper);
        mpIconWrapper = (0, finders_1.findMpIcon)(wrapper);
    });
    describe('bindings with PreviewCTAContainer', () => {
        test('props bindings', () => {
            expect(previewCTAContainer.props('tooltipContent')).toBe('ged.common.close');
            expect(mpIconWrapper.props('name')).toBe('close');
        });
    });
});
//# sourceMappingURL=CrossClose.spec.js.map
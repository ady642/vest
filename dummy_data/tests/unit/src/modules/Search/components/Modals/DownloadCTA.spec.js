"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownloadCTA_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DownloadCTA.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
/****
 * Wrapper creation
 */
const { MpIcon } = (0, useStyleguideStubs_1.default)();
const createWrapper = () => (0, wrapperFactory_1.default)(DownloadCTA_vue_1.default, {
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
describe('DownloadCTA', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        previewCTAContainer = (0, finders_1.findPreviewCTAContainer)(wrapper);
        mpIconWrapper = (0, finders_1.findMpIcon)(wrapper);
    });
    describe('bindings with PreviewCTAContainer', () => {
        test('props bindings', () => {
            expect(previewCTAContainer.props('tooltipContent')).toBe('ged.common.download');
            expect(mpIconWrapper.props('name')).toBe('download');
        });
    });
});
//# sourceMappingURL=DownloadCTA.spec.js.map
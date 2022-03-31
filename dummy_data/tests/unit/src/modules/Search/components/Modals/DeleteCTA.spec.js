"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteCTA_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DeleteCTA.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const useStyleguideStubs_1 = require("../../../../../utils/useStyleguideStubs");
/****
 * Wrapper creation
 */
const defaultProps = {
    isDocumentDeletable: false,
    isDocumentDeleting: false
};
const { MpIcon } = (0, useStyleguideStubs_1.default)();
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DeleteCTA_vue_1.default, {
    props,
    global: {
        renderStubDefaultSlot: true,
        stubs: {
            MpIcon
        }
    }
});
let wrapper = createWrapper();
let previewCTAContainer = (0, finders_1.findPreviewCTAContainer)(wrapper);
let loadingIconWrapper = (0, finders_1.findLoadingIcon)(wrapper);
let mpIconWrapper = (0, finders_1.findMpIcon)(wrapper);
describe('DeleteCTA', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        previewCTAContainer = (0, finders_1.findPreviewCTAContainer)(wrapper);
        loadingIconWrapper = (0, finders_1.findLoadingIcon)(wrapper);
        mpIconWrapper = (0, finders_1.findMpIcon)(wrapper);
    });
    describe('bindings with PreviewCTAContainer', () => {
        describe('props bindings', () => {
            it.each([
                {
                    isDocumentDeletable: false,
                    translation: 'ged.dataManipulation.delete.cantDelete'
                },
                {
                    isDocumentDeletable: true,
                    translation: 'ged.dataManipulation.delete.file'
                }
            ])('should bind the good translation in function if the document is deletable', ({ isDocumentDeletable, translation }) => {
                wrapper = createWrapper({
                    ...defaultProps,
                    isDocumentDeletable
                });
                previewCTAContainer = (0, finders_1.findPreviewCTAContainer)(wrapper);
                expect(previewCTAContainer.props('tooltipContent')).toBe(translation);
            });
        });
        describe('rendering', () => {
            it.each([
                {
                    isDocumentDeleting: true,
                    loadingIconExist: true,
                    mpIconExist: false
                },
                {
                    isDocumentDeleting: false,
                    loadingIconExist: false,
                    mpIconExist: true
                }
            ])('should render LoadingIcon if the document is deleting', ({ isDocumentDeleting, loadingIconExist, mpIconExist }) => {
                wrapper = createWrapper({ ...defaultProps, isDocumentDeleting });
                loadingIconWrapper = (0, finders_1.findLoadingIcon)(wrapper);
                mpIconWrapper = (0, finders_1.findMpIcon)(wrapper);
                expect(loadingIconWrapper.exists()).toBe(loadingIconExist);
                expect(mpIconWrapper.exists()).toBe(mpIconExist);
            });
        });
    });
});
//# sourceMappingURL=DeleteCTA.spec.js.map
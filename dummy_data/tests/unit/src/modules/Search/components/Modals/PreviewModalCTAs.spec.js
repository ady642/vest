"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PreviewModalCTAs_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewModalCTAs.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const CrossClose_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/CrossClose.vue");
const DownloadCTA_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DownloadCTA.vue");
const DeleteCTA_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DeleteCTA.vue");
/****
 * Wrapper finders
 */
const findCrossClose = (wrapper) => wrapper.findComponent(CrossClose_vue_1.default);
const findDownloadCTA = (wrapper) => wrapper.findComponent(DownloadCTA_vue_1.default);
const findDeleteCTA = (wrapper) => wrapper.findComponent(DeleteCTA_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    isDocumentDeletable: false,
    isDocumentDeleting: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(PreviewModalCTAs_vue_1.default, {
    props
});
let wrapper = createWrapper();
let crossCloseWrapper = findCrossClose(wrapper);
let downloadCTAWrapper = findDownloadCTA(wrapper);
let deleteCTAWrapper = findDeleteCTA(wrapper);
describe('PreviewModalCTAs', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        crossCloseWrapper = findCrossClose(wrapper);
        downloadCTAWrapper = findDownloadCTA(wrapper);
        deleteCTAWrapper = findDeleteCTA(wrapper);
    });
    describe('bindings with CrossClose', () => {
        describe('events', () => {
            it('should emit download when CrossClose is clicked', async () => {
                await crossCloseWrapper.vm.$emit('click');
                expect(wrapper.emitted('close-click')).toHaveLength(1);
            });
        });
    });
    describe('bindings with DeleteCTA', () => {
        test('props bindings', () => {
            wrapper = createWrapper({
                isDocumentDeleting: true,
                isDocumentDeletable: true
            });
            deleteCTAWrapper = findDeleteCTA(wrapper);
            expect(deleteCTAWrapper.props('isDocumentDeleting')).toBe(true);
            expect(deleteCTAWrapper.props('isDocumentDeletable')).toBe(true);
        });
        describe('events', () => {
            it('should emit download when DeleteCTA is clicked', async () => {
                await deleteCTAWrapper.vm.$emit('click');
                expect(wrapper.emitted('delete')).toHaveLength(1);
            });
        });
    });
    describe('bindings with DownloadCTA', () => {
        describe('events', () => {
            it('should emit download when DownloadCTA is clicked', async () => {
                await downloadCTAWrapper.vm.$emit('click');
                expect(wrapper.emitted('download')).toHaveLength(1);
            });
        });
    });
});
//# sourceMappingURL=PreviewModalCTAs.spec.js.map
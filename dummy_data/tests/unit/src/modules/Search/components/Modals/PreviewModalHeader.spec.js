"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PreviewModalHeader_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalHeader.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
/****
 * Wrapper finders
 */
const findPreviewModalCTAs = (wrapper) => wrapper.findComponent({ name: 'preview-modal-ctas' });
const findPreviewModalDocumentType = (wrapper) => wrapper.findComponent({ name: 'preview-modal-document-type' });
const findPreviewModalCertifiedTag = (wrapper) => wrapper.findComponent({ name: 'preview-modal-certified-tag' });
/****
 * Wrapper creation
 */
const document = new Document_1.default();
document.id = 'columbo';
document.name = 'columbo';
document.type = '.pdf';
const defaultProps = {
    document
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(PreviewModalHeader_vue_1.default, {
    props
});
let wrapper = createWrapper();
let previewModalCTAsWrapper = findPreviewModalCTAs(wrapper);
let previewModalDocumentType = findPreviewModalDocumentType(wrapper);
let previewModalCertifiedTag = findPreviewModalCertifiedTag(wrapper);
describe('PreviewModalHeader', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        previewModalCTAsWrapper = findPreviewModalCTAs(wrapper);
        previewModalDocumentType = findPreviewModalDocumentType(wrapper);
        previewModalCertifiedTag = findPreviewModalCertifiedTag(wrapper);
    });
    describe('bindings with PreviewModalCtas', () => {
        describe('props', () => {
            it('static props', () => {
                expect(previewModalCTAsWrapper.props()).toStrictEqual({
                    isDocumentDeletable: false,
                    isDocumentDeleting: false
                });
            });
        });
        describe('events', () => {
            it.each([['close-click'], ['download'], ['delete']])('should emit %p when cross emits %p', async (event) => {
                // When PreviewModalCtas emits the event
                await previewModalCTAsWrapper.vm.$emit(event);
                // Then the event must be emitted
                expect(wrapper.emitted(event)).toBeTruthy();
            });
        });
    });
    describe('bindings with preview-modal-document-type', () => {
        describe('props', () => {
            it('static props', () => {
                wrapper = createWrapper();
                previewModalDocumentType = findPreviewModalDocumentType(wrapper);
                expect(previewModalDocumentType.props()).toStrictEqual({
                    type: '.pdf'
                });
            });
        });
    });
    describe('bindings with preview-modal-certified-tag', () => {
        describe('rendering', () => {
            it.each([
                { hasSubscribedToVault: false, existPreviewModalCertifiedTag: false },
                { hasSubscribedToVault: true, existPreviewModalCertifiedTag: true }
            ])('static props', ({ hasSubscribedToVault, existPreviewModalCertifiedTag }) => {
                const document = new Document_1.default();
                document.properties.hasSubscribedToVault = hasSubscribedToVault;
                wrapper = createWrapper({
                    document
                });
                previewModalCertifiedTag = findPreviewModalCertifiedTag(wrapper);
                expect(previewModalCertifiedTag.exists()).toBe(existPreviewModalCertifiedTag);
            });
        });
    });
});
//# sourceMappingURL=PreviewModalHeader.spec.js.map
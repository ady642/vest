"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentNameElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const DocumentAPIMock_1 = require("../../../mocks/DocumentAPIMock");
/****
 * Wrapper finders
 */
const findDocumentTags = (wrapper) => wrapper.findComponent({ name: 'document-tags' });
/****
 * Wrapper creation
 */
const defaultProps = {
    displayDescription: true,
    value: '',
    search: ''
};
const createDocumentsTableElement = (myDocument = new Document_1.default(DocumentAPIMock_1.documentAPIMock)) => ({
    props: { documentProp: { type: Document_1.default, default: myDocument } },
    template: `<div>
    <slot name="item" :props="documentProp" />
    <slot name="header" />
  </div>`
});
const createWrapper = ({ props = defaultProps, DocumentsTableElement = createDocumentsTableElement() } = {}) => (0, wrapperFactory_1.default)(DocumentNameElement_vue_1.default, {
    props,
    global: {
        stubs: {
            DocumentsTableElement
        }
    }
});
let wrapper = createWrapper();
let documentTags = findDocumentTags(wrapper);
describe('DocumentNameElement', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        documentTags = findDocumentTags(wrapper);
    });
    describe('bindings with DocumentTags', () => {
        describe('props', () => {
            it.each([
                {
                    properties: {},
                    documentCertifyTagExists: false
                },
                {
                    properties: {
                        ...DocumentAPIMock_1.documentAPIMock.properties,
                        HasSubscribedToVault: undefined
                    },
                    documentCertifyTagExists: false
                },
                {
                    properties: {
                        ...DocumentAPIMock_1.documentAPIMock.properties,
                        HasSubscribedToVault: 'Oui'
                    },
                    documentCertifyTagExists: true
                }
            ])('should render DocumentCertifyTag if the document property hasSubscribedToVault is at true', ({ properties, documentCertifyTagExists }) => {
                // Given the document has the hasSubscribedToVault property at true
                const document = new Document_1.default({
                    ...DocumentAPIMock_1.documentAPIMock,
                    properties
                });
                // When the wrapper is created with a certified document
                wrapper = createWrapper({
                    DocumentsTableElement: createDocumentsTableElement(document)
                });
                // Then DocumentCertifyTag must exist
                documentTags = findDocumentTags(wrapper);
                expect(documentTags.props('hasSubscribedToVault')).toBe(documentCertifyTagExists);
            });
            it('should bind isTreated with document getter isTreated', () => {
                const document = new Document_1.default({
                    ...DocumentAPIMock_1.documentAPIMock,
                    lifecycleStatus: Document_1.LifeCycleStatus.Treated
                });
                wrapper = createWrapper({
                    DocumentsTableElement: createDocumentsTableElement(document)
                });
                documentTags = findDocumentTags(wrapper);
                expect(documentTags.props('isTreated')).toBe(true);
            });
            it('should bind isNew with document getter isNew', () => {
                const document = new Document_1.default({
                    ...DocumentAPIMock_1.documentAPIMock,
                    lifecycleStatus: Document_1.LifeCycleStatus.New
                });
                wrapper = createWrapper({
                    DocumentsTableElement: createDocumentsTableElement(document)
                });
                documentTags = findDocumentTags(wrapper);
                expect(documentTags.props('isNew')).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=DocumentNameElement.spec.js.map
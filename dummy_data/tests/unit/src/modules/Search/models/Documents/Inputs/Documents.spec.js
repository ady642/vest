"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Documents_1 = require("@/modules/Search/models/Documents/Inputs/Documents");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const DocumentAPIMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/DocumentAPIMock");
let documents = Documents_1.default.loaded([]);
describe('Documents model', () => {
    test('loaded state', () => {
        // Given the documents are loaded
        documents = Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock]);
        // Then
        expect(documents.collection).toStrictEqual([new Document_1.default(DocumentAPIMock_1.documentAPIMock)]);
        expect(documents.state).toBe('loaded');
    });
    test('loading state', () => {
        // Given the documents are loading
        documents = Documents_1.default.loading('awesome cancel token');
        // Then
        expect(documents.collection).toStrictEqual([]);
        expect(documents.state).toBe('loading');
        expect(documents.cancelToken).toBe('awesome cancel token');
    });
    test('errored state', () => {
        // Given the documents are errored
        documents = Documents_1.default.errored();
        // Then
        expect(documents.collection).toStrictEqual([]);
        expect(documents.state).toBe('errored');
    });
    test('loading getter must true if state is loading', () => {
        // Given the documents are loading
        documents = Documents_1.default.loading('awesome cancel token');
        // Then
        expect(documents.isLoading).toBe(true);
    });
    it('should update the comments when updateDocumentComment is called', () => {
        // Given the documents are loaded
        documents = Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock]);
        // When updateDocumentComment is called
        documents.updateDocumentComment('myID', 'my new comments');
        // Then the document must have the new comment
        expect(documents.collection[0].comments).toBe('my new comments');
    });
    it('should not update the comments when updateDocumentComment with wrong id', () => {
        // Given the documents are loaded
        documents = Documents_1.default.loaded([DocumentAPIMock_1.documentAPIMock]);
        // When updateDocumentComment is called with wrong id
        documents.updateDocumentComment('otherId', 'my new comments');
        // Then the document must not have the new comment
        expect(documents.collection[0].comments).toBe('je suis le bilan comptable');
    });
});
//# sourceMappingURL=Documents.spec.js.map
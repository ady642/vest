import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import { documentAPIMock } from 'dummy_data/tests/unit/src/modules/Search/mocks/DocumentAPIMock'

let documents = Documents.loaded([])

describe('Documents model', () => {
  test('loaded state', () => {
    // Given the documents are loaded
    documents = Documents.loaded([documentAPIMock])

    // Then
    expect(documents.collection).toStrictEqual([new Document(documentAPIMock)])
    expect(documents.state).toBe('loaded')
  })
  test('loading state', () => {
    // Given the documents are loading
    documents = Documents.loading('awesome cancel token')

    // Then
    expect(documents.collection).toStrictEqual([])
    expect(documents.state).toBe('loading')
    expect(documents.cancelToken).toBe('awesome cancel token')
  })
  test('errored state', () => {
    // Given the documents are errored
    documents = Documents.errored()

    // Then
    expect(documents.collection).toStrictEqual([])
    expect(documents.state).toBe('errored')
  })
  test('loading getter must true if state is loading', () => {
    // Given the documents are loading
    documents = Documents.loading('awesome cancel token')

    // Then
    expect(documents.isLoading).toBe(true)
  })
  it('should update the comments when updateDocumentComment is called', () => {
    // Given the documents are loaded
    documents = Documents.loaded([documentAPIMock])

    // When updateDocumentComment is called
    documents.updateDocumentComment('myID', 'my new comments')

    // Then the document must have the new comment
    expect(documents.collection[0].comments).toBe('my new comments')
  })
  it('should not update the comments when updateDocumentComment with wrong id', () => {
    // Given the documents are loaded
    documents = Documents.loaded([documentAPIMock])

    // When updateDocumentComment is called with wrong id
    documents.updateDocumentComment('otherId', 'my new comments')

    // Then the document must not have the new comment
    expect(documents.collection[0].comments).toBe('je suis le bilan comptable')
  })
})

import Document, {
  LifeCycleStatus
} from '@/modules/Search/models/Documents/Inputs/Document'
import { documentAPIMock } from 'tests/unit/src/modules/Search/mocks/DocumentAPIMock'

let document = new Document()

describe('Document', () => {
  test('value default', () => {
    // Given the document is created without parameters
    document = new Document()

    // Then
    expect(document).toEqual({
      comments: '',
      createdBy: '',
      creationDate: '',
      folderId: 0,
      id: null,
      name: '',
      path: [],
      preview: '',
      properties: {
        syncStatus: '',
        hasSubscribedToVault: false
      },
      restorationStatus: '',
      size: 0,
      type: '',
      updatedDate: ''
    })
  })
  test('mapping value with parameters', () => {
    // Given a document is created with parameters
    document = new Document(documentAPIMock)

    // Then
    expect(document).toEqual({
      comments: 'je suis le bilan comptable',
      createdBy: '',
      creationDate: '2018-05-27',
      folderId: 45454,
      id: 'myID',
      name: 'Mon bilan comptable',
      path: [],
      preview: '',
      properties: {
        syncStatus: 'PENDING_SYNC',
        hasSubscribedToVault: false
      },
      restorationStatus: '',
      size: 54545,
      type: 'jpg',
      updatedDate: '2018-05-27',
      lifecycleStatus: LifeCycleStatus.Treated
    })
  })

  test.each([
    {
      HasSubscribedToVault: undefined,
      ENDO: undefined,
      expectedHasSubscribedToVault: false
    },
    {
      HasSubscribedToVault: undefined,
      ENDO: '',
      expectedHasSubscribedToVault: true
    },
    {
      HasSubscribedToVault: '',
      ENDO: undefined,
      expectedHasSubscribedToVault: true
    },
    {
      HasSubscribedToVault: 'Oui',
      ENDO: '',
      expectedHasSubscribedToVault: true
    }
  ])(
    'the hasSubscribeToVault property',
    ({ HasSubscribedToVault, ENDO, expectedHasSubscribedToVault }) => {
      // Given a document is created with parameters
      document = new Document({
        ...documentAPIMock,
        properties: {
          ...documentAPIMock.properties,
          HasSubscribedToVault,
          ENDO
        }
      })

      // Then
      expect(document.properties.hasSubscribedToVault).toEqual(
        expectedHasSubscribedToVault
      )
    }
  )

  describe('lifeCycle Status', () => {
    it('should be treated if lyfecycleStatus is Treated', () => {
      // Given a document is created with lifeCycleStatus at 7
      document = new Document({
        ...documentAPIMock,
        lifecycleStatus: LifeCycleStatus.Treated
      })

      expect(document.isTreated).toBe(true)
    })
  })
})

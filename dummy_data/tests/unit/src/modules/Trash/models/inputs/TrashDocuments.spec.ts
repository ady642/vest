import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'

describe('TrashDocuments', () => {
  test('constructor', () => {
    const trashDocuments = new TrashDocuments({
      state: 'loaded',
      collectionFromAPI: [
        {
          id: '1',
          name: 'test',
          deleted: '2020-01-01',
          deletedBy: 'test',
          path: [],
          account: {
            id: '1',
            name: 'test'
          },
          folderId: 1234
        }
      ],
      cancelToken: 'awesome cancel token'
    })

    expect(trashDocuments.state).toBe('loaded')
    expect(trashDocuments.collection).toEqual([
      {
        id: '1',
        name: 'test',
        deleted: '2020-01-01',
        deletedBy: 'test',
        path: [],
        folderId: 1234,
        restorationStatus: ''
      }
    ])
    expect(trashDocuments.cancelToken).toBe('awesome cancel token')
  })
  test('loaded', () => {
    const trashDocuments = TrashDocuments.loaded([
      {
        id: '1',
        name: 'test',
        deleted: '2020-01-01',
        deletedBy: 'test',
        path: [],
        account: {
          id: '1',
          name: 'test'
        },
        folderId: 1234
      }
    ])

    expect(trashDocuments.state).toBe('loaded')
    expect(trashDocuments.collection).toEqual([
      {
        id: '1',
        name: 'test',
        deleted: '2020-01-01',
        deletedBy: 'test',
        path: [],
        folderId: 1234,
        restorationStatus: ''
      }
    ])
  })
  test('loading', () => {
    const trashDocuments = TrashDocuments.loading('cancel token')

    expect(trashDocuments.state).toBe('loading')
    expect(trashDocuments.collection).toEqual([])
  })
  test('errored', () => {
    const trashDocuments = TrashDocuments.errored()

    expect(trashDocuments.state).toBe('errored')
  })
  test('isLoading', () => {
    const trashDocuments = TrashDocuments.loading('cancel token')

    expect(trashDocuments.isLoading).toBe(true)
  })
})

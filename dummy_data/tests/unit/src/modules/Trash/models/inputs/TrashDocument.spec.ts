import TrashDocument from '@/modules/Trash/models/Inputs/TrashDocument'

describe('TrashDocument', () => {
  test('constructor', () => {
    const trashDocument = new TrashDocument({
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
    })

    expect(trashDocument.id).toBe('1')
    expect(trashDocument.name).toBe('test')
    expect(trashDocument.deleted).toBe('2020-01-01')
    expect(trashDocument.deletedBy).toBe('test')
    expect(trashDocument.path).toEqual([])
    expect(trashDocument.restorationStatus).toEqual('')
  })
})

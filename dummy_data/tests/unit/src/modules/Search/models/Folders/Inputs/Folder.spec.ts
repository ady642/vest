import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import { Category } from '@/modules/Search/types'

describe('Folder', () => {
  test('default value', () => {
    const folder = new Folder({} as Category)

    // Then
    expect(folder.id).toBeUndefined()
    expect(folder.name).toBeUndefined()
    expect(folder.parentId).toBeUndefined()
    expect(folder.children).toStrictEqual([])
    expect(folder.properties).toBeUndefined()
    expect(folder.permissions).toBeUndefined()
  })
  test('mapping value with parameters', () => {
    const folder = new Folder({
      id: 1233,
      name: 'Compta',
      parent: { id: 0 },
      children: [],
      properties: {
        tracingName: 'Accounting'
      },
      permissions: ['CAN_DELETE_FOLDER', 'CAN_CREATE_FOLDER']
    } as Category)

    // Then
    expect(folder.id).toBe(1233)
    expect(folder.name).toBe('Compta')
    expect(folder.parentId).toBe(0)
    expect(folder.children).toHaveLength(0)
    expect(folder.properties).toStrictEqual({
      tracingName: 'Accounting'
    })
    expect(folder.permissions).toStrictEqual([
      'CAN_DELETE_FOLDER',
      'CAN_CREATE_FOLDER'
    ])
  })
  test('hasChildrenByName', () => {
    const folder = new Folder({
      id: 1233,
      name: 'Compta',
      parent: { id: 0 },
      children: [
        {
          id: 1234,
          name: 'A',
          parent: { id: 1233 },
          children: [],
          properties: {},
          permissions: ['CAN_DELETE_FOLDER', 'CAN_CREATE_FOLDER']
        } as Category
      ],
      properties: {},
      permissions: ['CAN_DELETE_FOLDER', 'CAN_CREATE_FOLDER']
    } as Category)

    expect(folder.hasChildrenByName('A')).toBe(true)
    expect(folder.hasChildrenByName('B')).toBe(false)
  })
  it('getCategory', () => {
    const folder = new Folder({
      id: 1233,
      name: 'Compta',
      parent: { id: 0 },
      children: [],
      properties: {},
      permissions: []
    } as Category)

    expect(folder.getCategory()).toStrictEqual({
      children: [],
      id: 1233,
      name: 'Compta',
      parent: {
        id: 0
      },
      properties: {},
      permissions: []
    })
  })
  it('should set the children when I call setChildren', () => {
    const folder = new Folder({
      id: 1233,
      name: 'Compta',
      parent: { id: 0 },
      children: [],
      properties: {},
      permissions: []
    } as Category)

    const childToAdd = new Folder({
      id: 2222,
      name: 'Columbo Folder',
      parent: { id: 1233 },
      children: [],
      properties: {},
      permissions: []
    } as Category)

    folder.setChildren([childToAdd])

    expect(folder.children).toEqual([childToAdd])
  })
})

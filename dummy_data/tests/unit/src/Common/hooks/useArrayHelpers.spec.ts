import useArrayHelpers from '@/Common/hooks/useArrayHelpers'
import useFoldersData from 'dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock'
import FoldersDataMock from 'dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock'
import { createFile } from 'dummy_data/tests/unit/__mocks__/Files/createFile'
import constants from '@/Common/constants'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'

type objectType = {
  name: string
}

describe('useArrayHelpers', () => {
  it('should sort array by alphabetical order given an array and the key to sort', () => {
    const myArrayToSort: objectType[] = [
      {
        name: 'Gamma'
      },
      {
        name: 'Alpha'
      },
      {
        name: 'Beta'
      },
      {
        name: 'Phi'
      }
    ]

    const { sortArrayByAlphabeticalOrder } = useArrayHelpers()
    const myFilteredArray: objectType[] = sortArrayByAlphabeticalOrder(
      myArrayToSort,
      'name'
    )

    expect(myFilteredArray).toEqual([
      {
        name: 'Alpha'
      },
      {
        name: 'Beta'
      },
      {
        name: 'Gamma'
      },
      {
        name: 'Phi'
      }
    ])
  })
  it('should return the folder with id 2705', () => {
    const { findDeep } = useArrayHelpers()

    const myFolders = useFoldersData().FoldersData

    expect(findDeep(myFolders.collection, 2705)).toEqual({
      children: [],
      id: 2705,
      name: 'The grandson',
      parentId: 1001,
      properties: {},
      permissions: []
    })
  })
  it('should return the folder with id 1233', () => {
    const { findDefaultUploadFolder } = useArrayHelpers()

    const myFolders = useFoldersData().FoldersData

    expect(findDefaultUploadFolder(myFolders.collection)).toEqual({
      children: [],
      id: 1233,
      name: 'Autres',
      parentId: 0,
      properties: { defaultUpload: true, syncStatus: constants.SUCCESS_SYNC },
      permissions: []
    })
  })
  describe('check for file uploading', () => {
    const cases = [
      {
        files: [createFile(1001)],
        expectedHasFileUploading: true
      },
      {
        files: [createFile(2705)],
        expectedHasFileUploading: true
      },
      {
        files: [createFile(1122)],
        expectedHasFileUploading: true
      },
      {
        files: [createFile(102)],
        expectedHasFileUploading: true
      },
      {
        files: [],
        expectedHasFileUploading: false
      }
    ]

    it.each(cases)(
      'should return true if a file is uploading',
      ({ files, expectedHasFileUploading }) => {
        const { hasFileUploading } = useArrayHelpers()
        const folders = FoldersDataMock().FoldersData.collection

        expect(
          hasFileUploading({
            folders,
            files
          })
        ).toBe(expectedHasFileUploading)
      }
    )
  })
  describe('should remove child from tree', () => {
    const { removeFolder, findDeep } = useArrayHelpers()

    const folders = FoldersDataMock().FoldersData.collection

    expect(findDeep(folders, 1001)?.children.length).toBe(2)

    const foldersWithoutFolder2705 = removeFolder(folders, 2705)

    expect(findDeep(foldersWithoutFolder2705, 1001)?.children.length).toBe(1)
    expect(
      findDeep(foldersWithoutFolder2705, 1001)?.children[0]
    ).toBeInstanceOf(Folder)
  })

  describe('Should return the deep level of folder ', () => {
    const { countDeep } = useArrayHelpers()
    const folders = FoldersDataMock().FoldersData.collection

    expect(countDeep(folders, 1122)).toBe(1)
    expect(countDeep(folders, 1001)).toBe(2)
    expect(countDeep(folders, 102)).toBe(3)
  })

  describe('should remove children if deep', () => {
    const { removeDeepByLevel } = useArrayHelpers()
    const folders = Folders.loaded([
      {
        id: 1122,
        name: 'A classer',
        parent: { id: 0 },
        children: [
          {
            id: 1001,
            name: 'The child',
            children: [
              {
                id: 2705,
                name: 'The grandson',
                children: [],
                parent: { id: 1001 },
                properties: {},
                permissions: []
              }
            ],
            parent: { id: 1122 },
            properties: {},
            permissions: []
          }
        ],
        properties: { syncStatus: 'PENDING_SYNC' },
        permissions: []
      },
      {
        id: 1233,
        name: 'Autres',
        parent: { id: 0 },
        children: [],
        permissions: [],
        properties: {
          defaultUpload: true,
          syncStatus: 'SUCCESS_SYNC'
        }
      }
    ])

    expect(removeDeepByLevel(folders.collection, 1)).toStrictEqual(
      Folders.loaded([
        {
          id: 1122,
          name: 'A classer',
          parent: { id: 0 },
          children: [
            {
              id: 1001,
              name: 'The child',
              children: [],
              parent: { id: 1122 },
              properties: {},
              permissions: []
            }
          ],
          properties: { syncStatus: 'PENDING_SYNC' },
          permissions: []
        },
        {
          id: 1233,
          name: 'Autres',
          parent: { id: 0 },
          children: [],
          permissions: [],
          properties: {
            defaultUpload: true,
            syncStatus: 'SUCCESS_SYNC'
          }
        }
      ]).collection
    )
  })
})

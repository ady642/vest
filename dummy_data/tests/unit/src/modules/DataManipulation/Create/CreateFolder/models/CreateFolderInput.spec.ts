import CreateFolderInput from '@/modules/DataManipulation/Create/CreateFolder/models/Inputs/CreateFolderInput'

describe('CreateFolderInput', () => {
  test('mapping', () => {
    const createFolderInput = new CreateFolderInput(1234, 'Test')

    expect(createFolderInput.name).toBe('Test')
    expect(createFolderInput.parentId).toBe(1234)
  })

  describe('transformForAPI', () => {
    const cases = [
      { folderName: 'Test', expectedName: 'Test' },
      { folderName: ' Test', expectedName: 'Test' },
      { folderName: 'Test ', expectedName: 'Test' },
      { folderName: ' Test ', expectedName: 'Test' },
      {
        folderName: ' je suis le cas de test ',
        expectedName: 'je suis le cas de test'
      }
    ]

    it.each(cases)('should trim the name', ({ folderName, expectedName }) => {
      const createFolderInputTransformedForApi = new CreateFolderInput(
        1234,
        folderName
      ).transformForAPI()

      expect(createFolderInputTransformedForApi.name).toBe(expectedName)
      expect(createFolderInputTransformedForApi.parentId).toBe(1234)
    })
  })
})

import FolderExistsError from '@/Common/errors/FolderExistsError'

describe('FolderExistsError', () => {
  test('mapping class', () => {
    const folderExistsError = new FolderExistsError()

    expect(folderExistsError.message).toBe('This folder already exists')
    expect(folderExistsError.code).toBe(403)
  })
})

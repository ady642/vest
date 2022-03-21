import dispatchHelpers from '@/modules/DataManipulation/Delete/DeleteFile/store/helpers/dispatchHelpers'
import { createDeleteFileStoreMocked } from 'tests/unit/__mocks__/storeMock'

let storeMock = createDeleteFileStoreMocked()

describe('dispatchHelpers dispatch', () => {
  beforeEach(() => {
    storeMock = createDeleteFileStoreMocked()

    storeMock.dispatch = jest.fn()
  })
  it('deleteFile', () => {
    const { deleteFile } = dispatchHelpers(storeMock)

    deleteFile('awesome-document-id')
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      'GED/DataManipulation/DeleteFile/deleteFiles',
      ['awesome-document-id']
    )
  })
  it('deleteFiles', () => {
    const { deleteFiles } = dispatchHelpers(storeMock)

    deleteFiles(['awesome-document-id', 'awesome-document-id-2'])
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      'GED/DataManipulation/DeleteFile/deleteFiles',
      ['awesome-document-id', 'awesome-document-id-2']
    )
  })
})

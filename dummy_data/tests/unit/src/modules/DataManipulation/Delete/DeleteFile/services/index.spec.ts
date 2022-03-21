import DeleteFileServices from '@/modules/DataManipulation/Delete/DeleteFile/services'
import { api } from '@kpmg/mypulse-shared-dependencies'

describe('DeleteFileServices', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call api.ds.delete with documents delete API when I call the the deleteFiles with multiple files', () => {
    // When I call the uploadDocument service
    DeleteFileServices.DeleteFiles('545421', ['1', '2'])

    // Then api.ds.delete must have been called with good path
    expect(api.ds.delete).toHaveBeenCalledWith('/545421/documents', {
      data: { ids: ['1', '2'] }
    })
  })
})

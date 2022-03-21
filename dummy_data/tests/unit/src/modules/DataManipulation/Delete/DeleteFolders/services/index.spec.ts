import DeleteFoldersServices from '@/modules/DataManipulation/Delete/DeleteFolder/services'
import { api } from '@kpmg/mypulse-shared-dependencies'

describe('DeleteFoldersServices', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call api.ds.delete with folders get API when I call the the uploadDocument service', () => {
    // When I call the uploadDocument service
    DeleteFoldersServices.deleteFolder('545421', 12345)

    // Then api.ds.delete must have been called with good path
    expect(api.ds.delete).toHaveBeenCalledWith(
      '/545421/folders/12345?keepFolder=false'
    )
  })
})

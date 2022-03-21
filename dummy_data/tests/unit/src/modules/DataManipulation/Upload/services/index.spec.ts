import UploadServices from '@/modules/DataManipulation/Upload/services'
import { api } from '@kpmg/mypulse-shared-dependencies'

describe('UploadServices', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call api.ds.post with folders get API when I call the the uploadDocument service', () => {
    // When I call the uploadDocument service
    UploadServices.uploadDocument({
      accountNumberOrId: 'testmodel6',
      folderId: 12345,
      file: new File([''], 'filename', { type: 'text/html' })
    })
    const formData = new FormData()

    formData.append('file', new File([''], 'filename', { type: 'text/html' }))
    // Then api.ds.post must have been called with good path
    expect(api.ds.post).toHaveBeenCalledWith(
      '/testmodel6/folders/12345/documents?notify=true',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
  })
})

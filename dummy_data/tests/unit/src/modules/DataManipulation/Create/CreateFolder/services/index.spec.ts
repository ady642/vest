import CreateFolderServices from '@/modules/DataManipulation/Create/CreateFolder/services'
import { api } from '@kpmg/mypulse-shared-dependencies'
import { CreateFolderQuery } from '@/modules/Search/types'

describe('CreateFolderServices', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should call api.ds.create with folder post API when I call the the CreateFolder service', () => {
    const query = {
      targetFolder: 1,
      folderName: 'a',
      accountNumber: '1234'
    } as CreateFolderQuery
    // When I call the uploadDocument service
    CreateFolderServices.CreateFolder(query)

    // Then api.ds.delete must have been called with good path
    expect(api.ds.post).toHaveBeenCalledWith('/1234/folders', {
      name: 'a',
      parentId: 1
    })
  })
})

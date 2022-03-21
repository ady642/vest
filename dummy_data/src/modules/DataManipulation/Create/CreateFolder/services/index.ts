import CreateFolderInput from '@/modules/DataManipulation/Create/CreateFolder/models/Inputs/CreateFolderInput'
import { api, apiResponse } from '@kpmg/mypulse-shared-dependencies'
import { CreateFolderQuery } from '@/modules/Search/types'
import { Category } from '@/modules/Search/types'

const CreateFolder = async (
  createFolderQuery: CreateFolderQuery
): Promise<apiResponse<Category>> => {
  const data = new CreateFolderInput(
    createFolderQuery.targetFolder,
    createFolderQuery.folderName
  ).transformForAPI()

  return await api.ds.post(`/${createFolderQuery.accountNumber}/folders`, data)
}

export default {
  CreateFolder
}

import { FileUploadQuery } from '@/modules/DataManipulation/Upload/models/Files/Query/FileUploadQuery'
import { api, apiResponse } from '@kpmg/mypulse-shared-dependencies'
import { DocumentFromAPI } from '@/Common/types/document'

const uploadDocument = async (
  documentUploadQuery: FileUploadQuery
): Promise<apiResponse<DocumentFromAPI[]>> => {
  const formData = new FormData()

  formData.append('file', documentUploadQuery.file)

  return await api.ds.post(
    `/${documentUploadQuery.accountNumberOrId}/folders/${documentUploadQuery.folderId}/documents?notify=true`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export default {
  uploadDocument
}

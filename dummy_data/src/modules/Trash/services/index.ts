import { api, apiResponse } from '@kpmg/mypulse-shared-dependencies'
import { DocumentFromAPI, TrashDocumentFromAPI } from '@/Common/types/document'
import { TrashDocumentsQueryAPI } from '../models/Query/TrashDocumentsQueryAPI'
import RestoreFileRequest from '@/modules/Trash/models/Query/RestoreFileRequest'

const fetchTrashDocuments = async (
  accountIdOrNumber: string,
  documentsQuery: TrashDocumentsQueryAPI,
  cancelToken?: any
): Promise<apiResponse<TrashDocumentFromAPI[]>> =>
  await api.ds.get(`/${accountIdOrNumber}/trash`, {
    cancelToken: cancelToken?.token,
    params: { ...documentsQuery }
  })

const restoreFile = async (
  accountId: string,
  documentId: string
): Promise<apiResponse<DocumentFromAPI[]>> => {
  const ids = new Array<string>()

  ids.push(documentId)
  const data = new RestoreFileRequest(ids)

  return await api.ds.post(`/${accountId}/trash/restore`, data)
}

export default {
  fetchTrashDocuments,
  restoreFile
}

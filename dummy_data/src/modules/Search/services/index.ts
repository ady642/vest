import { api, apiResponse } from '@kpmg/mypulse-shared-dependencies'
import { DocumentsQueryAPI } from '@/modules/Search/models/Documents/Query/DocumentsQuery'
import { Category } from '@/modules/Search/types'
import { DownloadQueryAPI } from '@/modules/Search/models/Documents/Query/DownloadQuery'
import { PatchQueryAPI } from '@/modules/Search/models/Documents/Query/PatchQuery'
import { DocumentFromAPI } from '@/Common/types/document'
import { DownloadAsZip } from '@/Common/helpers/downloadDocumentsHelper'

const fetchDocuments = async (
  documentsQuery: DocumentsQueryAPI,
  cancelToken?: any
): Promise<apiResponse<DocumentFromAPI[]>> =>
  await api.ds.get('/documents/search', {
    cancelToken: cancelToken?.token,
    params: documentsQuery
  })

const fetchFolders = async (
  accountIdOrNumber: string
): Promise<apiResponse<Category[]>> =>
  await api.ds.get(`/${accountIdOrNumber}/folders`)

const downloadPreview = async ({
  accountId,
  documentId
}: DownloadQueryAPI): Promise<apiResponse<BlobPart>> =>
  await api.ds.get(`/${accountId}/documents/${documentId}/preview`, {
    responseType: 'arraybuffer'
  })

const downloadDocument = async ({
  accountId,
  documentId
}: DownloadQueryAPI): Promise<apiResponse<BlobPart>> =>
  await api.ds.get(`/${accountId}/documents/${documentId}/content`, {
    responseType: 'blob'
  })

const patchDocument = async ({
  accountId,
  documentId,
  operation,
  path,
  value
}: PatchQueryAPI): Promise<apiResponse<DocumentFromAPI>> =>
  await api.ds.patch(`/${accountId}/documents/${documentId}`, [
    { op: operation, path: path, value: value }
  ])

const downloadDocuments = async (
  accountId: string,
  documentsIds: string[]
): Promise<apiResponse<BlobPart>> => {
  const ids = {
    ids: documentsIds
  }

  const response = await api.ds.post(`/${accountId}/archive`, ids, {
    responseType: 'blob'
  })

  if (response?.data) {
    DownloadAsZip(response?.data, 'myPulse.zip')
  }
}

export default {
  fetchDocuments,
  fetchFolders,
  downloadDocument,
  patchDocument,
  downloadPreview,
  downloadDocuments
}

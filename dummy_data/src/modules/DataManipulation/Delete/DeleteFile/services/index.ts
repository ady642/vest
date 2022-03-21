import { api } from '@kpmg/mypulse-shared-dependencies'

const DeleteFiles = async (
  accountId: string,
  documentIds: string[]
): Promise<void> => {
  await api.ds.delete(`/${accountId}/documents`, {
    data: { ids: documentIds }
  })
}

export default {
  DeleteFiles
}

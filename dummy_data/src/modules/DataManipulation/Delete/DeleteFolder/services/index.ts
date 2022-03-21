import { api } from '@kpmg/mypulse-shared-dependencies'

const deleteFolder = async (
  accountId: string,
  folderId: number
): Promise<void> => {
  await api.ds.delete(`/${accountId}/folders/${folderId}?keepFolder=false`)
}

export default {
  deleteFolder
}

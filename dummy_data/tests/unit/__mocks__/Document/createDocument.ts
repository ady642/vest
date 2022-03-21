import Document from '@/modules/Search/models/Documents/Inputs/Document'

export const createDocument = (
  id: string,
  folderId: number,
  syncStatus: string
) => {
  const myDoc = new Document()
  myDoc.id = id
  myDoc.folderId = folderId
  myDoc.properties.syncStatus = syncStatus

  return myDoc
}

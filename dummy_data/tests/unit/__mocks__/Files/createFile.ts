import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

export const createFile = (
  destinationFolderId = 1122,
  stateFile = StateUpload.UPLOADING
) => {
  const myFile = new FileUpload(
    new File([''], 'filename', { type: 'text/html' }),
    stateFile
  )

  myFile.destination = destinationFolderId

  return myFile
}

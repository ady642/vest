import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

export const FileUploadMock = [
  new FileUpload(
    new File([''], 'filename', { type: 'text/html' }),
    StateUpload.UPLOADED
  ),
  new FileUpload(
    new File([''], 'filename', { type: 'text/html' }),
    StateUpload.CANCELED
  )
]

export const filesProgressCase = [
  new FileUpload(
    new File([''], 'file1.txt', { type: 'text/html' }),
    StateUpload.UPLOADING
  ),
  new FileUpload(
    new File([''], 'file2.txt', { type: 'text/html' }),
    StateUpload.UPLOADING
  ),
  new FileUpload(
    new File([''], 'file3.txt', { type: 'text/html' }),
    StateUpload.UPLOADED
  )
]

export const filesSuccessCase = [
  new FileUpload(
    new File([''], 'file1.txt', { type: 'text/html' }),
    StateUpload.UPLOADED
  ),
  new FileUpload(
    new File([''], 'file2.txt', { type: 'text/html' }),
    StateUpload.UPLOADED
  ),
  new FileUpload(
    new File([''], 'file3.txt', { type: 'text/html' }),
    StateUpload.UPLOADED
  )
]

export const filesFailedCase = [
  new FileUpload(
    new File([''], 'file1.txt', { type: 'text/html' }),
    StateUpload.ERROR
  ),
  new FileUpload(
    new File([''], 'file2.txt', { type: 'text/html' }),
    StateUpload.CANCELED
  ),
  new FileUpload(
    new File([''], 'file3.txt', { type: 'text/html' }),
    StateUpload.UPLOADED
  )
]

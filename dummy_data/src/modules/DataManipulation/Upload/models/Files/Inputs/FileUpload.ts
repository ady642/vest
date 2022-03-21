import { ErrorDescription } from '@/Common/types/common'

export enum StateUpload {
  TO_UPLOAD,
  PENDING,
  UPLOADING,
  UPLOADED,
  ERROR,
  CANCELED
}

export default class FileUpload {
  file: File
  destination: number | null
  state: StateUpload
  errorDescription: ErrorDescription

  constructor(file: File, state: StateUpload) {
    this.file = file
    this.state = state
    this.destination = null
    this.errorDescription = {} as ErrorDescription
  }
  finished(): boolean {
    return (
      this.state === StateUpload.ERROR ||
      this.state === StateUpload.UPLOADED ||
      this.state === StateUpload.CANCELED
    )
  }

  running(): boolean {
    return this.state === StateUpload.UPLOADING
  }

  error(): boolean {
    return this.state === StateUpload.ERROR
  }

  ready(): boolean {
    return this.state === StateUpload.TO_UPLOAD
  }

  canceled(): boolean {
    return this.state === StateUpload.CANCELED
  }

  uploaded(): boolean {
    return this.state === StateUpload.UPLOADED
  }

  pending(): boolean {
    return this.state === StateUpload.PENDING
  }

  getFileExtension(): string {
    const fileName = this.file.name.split('.')

    return fileName[fileName.length - 1]
  }
}

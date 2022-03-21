import { saveAs } from 'file-saver'

const DownloadAsZip = (data: Blob, zipName: string): void => {
  saveAs(data, zipName)
}

export { DownloadAsZip }

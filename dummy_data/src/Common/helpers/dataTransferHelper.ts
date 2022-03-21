export interface FileSystemEntry {
  name: string
  isDirectory: boolean
  isFile: boolean
}
export interface FileSystemFileEntry extends FileSystemEntry {
  isFile: true
  isDirectory: false
  file(successCallback: (file: File) => void): void
}

export interface FileSystemDirectoryEntry extends FileSystemEntry {
  isFile: false
  isDirectory: true
  createReader(): FileSystemDirectoryReader
}

export interface FileSystemDirectoryReader {
  readEntries(successCallback: (file: FileSystemFileEntry[]) => void): void
}

const isFile = (entry: FileSystemEntry): boolean => {
  if (entry && typeof entry.isFile !== 'undefined') {
    return entry.isFile
  }

  return false
}

const isDirectory = (entry: FileSystemEntry): boolean => {
  if (entry && typeof entry.isDirectory !== 'undefined') {
    return entry.isDirectory
  }

  return false
}

const readFile = (entry: FileSystemFileEntry): Promise<File> => {
  return new Promise<File>((resolve) => entry.file(resolve))
}

const readDirectory = async (
  dir: FileSystemDirectoryEntry
): Promise<File[]> => {
  const reader = dir.createReader()
  const readMore = (): Promise<FileSystemEntry[]> =>
    new Promise<FileSystemEntry[]>((resolve) => {
      reader.readEntries(resolve)
    })

  const entries = await readMore()

  const response: File[] = []

  for (const entry of entries) {
    response.push(...(await readEntry(entry)))
  }

  return response
}

const readEntry = async (entry: FileSystemEntry): Promise<File[]> => {
  if (isFile(entry)) {
    const file = await readFile(entry as FileSystemFileEntry)

    // for firefox to ecrase webkitRelativePath value
    return [new File([file], file.name, { type: file.type })]
  } else if (isDirectory(entry)) {
    return readDirectory(entry as FileSystemDirectoryEntry)
  } else return []
}

const dataTransferItemToFileSystemEntry = (
  item: DataTransferItemList
): FileSystemEntry[] => {
  const response: FileSystemEntry[] = []

  Array.from(item).forEach((element) => {
    const entry = element.webkitGetAsEntry && element.webkitGetAsEntry()

    if (entry) response.push(entry)
  })

  return response
}

const readItem = async (item: FileSystemEntry): Promise<File[]> => {
  if (item) {
    return readEntry(item)
  } else return []
}

const getFilesFromDataTransfer = async (
  dataTransfer: DataTransfer
): Promise<File[]> => {
  let files: File[] = []

  if (!dataTransfer) {
    throw new Error('Expect event.dataTransfer to be present')
  }

  if (dataTransfer.items) {
    const filesEntries = dataTransferItemToFileSystemEntry(dataTransfer.items)

    for (const item of Array.from(filesEntries)) {
      files = [...files, ...(await readItem(item))]
    }
  } else if (dataTransfer.files) {
    // For Safari
    for (const file of Array.from(dataTransfer.files)) {
      files.push(file)
    }
  }

  return files
}

export { getFilesFromDataTransfer }

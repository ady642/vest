import {
  FileSystemEntry,
  getFilesFromDataTransfer
} from '@/Common/helpers/dataTransferHelper'

const readFile = (fileEntry: any): Promise<File> =>
  new Promise((resolve, reject) => fileEntry.file(resolve, reject))

describe('dataTransferHelper', () => {
  test('getFilesFromDataTransfer when undefined object should throw error', async () => {
    expect(getFilesFromDataTransfer(undefined as any)).rejects.toThrow(
      new Error('Expect event.dataTransfer to be present')
    )
  })
  test('getFilesFromDataTransfer when empty files and items should return emtpy array', async () => {
    expect(await getFilesFromDataTransfer({} as any)).toStrictEqual([])
  })
  test('getFilesFromDataTransfer one file', async () => {
    const file = {
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file.txt'], 'my_file_is_awesome'))
      }
    }

    const mock_datatransfer: DataTransfer = <DataTransfer>(<unknown>{
      items: [{ webkitGetAsEntry: () => file }]
    })

    expect(await getFilesFromDataTransfer(mock_datatransfer)).toStrictEqual([
      await readFile(file)
    ])
  })

  test('getFilesFromDataTransfer multiple files', async () => {
    const file = {
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file.txt'], 'my_file_is_awesome'))
      }
    }
    const file2 = {
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(
          new File(['my_file2.txt'], 'my_file_is_awesome2', {
            type: 'text/plain'
          })
        )
      }
    }

    const mock_datatransfer: DataTransfer = <DataTransfer>(<unknown>{
      items: [
        { webkitGetAsEntry: () => file },
        { webkitGetAsEntry: () => file2 }
      ]
    })

    expect(await getFilesFromDataTransfer(mock_datatransfer)).toStrictEqual([
      await readFile(file),
      new File(['my_file2.txt'], 'my_file_is_awesome2', {
        type: 'text/plain'
      })
    ])
  })

  test('getFilesFromDataTransfer multiple folders', async () => {
    const file1_folder1 = {
      name: 'my_file_folder_1.txt',
      fullPath: '/my_file_folder_1.txt',
      isDirectory: false,
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file_folder_1.txt'], 'my_file_is_awesome'))
      }
    }
    const file2_folder1 = {
      name: 'my_file_folder_2.txt',
      fullPath: 'my_file_folder_2.txt',
      isDirectory: false,
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file_folder_2.txt'], 'my_file_is_awesome'))
      }
    }
    const folder1 = {
      isDirectory: true,
      createReader: () => {
        return {
          readEntries: (cb: (f: FileSystemEntry[]) => void) => {
            cb([file1_folder1, file2_folder1])
          }
        }
      }
    }
    const file1_folder2 = {
      name: 'my_file_folder_1.txt',
      fullPath: '/my_file_folder_1.txt',
      isDirectory: false,
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file_folder_1.txt'], 'my_file_is_awesome'))
      }
    }
    const file2_folder2 = {
      name: 'my_file_folder_2.txt',
      fullPath: 'my_file_folder_2.txt',
      isDirectory: false,
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file_folder_2.txt'], 'my_file_is_awesome'))
      }
    }
    const folder2 = {
      isDirectory: true,
      createReader: () => {
        return {
          readEntries: (cb: (f: FileSystemEntry[]) => void) => {
            cb([file1_folder2, file2_folder2])
          }
        }
      }
    }

    const mock_datatransfer: DataTransfer = <DataTransfer>(<unknown>{
      items: [
        { webkitGetAsEntry: () => folder1 },
        { webkitGetAsEntry: () => folder2 }
      ]
    })
    const res = await getFilesFromDataTransfer(mock_datatransfer)

    expect(res).toHaveLength(4)
    expect(res).toStrictEqual([
      await readFile(file1_folder1),
      await readFile(file2_folder1),
      await readFile(file1_folder2),
      await readFile(file2_folder2)
    ])
  })

  test('getFilesFromDataTransfer multiple files and folders', async () => {
    const file = {
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file.txt'], 'my_file_is_awesome'))
      }
    }
    const file2 = {
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file.txt'], 'my_file_is_awesome'))
      }
    }

    const file_folders1 = {
      name: 'my_file_folder_1.txt',
      fullPath: '/my_file_folder_1.txt',
      isDirectory: false,
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file_folder_1.txt'], 'my_file_is_awesome'))
      }
    }
    const file_folders2 = {
      name: 'my_file_folder_2.txt',
      fullPath: 'my_file_folder_2.txt',
      isDirectory: false,
      isFile: true,
      file: (cb: (f: File) => void) => {
        cb(new File(['my_file_folder_2.txt'], 'my_file_is_awesome'))
      }
    }
    const folder = {
      isDirectory: true,
      createReader: () => {
        return {
          readEntries: (cb: (f: FileSystemEntry[]) => void) => {
            cb([file_folders1, file_folders2])
          }
        }
      }
    }

    const mock_datatransfer: DataTransfer = <DataTransfer>(<unknown>{
      items: [
        { webkitGetAsEntry: () => file },
        { webkitGetAsEntry: () => file2 },
        { webkitGetAsEntry: () => folder }
      ]
    })
    const res = await getFilesFromDataTransfer(mock_datatransfer)

    expect(res).toHaveLength(4)
    expect(res).toStrictEqual([
      await readFile(file),
      await readFile(file2),
      await readFile(file_folders1),
      await readFile(file_folders2)
    ])
  })
})

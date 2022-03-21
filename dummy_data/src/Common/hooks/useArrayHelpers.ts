import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

const useArrayHelper = () => {
  const sortArrayByAlphabeticalOrder = <T, Prop extends keyof T>(
    array: T[],
    sortBy: Prop
  ): T[] => {
    if (!array) {
      return []
    }

    return array.sort((a, b) =>
      `${a[sortBy]}`.toLowerCase().localeCompare(`${b[sortBy]}`)
    )
  }

  const findDeep = (array: Folder[], id: number): Folder | undefined => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i]

      if (element.id === id) {
        return element
      }
      const found = findDeep(element.children, id)

      if (found) return found
    }
  }

  const countDeep = (array: Folder[], id: number, deep = 0): number => {
    if (array.length === 0) {
      return deep
    }
    const folder = array.find((folder) => folder.id === id)

    if (folder) {
      return deep + 1
    }
    for (let i = 0; i < array.length; i++) {
      const element = array[i]
      const found = countDeep(element.children, id, deep)

      if (found) return found + 1
    }

    return 0
  }

  const findDeepByName = (
    array: Folder[],
    name: string
  ): Folder | undefined => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i]

      if (element.name === name) {
        return element
      }
      const found = findDeepByName(element.children, name)

      if (found) return found
    }
  }

  const findDefaultUploadFolder = (array: Folder[]): Folder | undefined => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i]

      if (element.properties.defaultUpload === true) {
        return element
      }
      const found = findDefaultUploadFolder(element.children)

      if (found) return found
    }
  }

  const findShortcutFolders = (folder: Folder, acc: Folder[]): Folder[] => {
    if (folder.properties.isShortcut) {
      acc.push(folder)
    }

    for (let i = 0; i < folder.children.length; i++) {
      acc = findShortcutFolders(folder.children[i], acc)
    }

    return acc
  }

  const hasFileUploadingInIt = ({
    folderId,
    files
  }: {
    folderId: number
    files: FileUpload[]
  }) =>
    files.some(
      (file: FileUpload) =>
        file.state === StateUpload.UPLOADING && file.destination === folderId
    )

  const hasFileUploading = ({
    folders,
    files
  }: {
    folders: Folder[]
    files: FileUpload[]
  }): boolean => {
    if (files.length === 0) {
      return false
    }

    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i]

      if (hasFileUploadingInIt({ folderId: folder.id ?? 0, files })) {
        return true
      }

      if (
        hasFileUploading({
          folders: folder.children,
          files
        })
      ) {
        return true
      }
    }

    return false
  }

  const removeFolder = (array: Folder[], id: number): Folder[] => {
    const folderToDelete: Folder | undefined = findDeep(array, id)
    const parentFolderToDelete: Folder | undefined = findDeep(
      array,
      folderToDelete?.parentId ?? 0
    )

    return array.map((folder) => {
      if (folder.id === parentFolderToDelete?.id) {
        folder.setChildren(folder.children.filter((child) => child.id !== id))
      } else {
        folder.setChildren(removeFolder(folder.children, id))
      }

      return folder
    })
  }

  const removeDeepByLevel = (
    array: Folder[],
    deep: number,
    level = 0
  ): Folder[] => {
    if (array.length === 0) {
      return array
    }

    for (let i = 0; i < array.length; i++) {
      const element = array[i]

      if (level >= deep) {
        element.children = []
      }

      removeDeepByLevel(element.children, deep, level + 1)
    }

    return array
  }

  return {
    sortArrayByAlphabeticalOrder,
    findDeep,
    countDeep,
    removeDeepByLevel,
    findDefaultUploadFolder,
    hasFileUploadingInIt,
    hasFileUploading,
    removeFolder,
    findDeepByName,
    findShortcutFolders
  }
}

export default useArrayHelper

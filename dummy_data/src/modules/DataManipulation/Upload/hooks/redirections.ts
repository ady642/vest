import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import constants from '@/Common/constants'
import { ComputedRef } from '@vue/runtime-dom'

const goToDefaultFolder = (
  folderId: number,
  folders: ComputedRef<Folders>,
  callback: (defaultFolderId: number) => void
) => {
  const defaultFolder = folders.value.getDefaultUploadFolderById(folderId)

  const defaultFolderId =
    defaultFolder?.name === constants.FOLDER_DEPOT
      ? defaultFolder?.id
      : folderId

  callback(defaultFolderId ?? 0)
}

export default () => ({
  goToDefaultFolder
})

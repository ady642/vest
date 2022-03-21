import { BreadcrumbItem } from '@/Common/types/common'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { getCurrentInstance, reactive } from 'vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'

type helperInput = {
  folders?: Folders
  selectedFolder?: number
  propName?: string
}

const useBreadcrumbHelpers = (
  {
    folders = Folders.loaded([]),
    selectedFolder,
    propName = 'selectedFolder'
  }: helperInput = {} as helperInput
) => {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error(
      'useVModel must be called from the setup or lifecycle hook methods.'
    )
  }

  const getBreadcrumbItemsFormFolder = (
    folder: Folder | undefined,
    folders: Folders,
    acc: BreadcrumbItem[]
  ): BreadcrumbItem[] => {
    if (folder === undefined) {
      return acc.reverse()
    }

    acc.push({ id: folder.id ?? 0, text: folder.name })

    if (folder.parentId === null) {
      return acc.reverse()
    }

    const parent = folders.getFolderById(folder.parentId)

    return getBreadcrumbItemsFormFolder(parent, folders, acc)
  }

  const state = reactive({
    breadcrumbs: getBreadcrumbItemsFormFolder(
      folders.getFolderById(selectedFolder ?? 0),
      folders,
      []
    )
  })

  const breadcrumbsGoBackByFolderId = (id: number): void => {
    if (state.breadcrumbs.length == 0) {
      return
    }
    if (state.breadcrumbs[state.breadcrumbs.length - 1].id !== id) {
      state.breadcrumbs.pop()
      breadcrumbsGoBackByFolderId(id)
    }
  }

  const selectBreadcrumb = (id: number, emitEvent: boolean) => {
    const folder = folders.getFolderById(id)

    if (
      !state.breadcrumbs.some((breadcrumb) => breadcrumb.id === id) &&
      id !== 0
    ) {
      state.breadcrumbs.push({
        id: folder?.id ?? 0,
        text: folder?.name ?? ''
      })
    } else {
      breadcrumbsGoBackByFolderId(id)
    }
    if (emitEvent) instance.emit(`update:${propName}`, id)
  }

  const goBack = () => {
    if (state.breadcrumbs.length <= 1) {
      if (state.breadcrumbs.length !== 0) {
        state.breadcrumbs.pop()
      }
      instance.emit(`update:${propName}`, 0)
    } else {
      state.breadcrumbs.pop()
      instance.emit(
        `update:${propName}`,
        state.breadcrumbs.length > 0
          ? state.breadcrumbs[state.breadcrumbs.length - 1].id
          : 0
      )
    }
  }

  const handleClickOnBreadcrumb = ({
    id,
    breadcrumbs
  }: {
    id: number
    breadcrumbs: BreadcrumbItem[]
  }) => {
    if (id !== breadcrumbs[breadcrumbs.length - 1].id) {
      instance.emit('breadcrumb-click', id)
    }
  }

  return {
    selectBreadcrumb,
    handleClickOnBreadcrumb,
    state,
    goBack
  }
}

export default useBreadcrumbHelpers

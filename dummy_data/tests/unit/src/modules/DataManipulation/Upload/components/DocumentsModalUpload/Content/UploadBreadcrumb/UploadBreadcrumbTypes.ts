import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { BreadcrumbItem } from '@/Common/types/common'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'

export type UploadBreadcrumbProps = {
  selectedFolderToUpload: number
  disabledBreadcrumb: boolean
  folders: Folders
}

type UploadBreadcrumbSetup = {
  handleBreadcrumbFolderSelected: (id: number) => void
  breadcrumbs: BreadcrumbItem[]
  handleGoBack: () => void
  state: any
}

export type UploadBreadcrumbWrapper = VueWrapper<
  ComponentPublicInstance<UploadBreadcrumbProps, UploadBreadcrumbSetup>
>

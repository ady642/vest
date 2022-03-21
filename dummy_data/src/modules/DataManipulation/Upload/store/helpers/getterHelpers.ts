import { computed, ComputedRef } from 'vue'
import { Store } from 'vuex'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import { uploadModule } from '@/modules/DataManipulation/Upload/store'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

const selectedFolderToUpload = (
  store: Store<UploadStateInterface>
): ComputedRef<number> =>
  computed(() => store.getters[uploadModule('selectedFolderToUpload')])

const getFiles = (
  store: Store<UploadStateInterface>
): ComputedRef<FileUpload[]> =>
  computed(() => store.getters[uploadModule('files')])

const isUploading = (
  store: Store<UploadStateInterface>
): ComputedRef<boolean> =>
  computed(() => store.getters[uploadModule('isUploading')])

const hasPermissionToUploadFile = (
  store: Store<UploadStateInterface>,
  folderId: number
): boolean => store.getters[uploadModule('hasPermissionToUploadFile')](folderId)

const hasAccessDs = (store: Store<UploadStateInterface>): boolean =>
  store.getters[uploadModule('hasAccessDs')]

const gettersHelpers = (): gettersHelpersType => ({
  selectedFolderToUpload,
  getFiles,
  isUploading,
  hasPermissionToUploadFile,
  hasAccessDs
})

export type gettersHelpersType = {
  selectedFolderToUpload: (
    store: Store<UploadStateInterface>
  ) => ComputedRef<number>
  getFiles: (store: Store<UploadStateInterface>) => ComputedRef<FileUpload[]>
  isUploading: (store: Store<UploadStateInterface>) => ComputedRef<boolean>
  hasPermissionToUploadFile: (
    store: Store<UploadStateInterface>,
    folderId: number
  ) => boolean
  hasAccessDs: (store: Store<UploadStateInterface>) => boolean
}

export default gettersHelpers

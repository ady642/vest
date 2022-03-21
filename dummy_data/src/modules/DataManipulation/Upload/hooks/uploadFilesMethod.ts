import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import { useStore } from 'vuex'
import useUploadStoreHelpers from '@/modules/DataManipulation/Upload/store/helpers'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'

const useUploadFilesMethod = () => {
  const store = useStore()
  const {
    getFiles,
    setFileDestination,
    setFileState,
    selectedFolderToUpload,
    uploadDocuments
  } = useUploadStoreHelpers()

  const { fetchDocuments } = useSearchStoreHelpers()

  const handleFileUpload = async (indexes: number[]) => {
    await uploadDocuments(store, indexes)
    await fetchDocuments(store)
  }

  const prepareFileForUpload = (index: number) => {
    setFileDestination(store, {
      index,
      destinationId: selectedFolderToUpload(store).value
    })
    setFileState(store, {
      index,
      fileState: StateUpload.PENDING
    })
  }

  const uploadOneFile = async (selectedFileIndex: number) => {
    prepareFileForUpload(selectedFileIndex)

    await handleFileUpload([selectedFileIndex])
  }

  const uploadAllFilesInSameFolder = async (
    callbackBeforeUpload?: () => void
  ) => {
    const filesIndexesToUpload: number[] = []

    getFiles(store).value.forEach((file: FileUpload, index) => {
      if (file.ready()) {
        filesIndexesToUpload.push(index)
        prepareFileForUpload(index)
      }
    })

    if (callbackBeforeUpload) {
      callbackBeforeUpload()
    }

    await handleFileUpload(filesIndexesToUpload)
  }

  return {
    uploadOneFile,
    uploadAllFilesInSameFolder
  }
}

export default useUploadFilesMethod

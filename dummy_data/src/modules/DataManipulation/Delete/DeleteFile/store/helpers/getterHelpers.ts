import { Store } from 'vuex'
import { deleteFileModule } from '@/modules/DataManipulation/Delete/DeleteFile/store'
import RootStateInterface from '@/store/types/rootState'

const gettersHelpers = (
  store: Store<RootStateInterface>
): gettersHelpersType => ({
  isFileDeletable: (documentIdToDelete) =>
    store.getters['GED/DataManipulation/DeleteFile/isFileDeletable'](
      documentIdToDelete
    ),
  isFileDeleting: () => store.getters[deleteFileModule('isFileDeleting')],
  areDocumentsDeletable: (documentIds) =>
    store.getters[deleteFileModule('areDocumentsDeletable')](documentIds)
})

export type gettersHelpersType = {
  isFileDeletable: (documentIdToDelete: string) => boolean
  isFileDeleting: () => boolean
  areDocumentsDeletable: (documentIds: string[]) => boolean
}

export default gettersHelpers

import { Store } from 'vuex'
import { createFolderModule } from '@/modules/DataManipulation/Create/CreateFolder/store'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { CreateFolderQuery } from '@/modules/Search/types'

const dispatchCreateFolder = (store: Store<CreateFolderStateInterface>) => ({
  createFolderByModal: async (createFolderQuery: CreateFolderQuery) => {
    await store.dispatch(createFolderModule('CreateFolder'), createFolderQuery)
  },
  createFolderByArbo: async (createFolderQuery: CreateFolderQuery) => {
    await store.dispatch(createFolderModule('CreateFolder'), createFolderQuery)
  }
})

export type dispatchCreateFolderType = {
  createFolderByModal: (createFolderQuery: CreateFolderQuery) => Promise<void>
  createFolderByArbo: (createFolderQuery: CreateFolderQuery) => Promise<void>
}

export default dispatchCreateFolder

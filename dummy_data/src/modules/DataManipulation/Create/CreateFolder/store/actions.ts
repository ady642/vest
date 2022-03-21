import { ActionContext } from 'vuex'
import { SET_IS_FOLDER_CREATING } from '@/modules/DataManipulation/Create/CreateFolder/store/mutations'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import CreateFolderServices from '@/modules/DataManipulation/Create/CreateFolder/services'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { CreateFolderQuery } from '@/modules/Search/types'
import { PUSH_FOLDER } from '@/modules/Search/store/mutations'

import RootStateInterface from '@/store/types/rootState'
import { searchModule } from '@/modules/Search/store'
import FolderExistsError from '@/Common/errors/FolderExistsError'

const CreateFolder = async (
  {
    rootState,
    commit,
    rootGetters
  }: Omit<
    ActionContext<CreateFolderStateInterface, RootStateInterface>,
    'getters' | 'dispatch' | 'state'
  >,
  createFolderQuery: CreateFolderQuery
): Promise<void> => {
  try {
    const parentFolder: Folder = rootGetters[
      searchModule('folders')
    ].getFolderById(createFolderQuery.targetFolder)

    if (parentFolder?.hasChildrenByName(createFolderQuery.folderName.trim())) {
      throw new FolderExistsError()
    }

    commit(SET_IS_FOLDER_CREATING, true)
    createFolderQuery.accountNumber = rootState.app.account.AccountId

    const { data: category } = await CreateFolderServices.CreateFolder(
      createFolderQuery
    )

    commit(searchModule(PUSH_FOLDER), new Folder(category), { root: true })
  } finally {
    commit(SET_IS_FOLDER_CREATING, false)
  }
}

export default {
  CreateFolder
}

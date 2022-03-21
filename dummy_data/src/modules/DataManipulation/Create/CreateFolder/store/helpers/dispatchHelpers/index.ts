import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import dispatchCreateFolder, {
  dispatchCreateFolderType
} from '@/modules/DataManipulation/Create/CreateFolder/store/helpers/dispatchHelpers/dispatchCreateFolder'
import { Store } from 'vuex'

const dispatchHelpers = (
  store: Store<CreateFolderStateInterface>
): dispatchHelpersType => ({
  ...dispatchCreateFolder(store)
})

export type dispatchHelpersType = dispatchCreateFolderType
export default dispatchHelpers

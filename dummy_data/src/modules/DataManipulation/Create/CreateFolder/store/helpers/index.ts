import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import dispatchHelpers, {
  dispatchHelpersType
} from '@/modules/DataManipulation/Create/CreateFolder/store/helpers/dispatchHelpers'
import { Store } from 'vuex'
import getterHelpers, {
  gettersHelpersType
} from '@/modules/DataManipulation/Create/CreateFolder/store/helpers/gettersHelper'

type useCreateFoldersHelpersInterface = gettersHelpersType & dispatchHelpersType

const useCreateFolderModule = (
  store: Store<CreateFolderStateInterface>
): useCreateFoldersHelpersInterface => ({
  ...dispatchHelpers(store),
  ...getterHelpers(store)
})

export default useCreateFolderModule

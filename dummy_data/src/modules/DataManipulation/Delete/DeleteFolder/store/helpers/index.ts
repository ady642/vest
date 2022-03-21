import getterHelpers, {
  gettersHelpersType
} from '@/modules/DataManipulation/Delete/DeleteFolder/store/helpers/getterHelpers.ts'
import dispatchHelpers, {
  dispatchHelpersType
} from '@/modules/DataManipulation/Delete/DeleteFolder/store/helpers/dispatchHelpers'
import { Store } from 'vuex'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'

type useSearchStoreHelpersInterface = gettersHelpersType & dispatchHelpersType

const useDeleteFolderHelpers = (
  store: Store<DeleteFoldersStateInterface>
): useSearchStoreHelpersInterface => ({
  ...getterHelpers(store),
  ...dispatchHelpers(store)
})

export default useDeleteFolderHelpers

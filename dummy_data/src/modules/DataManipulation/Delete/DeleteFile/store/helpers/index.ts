import getterHelpers, {
  gettersHelpersType
} from '@/modules/DataManipulation/Delete/DeleteFile/store/helpers/getterHelpers'
import dispatchHelpers, {
  dispatchHelpersType
} from '@/modules/DataManipulation/Delete/DeleteFile/store/helpers/dispatchHelpers'
import { Store } from 'vuex'
import RootStateInterface from '@/store/types/rootState'

type useSearchStoreHelpersInterface = gettersHelpersType & dispatchHelpersType

const useDeleteFileHelpers = (
  store: Store<RootStateInterface>
): useSearchStoreHelpersInterface => ({
  ...getterHelpers(store),
  ...dispatchHelpers(store)
})

export default useDeleteFileHelpers

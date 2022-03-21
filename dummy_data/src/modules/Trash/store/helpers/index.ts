import dispatchHelpers, {
  dispatchHelpersType
} from '@/modules/Trash/store/helpers/dispatchHelpers'
import getterHelpers, {
  gettersHelpersType
} from '@/modules/Trash/store/helpers/gettersHelper'
import RootStateInterface from '@/store/types/rootState'
import { Store } from 'vuex'

type useTrashsHelpersInterface = gettersHelpersType & dispatchHelpersType

const useTrashModule = (
  store: Store<RootStateInterface>
): useTrashsHelpersInterface => ({
  ...dispatchHelpers(store),
  ...getterHelpers(store)
})

export default useTrashModule

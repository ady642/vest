import getterHelpers, {
  gettersHelpersType
} from '@/modules/Search/store/helpers/getterHelpers'
import dispatchHelpers, {
  dispatchHelpersType
} from '@/modules/Search/store/helpers/dispatchHelpers'
import subscriptionHelpers, {
  subscriptionHelpersType
} from '@/modules/Search/store/helpers/subscriptionHelpers'

type useSearchStoreHelpersInterface = gettersHelpersType &
  dispatchHelpersType &
  subscriptionHelpersType

const useSearchStoreHelpers = (): useSearchStoreHelpersInterface => ({
  ...getterHelpers(),
  ...dispatchHelpers(),
  ...subscriptionHelpers()
})

export default useSearchStoreHelpers

import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'
import dispatchHelpers, {
  dispatchHelpersType
} from '@/modules/DataManipulation/MailToGed/store/helpers/dispatchHelper'
import { Store } from 'vuex'
import getterHelpers, {
  gettersHelpersType
} from '@/modules/DataManipulation/MailToGed/store/helpers/gettersHelper'

type useMailToGedHelpersInterface = gettersHelpersType & dispatchHelpersType

const useMailToGedModule = (
  store: Store<MailToGedStateInterface>
): useMailToGedHelpersInterface => ({
  ...dispatchHelpers(store),
  ...getterHelpers(store)
})

export default useMailToGedModule

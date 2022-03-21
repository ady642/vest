import { Store } from 'vuex'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'
import { MailToGedModule } from '@/modules/DataManipulation/MailToGed/store'

const dispatchHelpers = (
  store: Store<MailToGedStateInterface>
): dispatchHelpersType => ({
  GetMailToGedInformations: async () => {
    await store.dispatch(MailToGedModule('GetMailToGedInformations'))
  }
})

export type dispatchHelpersType = {
  GetMailToGedInformations: () => Promise<void>
}

export default dispatchHelpers

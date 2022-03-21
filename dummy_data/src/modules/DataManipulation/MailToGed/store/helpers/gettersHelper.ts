import { Store } from 'vuex'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'
import { MailToGedModule } from '@/modules/DataManipulation/MailToGed/store'
import { computed, ComputedRef } from 'vue'
import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'

const gettersHelpers = (
  store: Store<MailToGedStateInterface>
): gettersHelpersType => ({
  mailToGedInformations: computed(
    () => store.getters[MailToGedModule('mailToGedInformations')]
  )
})

export type gettersHelpersType = {
  mailToGedInformations: ComputedRef<MailToGedInformations>
}

export default gettersHelpers

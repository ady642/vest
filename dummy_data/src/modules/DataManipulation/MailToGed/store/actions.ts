import { ActionContext } from 'vuex'
import MailToGedServices from '@/modules/DataManipulation/MailToGed/services'
import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'
import RootStateInterface from '@/store/types/rootState'
import { SET_MAIL_TO_GED_INFORMATIONS } from './mutations'
import { MailToGedStateInterface } from './state'

const GetMailToGedInformations = async ({
  rootState,
  commit
}: Omit<
  ActionContext<MailToGedStateInterface, RootStateInterface>,
  'getters' | 'dispatch' | 'state' | 'rootGetters'
>): Promise<void> => {
  try {
    commit(SET_MAIL_TO_GED_INFORMATIONS, MailToGedInformations.loading())
    const { data: payload } = await MailToGedServices.GetMailToGedInformations(
      rootState.app.account.AccountId
    )

    commit(SET_MAIL_TO_GED_INFORMATIONS, MailToGedInformations.loaded(payload))
  } catch {
    commit(SET_MAIL_TO_GED_INFORMATIONS, MailToGedInformations.errored())
  }
}

export default {
  GetMailToGedInformations
}

import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'
import { MailToGedStateInterface } from './state'

export const SET_MAIL_TO_GED_INFORMATIONS = 'SET_MAIL_TO_GED_INFORMATIONS'

export default {
  [SET_MAIL_TO_GED_INFORMATIONS](
    state: MailToGedStateInterface,
    payload: MailToGedInformations
  ): void {
    state.mailToGedInformations = payload
  }
}

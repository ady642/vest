import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'
export interface MailToGedStateInterface {
  mailToGedInformations: MailToGedInformations
}

const state: MailToGedStateInterface = {
  mailToGedInformations: MailToGedInformations.loading()
}

export default state

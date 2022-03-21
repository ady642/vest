import { MailToGedStateInterface } from './state'
import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'

const mailToGedInformations = (
  state: MailToGedStateInterface
): MailToGedInformations => state.mailToGedInformations

export default {
  mailToGedInformations
}

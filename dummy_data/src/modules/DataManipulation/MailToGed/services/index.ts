import { api, apiResponse } from '@kpmg/mypulse-shared-dependencies'
import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'

const GetMailToGedInformations = async (
  accountNumber: string
): Promise<apiResponse<MailToGedInformations>> => {
  return await api.ds.get(`/${accountNumber}/mail2ged/informations`)
}

export default {
  GetMailToGedInformations
}

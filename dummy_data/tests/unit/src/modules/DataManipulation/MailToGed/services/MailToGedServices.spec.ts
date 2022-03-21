import { api } from '@kpmg/mypulse-shared-dependencies'
import MailToGedServices from '@/modules/DataManipulation/MailToGed/services'

describe('MailToGedServices', () => {
  test('GetMailToGedInformations', () => {
    MailToGedServices.GetMailToGedInformations('123456')

    expect(api.ds.get).toHaveBeenCalledWith('/123456/mail2ged/informations')
  })
})

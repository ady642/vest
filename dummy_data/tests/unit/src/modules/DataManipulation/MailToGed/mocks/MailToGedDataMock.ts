import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'

const useMailToGedData = () => {
  const MailToGedData = new MailToGedInformations(
    [
      {
        label: 'Comptabilité - Dépôt',
        emailAddress: '1000265308-1566-DP@rec.gedkpmg.fr'
      }
    ],
    'https://www.kpmg.fr/mailtoged',
    'loaded'
  )

  return {
    MailToGedData
  }
}

export default useMailToGedData

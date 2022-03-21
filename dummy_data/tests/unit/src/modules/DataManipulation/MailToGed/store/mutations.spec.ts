import {
  MailToGedInformations,
  MailToGedInformationsItem
} from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'
import mutations, {
  SET_MAIL_TO_GED_INFORMATIONS
} from '@/modules/DataManipulation/MailToGed/store/mutations'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'

describe('MailToGed mutations', () => {
  it('SET_MAIL_TO_GED_INFORMATIONS', () => {
    const state = {
      mailToGedInformations: MailToGedInformations.errored()
    } as MailToGedStateInterface

    // When the SET_SELECTED_FOLDER_TO_UPLOAD mutation is called
    mutations[SET_MAIL_TO_GED_INFORMATIONS](
      state,
      MailToGedInformations.loaded({
        items: [
          {
            label: 'test',
            emailAddress: 'test@text.fr'
          } as MailToGedInformationsItem,
          {
            label: 'test2',
            emailAddress: 'test2@text.fr'
          } as MailToGedInformationsItem
        ],
        moreInformationLink: 'test.Fr'
      } as MailToGedInformations)
    )

    // Then selectedFolderToUpload state must be equal to payload
    expect(state.mailToGedInformations.state).toEqual('loaded')
    expect(state.mailToGedInformations.moreInformationLink).toEqual('test.Fr')
    expect(state.mailToGedInformations.items).toEqual([
      {
        label: 'test',
        emailAddress: 'test@text.fr'
      } as MailToGedInformationsItem,
      {
        label: 'test2',
        emailAddress: 'test2@text.fr'
      } as MailToGedInformationsItem
    ])
  })
})

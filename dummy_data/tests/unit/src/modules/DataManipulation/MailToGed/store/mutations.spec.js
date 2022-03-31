"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MailToGedInformations_1 = require("@/modules/DataManipulation/MailToGed/models/MailToGedInformations");
const mutations_1 = require("@/modules/DataManipulation/MailToGed/store/mutations");
describe('MailToGed mutations', () => {
    it('SET_MAIL_TO_GED_INFORMATIONS', () => {
        const state = {
            mailToGedInformations: MailToGedInformations_1.MailToGedInformations.errored()
        };
        // When the SET_SELECTED_FOLDER_TO_UPLOAD mutation is called
        mutations_1.default[mutations_1.SET_MAIL_TO_GED_INFORMATIONS](state, MailToGedInformations_1.MailToGedInformations.loaded({
            items: [
                {
                    label: 'test',
                    emailAddress: 'test@text.fr'
                },
                {
                    label: 'test2',
                    emailAddress: 'test2@text.fr'
                }
            ],
            moreInformationLink: 'test.Fr'
        }));
        // Then selectedFolderToUpload state must be equal to payload
        expect(state.mailToGedInformations.state).toEqual('loaded');
        expect(state.mailToGedInformations.moreInformationLink).toEqual('test.Fr');
        expect(state.mailToGedInformations.items).toEqual([
            {
                label: 'test',
                emailAddress: 'test@text.fr'
            },
            {
                label: 'test2',
                emailAddress: 'test2@text.fr'
            }
        ]);
    });
});
//# sourceMappingURL=mutations.spec.js.map
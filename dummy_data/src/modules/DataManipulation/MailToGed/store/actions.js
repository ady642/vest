"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/modules/DataManipulation/MailToGed/services");
const MailToGedInformations_1 = require("@/modules/DataManipulation/MailToGed/models/MailToGedInformations");
const mutations_1 = require("./mutations");
const GetMailToGedInformations = async ({ rootState, commit }) => {
    try {
        commit(mutations_1.SET_MAIL_TO_GED_INFORMATIONS, MailToGedInformations_1.MailToGedInformations.loading());
        const { data: payload } = await services_1.default.GetMailToGedInformations(rootState.app.account.AccountId);
        commit(mutations_1.SET_MAIL_TO_GED_INFORMATIONS, MailToGedInformations_1.MailToGedInformations.loaded(payload));
    }
    catch {
        commit(mutations_1.SET_MAIL_TO_GED_INFORMATIONS, MailToGedInformations_1.MailToGedInformations.errored());
    }
};
exports.default = {
    GetMailToGedInformations
};
//# sourceMappingURL=actions.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MailToGedInformations_1 = require("@/modules/DataManipulation/MailToGed/models/MailToGedInformations");
const useMailToGedData = () => {
    const MailToGedData = new MailToGedInformations_1.MailToGedInformations([
        {
            label: 'Comptabilité - Dépôt',
            emailAddress: '1000265308-1566-DP@rec.gedkpmg.fr'
        }
    ], 'https://www.kpmg.fr/mailtoged', 'loaded');
    return {
        MailToGedData
    };
};
exports.default = useMailToGedData;
//# sourceMappingURL=MailToGedDataMock.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
const services_1 = require("@/modules/DataManipulation/MailToGed/services");
describe('MailToGedServices', () => {
    test('GetMailToGedInformations', () => {
        services_1.default.GetMailToGedInformations('123456');
        expect(mypulse_shared_dependencies_1.api.ds.get).toHaveBeenCalledWith('/123456/mail2ged/informations');
    });
});
//# sourceMappingURL=MailToGedServices.spec.js.map
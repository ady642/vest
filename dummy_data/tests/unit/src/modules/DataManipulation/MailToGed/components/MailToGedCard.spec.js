"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MailToGedCard_vue_1 = require("@/modules/DataManipulation/MailToGed/components/MailToGedCard.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = () => (0, wrapperFactory_1.default)(MailToGedCard_vue_1.default, {
    global: {
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
describe('MailToGedCard', () => {
    it('When click on mpcard emit evnet', () => {
        const wrapper = createWrapper();
        wrapper.find('mp-card').trigger('click');
        expect(wrapper.emitted()['open-mail-to-ged']).toBeTruthy();
    });
});
//# sourceMappingURL=MailToGedCard.spec.js.map
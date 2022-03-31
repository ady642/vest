"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoDate_vue_1 = require("@/Common/components/Dates/NattoDate.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createWrapper = ({ date = '', format = '' } = {}) => (0, wrapperFactory_1.default)(NattoDate_vue_1.default, {
    props: { date, format }
});
let wrapper = createWrapper();
describe('NattoDate', () => {
    describe('rendering', () => {
        it('should render the date formatted', () => {
            wrapper = createWrapper({
                date: '2019-01-19T10:00:00+00:00',
                format: 'DD MMMM YYYY'
            });
            expect(wrapper.html()).toContain('19 janvier 2019');
        });
    });
});
//# sourceMappingURL=NattoDate.spec.js.map
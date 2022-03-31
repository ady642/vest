"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useDates_1 = require("@/Common/hooks/useDates");
describe('useDates', () => {
    test('format function', () => {
        const { format } = (0, useDates_1.default)();
        const date = '2019-05-19T10:00:00+00:00';
        const formattedDate = format(date, 'DD MMMM YYYY');
        expect(formattedDate).toBe('19 mai 2019');
    });
});
//# sourceMappingURL=useDates.spec.js.map
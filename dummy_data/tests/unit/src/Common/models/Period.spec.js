"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Period_1 = require("@/Common/models/List/Period");
describe('Period', () => {
    it('constructor with values', () => {
        const myPeriod = new Period_1.default({
            startDate: '2019-01-19T10:00:00+00:00',
            endDate: '2019-03-19T10:00:00+00:00'
        });
        expect(myPeriod.startDate).toBe('2019-01-19T10:00:00+00:00');
        expect(myPeriod.endDate).toBe('2019-03-19T10:00:00+00:00');
    });
    it('default constructor', () => {
        const myPeriod = new Period_1.default();
        expect(myPeriod.startDate).toBe('');
        expect(myPeriod.endDate).toBe('');
    });
});
//# sourceMappingURL=Period.spec.js.map
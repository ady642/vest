"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useNavigator_1 = require("@/Common/hooks/useNavigator");
const { getQuery } = (0, useNavigator_1.default)();
describe('useNavigator', () => {
    it('shoul get the query pass in param', () => {
        expect(getQuery('folderId')).toBe(99);
    });
});
//# sourceMappingURL=useNavigator.spec.js.map
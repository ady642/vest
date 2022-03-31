"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = require("@/modules/Search/routes/guards");
let to = {};
const from = {};
const next = jest.fn();
describe('route guards', () => {
    it('Should redirect in MainView if folderId is not defined', () => {
        (0, guards_1.hasFolderSelected)(to, from, next);
        expect(next).toHaveBeenCalledWith({ name: 'MainView' });
    });
    it('Should not redirect in MainView if folderId is defined', () => {
        to = {
            name: 'Main',
            query: { folderId: '99' }
        };
        (0, guards_1.hasFolderSelected)(to, from, next);
        expect(next).toHaveBeenCalledWith();
    });
});
//# sourceMappingURL=guard.spec.js.map
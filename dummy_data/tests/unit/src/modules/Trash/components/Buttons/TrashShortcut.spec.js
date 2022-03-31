"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TrashShortcut_vue_1 = require("@/modules/Trash/components/Shortcuts/TrashShortcut.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoShortcutCard_vue_1 = require("@/Common/components/Cards/NattoShortcutCard.vue");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const routerMock = mypulse_shared_dependencies_1.router;
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const createWrapper = (store = storeMock) => (0, wrapperFactory_1.default)(TrashShortcut_vue_1.default, {
    global: {
        plugins: [store, routerMock],
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
const findNattoShortcutCard = (wrapper) => wrapper.findComponent(NattoShortcutCard_vue_1.default);
let wrapper = createWrapper();
let nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
describe('TrashShortcut', () => {
    beforeEach(async () => {
        wrapper = createWrapper();
        nattoShortcutCardWrapper = findNattoShortcutCard(wrapper);
        routerMock.push = jest.fn();
        storeMock.dispatch = jest.fn();
    });
    describe('binding with NattoShortcutCard', () => {
        it('props bindings', () => {
            expect(nattoShortcutCardWrapper.props('prependIcon')).toBe('file');
            expect(nattoShortcutCardWrapper.props('text')).toBe('ged.documents with 1905');
            expect(nattoShortcutCardWrapper.props('type')).toBe('danger');
        });
        describe('events', () => {
            it('Should go to trash view when shortcut card emit click', async () => {
                await nattoShortcutCardWrapper.vm.$emit('click');
                expect(routerMock.push).toHaveBeenCalledWith({ name: 'TrashView' });
            });
            it('Should dispatch fetchTrashDocumentsTotalCount onBeforeMount', async () => {
                wrapper = createWrapper();
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Trash/fetchTrashDocumentsTotalCount');
            });
        });
    });
});
//# sourceMappingURL=TrashShortcut.spec.js.map
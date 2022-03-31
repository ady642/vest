"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const TrashHeaderBackButton_vue_1 = require("@/modules/Trash/components/Header/TrashHeaderBackButton.vue");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const TrashViewHeader_vue_1 = require("@/modules/Trash/components/Header/TrashViewHeader.vue");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn(),
    pageViewFactory: jest.fn()
}));
const routerMock = mypulse_shared_dependencies_1.router;
const mainStoreMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const createWrapper = (store = mainStoreMock) => (0, wrapperFactory_1.default)(TrashViewHeader_vue_1.default, {
    global: {
        stubs: {
            TrashHeaderBackButton: TrashHeaderBackButton_vue_1.default
        },
        plugins: [store],
        mocks: {
            $t: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let wrapper = createWrapper();
describe('TrashViewHeader', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        routerMock.push = jest.fn();
    });
    describe('binding', () => {
        describe('events', () => {
            it('Should emit trash-back-click when back button is clicked ', async () => {
                const TrashHeaderBackButtonWrapper = wrapper.findComponent(TrashHeaderBackButton_vue_1.default);
                await TrashHeaderBackButtonWrapper.vm.$emit('click');
                await wrapper.vm.$nextTick();
                expect(routerMock.push).toHaveBeenCalledWith({
                    name: 'MainView'
                });
            });
        });
    });
});
//# sourceMappingURL=TrashViewHeader.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const InProgressPopup_vue_1 = require("@/modules/Trash/components/Notification/Elements/InProgressPopup.vue");
const translationHelper = require("@/Common/hooks/useTranslation");
const defaultProps = {
    total: 1,
    running: 1
};
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const createWrapper = (store = storeMock, props = defaultProps) => (0, wrapperFactory_1.default)(InProgressPopup_vue_1.default, {
    props: props,
    global: {
        plugins: [store],
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let tMock = jest.fn();
let tcMock = jest.fn();
jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
    t: tMock,
    tc: tcMock
});
let wrapper = createWrapper();
describe('InProgressPopupPopup', () => {
    beforeEach(async () => {
        wrapper = createWrapper();
        storeMock.dispatch = jest.fn();
        tMock = jest.fn();
        tcMock = jest.fn();
        jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
            t: tMock,
            tc: tcMock
        });
    });
    describe('binding', () => {
        describe('props', () => {
            const cases = [
                { prop: 'total', expected: 1 },
                { prop: 'running', expected: 1 }
            ];
            test.each(cases)('Should bind component props correctly', ({ prop, expected }) => {
                expect(wrapper.props(prop)).toEqual(expected);
            });
        });
    });
});
//# sourceMappingURL=InProgressPopup.spec.js.map
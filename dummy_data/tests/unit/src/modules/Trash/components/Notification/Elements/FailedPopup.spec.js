"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const FailedPopup_vue_1 = require("@/modules/Trash/components/Notification/Elements/FailedPopup.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const translationHelper = require("@/Common/hooks/useTranslation");
const defaultProps = {
    canceled: 0,
    errored: 2
};
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const createWrapper = (store = storeMock, props = defaultProps) => (0, wrapperFactory_1.default)(FailedPopup_vue_1.default, {
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
describe('FailedPopup', () => {
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
                { prop: 'canceled', expected: 0 },
                { prop: 'errored', expected: 2 }
            ];
            test.each(cases)('Should bind component props correctly', ({ prop, expected }) => {
                expect(wrapper.props(prop)).toEqual(expected);
            });
        });
        describe('events', () => {
            it('Should trigger close event ', async () => {
                const btn = wrapper.find('.close-icon');
                await btn.trigger('click');
                expect(wrapper.emitted('close')).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=FailedPopup.spec.js.map
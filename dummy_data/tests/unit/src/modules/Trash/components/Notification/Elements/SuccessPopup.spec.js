"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const SuccessPopup_vue_1 = require("@/modules/Trash/components/Notification/Elements/SuccessPopup.vue");
const translationHelper = require("@/Common/hooks/useTranslation");
const useStyleguideStubs_1 = require("../../../../../../utils/useStyleguideStubs");
const defaultProps = {
    successed: 1,
    fileName: 'file_test.txt'
};
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const { MpButton } = (0, useStyleguideStubs_1.default)();
const createWrapper = (store = storeMock, props = defaultProps) => (0, wrapperFactory_1.default)(SuccessPopup_vue_1.default, {
    props: props,
    global: {
        plugins: [store],
        stubs: {
            MpButton
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
describe('SuccessPopup', () => {
    beforeEach(() => {
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
                { prop: 'successed', expected: 1 },
                { prop: 'fileName', expected: 'file_test.txt' }
            ];
            test.each(cases)('Should bind component props correctly', ({ prop, expected }) => {
                expect(wrapper.props(prop)).toEqual(expected);
            });
        });
        describe('events', () => {
            it('Should trigger redirect-to-location event ', async () => {
                const btn = wrapper.find('.go-to-destination-cta');
                await btn.trigger('click');
                expect(wrapper.emitted('redirect-to-location')).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=SuccessPopup.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("@vue/test-utils");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const MailToGedLine_vue_1 = require("@/modules/DataManipulation/MailToGed/components/Elements/MailToGedLine.vue");
const defaultProps = {
    folderName: 'folder 1',
    folderEmail: 'email'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(MailToGedLine_vue_1.default, {
    props,
    global: {
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let wrapper = createWrapper();
describe('MailToGedLine', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should bind correctly , folderName', () => {
                expect(wrapper.props('folderName')).toEqual(defaultProps.folderName);
            });
            it('Should bind correctly , folderEmail', () => {
                expect(wrapper.props('folderEmail')).toEqual(defaultProps.folderEmail);
            });
        });
        describe('rendering', () => {
            describe('should render the right text', () => {
                const cases = [
                    {
                        button: '.copy-address-btn',
                        expectedValue: 'ged.dataManipulation.mailToGed.Modal.buttons.copyAddress'
                    },
                    {
                        button: '.send-email-btn',
                        expectedValue: 'ged.dataManipulation.mailToGed.Modal.buttons.sendEmail'
                    }
                ];
                test.each(cases)('Test button text', ({ button, expectedValue }) => {
                    const ButtonWrapper = wrapper.find(button);
                    expect(ButtonWrapper.text()).toContain(expectedValue);
                });
            });
        });
        describe('events', () => {
            it('Should copy value to clipboard when user click copy button', async () => {
                let copiedText = '';
                jest.useFakeTimers();
                jest.spyOn(global, 'setTimeout');
                Object.assign(navigator, {
                    clipboard: {
                        writeText: (x) => {
                            copiedText = x;
                        }
                    }
                });
                jest.spyOn(navigator.clipboard, 'writeText');
                const copyAddressButton = wrapper.find('.copy-address-btn');
                expect(copyAddressButton.text()).toBe('ged.dataManipulation.mailToGed.Modal.buttons.copyAddress');
                copyAddressButton.trigger('click');
                await (0, test_utils_1.flushPromises)();
                expect(copiedText).toBe('email');
                expect(navigator.clipboard.writeText).toBeCalledTimes(1);
                expect(setTimeout).toBeCalledTimes(1);
                expect(setTimeout).toBeCalledWith(expect.any(Function), 500);
                expect(copyAddressButton.text()).toBe('ged.dataManipulation.mailToGed.Modal.buttons.addressCopied');
                jest.runAllTimers();
                await (0, test_utils_1.flushPromises)();
                expect(copyAddressButton.text()).toBe('ged.dataManipulation.mailToGed.Modal.buttons.copyAddress');
            });
        });
    });
});
//# sourceMappingURL=MailToGedLine.spec.js.map
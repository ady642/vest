"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const MailToGedModal_vue_1 = require("@/modules/DataManipulation/MailToGed/components/Modals/MailToGedModal.vue");
const MailToGedDataMock_1 = require("dummy_data/tests/unit/src/modules/DataManipulation/MailToGed/mocks/MailToGedDataMock");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const MailToGedLine_vue_1 = require("@/modules/DataManipulation/MailToGed/components/Elements/MailToGedLine.vue");
const defaultProps = {
    title: 'some title',
    description: 'some description',
    mailToGedInfos: (0, MailToGedDataMock_1.default)().MailToGedData
};
const { ElDialog } = (0, useElementStubs_1.default)();
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(MailToGedModal_vue_1.default, {
    props,
    global: {
        stubs: {
            ElDialog,
            MailToGedLine: MailToGedLine_vue_1.default
        },
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
        describe('binding with MailToGedLine', () => {
            describe('props', () => {
                const cases = [
                    {
                        prop: 'folderName',
                        expectedValue: defaultProps.mailToGedInfos.items[0].label
                    },
                    {
                        prop: 'folderEmail',
                        expectedValue: defaultProps.mailToGedInfos.items[0].emailAddress
                    }
                ];
                test.each(cases)('Test binding props', ({ prop, expectedValue }) => {
                    const MailToGedLineWrapper = wrapper.findComponent(MailToGedLine_vue_1.default);
                    expect(MailToGedLineWrapper.props(prop)).toEqual(expectedValue);
                });
            });
        });
        describe('events', () => {
            it('Should emit more-info on more info link click', async () => {
                const MoreInfoLinkWrapper = wrapper.find('.more-info');
                await MoreInfoLinkWrapper.trigger('click');
                await wrapper.vm.$nextTick();
                expect(wrapper.emitted('more-info')).toHaveLength(1);
                expect(wrapper.emitted('more-info')).toStrictEqual([
                    [defaultProps.mailToGedInfos.moreInformationLink]
                ]);
            });
            it('Should emit close event on close btn cllick', async () => {
                const CloseBtnWrapper = wrapper.find('.close-modal-btn');
                await CloseBtnWrapper.trigger('click');
                await wrapper.vm.$nextTick();
                expect(wrapper.emitted('close')).toBeTruthy();
            });
        });
        describe('rendering', () => {
            const cases = [
                {
                    element: '.title-mailToGed',
                    expectedValue: 'ged.dataManipulation.mailToGed.Modal.title'
                },
                {
                    element: '.description-mailToGedd',
                    expectedValue: 'ged.dataManipulation.mailToGed.Modal.description'
                },
                {
                    element: '.close-modal-btn',
                    expectedValue: 'ged.dataManipulation.mailToGed.Modal.buttons.close'
                }
            ];
            test.each(cases)('Test content rendering', ({ element, expectedValue }) => {
                const ElementWrapper = wrapper.find(element);
                expect(ElementWrapper.text()).toContain(expectedValue);
            });
        });
    });
});
//# sourceMappingURL=MailToGedModal.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FailedUploadPopup_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/FailedUploadPopup.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const translationHelper = require("@/Common/hooks/useTranslation");
const { MpButton } = (0, useStyleguideStubs_1.default)();
const createWrapper = ({ canceled, errored, successed }) => (0, wrapperFactory_1.default)(FailedUploadPopup_vue_1.default, {
    propsData: {
        canceled,
        errored,
        successed
    },
    global: {
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
describe('FailedUploadPopup', () => {
    beforeEach(() => {
        tMock = jest.fn();
        tcMock = jest.fn();
        jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
            t: tMock,
            tc: tcMock
        });
    });
    describe('rendering', () => {
        it('When all values > 0(plural) should display correct message', async () => {
            const wrapper = createWrapper({ canceled: 9, errored: 5, successed: 10 });
            const pWrapper = wrapper.find('.sub-description');
            expect(pWrapper.text()).toBe('10 fichiers déposés correctement, 5 fichiers en erreur et 9 fichiers abandonnés');
        });
        it('When all values == 1 (singular) should display correct message', async () => {
            const wrapper = createWrapper({
                canceled: 1,
                errored: 1,
                successed: 1
            });
            const pWrapper = wrapper.find('.sub-description');
            expect(pWrapper.text()).toBe('1 fichier déposé correctement, 1 fichier en erreur et 1 fichier abandonné');
        });
        it('When canceled==0 should not display cancel messages', async () => {
            const wrapper = createWrapper({
                canceled: 0,
                errored: 5,
                successed: 10
            });
            const pWrapper = wrapper.find('.sub-description');
            expect(pWrapper.text()).toBe('10 fichiers déposés correctement et 5 fichiers en erreur');
        });
        it('When errored==0 should not display errored messages', async () => {
            const wrapper = createWrapper({
                canceled: 9,
                errored: 0,
                successed: 10
            });
            const pWrapper = wrapper.find('.sub-description');
            expect(pWrapper.text()).toBe('10 fichiers déposés correctement et 9 fichiers abandonnés');
        });
        it('When successed==0 should not display successed messages', async () => {
            const wrapper = createWrapper({
                canceled: 9,
                errored: 5,
                successed: 0
            });
            const pWrapper = wrapper.find('.sub-description');
            expect(pWrapper.text()).toBe('5 fichiers en erreur et 9 fichiers abandonnés');
        });
        it('When only one value should display correct message', async () => {
            const wrapper = createWrapper({
                canceled: 9,
                errored: 0,
                successed: 0
            });
            const pWrapper = wrapper.find('.sub-description');
            expect(pWrapper.text()).toBe('9 fichiers abandonnés');
        });
    });
    describe('events', () => {
        it('Should trigger openUploadModal event ', async () => {
            const wrapper = createWrapper({
                canceled: 9,
                errored: 5,
                successed: 10
            });
            const btn = wrapper.find('.open-upload-modal-cta');
            await btn.trigger('click');
            expect(wrapper.emitted('openUploadModal')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=FailedUploadPopup.spec.js.map
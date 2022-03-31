"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentDownloadTab_vue_1 = require("@/modules/Search/components/Drawer/DocumentDownloadTab.vue");
const NattoDate_vue_1 = require("@/Common/components/Dates/NattoDate.vue");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const document = new Document_1.default();
document.id = 'columbo';
document.name = 'test';
document.type = '.pdf';
document.creationDate = '2018-05-27';
const defaultProps = {
    document
};
const { MpButton } = (0, useStyleguideStubs_1.default)();
const createWrapper = ({ props = defaultProps, store = (0, storeMock_1.createSearchStoreMocked)() } = {}) => (0, wrapperFactory_1.default)(DocumentDownloadTab_vue_1.default, {
    props,
    global: {
        plugins: [store],
        stubs: { NattoDate: NattoDate_vue_1.default, MpButton },
        renderStubDefaultSlot: true
    }
});
let wrapper = createWrapper();
describe('DocumentDownloadTab', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with NattoDate', () => {
        it('Should bind document prop correctly', async () => {
            const Date = wrapper.findComponent(NattoDate_vue_1.default);
            expect(Date.props('date')).toEqual('2018-05-27');
        });
    });
    describe('bindings with MpButton', () => {
        describe('events', () => {
            it('should emit download-clicked when the button is clicked', async () => {
                await (0, finders_1.findMpButton)(wrapper).vm.$emit('click');
                expect(wrapper.emitted('download-clicked')).toHaveLength(1);
            });
        });
        describe('rendering', () => {
            it.each([
                { isDownloading: false, isLoadingIconExists: false },
                { isDownloading: true, isLoadingIconExists: true }
            ])('should display loadingIcon only if downloading', ({ isLoadingIconExists, isDownloading }) => {
                wrapper = createWrapper({
                    store: (0, storeMock_1.createSearchStoreMocked)({
                        isDownloading
                    })
                });
                expect((0, finders_1.findLoadingIcon)(wrapper).exists()).toBe(isLoadingIconExists);
            });
        });
    });
});
//# sourceMappingURL=DocumentDownloadTab.spec.js.map
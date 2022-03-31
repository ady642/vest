"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DownloadCta_vue_1 = require("@/modules/Search/components/Buttons/MultipleDocumentsCtas/DownloadCta.vue");
const MultipleDocumentsCta_vue_1 = require("@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
/****
 * Wrapper creation
 */
const defaultProps = {
    selectedDocumentsIds: ['19', '27']
};
const createWrapper = ({ props = defaultProps, store = (0, storeMock_1.createSearchStoreMocked)() } = {}) => (0, wrapperFactory_1.default)(DownloadCta_vue_1.default, {
    props,
    global: {
        plugins: [store],
        stubs: {
            MultipleDocumentsCta: MultipleDocumentsCta_vue_1.default
        },
        renderStubDefaultSlot: true
    }
});
let wrapper = createWrapper();
let multipleDocumentsCta = (0, finders_1.findMultipleDocumentsCta)(wrapper);
describe('DownloadCta', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        multipleDocumentsCta = (0, finders_1.findMultipleDocumentsCta)(wrapper);
    });
    describe('bindings with MultipleDocumentsCta', () => {
        test('props bindings', () => {
            expect(multipleDocumentsCta.props()).toStrictEqual({
                text: 'ged.common.download',
                disabled: false
            });
        });
        describe('rendering', () => {
            it('should render the download-icon via the MultipleDocumentsCta prepend-icon slot', () => {
                expect((0, finders_1.findDownloadIcon)(wrapper).exists()).toBe(true);
            });
            it('should render the loading icon when isFileDeleting is true', () => {
                wrapper = createWrapper({
                    store: (0, storeMock_1.createSearchStoreMocked)({
                        multipleDownloadLoading: true
                    })
                });
                expect((0, finders_1.findLoadingIcon)(wrapper).exists()).toBe(true);
                expect((0, finders_1.findDownloadIcon)(wrapper).exists()).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=DownloadCta.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteCta_vue_1 = require("@/modules/Search/components/Buttons/MultipleDocumentsCtas/DeleteCta.vue");
const MultipleDocumentsCta_vue_1 = require("@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCta.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
/****
 * Wrapper creation
 */
const defaultProps = {
    selectedDocumentsIds: ['27']
};
const createWrapper = ({ props = defaultProps, store = (0, storeMock_1.createDeleteFileStoreMocked)() } = {}) => (0, wrapperFactory_1.default)(DeleteCta_vue_1.default, {
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
describe('DeleteCta', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        multipleDocumentsCta = (0, finders_1.findMultipleDocumentsCta)(wrapper);
    });
    describe('bindings with MultipleDocumentsCta', () => {
        describe('props bindings', () => {
            test('static props', () => {
                expect(multipleDocumentsCta.props()).toStrictEqual({
                    text: 'ged.common.delete',
                    disabled: true
                });
            });
            it.each([
                {
                    selectedDocumentsIds: [],
                    areDocumentsDeletable: false,
                    disabled: true
                },
                {
                    selectedDocumentsIds: [],
                    areDocumentsDeletable: true,
                    disabled: true
                },
                {
                    selectedDocumentsIds: ['19', '27'],
                    areDocumentsDeletable: false,
                    disabled: true
                },
                {
                    selectedDocumentsIds: ['19', '27'],
                    areDocumentsDeletable: true,
                    disabled: false
                }
            ])('should disabled the delete cta when areDocumentsDeletable is false', ({ selectedDocumentsIds, areDocumentsDeletable, disabled }) => {
                wrapper = createWrapper({
                    props: { selectedDocumentsIds },
                    store: (0, storeMock_1.createDeleteFileStoreMocked)({
                        areDocumentsDeletable
                    })
                });
                expect((0, finders_1.findMultipleDocumentsCta)(wrapper).props('disabled')).toBe(disabled);
            });
        });
        describe('rendering', () => {
            it('should render the delete icon via the MultipleDocumentsCta prepend-icon slot', () => {
                expect((0, finders_1.findDeleteIcon)(wrapper).exists()).toBe(true);
            });
            it('should render the loading icon when isFileDeleting is true', () => {
                wrapper = createWrapper({
                    store: (0, storeMock_1.createDeleteFileStoreMocked)({
                        isFileDeleting: true
                    })
                });
                expect((0, finders_1.findLoadingIcon)(wrapper).exists()).toBe(true);
                expect((0, finders_1.findDeleteIcon)(wrapper).exists()).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=DeleteCta.spec.js.map
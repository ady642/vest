"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentDetailsBanner_vue_1 = require("@/modules/Search/components/Drawer/DocumentDetailsBanner.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
/****
 * Wrapper finders
 */
const findPreviewImg = (wrapper) => wrapper.find('.document-details__banner__image');
/****
 * Wrapper creation
 */
const defaultProps = {
    document: new Document_1.default({ id: '27' })
};
const storeDefault = (0, storeMock_1.createSearchStoreMocked)({
    previewDocumentImage: 'test'
});
storeDefault.dispatch = jest.fn();
const createWrapper = (props = defaultProps, store = storeDefault) => (0, wrapperFactory_1.default)(DocumentDetailsBanner_vue_1.default, {
    props,
    global: {
        plugins: [store],
        directives: {
            Loading: (node, binding) => {
                console.log('ici');
                console.log(`v-loading value : ${binding.value}`);
            }
        }
    }
});
let wrapper = createWrapper();
let previewImgWrapper = findPreviewImg(wrapper);
describe('DocumentDetailsBanner', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        previewImgWrapper = findPreviewImg(wrapper);
    });
    describe('bindings with Preview Img', () => {
        describe('mounted', () => {
            it('should call the downloadPreview action on mounted', () => {
                // The downloadPreview must have been called
                expect(storeDefault.dispatch).toHaveBeenCalledWith('GED/Search/downloadPreview', '27');
            });
        });
        test('props bindings', () => {
            // Given preview image is set to dataBase64 string
            wrapper = createWrapper(defaultProps, (0, storeMock_1.createSearchStoreMocked)({
                previewDocumentImage: 'test'
            }));
            // Then the img preview must have as src the dataBase64 string
            expect(findPreviewImg(wrapper).attributes('src')).toBe('test');
        });
        describe('rendering', () => {
            it.each([
                {
                    isPreviewLoading: false,
                    isDownloading: false,
                    expectedVLoading: false
                },
                {
                    isPreviewLoading: false,
                    isDownloading: true,
                    expectedVLoading: true
                },
                {
                    isPreviewLoading: true,
                    isDownloading: false,
                    expectedVLoading: true
                },
                { isPreviewLoading: true, isDownloading: true, expectedVLoading: true }
            ])('should display loading mask when preview is loading or the document is downloading', ({ isPreviewLoading, isDownloading, expectedVLoading }) => {
                const log = console.log;
                console.log = jest.fn();
                wrapper = createWrapper(defaultProps, (0, storeMock_1.createSearchStoreMocked)({
                    isDownloading,
                    isPreviewLoading
                }));
                expect(console.log).toHaveBeenCalledWith(`v-loading value : ${expectedVLoading}`);
                console.log = log;
            });
            it('should send a downloadPreview action when document change', async () => {
                const store = (0, storeMock_1.createSearchStoreMocked)();
                store.dispatch = jest.fn();
                wrapper = createWrapper(defaultProps, store);
                await wrapper.setProps({
                    document: new Document_1.default({ id: '19' })
                });
                // Then the store must have dispatched two downloadPreview actions (one during mounted and other when document changes)
                expect(store.dispatch).toHaveBeenNthCalledWith(1, 'GED/Search/downloadPreview', '27');
                expect(store.dispatch).toHaveBeenNthCalledWith(2, 'GED/Search/downloadPreview', '19');
            });
            it('should not display preview when previewImage is null', async () => {
                const store = (0, storeMock_1.createSearchStoreMocked)({
                    previewDocumentImage: undefined
                });
                store.dispatch = jest.fn();
                wrapper = createWrapper(defaultProps, store);
                await wrapper.setProps({
                    document: new Document_1.default({ id: '19' })
                });
                expect(wrapper.classes()).not.toContain(['document-details__banner']);
            });
        });
    });
});
//# sourceMappingURL=DocumentDetailsBanner.spec.js.map
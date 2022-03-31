"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentNameItem_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentNameItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoHighlighter_vue_1 = require("@/Common/components/Hightlighter/NattoHighlighter.vue");
const FilenameText_vue_1 = require("@/Common/components/Text/FilenameText.vue");
/****
 * Wrapper finders
 */
const findNattoHighlighter = (wrapper) => wrapper.findComponent(NattoHighlighter_vue_1.default);
const findFilenameText = (wrapper) => wrapper.findComponent(FilenameText_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    name: 'je suis columbo',
    search: 'columbo'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentNameItem_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('DocumentNameItem', () => {
    beforeEach(() => {
        // Given name is equal to 'je suis columbo' and query 'columbo'
        wrapper = createWrapper();
    });
    describe('bindings with NattoHighlighter', () => {
        test('props', () => {
            // Then filename must be also equal to 'test'
            const nattoHighlighterWrapper = findNattoHighlighter(wrapper);
            expect(nattoHighlighterWrapper.vm.text).toBe('je suis columbo');
            expect(nattoHighlighterWrapper.vm.query).toBe('columbo');
        });
        describe('rendering', () => {
            it('should not display NattoHighlighter if no search', () => {
                // Given search is empty
                wrapper = createWrapper({
                    ...defaultProps,
                    search: ''
                });
                const nattoHighlighterWrapper = findNattoHighlighter(wrapper);
                // Then NattoHighlighter should not exist
                expect(nattoHighlighterWrapper.exists()).toBe(false);
            });
        });
    });
    describe('bindings with FilenameText', () => {
        test('props bindings', () => {
            // Given name is equal to 'test'
            wrapper = createWrapper({ name: 'test' });
            // Then filename must be also equal to 'test'
            const filenameTextWrapper = findFilenameText(wrapper);
            expect(filenameTextWrapper.vm.filename).toBe('test');
        });
        describe('rendering', () => {
            it('should not display filenameText if there is a search', () => {
                // Given search is empty
                wrapper = createWrapper({
                    ...defaultProps,
                    search: 'test'
                });
                const filenameTextWrapper = findFilenameText(wrapper);
                // Then FilenameText should not exist
                expect(filenameTextWrapper.exists()).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=DocumentName.spec.js.map
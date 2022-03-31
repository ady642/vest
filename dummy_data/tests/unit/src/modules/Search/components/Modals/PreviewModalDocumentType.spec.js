"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PreviewModalDocumentType_vue_1 = require("@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalDocumentType.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
/****
 * Wrapper creation
 */
const defaultProps = {
    type: '.pdf'
};
const { MpIcon } = (0, useStyleguideStubs_1.default)();
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(PreviewModalDocumentType_vue_1.default, {
    props,
    global: {
        stubs: { MpIcon },
        renderStubDefaultSlot: true
    }
});
let wrapper = createWrapper();
describe('DocumentTypeTag', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with NattoTag', () => {
        describe('documentTypeIcon', () => {
            const cases = [
                {
                    type: '.pdf',
                    expectedIcon: 'pdf'
                },
                {
                    type: '.txt',
                    expectedIcon: 'file'
                },
                {
                    type: '.xls',
                    expectedIcon: 'xls'
                },
                {
                    type: '.jpg',
                    expectedIcon: 'file'
                }
            ];
            test.each(cases)('It should bind document type icon correctly', ({ type, expectedIcon }) => {
                wrapper = createWrapper({
                    type
                });
                expect((0, finders_1.findMpIcon)(wrapper).props('name')).toEqual(expectedIcon);
            });
        });
    });
});
//# sourceMappingURL=PreviewModalDocumentType.spec.js.map
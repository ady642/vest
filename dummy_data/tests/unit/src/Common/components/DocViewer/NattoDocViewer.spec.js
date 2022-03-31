"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoDocViewer_vue_1 = require("@/Common/components/DocViewer/NattoDocViewer.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
/****
 * Wrapper finders
 */
const findIframe = (wrapper) => wrapper.find('iframe');
/****
 * Wrapper creation
 */
const defaultProps = {
    file: new Blob(['fileContent'], { type: 'application/pdf' })
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoDocViewer_vue_1.default, {
    props
});
let wrapper = createWrapper();
let iFrameWrapper = findIframe(wrapper);
describe('NattoDocViewer', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        iFrameWrapper = findIframe(wrapper);
    });
    describe('bindings with NattoDialogPopup', () => {
        test('props bindings', () => {
            expect(iFrameWrapper.attributes()).toStrictEqual({
                class: 'natto-doc-viewer',
                src: 'https://myObjectUrl.com'
            });
        });
    });
});
//# sourceMappingURL=NattoDocViewer.spec.js.map
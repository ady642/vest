"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GedCardUploadBox_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/GedCardUploadBox.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const UploadPictos_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPictos.vue");
const UploadTexts_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/Texts/UploadTexts.vue");
/****
 * Wrapper finders
 */
const findUploadPictos = (wrapper) => wrapper.findComponent(UploadPictos_vue_1.default);
const findUploadTexts = (wrapper) => wrapper.findComponent(UploadTexts_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    isUploading: true
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(GedCardUploadBox_vue_1.default, {
    props
});
let wrapper = createWrapper();
let uploadTextsWrapper = findUploadTexts(wrapper);
let uploadPictosWrapper = findUploadPictos(wrapper);
describe('GedCardUploadBox', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        uploadTextsWrapper = findUploadTexts(wrapper);
        uploadPictosWrapper = findUploadPictos(wrapper);
    });
    describe('bindings with UploadPictos', () => {
        test('props bindings', () => {
            expect(uploadPictosWrapper.props('isUploading')).toBe(true);
        });
    });
    describe('bindings with UploadTexts', () => {
        test('props bindings', () => {
            expect(uploadTextsWrapper.props('isUploading')).toBe(true);
        });
    });
});
//# sourceMappingURL=GedCardUploadBox.spec.js.map
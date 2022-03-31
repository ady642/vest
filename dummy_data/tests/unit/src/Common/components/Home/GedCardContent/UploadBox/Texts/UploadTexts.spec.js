"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UploadTexts_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/Texts/UploadTexts.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
/****
 * Wrapper creation
 */
const defaultProps = {
    isUploading: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(UploadTexts_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('UploadTexts', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('rendering', () => {
        const cases = [
            {
                isUploading: false,
                title: 'ged.upload.default.title',
                subtitle: 'ged.upload.default.subtitle Jpeg, Png, Pdf, Doc, Xls'
            },
            {
                isUploading: true,
                title: 'ged.upload.disabled.title',
                subtitle: 'ged.upload.disabled'
            }
        ];
        it.each(cases)('should display good title and subtitle when uploading', ({ subtitle, title, isUploading }) => {
            wrapper = createWrapper({ isUploading });
            expect(wrapper.text()).toContain(title);
            expect(wrapper.text()).toContain(subtitle);
        });
    });
});
//# sourceMappingURL=UploadTexts.spec.js.map
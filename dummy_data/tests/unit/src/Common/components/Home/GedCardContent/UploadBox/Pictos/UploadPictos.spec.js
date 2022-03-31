"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UploadPictos_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPictos.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const UploadPicto_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPicto.vue");
const WaitPicto_vue_1 = require("@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/WaitPicto.vue");
/****
 * Wrapper finders
 */
const findUploadPicto = (wrapper) => wrapper.findComponent(UploadPicto_vue_1.default);
const findWaitPicto = (wrapper) => wrapper.findComponent(WaitPicto_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    isUploading: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(UploadPictos_vue_1.default, {
    props
});
let wrapper = createWrapper();
let uploadPictoWrapper = findUploadPicto(wrapper);
let waitPictoWrapper = findUploadPicto(wrapper);
describe('UploadPictos', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        uploadPictoWrapper = findUploadPicto(wrapper);
        waitPictoWrapper = findWaitPicto(wrapper);
    });
    describe('rendering', () => {
        const cases = [
            { isUploading: false, uploadPictoExists: true, waitPictoExists: false },
            { isUploading: true, uploadPictoExists: false, waitPictoExists: true }
        ];
        test.each(cases)('should render UploadPicto when there is no upload in progress', ({ isUploading, uploadPictoExists, waitPictoExists }) => {
            wrapper = createWrapper({ isUploading });
            uploadPictoWrapper = findUploadPicto(wrapper);
            waitPictoWrapper = findWaitPicto(wrapper);
            expect(uploadPictoWrapper.exists()).toBe(uploadPictoExists);
            expect(waitPictoWrapper.exists()).toBe(waitPictoExists);
        });
    });
});
//# sourceMappingURL=UploadPictos.spec.js.map
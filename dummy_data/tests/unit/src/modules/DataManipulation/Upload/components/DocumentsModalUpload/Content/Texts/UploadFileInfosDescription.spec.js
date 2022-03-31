"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UploadFileInfosDescription_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Texts/UploadFileInfosDescription.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
/****
 * Wrapper creation
 */
const defaultProps = {
    selectedFolderName: 'Achat'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(UploadFileInfosDescription_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('UploadFileInfosDescription', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('rendering', () => {
        it('should render correct translation with parameter', () => {
            expect(wrapper.text()).toContain('ged.dataManipulation.create.file.collab.description with {"selectedFolderName":"Achat"}');
        });
    });
});
//# sourceMappingURL=UploadFileInfosDescription.spec.js.map
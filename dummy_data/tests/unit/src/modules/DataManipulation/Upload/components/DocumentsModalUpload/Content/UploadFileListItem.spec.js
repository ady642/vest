"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UploadFileListItem_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileListItem.vue");
const FilenameText_vue_1 = require("@/Common/components/Text/FilenameText.vue");
const DocumentUploadStateIcon_vue_1 = require("@/modules/Search/components/DocumentUploadStateIcon.vue");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FileUpload_2 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const createWrapper = (file, selected) => (0, wrapperFactory_1.default)(UploadFileListItem_vue_1.default, {
    global: {
        stubs: {
            FilenameText: FilenameText_vue_1.default,
            DocumentUploadStateIcon: DocumentUploadStateIcon_vue_1.default
        }
    },
    propsData: {
        file,
        selected
    },
    shallow: true
});
const content = 'mock content';
const data = new Blob([content], { type: 'application/zip' });
const arrayOfBlob = new Array();
arrayOfBlob.push(data);
const mockZip = new File(arrayOfBlob, 'Mock.zip');
const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.UPLOADED);
describe('UploadFileListItem', () => {
    describe('bindings', () => {
        it('div should have 1 class when send selected false props', () => {
            const wrapper = createWrapper(file, false);
            const divWrapper = wrapper.findAll('div');
            expect(divWrapper.length).toBe(1);
            expect(divWrapper[0].classes()).toHaveLength(1);
            expect(divWrapper[0].classes()[0]).toBe('file-item');
        });
        it('div class should contains 2 class when send selected true props', () => {
            const wrapper = createWrapper(file, true);
            const divWrapper = wrapper.findAll('div');
            expect(divWrapper.length).toBe(1);
            expect(divWrapper[0].classes()).toHaveLength(2);
            expect(divWrapper[0].classes()[0]).toBe('file-item');
            expect(divWrapper[0].classes()[1]).toBe('selected');
        });
    });
    describe('rendering', () => {
        describe('props', () => {
            it('Should display FilenameText and DocumentUploadStateIcon when send file and selected props', () => {
                const wrapper = createWrapper(file, false);
                const textWrappper = wrapper.findAllComponents(FilenameText_vue_1.default);
                const icontWrappper = wrapper.findAllComponents(DocumentUploadStateIcon_vue_1.default);
                expect(textWrappper).toHaveLength(1);
                expect(textWrappper[0].vm.filename).toEqual('Mock.zip');
                expect(icontWrappper).toHaveLength(1);
                expect(icontWrappper[0].vm.status).toEqual(FileUpload_2.StateUpload.UPLOADED);
            });
        });
    });
});
//# sourceMappingURL=UploadFileListItem.spec.js.map
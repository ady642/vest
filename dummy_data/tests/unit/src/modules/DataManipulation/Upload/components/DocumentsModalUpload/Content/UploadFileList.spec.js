"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UploadFileList_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileList.vue");
const UploadFileListItem_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileListItem.vue");
const FileUpload_1 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FileUpload_2 = require("@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElScrollbar } = (0, useElementStubs_1.default)();
const createWrapper = (files) => (0, wrapperFactory_1.default)(UploadFileList_vue_1.default, {
    global: {
        stubs: {
            UploadFileListItem: UploadFileListItem_vue_1.default,
            ElScrollbar
        }
    },
    propsData: {
        files
    }
});
const content = 'mock content';
const data = new Blob([content], { type: 'application/zip' });
const arrayOfBlob = new Array();
arrayOfBlob.push(data);
const mockZip = new File(arrayOfBlob, 'Mock.zip');
const mockZip2 = new File(arrayOfBlob, 'Mock2.zip');
const file = new FileUpload_1.default(mockZip, FileUpload_2.StateUpload.UPLOADING);
const file2 = new FileUpload_1.default(mockZip2, FileUpload_2.StateUpload.UPLOADING);
const files = new Array();
files.push(file);
files.push(file2);
describe('UploadFileList', () => {
    describe('bindings', () => {
        describe('events', () => {
            it('Should fire display-file event and change fileSelected data when click event is fired', () => {
                const wrapper = createWrapper(files);
                const itemWrappper = wrapper.findComponent(UploadFileListItem_vue_1.default);
                itemWrappper.vm.$emit('click', 27);
                expect(wrapper.emitted()['display-file']).toBeTruthy();
                expect(wrapper.emitted()['display-file']).toHaveLength(1);
                expect(wrapper.emitted()['display-file'][0]).toStrictEqual([0]);
            });
        });
    });
    describe('rendering', () => {
        it('Should display item when send files props', async () => {
            const wrapper = createWrapper(files);
            const itemWrappper = wrapper.findAllComponents(UploadFileListItem_vue_1.default);
            expect(itemWrappper).toHaveLength(2);
            expect(itemWrappper[0].vm.file).toEqual(file);
            expect(itemWrappper[0].vm.selected).toEqual(true);
            expect(itemWrappper[1].vm.file).toEqual(file2);
            expect(itemWrappper[1].vm.selected).toEqual(false);
        });
    });
});
//# sourceMappingURL=UploadFileList.spec.js.map
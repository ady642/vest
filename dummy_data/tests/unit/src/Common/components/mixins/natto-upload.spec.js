"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natto_upload_1 = require("@/Common/mixins/natto-upload");
const test_utils_1 = require("@vue/test-utils");
const Component = {
    template: {},
    mixins: [natto_upload_1.default]
};
const wrapper = (0, test_utils_1.shallowMount)(Component);
describe('methods', () => {
    it('should emit event on-files-change event on emitFilesEvent method trigger ', async () => {
        let fileList = [new File([''], 'File1'), new File([''], 'File1')];
        await wrapper.setData({
            length: 2,
            fileList: fileList
        });
        await wrapper.vm.emitFilesEvent();
        expect(wrapper.emitted('on-files-change')).toBeTruthy();
        expect(wrapper.emitted()['on-files-change'][0]).toEqual([fileList]);
        expect(wrapper.vm.length).toEqual(2);
    });
});
//# sourceMappingURL=natto-upload.spec.js.map
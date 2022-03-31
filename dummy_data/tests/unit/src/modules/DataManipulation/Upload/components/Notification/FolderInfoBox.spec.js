"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/Common/constants");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FolderInfoBox_vue_1 = require("@/modules/DataManipulation/Upload/components/Notification/FolderInfoBox.vue");
const createWrapper = (folderName, canUpload, folderDescription) => (0, wrapperFactory_1.default)(FolderInfoBox_vue_1.default, {
    props: {
        folderName,
        canUpload,
        folderDescription
    }
});
const data = {
    folderName: 'folder 1',
    canUpload: true,
    folderDescription: 'folder 1 description'
};
describe('FolderInfoBox', () => {
    describe('binding', () => {
        it('Should bind properties correctly', () => {
            const wrapper = createWrapper(data.folderName, data.canUpload, data.folderDescription);
            expect(wrapper.props('folderName')).toEqual(data.folderName);
            expect(wrapper.props('canUpload')).toEqual(data.canUpload);
            expect(wrapper.props('folderDescription')).toEqual(data.folderDescription);
        });
    });
    describe('rendering', () => {
        it('should display can upload file description when permission is granted ', () => {
            const wrapper = createWrapper(data.folderName, data.canUpload, data.folderDescription);
            const descriptionWrapper = wrapper.find('.text-part-1 > p');
            expect(descriptionWrapper.text()).toStrictEqual(`${constants_1.default.CAN_ADD_FILE_DESCRIPTION} ${data.folderName}. ${data.folderDescription}`);
        });
        it('should display can not upload file description when permission is not granted ', () => {
            const wrapper = createWrapper(data.folderName, false, data.folderDescription);
            const descriptionWrapper = wrapper.find('.text-part-1 > p');
            expect(descriptionWrapper.text()).toStrictEqual(`${constants_1.default.CAN_NOT_ADD_FILE_DESCRIPTION} ${data.folderName}. ${data.folderDescription}`);
        });
    });
});
//# sourceMappingURL=FolderInfoBox.spec.js.map
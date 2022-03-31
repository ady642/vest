"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const NattoBreadcrumb_vue_1 = require("@/Common/components/Breadcrumb/NattoBreadcrumb.vue");
const UploadBreadcrumb_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadBreadcrumb.vue");
const defaultProps = {
    folders: (0, FoldersDataMock_1.default)().FoldersData,
    selectedFolderToUpload: 1001,
    disabledBreadcrumb: false
};
const createWrapper = ({ folders, selectedFolderToUpload, disabledBreadcrumb } = defaultProps) => (0, wrapperFactory_1.default)(UploadBreadcrumb_vue_1.default, {
    props: {
        folders,
        selectedFolderToUpload,
        disabledBreadcrumb
    }
});
const findNattoBreadcrumb = (wrapper) => wrapper.findComponent(NattoBreadcrumb_vue_1.default);
let wrapper = createWrapper();
let nattoBreadcrumbWrapper = findNattoBreadcrumb(wrapper);
describe('UploadBreadcrumb', () => {
    beforeEach(() => {
        nattoBreadcrumbWrapper = findNattoBreadcrumb(wrapper);
    });
    describe('rendering', () => {
        const disabledCases = [
            { disabledBreadcrumb: true, disabledClassExists: true },
            { disabledBreadcrumb: false, disabledClassExists: false }
        ];
        it.each(disabledCases)(`Should have/not have upload-breadcrumb-disabled when disabledBreadcrumbs is $disabledBreadcrumb`, ({ disabledBreadcrumb, disabledClassExists }) => {
            // Given disabledCrumbs is $disabledBreadcrumbs
            wrapper = createWrapper({ ...defaultProps, disabledBreadcrumb });
            // Then
            const uploadBreadcrumbContainerWrapper = wrapper.find('.upload-breadcrumb-container');
            expect(uploadBreadcrumbContainerWrapper
                .classes()
                .includes('upload-breadcrumb-disabled')).toBe(disabledClassExists);
        });
    });
    describe('bindings with arrow-left-icon', () => {
        it('When click on arrow-left-icon, ' +
            'Then last breadcrumbItem must be removed and update:selectedFolderToUpload must be emitted with last breadcrumbItem.id as payload', async () => {
            // When click on arrow-left-icon
            const arrowLeftIconWrapper = wrapper.find('.arrow-left-icon');
            await arrowLeftIconWrapper.trigger('click');
            // Then
            expect(nattoBreadcrumbWrapper.vm.breadcrumbs).toStrictEqual([
                { id: 0, text: 'GED' },
                { id: 1122, text: 'A classer' }
            ]);
            expect(nattoBreadcrumbWrapper.vm.ellipsed).toStrictEqual(true);
            expect(wrapper.emitted('update:selectedFolderToUpload'));
        });
    });
    describe('click on breadcrumbItem', () => {
        it('when selectedFolderToUpload prop changes, it must add the related breadcrumb item', async () => {
            // Given selectedFolderToUpload is set to 0
            wrapper = createWrapper();
            // When selectedFolderToUpload is set to the folder 2705 (name: The grandson)
            await wrapper.setProps({ selectedFolderToUpload: 2705 });
            // Then a breadcrumbItem must be added with 2705 folder information
            expect(wrapper.vm.breadcrumbs).toStrictEqual([
                { id: 0, text: 'GED' },
                { id: 1122, text: 'A classer' },
                { id: 1001, text: 'The child' },
                { id: 2705, text: 'The grandson' }
            ]);
            expect(wrapper.emitted('update:selectedFolderToUpload')).toBeFalsy();
        });
    });
});
//# sourceMappingURL=UploadBreadcrumb.spec.js.map
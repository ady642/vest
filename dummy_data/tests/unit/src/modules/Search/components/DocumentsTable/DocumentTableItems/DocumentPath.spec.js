"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentPathItem_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentPathItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FilePathText_vue_1 = require("@/Common/components/Text/FilePathText.vue");
const createWrapper = ({ path = [] } = { path: [] }) => (0, wrapperFactory_1.default)(DocumentPathItem_vue_1.default, {
    props: { path }
});
describe('DocumentPathItem', () => {
    describe('bindings', () => {
        it('path <=> filepath', () => {
            // Given name is equal to 'test'
            const wrapper = createWrapper({ path: ['folderA', 'folderB'] });
            // Then filename must be also equal to 'test'
            const filePathTextWrapper = wrapper.findComponent(FilePathText_vue_1.default);
            expect(filePathTextWrapper.vm.filePath).toStrictEqual([
                'folderA',
                'folderB'
            ]);
        });
    });
});
//# sourceMappingURL=DocumentPath.spec.js.map
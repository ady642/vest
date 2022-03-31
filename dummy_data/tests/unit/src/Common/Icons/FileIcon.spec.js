"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileIcon_vue_1 = require("@/Common/components/Icons/FileIcon.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentIcon_vue_1 = require("@/Common/components/Icons/DocumentIcon.vue");
const File_svg_1 = require("@/assets/Icons/File.svg");
const createWrapper = () => (0, wrapperFactory_1.default)(FileIcon_vue_1.default);
let wrapper = createWrapper();
describe('FileIcon', () => {
    describe('bindings', () => {
        it('FileSvg <=> src', () => {
            wrapper = createWrapper();
            const documentIconWrapper = wrapper.findComponent(DocumentIcon_vue_1.default);
            expect(documentIconWrapper.vm.src).toBe(File_svg_1.default);
        });
    });
});
//# sourceMappingURL=FileIcon.spec.js.map
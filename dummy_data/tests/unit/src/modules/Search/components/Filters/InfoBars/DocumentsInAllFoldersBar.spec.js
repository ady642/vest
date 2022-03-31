"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsInAllFoldersBar_vue_1 = require("@/modules/Search/components/Filters/InfoBars/DocumentsInAllFoldersBar.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const InfoBar_vue_1 = require("@/modules/Search/components/Filters/InfoBars/InfoBar.vue");
const createWrapper = ({ nbDocumentsInAllFolders } = {
    nbDocumentsInAllFolders: 75246
}) => (0, wrapperFactory_1.default)(DocumentsInAllFoldersBar_vue_1.default, {
    props: {
        nbDocumentsInAllFolders
    }
});
let wrapper = createWrapper();
const findInfoBar = (wrapper) => wrapper.findComponent(InfoBar_vue_1.default);
describe('DocumentsInAllFoldersBar', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with InfoBar', () => {
        it('should bind the props', () => {
            const infoBarWrapper = findInfoBar(wrapper);
            expect(infoBarWrapper.vm.displayArrow).toBe(true);
            expect(infoBarWrapper.vm.title).toBe('Résultats dans toute la GED');
            expect(infoBarWrapper.vm.nbDocuments).toBe(75246);
        });
    });
});
//# sourceMappingURL=DocumentsInAllFoldersBar.spec.js.map
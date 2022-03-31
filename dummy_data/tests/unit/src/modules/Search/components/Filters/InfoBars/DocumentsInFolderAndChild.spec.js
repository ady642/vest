"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsInFolderAndChildBar_vue_1 = require("@/modules/Search/components/Filters/InfoBars/DocumentsInFolderAndChildBar.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const InfoBar_vue_1 = require("@/modules/Search/components/Filters/InfoBars/InfoBar.vue");
const createWrapper = ({ nbDocumentsInFolderAndChild } = {
    nbDocumentsInFolderAndChild: 5200
}) => (0, wrapperFactory_1.default)(DocumentsInFolderAndChildBar_vue_1.default, {
    props: {
        nbDocumentsInFolderAndChild
    }
});
let wrapper = createWrapper();
const findInfoBar = (wrapper) => wrapper.findComponent(InfoBar_vue_1.default);
describe('DocumentsInFolderAndChildBar', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with InfoBar', () => {
        it('should bind the props', () => {
            const infoBarWrapper = findInfoBar(wrapper);
            expect(infoBarWrapper.vm.displayArrow).toBe(false);
            expect(infoBarWrapper.vm.title).toBe('Résultats dans ce dossier et enfants');
            expect(infoBarWrapper.vm.nbDocuments).toBe(5200);
        });
    });
});
//# sourceMappingURL=DocumentsInFolderAndChild.spec.js.map
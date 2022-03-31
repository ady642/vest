"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentActionDropdownItem_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const TrashDocumentsActionsDropdownList_vue_1 = require("@/modules/Trash/components/TrashDocumentTableItems/TrashDocumentsActionsDropdownList.vue");
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const defaultProps = {
    documentId: 'document-id'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(TrashDocumentsActionsDropdownList_vue_1.default, {
    props,
    global: {
        stubs: {
            DocumentActionDropdownItem: DocumentActionDropdownItem_vue_1.default
        },
        plugins: [storeMock]
    }
});
let wrapper = createWrapper();
describe('DocumentActionsDropdownList', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('binding', () => {
        describe('events', () => {
            it('Should fire item-clicked when item clicked', () => {
                const dropdownItemWrapper = wrapper.findComponent(DocumentActionDropdownItem_vue_1.default);
                dropdownItemWrapper.trigger('click');
                expect(wrapper.emitted('item-clicked')).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=TrashDocumentsActionsDropdownList.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const createTrashStoreMock_1 = require("dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock");
const TrashDocumentRestore_vue_1 = require("@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentRestore.vue");
const DocumentsTableElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue");
const RestoreIcon_vue_1 = require("@/Common/components/Icons/RestoreIcon.vue");
const NattoTableItem_vue_1 = require("@/Common/components/Table/NattoTableItem.vue");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElTableColumn } = (0, useElementStubs_1.default)();
const storeMock = (0, createTrashStoreMock_1.createTrashStoreMock)();
const defaultProps = {};
const createWrapper = (props = defaultProps, store = storeMock) => (0, wrapperFactory_1.default)(TrashDocumentRestore_vue_1.default, {
    props,
    global: {
        plugins: [store],
        stubs: {
            DocumentsTableElement: DocumentsTableElement_vue_1.default,
            RestoreIcon: RestoreIcon_vue_1.default,
            NattoTableItem: NattoTableItem_vue_1.default,
            ElTableColumn
        }
    }
});
let wrapper = createWrapper();
describe('TrashDocumentRestore', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('binding', () => {
        describe('events', () => {
            it('Should fire restore-icon-click when restore icon is clicked', async () => {
                const restoreIconWrapper = wrapper.find('.restore-icon');
                await restoreIconWrapper.trigger('click');
                expect(wrapper.emitted('restore-icon-click')).toBeTruthy();
                expect(wrapper.emitted('restore-icon-click')).toHaveLength(1);
                expect(wrapper.emitted('restore-icon-click')).toStrictEqual([[45]]);
            });
        });
    });
});
//# sourceMappingURL=TrashDocumentRestore.spec.js.map
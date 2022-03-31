"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentActionsElement_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentActionsElement.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const DocumentAPIMock_1 = require("../../../mocks/DocumentAPIMock");
const actionItemTypes_1 = require("@/Common/types/actionItemTypes");
const DocumentActionsDropdownList_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownList.vue");
const NattoDropdown_vue_1 = require("@/Common/components/Dropdown/NattoDropdown.vue");
const useElementStubs_1 = require("../../../../../../utils/useElementStubs");
const DocumentActionsDropdownActivator_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownActivator.vue");
/****
 * Wrapper finders
 */
const findDocumentActionsDropdownList = (wrapper) => wrapper.findComponent(DocumentActionsDropdownList_vue_1.default);
const findDocumentActionsDropdownActivator = (wrapper) => wrapper.findComponent(DocumentActionsDropdownActivator_vue_1.default);
/****
 * Wrapper creation
 */
const createDocumentsTableElement = (myDocument = new Document_1.default(DocumentAPIMock_1.documentAPIMock)) => ({
    props: { documentProp: { type: Document_1.default, default: myDocument } },
    template: `<div>
    <slot name="item" :props="documentProp" />
    <slot name="header" />
  </div>`
});
const { ElDropdown, ElDropdownMenu } = (0, useElementStubs_1.default)();
const createWrapper = ({ DocumentsTableElement = createDocumentsTableElement() } = {}) => (0, wrapperFactory_1.default)(DocumentActionsElement_vue_1.default, {
    global: {
        stubs: {
            DocumentsTableElement,
            NattoDropdown: NattoDropdown_vue_1.default,
            ElDropdown,
            ElDropdownMenu
        },
        renderStubDefaultSlot: true
    }
});
let wrapper = createWrapper();
let documentActionsDropdownList = findDocumentActionsDropdownList(wrapper);
let documentActionsDropdownActivator = findDocumentActionsDropdownActivator(wrapper);
describe('DocumentActionsElement', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        documentActionsDropdownList = findDocumentActionsDropdownList(wrapper);
        documentActionsDropdownActivator =
            findDocumentActionsDropdownActivator(wrapper);
    });
    describe('bindings with DocumentActionsDropdownList', () => {
        describe('props', () => {
            test('static props', () => {
                expect(documentActionsDropdownList.props('documentId')).toBe('myID');
            });
        });
        describe('events', () => {
            it('should emit goTo-clicked when dropdownList emits item-clicked with goto', async () => {
                await documentActionsDropdownList.vm.$emit('item-clicked', actionItemTypes_1.ITEMS.GOTO);
                expect(wrapper.emitted('goto-clicked')).toHaveLength(1);
                expect(wrapper.emitted('goto-clicked')).toStrictEqual([
                    [
                        {
                            documentId: 'myID',
                            isSynchronizedDocument: true,
                            folderId: 45454
                        }
                    ]
                ]);
            });
        });
    });
    describe('bindings with DocumentActionsDropdownActivator', () => {
        describe('events', () => {
            it('should emit document-dropdown-clicked when activator emits click', async () => {
                await documentActionsDropdownActivator.vm.$emit('click');
                expect(wrapper.emitted('document-dropdown-clicked')).toHaveLength(1);
                expect(wrapper.emitted('document-dropdown-clicked')).toStrictEqual([
                    ['myID']
                ]);
            });
        });
    });
});
//# sourceMappingURL=DocumentActionsElement.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentActionDropdownItem_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionDropdownItem.vue");
const DocumentActionsDropdownList_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentActionsDropdownList.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const actionItemTypes_1 = require("@/Common/types/actionItemTypes");
const testCases = [
    {
        fileIsDeletable: true,
        buttonShouldBeDisabled: false
    },
    {
        fileIsDeletable: false,
        buttonShouldBeDisabled: true
    }
];
let storeMock = (0, storeMock_1.createDeleteFileStoreMocked)();
const defaultProps = {
    documentId: 'document-id',
    isSynchronizedDocument: false,
    displayGoTo: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentActionsDropdownList_vue_1.default, {
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
        describe('props', () => {
            it('static props', () => {
                const dropdownItemWrapper = wrapper.findComponent(DocumentActionDropdownItem_vue_1.default);
                expect(dropdownItemWrapper.props()).toStrictEqual({
                    disabled: true,
                    icon: 'delete',
                    label: 'ged.common.delete',
                    tooltipContent: 'ged.dataManipulation.delete.cantDelete'
                });
            });
        });
        describe('events', () => {
            it('Should fire item-clicked when item clicked', () => {
                const dropdownItemWrapper = wrapper.findComponent(DocumentActionDropdownItem_vue_1.default);
                dropdownItemWrapper.trigger('click');
                expect(wrapper.emitted('item-clicked')).toHaveLength(1);
                expect(wrapper.emitted('item-clicked')).toStrictEqual([[actionItemTypes_1.ITEMS.DELETE]]);
            });
        });
    });
    describe('rendering', () => {
        it.each(testCases)('When file  deletable = $fileIsDeletable should dropdown delete action should be disabled=$buttonShouldBeDisabled ', async ({ fileIsDeletable, buttonShouldBeDisabled }) => {
            storeMock = (0, storeMock_1.createDeleteFileStoreMocked)({
                isFileDeletable: fileIsDeletable
            });
            wrapper = createWrapper({
                ...defaultProps,
                documentId: '69241b23-f6d1-458d-8675-1ea36f593303',
                isSynchronizedDocument: false
            });
            await wrapper.vm.$nextTick();
            const dropdownItemWrapper = wrapper.findComponent(DocumentActionDropdownItem_vue_1.default);
            expect(dropdownItemWrapper.props('disabled')).toBe(buttonShouldBeDisabled);
        });
        it.each([
            { displayGoTo: true, expectedItemsCount: 3 },
            { displayGoTo: false, expectedItemsCount: 2 }
        ])('should display the goto item if displayGoTo is at true', ({ displayGoTo, expectedItemsCount }) => {
            wrapper = createWrapper({
                ...defaultProps,
                displayGoTo
            });
            const dropdownItemWrappers = wrapper.findAllComponents(DocumentActionDropdownItem_vue_1.default);
            expect(dropdownItemWrappers).toHaveLength(expectedItemsCount);
        });
    });
});
//# sourceMappingURL=DocumentActionsDropdownList.spec.js.map
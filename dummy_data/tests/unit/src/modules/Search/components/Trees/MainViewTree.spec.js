"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainViewTree_vue_1 = require("@/modules/Search/components/Trees/MainViewTree.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const test_utils_1 = require("@vue/test-utils");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const Folder_1 = require("@/modules/Search/models/Folders/Inputs/Folder");
const FoldersDataMock_1 = require("../../mocks/FoldersDataMock");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
/****
 * Wrapper creation
 */
const defaultProps = {
    folders: (0, FoldersDataMock_1.default)().FoldersData
};
const createNattoTree = (myFolder = (0, FoldersDataMock_1.default)().FoldersData.collection[0]) => ({
    props: {
        folder: { type: Folder_1.default, default: myFolder }
    },
    template: `<div>
    <slot name="item" :data="folder" :node="folder" />
  </div>`
});
const createWrapper = ({ props = defaultProps, NattoTree = createNattoTree() } = {}) => (0, wrapperFactory_1.default)(MainViewTree_vue_1.default, {
    props,
    global: {
        stubs: { NattoTree }
    }
});
let wrapper = createWrapper();
let nattoTreeWrapper = (0, finders_1.findNattoTree)(wrapper);
let searchItemWrapper = (0, finders_1.findSearchTreeItem)(wrapper);
describe('MainViewTree', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoTreeWrapper = (0, finders_1.findNattoTree)(wrapper);
        searchItemWrapper = (0, finders_1.findSearchTreeItem)(wrapper);
    });
    describe('bindings with NattoTree', () => {
        test('props bindings', () => {
            expect(nattoTreeWrapper.attributes()).toStrictEqual({
                data: `${(0, FoldersDataMock_1.default)().FoldersData.collection}`,
                props: `${{ label: 'id', children: 'children' }}`
            });
        });
        describe('events', () => {
            it('should select the folder', async () => {
                // Given SearchTreeItem isFolderSelected is false
                expect(searchItemWrapper.props('isFolderSelected')).toBe(false);
                // When NattoTree emit current-change with a folder
                await nattoTreeWrapper.vm.$emit('current-change', (0, FoldersDataMock_1.default)().FoldersData.collection[0]);
                await (0, test_utils_1.flushPromises)();
                // Then SearchTreeItem isFolderSelected prop must be at true
                expect(searchItemWrapper.props('isFolderSelected')).toBe(true);
            });
        });
    });
    describe('bindings with SearchTreeItem', () => {
        test('props', () => {
            expect(searchItemWrapper.props()).toStrictEqual({
                folder: (0, FoldersDataMock_1.default)().FoldersData.collection[0],
                isFolderSelected: false
            });
        });
        describe('events', () => {
            it('should go to arbo view when search item emit click', async () => {
                await searchItemWrapper.vm.$emit('click');
                expect(mypulse_shared_dependencies_1.router.push).toHaveBeenCalledWith({
                    name: 'ArboView',
                    query: { folderId: 1122 } // Id of first folder in collection
                });
            });
        });
    });
});
//# sourceMappingURL=MainViewTree.spec.js.map
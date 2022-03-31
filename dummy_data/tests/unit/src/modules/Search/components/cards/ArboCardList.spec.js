"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArboCardList_vue_1 = require("@/modules/Search/components/Cards/ArboCardList.vue");
const ArboCard_vue_1 = require("@/modules/Search/components/Cards/ArboCard.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const FoldersDataMock_1 = require("../../mocks/FoldersDataMock");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
/****
 * Wrapper finders
 */
const findArboCards = (wrapper) => wrapper.findAllComponents(ArboCard_vue_1.default);
/****
 * Wrapper creation
 */
// Given folders.collection has 5 root folders
const storeMock = (0, storeMock_1.createSearchStoreMocked)({
    folders: (0, FoldersDataMock_1.default)().FoldersData
});
const storeFoldersEmptyMock = (0, storeMock_1.createSearchStoreMocked)({
    folders: Folders_1.default.loaded([])
});
const routerMock = mypulse_shared_dependencies_1.router;
const createWrapper = (store = storeMock) => (0, wrapperFactory_1.default)(ArboCardList_vue_1.default, {
    global: {
        plugins: [store]
    }
});
let wrapper = createWrapper();
const emptyFolderWrapper = createWrapper(storeFoldersEmptyMock);
let arboCardWrappers = findArboCards(wrapper);
describe('ArboCardList', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        arboCardWrappers = findArboCards(wrapper);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('bindings with ArboCard', () => {
        describe('rendering', () => {
            it('should render 5 ArboCards if folders.collection has 5 rootFolder', () => {
                // Then 5 ArboCards must be rendered
                expect(findArboCards(wrapper)).toHaveLength(5);
            });
            it('should render 0 ArboCards if no folders', () => {
                // Then 5 ArboCards must be rendered
                expect(findArboCards(emptyFolderWrapper)).toHaveLength(0);
            });
        });
        describe('props bindings', () => {
            const cases = [
                {
                    arboCardIndex: 0,
                    expectedFolder: (0, FoldersDataMock_1.default)().FoldersData.collection[0],
                    expectedFolderName: 'A classer'
                },
                {
                    arboCardIndex: 1,
                    expectedFolder: (0, FoldersDataMock_1.default)().FoldersData.collection[1],
                    expectedFolderName: 'Autres'
                },
                {
                    arboCardIndex: 2,
                    expectedFolder: (0, FoldersDataMock_1.default)().FoldersData.collection[2],
                    expectedFolderName: 'Banque'
                },
                {
                    arboCardIndex: 3,
                    expectedFolder: (0, FoldersDataMock_1.default)().FoldersData.collection[3],
                    expectedFolderName: 'Achats'
                },
                {
                    arboCardIndex: 4,
                    expectedFolder: (0, FoldersDataMock_1.default)().FoldersData.collection[4],
                    expectedFolderName: 'Ventes'
                }
            ];
            it.each(cases)('should bind correctly the root folders', ({ arboCardIndex, expectedFolder, expectedFolderName }) => {
                // Then ArboCard must have as rootFolder and headerTitle prop the respective folder in the folders.collection
                expect(findArboCards(wrapper)[arboCardIndex].props('rootFolder')).toStrictEqual(expectedFolder);
            });
        });
        describe('events', () => {
            const cases = [
                { arboCardIndex: 0, expectedFolderId: 1122 },
                { arboCardIndex: 1, expectedFolderId: 1233 },
                { arboCardIndex: 2, expectedFolderId: 1234 },
                { arboCardIndex: 3, expectedFolderId: 1235 },
                { arboCardIndex: 4, expectedFolderId: 1236 }
            ];
            it.each(cases)('should go to ArboView with corresponding folderId when ArboCard emits explore-more-clicked', async ({ arboCardIndex, expectedFolderId }) => {
                // When ArboCard emits explore-more-clicked
                await findArboCards(wrapper)[arboCardIndex].vm.$emit('explore-more-clicked');
                // Then router.push must have been called to go to ArboView with correspond folderId
                expect(routerMock.push).toHaveBeenCalledWith({
                    name: 'ArboView',
                    query: { folderId: expectedFolderId }
                });
            });
            it.each(cases)('should go to ArboView with corresponding folderId when ArboCard emits shortcut-clicked', async ({ arboCardIndex, expectedFolderId }) => {
                // When ArboCard emits shortcut-clicked with folderId
                await findArboCards(wrapper)[arboCardIndex].vm.$emit('shortcut-clicked', expectedFolderId);
                // Then router.push must have been called to go to ArboView with correspond folderId
                expect(routerMock.push).toHaveBeenCalledWith({
                    name: 'ArboView',
                    query: { folderId: expectedFolderId }
                });
            });
        });
    });
});
//# sourceMappingURL=ArboCardList.spec.js.map
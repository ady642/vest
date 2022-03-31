"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchTreeItem_vue_1 = require("@/modules/Search/components/Trees/SearchTreeItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const FoldersDataMock_1 = require("../../mocks/FoldersDataMock");
/****
 * Wrapper creation
 */
const defaultProps = {
    folder: (0, FoldersDataMock_1.default)().FoldersData.collection[0],
    isFolderSelected: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(SearchTreeItem_vue_1.default, {
    props
});
let wrapper = createWrapper();
describe('SearchTreeItem', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('rendering', () => {
        it('should render the folder name and the folder children length', () => {
            expect(wrapper.text()).toContain('A classer');
            expect(wrapper.text()).toContain('1');
        });
        it.each([
            {
                isFolderSelected: true,
                activeNameExist: true,
                activeChildrenLength: true
            },
            {
                isFolderSelected: false,
                activeNameExist: false,
                activeChildrenLength: false
            }
        ])('should add active classes when the folder is selected', ({ isFolderSelected, activeChildrenLength, activeNameExist }) => {
            wrapper = createWrapper({
                ...defaultProps,
                isFolderSelected
            });
            expect(wrapper.find('.search-tree__item__name--active').exists()).toBe(activeNameExist);
            expect(wrapper.find('.search-tree__item__children-length--active').exists()).toBe(activeChildrenLength);
        });
    });
});
//# sourceMappingURL=SearchTreeItem.spec.js.map
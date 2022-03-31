"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shortcuts_vue_1 = require("@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcuts.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const Shortcut_vue_1 = require("@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcut.vue");
const FoldersDataMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/FoldersDataMock");
const mypulse_shared_dependencies_1 = require("@kpmg/mypulse-shared-dependencies");
/****
 * Wrapper finders
 */
const findShortcuts = (wrapper) => wrapper.findAllComponents(Shortcut_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    folders: (0, FoldersDataMock_1.default)().FoldersData
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(Shortcuts_vue_1.default, {
    props
});
let wrapper = createWrapper();
let shortcutWrappers = findShortcuts(wrapper);
describe('Shortcuts', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        shortcutWrappers = findShortcuts(wrapper);
    });
    describe('rendering', () => {
        it('should have loading class when folders are loading', () => {
            wrapper = createWrapper({ folders: Folders_1.default.loading() });
            expect(wrapper.classes()).toContain('loading');
        });
    });
    describe('bindings with Shortcut', () => {
        test('props bindings', () => {
            expect(shortcutWrappers).toHaveLength(5);
            expect(shortcutWrappers[0].props('folderName')).toBe('A classer');
        });
        describe('events', () => {
            it('should go to arbo view with correct folder id when click on shortcut', async () => {
                await shortcutWrappers[0].vm.$emit('click');
                expect(mypulse_shared_dependencies_1.router.push).toHaveBeenCalledWith({
                    name: 'ArboView',
                    query: { folderId: 1122 }
                });
            });
        });
    });
});
//# sourceMappingURL=Shortcuts.spec.js.map
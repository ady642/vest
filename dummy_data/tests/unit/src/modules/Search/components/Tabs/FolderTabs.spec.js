"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FolderTabs_vue_1 = require("@/modules/Search/components/Tabs/FolderTabs.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const translationHelper = require("@/Common/hooks/useTranslation");
const NattoTabs_vue_1 = require("@/Common/components/Tabs/NattoTabs.vue");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const defaultFolders = Folders_1.default.loaded([
    {
        id: 1122,
        name: 'Comptabilité',
        parent: { id: 0 },
        children: [],
        properties: {},
        permissions: []
    },
    {
        id: 1233,
        name: 'Gestion Sociale',
        parent: { id: 0 },
        children: [],
        properties: {},
        permissions: []
    }
]);
const { ElTabs, ElTabPane } = (0, useElementStubs_1.default)();
const createWrapper = (folders = defaultFolders) => (0, wrapperFactory_1.default)(FolderTabs_vue_1.default, {
    props: {
        folders
    },
    global: {
        stubs: {
            NattoTabs: NattoTabs_vue_1.default,
            ElTabs,
            ElTabPane
        }
    }
});
const findNattoTabs = (wrapper) => wrapper.findComponent(NattoTabs_vue_1.default);
const tMock = jest.fn((value) => value);
const tcMock = jest.fn();
jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
    t: tMock,
    tc: tcMock
});
let wrapper = createWrapper();
describe('folders-tabs', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings', () => {
        it('props', () => {
            const nattoTabsWrapper = findNattoTabs(wrapper);
            expect(nattoTabsWrapper.props('items')).toStrictEqual([
                { id: 0, name: 0, label: 'ged.search.tabs.label.all' },
                { id: 1122, name: 1122, label: 'Comptabilité' },
                { id: 1233, name: 1233, label: 'Gestion Sociale' }
            ]);
        });
    });
});
//# sourceMappingURL=FolderTabs.spec.js.map
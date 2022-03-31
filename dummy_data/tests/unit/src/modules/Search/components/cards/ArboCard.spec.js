"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const ArboCard_vue_1 = require("@/modules/Search/components/Cards/ArboCard.vue");
const ArboDescription_vue_1 = require("@/modules/Search/components/Cards/ArboDescription.vue");
const FolderShortcutList_vue_1 = require("@/modules/Search/components/Cards/FolderShortcutList.vue");
const ArboExploreButton_vue_1 = require("@/modules/Search/components/Buttons/ArboExploreButton.vue");
const ArboCardTitle_vue_1 = require("@/modules/Search/components/Cards/ArboCardTitle.vue");
const NattoCard_vue_1 = require("@/Common/components/Cards/NattoCard.vue");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const analyticsLog_1 = require("@/Common/helpers/analyticsLog");
jest.mock('@/Common/helpers/analyticsLog', () => ({
    trackEventFactory: jest.fn()
}));
const foldersData = Folders_1.default.loaded([
    {
        id: 1122,
        name: 'Comptabilité',
        parent: { id: 0 },
        children: [
            {
                id: 1223,
                name: 'Depot',
                parent: { id: 1122 },
                children: [],
                properties: {
                    defaultUpload: true
                },
                permissions: []
            }
        ],
        properties: { folderDescription: 'Ranger les documents' },
        permissions: []
    },
    {
        id: 1233,
        name: 'Gestion Sociale',
        parent: { id: 0 },
        children: [
            {
                id: 1223,
                name: 'Depot',
                parent: { id: 1122 },
                children: [],
                properties: {
                    defaultUpload: true,
                    isShortcut: 'SH Depot',
                    tracingName: 'KPMG/Test'
                },
                permissions: []
            }
        ],
        properties: {
            tracingName: 'Accounting'
        },
        permissions: []
    }
]);
const storeMock = (0, storeMock_1.createSearchStoreMocked)({ folders: foldersData });
const defaultProps = {
    rootFolder: foldersData.collection[0]
};
const { MpButton } = (0, useStyleguideStubs_1.default)();
const { ElCard } = (0, useElementStubs_1.default)();
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(ArboCard_vue_1.default, {
    props,
    global: {
        plugins: [storeMock],
        stubs: {
            ArboDescription: ArboDescription_vue_1.default,
            ArboExploreButton: ArboExploreButton_vue_1.default,
            MpButton,
            NattoCard: NattoCard_vue_1.default,
            ElCard
        }
    }
});
const findArboCardTitle = (wrapper) => wrapper.findComponent(ArboCardTitle_vue_1.default);
const findFolderShortcutList = (wrapper) => wrapper.findComponent(FolderShortcutList_vue_1.default);
let wrapper = createWrapper();
let arboCardTitleWrapper = findArboCardTitle(wrapper);
let folderShortcutListWrapper = findFolderShortcutList(wrapper);
describe('ArboCard', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        arboCardTitleWrapper = findArboCardTitle(wrapper);
        jest.clearAllMocks();
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should bind rootFolder correctly ', () => {
                expect(wrapper.props('rootFolder')).toStrictEqual(defaultProps.rootFolder);
            });
            it('Should bind headerTitle correctly ', () => {
                expect(arboCardTitleWrapper.props('title')).toStrictEqual('Comptabilité');
            });
            describe('binding with arbo description', () => {
                it('Should pass correct value to child component', () => {
                    const ArboDescriptionWrapper = wrapper.findComponent(ArboDescription_vue_1.default);
                    expect(ArboDescriptionWrapper.props('description')).toBe('Ranger les documents');
                });
            });
        });
    });
    describe('FolderShortcutList', () => {
        it('Should bind rootFolder correctly ', () => {
            wrapper = createWrapper({
                rootFolder: foldersData.collection[1]
            });
            const shortcutListWrapper = wrapper.findComponent(FolderShortcutList_vue_1.default);
            expect(shortcutListWrapper.props('folderShortcuts')).toHaveLength(1);
            expect(shortcutListWrapper.props('folderShortcuts')[0]).toStrictEqual(foldersData.collection[1].children[0]);
        });
        describe('events', () => {
            const cases = [
                {
                    // Folder WITHOUT tracingName
                    rootFolder: foldersData.collection[0],
                    expectedTrackEventCalled: false
                },
                {
                    // Folder WITH tracingName
                    rootFolder: foldersData.collection[1],
                    expectedTrackEventCalled: true
                }
            ];
            describe('Should fire explore-more-clicked when explore-plus-button emit click event', () => {
                test.each(cases)('test mdv-cta-arbo-card-explore-click event and explore-more-clicked event', async ({ rootFolder, expectedTrackEventCalled }) => {
                    wrapper = createWrapper({ rootFolder });
                    folderShortcutListWrapper = findFolderShortcutList(wrapper);
                    await folderShortcutListWrapper.vm.$emit('explore-more-clicked');
                    if (expectedTrackEventCalled) {
                        expect(analyticsLog_1.trackEventFactory).toHaveBeenCalledWith('mdv-cta-arbo-card-explore-click', 'Accounting');
                    }
                    else {
                        expect(analyticsLog_1.trackEventFactory).not.toHaveBeenCalled();
                    }
                    expect(wrapper.emitted('explore-more-clicked')).toBeTruthy();
                });
            });
            describe('Should fire shortcut-clicked when folder-shortcut-click emit click event', () => {
                test.each(cases)('test mdv-cta-arbo-card-shortcut-click event and explore-more-clicked event', async ({ rootFolder, expectedTrackEventCalled }) => {
                    wrapper = createWrapper({
                        rootFolder
                    });
                    const shortcutListWrapper = wrapper.findComponent(FolderShortcutList_vue_1.default);
                    await shortcutListWrapper.vm.$emit('folder-shortcut-click', {
                        shortcutFolder: foldersData.collection[1].children[0],
                        shortcutIndex: 0
                    });
                    if (expectedTrackEventCalled) {
                        expect(analyticsLog_1.trackEventFactory).toHaveBeenCalledWith('mdv-cta-arbo-card-shortcut-click', 'Accounting', 1, 'KPMG/Test');
                    }
                    else {
                        expect(analyticsLog_1.trackEventFactory).not.toHaveBeenCalled();
                    }
                    expect(wrapper.emitted()['shortcut-clicked']).toBeTruthy();
                    expect(wrapper.emitted()['shortcut-clicked']).toHaveLength(1);
                    expect(wrapper.emitted()['shortcut-clicked'][0]).toStrictEqual([
                        1223
                    ]);
                });
            });
        });
    });
});
//# sourceMappingURL=ArboCard.spec.js.map
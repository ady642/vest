"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentSyncStatusItem_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentSyncStatusItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentMock_1 = require("dummy_data/tests/unit/src/modules/Search/mocks/DocumentMock");
const NattoButton_vue_1 = require("@/Common/components/Buttons/NattoButton.vue");
const GedSyncStatusIcon_vue_1 = require("@/Common/components/Icons/GedSyncStatusIcon.vue");
const constants_1 = require("@/Common/constants");
const createWrapper = (document) => (0, wrapperFactory_1.default)(DocumentSyncStatusItem_vue_1.default, {
    props: {
        document
    },
    global: {
        stubs: {
            NattoButton: NattoButton_vue_1.default,
            GedSyncStatusIcon: GedSyncStatusIcon_vue_1.default
        }
    }
});
const wrapper = createWrapper(DocumentMock_1.DocumentMock);
describe('DocumentSyncStatusItem', () => {
    describe('rendering', () => {
        it('should render icons  properly', async () => {
            const DocumentSyncStatusItemWrapper = wrapper.findComponent(DocumentSyncStatusItem_vue_1.default);
            const NattoButtonWrapper = DocumentSyncStatusItemWrapper.findComponent(NattoButton_vue_1.default);
            const syncPendingIconWrapper = NattoButtonWrapper.find('.sync-pending');
            expect(syncPendingIconWrapper.exists).toBeTruthy();
        });
    });
    describe('binding', () => {
        it('Should bind correctly the syncStatus prop', () => {
            const DocumentSyncStatusItemWrapper = wrapper.findComponent(DocumentSyncStatusItem_vue_1.default);
            const NattoButtonWrapper = DocumentSyncStatusItemWrapper.findComponent(NattoButton_vue_1.default);
            const GedSyncStatusIconWrapper = NattoButtonWrapper.findComponent(GedSyncStatusIcon_vue_1.default);
            expect(GedSyncStatusIconWrapper.props('syncStatus')).toBe(constants_1.default.PENDING_SYNC);
        });
    });
});
//# sourceMappingURL=DocumentSyncStatusItem.spec.js.map
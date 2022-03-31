"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentDetailsDrawerTabs_vue_1 = require("@/modules/Search/components/Tabs/DocumentDetailsDrawerTabs.vue");
const NattoTabs_vue_1 = require("@/Common/components/Tabs/NattoTabs.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const translationHelper = require("@/Common/hooks/useTranslation");
const DocumentDetailsTab_vue_1 = require("@/modules/Search/components/Drawer/DocumentDetailsTab.vue");
const DocumentDetailsBanner_vue_1 = require("@/modules/Search/components/Drawer/DocumentDetailsBanner.vue");
const constants_1 = require("@/Common/constants");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const document = new Document_1.default({
    id: 'myID',
    name: 'Mon bilan comptable',
    type: '.pdf',
    created: '2018-05-27',
    createdBy: 'luffy',
    updated: '2018-05-29',
    folder: { id: 45454, path: [] },
    properties: {
        syncStatus: constants_1.default.PENDING_SYNC,
        'Total Excluding VAT': 0,
        'Scanner Source': ''
    },
    size: 54545,
    preview: { href: 'preview-href' },
    restorationStatus: '',
    folderId: 0,
    comments: '',
    creationDate: '',
    account: { id: '', name: '' },
    content: { href: '' },
    isUploadedInGedLoop: false,
    updatedBy: '',
    lifecycleStatus: Document_1.LifeCycleStatus.Treated
});
const documentCertified = new Document_1.default({
    id: 'myID',
    name: 'Mon bilan comptable',
    type: '.pdf',
    created: '2018-05-27',
    createdBy: 'luffy',
    updated: '2018-05-29',
    folder: { id: 45454, path: [] },
    properties: {
        syncStatus: constants_1.default.PENDING_SYNC,
        'Total Excluding VAT': 0,
        'Scanner Source': '',
        HasSubscribedToVault: 'true'
    },
    size: 54545,
    preview: { href: 'preview-href' },
    restorationStatus: '',
    folderId: 0,
    comments: '',
    creationDate: '',
    account: { id: '', name: '' },
    content: { href: '' },
    isUploadedInGedLoop: false,
    updatedBy: '',
    lifecycleStatus: Document_1.LifeCycleStatus.Treated
});
const defaultProps = {
    document
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentDetailsDrawerTabs_vue_1.default, {
    props,
    global: {
        stubs: {
            NattoTabs: NattoTabs_vue_1.default,
            DocumentDetailsTab: DocumentDetailsTab_vue_1.default,
            DocumentDetailsBanner: DocumentDetailsBanner_vue_1.default
        },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
const findDocumentDetailsBanner = (wrapper) => wrapper.findComponent({ name: 'document-details-banner' });
let tMock = jest.fn();
let tcMock = jest.fn();
jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
    t: tMock,
    tc: tcMock
});
describe('DocumentDetailsDrawerTabs', () => {
    beforeEach(() => {
        tMock = jest.fn();
        tcMock = jest.fn();
        jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
            t: tMock,
            tc: tcMock
        });
    });
    describe('bindings', () => {
        it('Should have liste of tab passed and strech', () => {
            const wrapper = createWrapper();
            const NattoTabsWrapper = wrapper.findComponent(NattoTabs_vue_1.default);
            expect(NattoTabsWrapper.props('items')).toHaveLength(1);
            expect(NattoTabsWrapper.props('stretch')).toBe(true);
        });
        it('Should have two tab when a document is certifed', () => {
            const props = {
                document: documentCertified
            };
            const wrapperCertif = createWrapper(props);
            const NattoTabsWrapper = wrapperCertif.findComponent(NattoTabs_vue_1.default);
            expect(NattoTabsWrapper.props('items')).toHaveLength(2);
            expect(NattoTabsWrapper.props('stretch')).toBe(true);
        });
    });
});
//# sourceMappingURL=DocumentDetailsDrawerTabs.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("@vue/test-utils");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentDetailsDrawer_vue_1 = require("@/modules/Search/components/Drawer/DocumentDetailsDrawer.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const constants_1 = require("@/Common/constants");
const DocumentDetailsDrawerTabs_vue_1 = require("@/modules/Search/components/Tabs/DocumentDetailsDrawerTabs.vue");
const Document_1 = require("@/modules/Search/models/Documents/Inputs/Document");
const Properties_1 = require("@/modules/Search/models/Documents/Inputs/Properties");
const NattoDrawer_vue_1 = require("@/Common/components/Drawer/NattoDrawer.vue");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const store_1 = require("@/modules/Search/store");
const { MpIcon } = (0, useStyleguideStubs_1.default)();
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
const defaultProps = {
    opened: true,
    document
};
const findNattoDrawer = (wrapper) => wrapper.findComponent(NattoDrawer_vue_1.default);
const findPreviewModal = (wrapper) => wrapper.findComponent({ name: 'preview-modal' });
const findCertifiedTagDrawer = (wrapper) => wrapper.findComponent({ name: 'certified-tag-drawer' });
const findDocumentDetailsDrawerTabs = (wrapper) => wrapper.findComponent({ name: 'document-details-drawer-tabs' });
const { ElDrawer } = (0, useElementStubs_1.default)();
const createWrapper = ({ props = defaultProps, store = (0, storeMock_1.createSearchStoreMocked)() } = {}) => (0, wrapperFactory_1.default)(DocumentDetailsDrawer_vue_1.default, {
    props,
    global: {
        plugins: [store],
        stubs: {
            MpIcon,
            DocumentDetailsDrawerTabs: DocumentDetailsDrawerTabs_vue_1.default,
            NattoDrawer: NattoDrawer_vue_1.default,
            ElDrawer
        },
        directives: {
            ClickOutside: {}
        }
    }
});
let wrapper = createWrapper();
describe('DocumentDetailsDrawer', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('props', () => {
        it.each([
            { type: '.pdf', downloadVisualization: true },
            { type: '.doc', downloadVisualization: false }
        ])('should reset visualization and fetch an other visualization when the document change', async ({ type, downloadVisualization }) => {
            const storeMock = (0, storeMock_1.createSearchStoreMocked)();
            storeMock.dispatch = jest.fn();
            wrapper = createWrapper({
                store: storeMock
            });
            await wrapper.setProps({
                document: new Document_1.default({ id: 2705, type })
            });
            await (0, test_utils_1.flushPromises)();
            expect(storeMock.dispatch).toHaveBeenCalledWith((0, store_1.searchModule)('resetVisualization'));
            if (downloadVisualization) {
                expect(storeMock.dispatch).toHaveBeenCalledWith((0, store_1.searchModule)('downloadVisualization'), 2705);
            }
            else {
                expect(storeMock.dispatch).not.toHaveBeenCalledWith((0, store_1.searchModule)('downloadVisualization'), 2705);
            }
        });
    });
    describe('binding', () => {
        describe('NattoDrawer', () => {
            it('Should bind with opened', async () => {
                expect(findNattoDrawer(wrapper).props('opened')).toStrictEqual(true);
            });
        });
        describe('props', () => {
            it('Should bind with document', async () => {
                const details = wrapper.findComponent(DocumentDetailsDrawerTabs_vue_1.default);
                expect(details.props('document')).toEqual({
                    comments: '',
                    createdBy: 'luffy',
                    id: 'myID',
                    folderId: 45454,
                    name: 'Mon bilan comptable',
                    creationDate: '2018-05-27',
                    path: [],
                    properties: new Properties_1.default({ syncStatus: constants_1.default.PENDING_SYNC }),
                    restorationStatus: '',
                    size: 54545,
                    type: '.pdf',
                    updatedDate: '2018-05-29',
                    preview: 'preview-href',
                    lifecycleStatus: Document_1.LifeCycleStatus.Treated
                });
            });
        });
    });
    describe('bindings with PreviewModal', () => {
        describe('props', () => {
            it('static props', async () => {
                //When the banner emits click
                await findDocumentDetailsDrawerTabs(wrapper).vm.$emit('open-preview');
                // Given the document is set
                // Then the PreviewModal must have this document as prop
                const previewModalWrapper = findPreviewModal(wrapper);
                expect(previewModalWrapper.props('document')).toStrictEqual(document);
                expect(previewModalWrapper.props('modelValue')).toStrictEqual(true);
            });
        });
        describe('events bindings', () => {
            it('should close the modal when PreviewModal emit an update:modelValue event with false as payload', async () => {
                //When the banner emits open-preview
                await findDocumentDetailsDrawerTabs(wrapper).vm.$emit('open-preview');
                // Then the previewModal must exist
                expect(findPreviewModal(wrapper).exists()).toBe(true);
                // When PreviewModal emit update:modelValue with false
                await findPreviewModal(wrapper).vm.$emit('update:modelValue', false);
                // Then the previewModal must not exist
                expect(findPreviewModal(wrapper).exists()).toBe(false);
            });
            it('should close the drawer when PreviewModal emit a delete event', async () => {
                //When the banner emits click
                await findDocumentDetailsDrawerTabs(wrapper).vm.$emit('open-preview');
                // Then the previewModal must exist
                expect(findPreviewModal(wrapper).exists()).toBe(true);
                // When PreviewModal emit update:modelValue with true
                await findPreviewModal(wrapper).vm.$emit('delete');
                // Then the drawer must be closed
                expect(wrapper.emitted('update:opened')).toStrictEqual([[false]]);
            });
        });
    });
    describe('bindings with CertifiedTagDrawer', () => {
        describe('rendering', () => {
            it('should render the certifiedTag if the document has the property hasSubscribedToVault at true', () => {
                const document = new Document_1.default();
                document.properties.hasSubscribedToVault = true;
                wrapper = createWrapper({ props: { ...defaultProps, document } });
                expect(findCertifiedTagDrawer(wrapper).exists()).toBe(true);
            });
        });
    });
    describe('bindings with DocumentDetailsDrawerTabs', () => {
        describe('events', () => {
            it('should dispatch downloadDocument when download-clicked is emitted', async () => {
                const store = (0, storeMock_1.createSearchStoreMocked)();
                store.dispatch = jest.fn();
                wrapper = createWrapper({
                    store
                });
                const documentDetailsDrawerTabs = findDocumentDetailsDrawerTabs(wrapper);
                await documentDetailsDrawerTabs.vm.$emit('download-clicked');
                expect(store.dispatch).toHaveBeenCalledWith((0, store_1.searchModule)('downloadDocument'), 'myID');
            });
        });
    });
});
//# sourceMappingURL=DocumentDetailsDrawer.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WhoUploadModal_vue_1 = require("@/modules/DataManipulation/Upload/components/WhoUploadModal/WhoUploadModal.vue");
const NattoUploadTypePopup_vue_1 = require("@/Common/components/Modals/NattoUploadTypePopup.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const Folders_1 = require("@/modules/Search/models/Folders/Inputs/Folders");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElButton } = (0, useElementStubs_1.default)();
const createWrapper = (folders = Folders_1.default.loading(), modelValue) => (0, wrapperFactory_1.default)(WhoUploadModal_vue_1.default, {
    global: {
        stubs: {
            NattoUploadTypePopup: NattoUploadTypePopup_vue_1.default,
            ElButton
        }
    },
    propsData: {
        folders,
        modelValue
    }
});
let wrapper = createWrapper(Folders_1.default.loaded([
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
]), true);
describe('WhoUploadModal', () => {
    describe('binding', () => {
        beforeEach(() => {
            wrapper = wrapper = createWrapper(Folders_1.default.loaded([
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
            ]), true);
        });
        describe('props', () => {
            it('Should bind correctly the folders prop', () => {
                const NattoUploadTypePopupWrapper = wrapper.findComponent(NattoUploadTypePopup_vue_1.default);
                expect(NattoUploadTypePopupWrapper.props('folders')).toStrictEqual(wrapper.vm.folders);
            });
            it('Should bind correctly the modelValue prop', () => {
                const NattoUploadTypePopupWrapper = wrapper.findComponent(NattoUploadTypePopup_vue_1.default);
                expect(NattoUploadTypePopupWrapper.props('modelValue')).toEqual(wrapper.vm.modelValue);
            });
        });
    });
    describe('events', () => {
        it('Should emit popup-folder-select-close when NattoUploadTypePopup emit popup-folder-select-close', async () => {
            const NattoUploadTypePopupWrapper = wrapper.findComponent(NattoUploadTypePopup_vue_1.default);
            await NattoUploadTypePopupWrapper.vm.$emit('popup-folder-select-close');
            expect(wrapper.emitted('popup-folder-select-close')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=WhoUploadModal.spec.js.map
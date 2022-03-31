"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainHeader_vue_1 = require("@/modules/Search/components/Headers/MainHeader.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoHeader_vue_1 = require("@/Common/components/Header/NattoHeader.vue");
const DocumentsUploadBtn_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { MpTitle } = (0, useStyleguideStubs_1.default)();
const createWrapper = (disabled, hasAccessDs, isMainViewBtn) => (0, wrapperFactory_1.default)(MainHeader_vue_1.default, {
    props: {
        disabled,
        hasAccessDs,
        isMainViewBtn
    },
    global: {
        stubs: { NattoHeader: NattoHeader_vue_1.default, DocumentsUploadBtn: DocumentsUploadBtn_vue_1.default, MpTitle },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let wrapper = createWrapper(false, true, true);
const findNattoHeader = (wrapper) => wrapper.findComponent(NattoHeader_vue_1.default);
describe('MainHeader', () => {
    describe('bindings', () => {
        describe('props', () => {
            it('should bind the title to the NattoHeader title prop', () => {
                // Given the title is equal to 'Mes Documents'
                wrapper = createWrapper(false, true, true);
                // Then NattoHeader should have 'Mes Documents' as title prop
                const NattoHeaderWrapper = findNattoHeader(wrapper);
                expect(NattoHeaderWrapper.attributes().title).toBe('ged.title');
            });
            it('should bind the subtitle to the NattoHeader subtitle prop', () => {
                // Given the subtitle is equal to 'l'activité de votre GED'
                wrapper = createWrapper(false, true, true);
                // Then NattoHeader should have 'l'activité de votre GED' as subtitle prop
                const NattoHeaderWrapper = findNattoHeader(wrapper);
                expect(NattoHeaderWrapper.attributes().subtitle).toBe('ged.subTitle');
            });
        });
    });
    describe('bindings with documents-upload-btn', () => {
        it('Should pass correct disabled to child component', () => {
            const DocumentsUploadBtnWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
            expect(wrapper.props('disabled')).toBe(DocumentsUploadBtnWrapper.props('disabled'));
        });
        it('Should pass correct hasAccessDs to child component', () => {
            const DocumentsUploadBtnWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
            expect(wrapper.props('hasAccessDs')).toBe(DocumentsUploadBtnWrapper.props('hasAccessDs'));
        });
        it('Should pass correct isMainViewBtn to child component', () => {
            const DocumentsUploadBtnWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
            expect(wrapper.props('isMainViewBtn')).toBe(DocumentsUploadBtnWrapper.props('isMainViewBtn'));
        });
    });
    describe('events', () => {
        it('Should emit upload-triggered when on-files-change fired', () => {
            const uploadbWrapper = wrapper.findComponent(DocumentsUploadBtn_vue_1.default);
            const content = 'mock content';
            const data = new Blob([content], { type: 'application/zip' });
            const arrayOfBlob = new Array();
            arrayOfBlob.push(data);
            const mockZip = new File(arrayOfBlob, 'Mock.zip');
            const mockZip2 = new File(arrayOfBlob, 'Mock2.zip');
            const files = new Array();
            files.push(mockZip);
            files.push(mockZip2);
            uploadbWrapper.vm.$emit('on-files-change', files);
            expect(wrapper.emitted()['upload-triggered']).toBeTruthy();
            expect(wrapper.emitted()['upload-triggered']).toHaveLength(1);
            expect(wrapper.emitted()['upload-triggered'][0]).toStrictEqual([files]);
        });
    });
});
//# sourceMappingURL=MainHeader.spec.js.map
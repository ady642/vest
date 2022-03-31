"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const MainViewLayout_vue_1 = require("@/modules/Search/components/Layouts/MainViewLayout.vue");
const BasicLayout_vue_1 = require("@/modules/Search/components/Layouts/BasicLayout.vue");
const MainHeader_vue_1 = require("@/modules/Search/components/Headers/MainHeader.vue");
const DocumentsUploadBox_vue_1 = require("@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBox.vue");
const createWrapper = (categorySlot = '', dragFileSlot = '', disabled, hasAccessDs, isMainViewBtn, tree = '') => (0, wrapperFactory_1.default)(MainViewLayout_vue_1.default, {
    props: {
        hasAccessDs,
        isMainViewBtn,
        disabled
    },
    slots: {
        category: categorySlot,
        dragfile: dragFileSlot,
        tree
    },
    global: {
        stubs: {
            BasicLayout: BasicLayout_vue_1.default,
            MainHeader: MainHeader_vue_1.default,
            DocumentsUploadBox: DocumentsUploadBox_vue_1.default
        },
        renderStubDefaultSlot: true
    }
});
describe('MainViewLayout', () => {
    describe('rendering', () => {
        it('When Category slots exist should display the conntent', () => {
            const wrapper = createWrapper('<div id="searchme">nice div</div>', '', true, true, false);
            const categorySlotWrapper = wrapper.find('#searchme');
            expect(categorySlotWrapper.text()).toBe('nice div');
        });
        it('When DragFile slots exist should display the conntent', () => {
            const wrapper = createWrapper('', '<div id="searchmeDragFile">nice div dragfile</div>', true, true, false);
            const dragFileSlot = wrapper.find('#searchmeDragFile');
            expect(dragFileSlot.text()).toBe('nice div dragfile');
        });
    });
    describe('MainHeader bindings', () => {
        it('Should pass the correct disabled prop to child component ', () => {
            const wrapper = createWrapper('', '<div id="searchmeDragFile">nice div dragfile</div>', true, true, false);
            const MainHeaderWrapper = wrapper.findComponent(MainHeader_vue_1.default);
            expect(wrapper.props('disabled')).toBe(MainHeaderWrapper.props('disabled'));
        });
        it('Should pass the correct hasAccessDs prop to child component ', () => {
            const wrapper = createWrapper('', '<div id="searchmeDragFile">nice div dragfile</div>', true, true, false);
            const MainHeaderWrapper = wrapper.findComponent(MainHeader_vue_1.default);
            expect(wrapper.props('hasAccessDs')).toBe(MainHeaderWrapper.props('hasAccessDs'));
        });
        it('Should pass the correct isMainViewBtn prop to child component ', () => {
            const wrapper = createWrapper('', '<div id="searchmeDragFile">nice div dragfile</div>', true, true, false);
            const MainHeaderWrapper = wrapper.findComponent(MainHeader_vue_1.default);
            expect(wrapper.props('isMainViewBtn')).toBe(MainHeaderWrapper.props('isMainViewBtn'));
        });
        describe('events', () => {
            it('Should emit upload-triggered when on-files-change fired', () => {
                const wrapper = createWrapper('', '<div id="searchmeDragFile">nice div dragfile</div>', true, true, false);
                const mainHeaderWrapper = wrapper.findComponent(MainHeader_vue_1.default);
                const content = 'mock content';
                const data = new Blob([content], { type: 'application/zip' });
                const arrayOfBlob = new Array();
                arrayOfBlob.push(data);
                const mockZip = new File(arrayOfBlob, 'Mock.zip');
                const mockZip2 = new File(arrayOfBlob, 'Mock2.zip');
                const files = new Array();
                files.push(mockZip);
                files.push(mockZip2);
                mainHeaderWrapper.vm.$emit('upload-triggered', files);
                expect(wrapper.emitted()['upload-triggered']).toBeTruthy();
                expect(wrapper.emitted()['upload-triggered']).toHaveLength(1);
                expect(wrapper.emitted()['upload-triggered'][0]).toStrictEqual([files]);
            });
        });
    });
});
//# sourceMappingURL=MainViewLayout.spec.js.map
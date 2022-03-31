"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoDropZone_vue_1 = require("@/Common/components/Upload/NattoDropZone.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const dataTransferHelper = require("@/Common/helpers/dataTransferHelper");
const fileMock = new File([''], 'filename', { type: 'text/html' });
jest
    .spyOn(dataTransferHelper, 'getFilesFromDataTransfer')
    .mockReturnValue(Promise.resolve([fileMock]));
const createWrapper = ({ disabled, dragOverDisabledClass, dragOverEnabledClass }) => (0, wrapperFactory_1.default)(NattoDropZone_vue_1.default, {
    props: {
        disabled,
        dragOverDisabledClass,
        dragOverEnabledClass
    }
});
const renderingTestCases = [
    {
        dragOver: false,
        props: {
            disabled: false,
            dragOverDisabledClass: 'drag-over-disabled',
            dragOverEnabledClass: 'drag-over-enabled'
        },
        expectedClasses: 'natto-dropzone__container'
    },
    {
        dragOver: true,
        props: {
            disabled: false,
            dragOverDisabledClass: 'drag-over-disabled',
            dragOverEnabledClass: 'drag-over-enabled'
        },
        expectedClasses: 'natto-dropzone__container natto-dropzone__container--dragged-over drag-over-enabled'
    },
    {
        dragOver: false,
        props: {
            disabled: true,
            dragOverDisabledClass: 'drag-over-disabled',
            dragOverEnabledClass: 'drag-over-enabled'
        },
        expectedClasses: 'natto-dropzone__container'
    },
    {
        dragOver: true,
        props: {
            disabled: true,
            dragOverDisabledClass: 'drag-over-disabled',
            dragOverEnabledClass: 'drag-over-enabled'
        },
        expectedClasses: 'natto-dropzone__container drag-over-disabled'
    }
];
describe('NattoDropZone', () => {
    describe('events', () => {
        it('Should emits files-changes when files dropped', async () => {
            const wrapper = createWrapper({
                disabled: false,
                dragOverDisabledClass: 'drag-over-disabled',
                dragOverEnabledClass: 'drag-over-enabled'
            });
            wrapper.trigger('drop', { dataTransfer: 'awesome-dataTransfer-object' });
            await wrapper.vm.$nextTick();
            const response = wrapper.emitted()['files-changes'][0];
            expect(response[0]).toStrictEqual([fileMock]);
        });
    });
    describe('rendering', () => {
        test.each(renderingTestCases)('When drag disabled=$props.disabled and dragOver=$dragOver', async ({ props, dragOver, expectedClasses }) => {
            const wrapper = createWrapper(props);
            if (dragOver) {
                wrapper.trigger('dragover');
            }
            await wrapper.vm.$nextTick();
            expect(wrapper.classes().join(' ')).toBe(expectedClasses);
        });
    });
});
//# sourceMappingURL=NattoDragDropZone.spec.js.map
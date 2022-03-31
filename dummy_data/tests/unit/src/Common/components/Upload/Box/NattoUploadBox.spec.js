"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoUploadBox_vue_1 = require("@/Common/components/Upload/Box/NattoUploadBox.vue");
const UploadBoxIcon_vue_1 = require("@/Common/components/Icons/UploadBoxIcon.vue");
const WaitIcon_vue_1 = require("@/Common/components/Icons/WaitIcon.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoDropZone_vue_1 = require("@/Common/components/Upload/NattoDropZone.vue");
const translationHelper = require("@/Common/hooks/useTranslation");
const defaultProps = {
    supportedTypes: ['ext1', 'ext2'],
    disabled: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoUploadBox_vue_1.default, {
    props,
    global: {
        stubs: {
            WaitIcon: WaitIcon_vue_1.default,
            UploadBoxIcon: UploadBoxIcon_vue_1.default,
            NattoDropZone: NattoDropZone_vue_1.default
        },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let tMock = jest.fn();
let tcMock = jest.fn();
jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
    t: tMock,
    tc: tcMock
});
let wrapper = createWrapper();
let NattoDropZoneWrapper = wrapper.findComponent(NattoDropZone_vue_1.default);
describe('NattoUploadBox', () => {
    beforeEach(() => {
        tMock = jest.fn();
        tcMock = jest.fn();
        jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
            t: tMock,
            tc: tcMock
        });
        wrapper = createWrapper();
        NattoDropZoneWrapper = wrapper.findComponent(NattoDropZone_vue_1.default);
    });
    describe('binding', () => {
        describe('props', () => {
            const cases = [
                {
                    prop: 'supportedTypes',
                    expectedValue: ['ext1', 'ext2']
                },
                {
                    prop: 'disabled',
                    expectedValue: false
                }
            ];
            test.each(cases)('Test binding own props', ({ prop, expectedValue }) => {
                expect(wrapper.props(prop)).toEqual(expectedValue);
            });
            describe('NattoDropZone', () => {
                const cases = [
                    {
                        prop: 'disabled',
                        expectedValue: false
                    }
                ];
                test.each(cases)('Test binding with NattoDropZone', ({ prop, expectedValue }) => {
                    expect(NattoDropZoneWrapper.props(prop)).toEqual(expectedValue);
                });
            });
        });
        describe('events', () => {
            describe('NattoUploadBox', () => {
                it('Should emit on-files-change on files-changes', async () => {
                    NattoDropZoneWrapper.vm.$emit('files-changes', [
                        new File([''], 'File 1')
                    ]);
                    expect(wrapper.emitted('on-files-change')).toHaveLength(1);
                    expect(wrapper.emitted('on-files-change')).toEqual([
                        [[new File([''], 'File 1')]]
                    ]);
                });
            });
            describe('input', () => {
                it('Should emit on-files-change when change event fired one or multiple time', async () => {
                    const InputFileWrapper = wrapper.find('.uploadInput');
                    InputFileWrapper.trigger('change');
                    expect(wrapper.emitted('on-files-change')).toHaveLength(1);
                    InputFileWrapper.trigger('change');
                    expect(wrapper.emitted('on-files-change')).toHaveLength(2);
                });
            });
        });
        describe('rendering', () => {
            describe('enabled state', () => {
                it('Should have the proper ui specs: Icon', () => {
                    const NattoUploadBoxWrapper = wrapper.findComponent(UploadBoxIcon_vue_1.default);
                    expect(NattoUploadBoxWrapper.exists()).toBeTruthy();
                });
            });
            describe('disabled state', () => {
                it('Should have the proper ui specs: Icon', () => {
                    wrapper = createWrapper({
                        supportedTypes: ['ext1', 'ext2'],
                        disabled: true
                    });
                    const NattoUploadBoxWrapper = wrapper.findComponent(WaitIcon_vue_1.default);
                    expect(NattoUploadBoxWrapper.exists()).toBeTruthy();
                });
            });
        });
    });
});
//# sourceMappingURL=NattoUploadBox.spec.js.map
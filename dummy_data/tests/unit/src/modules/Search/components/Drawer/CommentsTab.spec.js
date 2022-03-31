"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const storeMock_1 = require("tests/unit/__mocks__/storeMock");
const CommentsTab_vue_1 = require("@/modules/Search/components/Drawer/CommentsTab.vue");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElInput } = (0, useElementStubs_1.default)();
const { MpInput } = (0, useStyleguideStubs_1.default)();
const defaultProps = {
    documentId: 'test',
    commentDate: 'test',
    currentComment: ''
};
let storeMock = (0, storeMock_1.createSearchStoreMocked)();
const createWrapper = (store = storeMock, props = defaultProps) => (0, wrapperFactory_1.default)(CommentsTab_vue_1.default, {
    props,
    global: {
        plugins: [store],
        stubs: { ElInput, MpInput },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
const findMpInput = (wrapper) => wrapper.findComponent({ name: 'mp-input' });
let wrapper = createWrapper();
describe('CommentsTab', () => {
    beforeEach(() => {
        storeMock = (0, storeMock_1.createSearchStoreMocked)();
        storeMock.dispatch = jest.fn();
        wrapper = createWrapper();
    });
    describe('binding with MpInput', () => {
        describe('props', () => {
            it('Should pass the correct modelValue', () => {
                wrapper = createWrapper(storeMock);
                const input = findMpInput(wrapper);
                expect(input.props('modelValue')).toStrictEqual('');
            });
        });
        describe('events', () => {
            it('Should dispatch patch document on input change ', async () => {
                const input = wrapper.findComponent(MpInput);
                await input.vm.$emit('update:modelValue', 'test');
                await input.vm.$emit('change');
                expect(storeMock.dispatch).toHaveBeenCalledWith('GED/Search/patchDocumentComment', { documentId: 'test', value: 'test' });
            });
            it('Should not dispatch patch document on input change when input is an empty string ', async () => {
                const input = wrapper.findComponent(MpInput);
                await input.vm.$emit('update:modelValue', '');
                await input.vm.$emit('change');
                expect(storeMock.dispatch).toHaveBeenCalledTimes(0);
            });
        });
    });
});
//# sourceMappingURL=CommentsTab.spec.js.map
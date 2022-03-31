"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoPagination_vue_1 = require("@/Common/components/Paging/NattoPagination.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { MpPagination } = (0, useStyleguideStubs_1.default)();
const createWrapper = (itemsTotal, pageSize, pageNumber) => (0, wrapperFactory_1.default)(NattoPagination_vue_1.default, {
    props: {
        itemsTotal,
        pageSize,
        pageNumber
    },
    global: {
        stubs: { MpPagination }
    }
});
let wrapper = createWrapper(100, 10, 10);
describe('NattoPagination', () => {
    beforeEach(() => {
        wrapper = createWrapper(100, 10, 10);
    });
    describe('bindings', () => {
        describe('props', () => {
            it('Should send correctly props to MpPagination', () => {
                const mpPaginationWrapper = wrapper.findComponent(MpPagination);
                expect(mpPaginationWrapper.attributes('page-size')).toBe('10');
                expect(mpPaginationWrapper.attributes('total')).toBe('100');
                expect(mpPaginationWrapper.attributes('page-count')).toBe('10');
                expect(mpPaginationWrapper.attributes('current-page')).toBe('10');
            });
        });
    });
    describe('events', () => {
        test('Paging should trigger an page-opened event when MpPagination emits a current-change event', () => {
            const mpPaginationWrapper = wrapper.findComponent(MpPagination);
            mpPaginationWrapper.vm.$emit('current-change', 3);
            expect(wrapper.emitted('page-opened')).toEqual([[3]]);
            expect(wrapper.emitted('page-opened')).toBeTruthy();
        });
    });
});
//# sourceMappingURL=NattoPagination.spec.js.map
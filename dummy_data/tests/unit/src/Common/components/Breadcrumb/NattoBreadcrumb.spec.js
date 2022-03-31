"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoBreadcrumb_vue_1 = require("./dummy_data/src/Common/components/Breadcrumb/NattoBreadcrumb.vue");
const wrapperFactory_1 = require("tests/unit/utils/wrapperFactory");
const defaultProps = {
    breadcrumbs: undefined, disabledBreadcrumbs: true, ellipsed: true
};
const createWrapper = ({ props = defaultProps, } = {}) => (0, wrapperFactory_1.default)(NattoBreadcrumb_vue_1.default, {
    props
});
let wrapper = createWrapper();
let findMpBreadcrumb = (wrapper) => wrapper.findComponent(MpBreadcrumb);
let MpBreadcrumbWrapper = findMpBreadcrumb(wrapper);
describe(NattoBreadcrumb_vue_1.default, () => {
    beforeEach(() => {
        wrapper = createWrapper();
        MpBreadcrumbWrapper = findMpBreadcrumb(wrapper);
    });
    describe('binding with MpBreadcrumb', () => {
        test('static props', () => {
            expect(MpBreadcrumbWrapper.attributes('breadcrumb-items')).toBe(true)
                , expect(MpBreadcrumbWrapper.attributes('ellipsed')).toBe(true);
        });
    });
    describe('events', () => {
        it('should emit breadcrumb-click when MpBreadcrumb emits breadcrumb-click', () => {
            await MpBreadcrumbWrapper.vm.$emit(breadcrumb - click);
            expect(wrapper.emitted('my-event')).toHaveLength(1);
        });
    });
});
//# sourceMappingURL=NattoBreadcrumb.spec.js.map
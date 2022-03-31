"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoBadge_vue_1 = require("@/Common/components/Badges/NattoBadge.vue");
const OpenFilterButton_vue_1 = require("@/modules/Search/components/Filters/Buttons/OpenFilterButton.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const { ElBadge, ElButton } = (0, useElementStubs_1.default)();
const { MpAdvancedSearchBtn } = (0, useStyleguideStubs_1.default)();
const defaultProps = {
    activeFiltersCount: 0,
    displayAdvancedSearch: true
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(OpenFilterButton_vue_1.default, {
    props,
    global: {
        stubs: { NattoBadge: NattoBadge_vue_1.default, ElButton, ElBadge, MpAdvancedSearchBtn },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let wrapper = createWrapper();
const findMpAdvancedSearchBtn = (wrapper) => wrapper.findComponent(MpAdvancedSearchBtn);
const findNattoBadge = (wrapper) => wrapper.findComponent(NattoBadge_vue_1.default);
let nattoBadgeWrapper = findNattoBadge(wrapper);
let mpAdvancedSearchBtnWrapper = findMpAdvancedSearchBtn(wrapper);
describe('OpenFilterButton', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoBadgeWrapper = findNattoBadge(wrapper);
        mpAdvancedSearchBtnWrapper = findMpAdvancedSearchBtn(wrapper);
    });
    describe('bindings with NattoBadge', () => {
        it('should pass props', () => {
            expect(nattoBadgeWrapper.props().value).toBe(0);
        });
    });
    describe('bindings with MpAdvancedSearchBtn', () => {
        describe('props bindings', () => {
            it('should have active class when advanced filters are opened', () => {
                expect(mpAdvancedSearchBtnWrapper.attributes('active')).toBe('true');
                expect(mpAdvancedSearchBtnWrapper.attributes('text')).toBe('ged.search.input.advanced');
            });
        });
        describe('events', () => {
            it('should trigger an open-advanced-filters event when MpAdvancedSearchBtn emit click', async () => {
                await mpAdvancedSearchBtnWrapper.vm.$emit('click');
                expect(wrapper.emitted('open-advanced-filters')).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=OpenFilterButton.spec.js.map
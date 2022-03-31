"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentsSearchBar_vue_1 = require("@/modules/Search/components/Filters/DocumentsSearchBar.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const OpenFilterButton_vue_1 = require("@/modules/Search/components/Filters/Buttons/OpenFilterButton.vue");
const DocumentsSearchInput_vue_1 = require("@/modules/Search/components/Filters/DocumentsSearchInput.vue");
/****
 * Wrapper finders
 */
const findDocumentsSearchInput = (wrapper) => wrapper.findComponent(DocumentsSearchInput_vue_1.default);
const findOpenFiltersButton = (wrapper) => wrapper.findComponent(OpenFilterButton_vue_1.default);
/****
 * Wrapper creation
 */
const defaultProps = {
    search: ''
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentsSearchBar_vue_1.default, {
    props
});
let wrapper = createWrapper();
let documentsSearchInputWrapper = findDocumentsSearchInput(wrapper);
let openFiltersButtonWrapper = findOpenFiltersButton(wrapper);
describe('DocumentsSearchBar', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        documentsSearchInputWrapper = findDocumentsSearchInput(wrapper);
        openFiltersButtonWrapper = findOpenFiltersButton(wrapper);
    });
    describe('rendering', () => {
        it('should set documents-filters__search-bar--active class when displayAdvancedSearch', () => {
            wrapper = createWrapper({ displayAdvancedSearch: true, search: '' });
            expect(wrapper.classes()).toContain('documents-filters__search-bar--active');
        });
    });
    describe('bindings with DocumentsSearchInput', () => {
        test('props bindings', () => {
            wrapper = createWrapper({ ...defaultProps, search: 'test' });
            expect(findDocumentsSearchInput(wrapper).vm.modelValue).toBe('test');
        });
        it('should emit update:search when DocumentsSearchInput emit update:modelValue', async () => {
            // When DocumentsSearchInput emit update:modelValue
            await documentsSearchInputWrapper.vm.$emit('update:modelValue', 'bisrepetita');
            // Then DocumentsSearchBar Should emit update:search with same payload
            expect(wrapper.emitted('update:search')).toHaveLength(1);
            expect(wrapper.emitted('update:search')).toEqual([['bisrepetita']]);
        });
    });
    describe('bindings with OpenFiltersButton', () => {
        test('props bindings', () => {
            wrapper = createWrapper({ ...defaultProps, activeFiltersCount: 1 });
            expect(findOpenFiltersButton(wrapper).vm.activeFiltersCount).toBe(1);
        });
        it('should emit open-filters-button-clicked when OpenFiltersButton emit click', async () => {
            // When OpenFiltersButton emit click
            await openFiltersButtonWrapper.vm.$emit('click');
            // Then DocumentsSearchBar Should emit open-filters-button-clicked
            expect(wrapper.emitted('open-filters-button-clicked')).toHaveLength(1);
        });
    });
});
//# sourceMappingURL=DocumentsSearchBar.spec.js.map
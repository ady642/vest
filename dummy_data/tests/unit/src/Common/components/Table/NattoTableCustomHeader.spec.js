"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentsSortOptions_1 = require("@/modules/Search/models/Documents/Query/DocumentsSortOptions");
const NattoTableCustomHeader_vue_1 = require("@/Common/components/Table/NattoTableCustomHeader.vue");
const finders_1 = require("dummy_data/tests/unit/utils/finders");
const defaultProps = {
    sortOptions: new DocumentsSortOptions_1.default({
        sortBy: 'name',
        sortDirection: 'ascending'
    }),
    areAllSelected: false
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoTableCustomHeader_vue_1.default, {
    props
});
let wrapper = createWrapper();
let nattoCheckboxWrapper = (0, finders_1.findNattoCheckbox)(wrapper);
describe('NattoTableCustomHeader', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        nattoCheckboxWrapper = (0, finders_1.findNattoCheckbox)(wrapper);
    });
    describe('bindings with NattoCheckbox', () => {
        test('static props', () => {
            expect(nattoCheckboxWrapper.attributes()).toStrictEqual({
                'model-value': 'false'
            });
        });
        describe('events', () => {
            it('should emit select-all when NattoCheckbox emits change', async () => {
                await nattoCheckboxWrapper.vm.$emit('change');
                expect(wrapper.emitted('select-all')).toHaveLength(1);
            });
        });
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should bind correctly prop sortOptions', () => {
                expect(wrapper.props('sortOptions')).toEqual(defaultProps.sortOptions);
            });
        });
        describe('rendering', () => {
            describe('Should calculate displayNameSort correctly', () => {
                const cases = [
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: 'ascending'
                        }),
                        expectedClass: '.filter-icon-asc',
                        expectedValue: true
                    },
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: 'descending'
                        }),
                        expectedClass: '.filter-icon-desc',
                        expectedValue: true
                    },
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: null
                        }),
                        expectedClass: '.filter-icon-asc',
                        expectedValue: false
                    },
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: null
                        }),
                        expectedClass: '.filter-icon-desc',
                        expectedValue: false
                    }
                ];
                test.each(cases)('Test Computing', ({ sortOptions, expectedClass, expectedValue }) => {
                    wrapper = createWrapper({
                        sortOptions: sortOptions
                    });
                    const IconWrapper = wrapper.find(expectedClass);
                    expect(IconWrapper.exists()).toBe(expectedValue);
                });
            });
            describe('Should calculate displayDateSort correctly', () => {
                const cases = [
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: 'ascending'
                        }),
                        expectedClass: '.filter-icon-asc',
                        expectedValue: true
                    },
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: 'descending'
                        }),
                        expectedClass: '.filter-icon-desc',
                        expectedValue: true
                    },
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: null
                        }),
                        expectedClass: '.filter-icon-asc',
                        expectedValue: false
                    },
                    {
                        sortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: null
                        }),
                        expectedClass: '.filter-icon-desc',
                        expectedValue: false
                    }
                ];
                test.each(cases)('Test Computing', ({ sortOptions, expectedClass, expectedValue }) => {
                    wrapper = createWrapper({
                        sortOptions: sortOptions
                    });
                    const IconWrapper = wrapper.find(expectedClass);
                    expect(IconWrapper.exists()).toBe(expectedValue);
                });
            });
        });
        describe('events', () => {
            describe('It should emit sort-arbo-table corretly , Name', () => {
                const cases = [
                    {
                        elementToClick: '.browse-doc__header-name',
                        currentSortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: 'ascending'
                        }),
                        expectedSortDirection: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: 'descending'
                        })
                    },
                    {
                        elementToClick: '.browse-doc__header-name',
                        currentSortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: 'descending'
                        }),
                        expectedSortDirection: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: null
                        })
                    }
                ];
                test.each(cases)('Test sort by name', async ({ elementToClick, currentSortOptions, expectedSortDirection }) => {
                    wrapper = createWrapper({
                        sortOptions: currentSortOptions
                    });
                    const IconWrapper = wrapper.find(elementToClick);
                    await IconWrapper.trigger('click');
                    expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1);
                    expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
                        [expectedSortDirection]
                    ]);
                });
            });
            describe('It should emit sort-arbo-table corretly , Updated', () => {
                const cases = [
                    {
                        elementToClick: '.browse-doc__header-date',
                        currentSortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: 'ascending'
                        }),
                        expectedSortDirection: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: 'descending'
                        })
                    },
                    {
                        elementToClick: '.browse-doc__header-date',
                        currentSortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: 'descending'
                        }),
                        expectedSortDirection: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: null
                        })
                    }
                ];
                test.each(cases)('Test sort by creation', async ({ elementToClick, currentSortOptions, expectedSortDirection }) => {
                    wrapper = createWrapper({
                        sortOptions: currentSortOptions
                    });
                    const IconWrapper = wrapper.find(elementToClick);
                    await IconWrapper.trigger('click');
                    expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1);
                    expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
                        [expectedSortDirection]
                    ]);
                });
            });
            describe('It should set default sortDirection while changing sortBy', () => {
                const cases = [
                    {
                        elementToClick: '.browse-doc__header-date',
                        currentSortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: 'ascending'
                        }),
                        expectedSortDirection: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: 'ascending'
                        })
                    },
                    {
                        elementToClick: '.browse-doc__header-name',
                        currentSortOptions: new DocumentsSortOptions_1.default({
                            sortBy: 'updated',
                            sortDirection: 'descending'
                        }),
                        expectedSortDirection: new DocumentsSortOptions_1.default({
                            sortBy: 'name',
                            sortDirection: 'ascending'
                        })
                    }
                ];
                test.each(cases)('Toggle between sort by name and creation', async ({ elementToClick, currentSortOptions, expectedSortDirection }) => {
                    wrapper = createWrapper({
                        sortOptions: currentSortOptions
                    });
                    const IconWrapper = wrapper.find(elementToClick);
                    await IconWrapper.trigger('click');
                    expect(wrapper.emitted('sort-arbo-table')).toHaveLength(1);
                    expect(wrapper.emitted('sort-arbo-table')).toStrictEqual([
                        [expectedSortDirection]
                    ]);
                });
            });
        });
    });
});
//# sourceMappingURL=NattoTableCustomHeader.spec.js.map
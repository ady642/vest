"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InfoBar_vue_1 = require("@/modules/Search/components/Filters/InfoBars/InfoBar.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const vue_1 = require("vue");
const defaultProps = {
    nbDocuments: 3,
    title: 'azerty',
    displayArrow: true,
    documentsLoading: (0, vue_1.computed)(() => false)
};
const createWrapper = ({ nbDocuments = 3, title = 'azerty', displayArrow = true, documentsLoading = (0, vue_1.computed)(() => false) } = defaultProps) => (0, wrapperFactory_1.default)(InfoBar_vue_1.default, {
    global: {
        provide: { documentsLoading }
    },
    props: {
        nbDocuments,
        title,
        displayArrow
    }
});
let wrapper = createWrapper();
const findDocumentsNumberSpan = (wrapper) => wrapper.findAll('span')[0];
describe('InfoBar', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('rendering', () => {
        it('Should display number and text when send props', () => {
            const spanWrapper = wrapper.findAll('span');
            expect(spanWrapper.length).toBe(2);
            expect(spanWrapper[0].text()).toBe('3');
            expect(spanWrapper[1].text()).toBe('azerty');
        });
        it('Should display 0 results when documents loading', () => {
            // Given Documents are loading
            wrapper = createWrapper({
                documentsLoading: (0, vue_1.computed)(() => true)
            });
            // Then I should see 0 results
            expect(findDocumentsNumberSpan(wrapper).text()).toBe('0');
        });
        describe('displayArrow', () => {
            const displayArrowCases = [
                { displayArrow: false, expected: false },
                { displayArrow: true, expected: true }
            ];
            test.each(displayArrowCases)('Should have display set $expected at arrow when displayArrow is $displayArrow', ({ displayArrow, expected }) => {
                // Given displayArrow is set at false
                wrapper = createWrapper({ ...defaultProps, displayArrow });
                // Then the arrow must be displayed
                const arrowRightIcon = wrapper.find('.arrow');
                expect(arrowRightIcon.exists()).toBe(expected);
            });
        });
    });
    describe('events', () => {
        it('Should fire click event when click on div', () => {
            const divWrapper = wrapper.findAll('div');
            expect(divWrapper.length).toBe(2);
            divWrapper[0].trigger('click');
            expect(wrapper.emitted()['click']).toBeTruthy();
            expect(wrapper.emitted()['click']).toHaveLength(1);
        });
    });
});
//# sourceMappingURL=InfoBar.spec.js.map
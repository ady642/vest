"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentCreationDateItem_vue_1 = require("@/modules/Search/components/DocumentsTable/DocumentsTableItems/DocumentCreationDateItem.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoDate_vue_1 = require("@/Common/components/Dates/NattoDate.vue");
const createWrapper = ({ creationDate = '' } = {}) => (0, wrapperFactory_1.default)(DocumentCreationDateItem_vue_1.default, {
    props: { creationDate }
});
let wrapper = createWrapper();
describe('DocumentCreationDate', () => {
    describe('bindings', () => {
        it('creationDate <=> date', () => {
            // Given date is equal to '19-1-2019T10:00:00'
            wrapper = createWrapper({ creationDate: '19-1-2019T10:00:00' });
            // Then filename must be also equal to 'test'
            const nattoDateWrapper = wrapper.findComponent(NattoDate_vue_1.default);
            expect(nattoDateWrapper.vm.date).toBe('19-1-2019T10:00:00');
        });
        it("'19-01-1929T10:00:00' <=> format", () => {
            // Given format is equal to 'DD MMMM YYYY'
            wrapper = createWrapper();
            // Then format must be also equal to 'DD MMMM YY'
            const nattoDateWrapper = wrapper.findComponent(NattoDate_vue_1.default);
            expect(nattoDateWrapper.vm.format).toBe('DD MMMM YYYY');
        });
    });
});
//# sourceMappingURL=DocumentCreationDate.spec.js.map
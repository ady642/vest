"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const ArboViewLayout_vue_1 = require("@/modules/Search/components/Layouts/ArboViewLayout.vue");
const BasicLayout_vue_1 = require("@/modules/Search/components/Layouts/BasicLayout.vue");
const createWrapper = (documentsViewHeaderSlot = '', listViewSlot = '') => (0, wrapperFactory_1.default)(ArboViewLayout_vue_1.default, {
    slots: {
        'documents-view-header': documentsViewHeaderSlot,
        'list-view': listViewSlot
    },
    global: {
        stubs: {
            BasicLayout: BasicLayout_vue_1.default
        }
    }
});
describe('ArboViewLayout', () => {
    describe('rendering', () => {
        it('When slots exist should display the content', () => {
            const wrapper = createWrapper('<div id="header">nice header</div>', '<div id="list">nice list</div>');
            const headerSlotWrapper = wrapper.find('#header');
            const listSlotWrapper = wrapper.find('#list');
            expect(headerSlotWrapper.text()).toBe('nice header');
            expect(listSlotWrapper.text()).toBe('nice list');
        });
    });
});
//# sourceMappingURL=BrowseDocumentsLayout.spec.js.map
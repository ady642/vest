"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const TrashDocumentTableOriginItem_vue_1 = require("@/modules/Trash/components/TrashDocumentTableItems/TrashDocumentTableOriginItem.vue");
const FilenameText_vue_1 = require("@/Common/components/Text/FilenameText.vue");
const createWrapper = (origin) => (0, wrapperFactory_1.default)(TrashDocumentTableOriginItem_vue_1.default, {
    props: {
        origin
    },
    global: {
        stubs: {
            FilenameText: FilenameText_vue_1.default
        }
    }
});
let wrapper = createWrapper('KPMG');
describe('TrashDocumentOriginItem', () => {
    beforeEach(() => {
        wrapper = createWrapper('KPMG');
    });
    describe('binding', () => {
        it('Should bind origin prop correctly', () => {
            const FilenameTextWrapper = wrapper.findComponent(FilenameText_vue_1.default);
            expect(FilenameTextWrapper.props('filename')).toEqual(wrapper.props('origin'));
        });
    });
});
//# sourceMappingURL=TrashDocumentOriginItem.spec.js.map
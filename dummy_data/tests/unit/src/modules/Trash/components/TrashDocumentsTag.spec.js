"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const NattoTag_vue_1 = require("@/Common/components/Tags/NattoTag.vue");
const TrashDocumentsTag_vue_1 = require("@/modules/Trash/components/TrashDocumentsTag.vue");
const useElementStubs_1 = require("../../../../utils/useElementStubs");
const { ElTag } = (0, useElementStubs_1.default)();
const createWrapper = (text, color, closable) => (0, wrapperFactory_1.default)(TrashDocumentsTag_vue_1.default, {
    props: {
        text,
        color,
        closable
    },
    global: {
        stubs: {
            NattoTag: NattoTag_vue_1.default,
            ElTag
        }
    }
});
const findNattoTagWrapper = (wrapper) => wrapper.findComponent(NattoTag_vue_1.default);
let wrapper = createWrapper('some text', 'color', false);
describe('TrashDocumentsTag', () => {
    beforeEach(() => {
        wrapper = createWrapper('some text', 'color', false);
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should bind text prop correctly', () => {
                const nattoTagWrapper = findNattoTagWrapper(wrapper);
                expect(nattoTagWrapper.text()).toContain('some text');
            });
            it('Should bind closable prop correctly', () => {
                const nattoTagWrapper = findNattoTagWrapper(wrapper);
                expect(nattoTagWrapper.props('closable')).toEqual(wrapper.props('closable'));
            });
        });
    });
});
//# sourceMappingURL=TrashDocumentsTag.spec.js.map
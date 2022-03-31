"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoDropdownItem_vue_1 = require("@/Common/components/Dropdown/NattoDropdownItem.vue");
const NattoTooltip_vue_1 = require("@/Common/components/Tooltips/NattoTooltip.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const { ElDropdownItem, ElTooltip } = (0, useElementStubs_1.default)();
const defaultProps = {
    label: 'test'
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoDropdownItem_vue_1.default, {
    props,
    global: {
        stubs: { ElDropdownItem, NattoTooltip: NattoTooltip_vue_1.default, ElTooltip }
    }
});
let wrapper = createWrapper();
const findElDropdownItem = (wrapper) => wrapper.findComponent(ElDropdownItem);
describe('NattoDropdownItem', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('bindings with ElDropdownItem', () => {
        it('props <=> :props', () => {
            wrapper = createWrapper({
                icon: 'delete',
                label: 'Supprimer',
                disabled: false
            });
            const ElDropdownItemWrapper = findElDropdownItem(wrapper);
            expect(ElDropdownItemWrapper.props('icon')).toBe('el-icon-delete');
            expect(ElDropdownItemWrapper.props('disabled')).toBe(false);
            expect(ElDropdownItemWrapper.text()).toContain('Supprimer');
        });
        describe('events', () => {
            it('should emit click when ElDropdownItem is clicked', async () => {
                const ElDropdownItemWrapper = findElDropdownItem(wrapper);
                await ElDropdownItemWrapper.vm.$emit('click');
                expect(wrapper.emitted('click')).toHaveLength(1);
            });
        });
    });
});
//# sourceMappingURL=NattoDropdownItem.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NattoRadioGroup_vue_1 = require("@/Common/components/Radio/NattoRadioGroup.vue");
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const useStyleguideStubs_1 = require("dummy_data/tests/unit/utils/useStyleguideStubs");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
/****
 * Wrapper finders
 */
const { MpRadio } = (0, useStyleguideStubs_1.default)();
const { ElRadioGroup } = (0, useElementStubs_1.default)();
const findMpRadios = (wrapper) => wrapper.findAllComponents(MpRadio);
/****
 * Wrapper creation
 */
const defaultProps = {
    radioItems: [
        {
            value: 1,
            label: 'First Value'
        },
        {
            value: 2,
            label: 'Second Value'
        },
        {
            value: 3,
            label: 'Third Value'
        }
    ]
};
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(NattoRadioGroup_vue_1.default, {
    props,
    global: {
        stubs: {
            MpRadio,
            ElRadioGroup
        }
    }
});
let wrapper = createWrapper();
let mpRadiosWrapper = findMpRadios(wrapper);
describe('NattoRadioGroup', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        mpRadiosWrapper = findMpRadios(wrapper);
    });
    describe('bindings with ElRadio', () => {
        test('props bindings', () => {
            expect(mpRadiosWrapper[0].props()).toStrictEqual({ label: 1 });
            expect(mpRadiosWrapper[1].props()).toStrictEqual({ label: 2 });
            expect(mpRadiosWrapper[2].props()).toStrictEqual({ label: 3 });
        });
        it('should render labels', () => {
            const text = wrapper.text();
            expect(text).toContain('First Value');
            expect(text).toContain('Second Value');
            expect(text).toContain('Third Value');
        });
    });
});
//# sourceMappingURL=NattoRadioGroup.spec.js.map
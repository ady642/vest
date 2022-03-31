"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentsArchiveBtn_vue_1 = require("@/modules/Trash/components/Buttons/DocumentsArchiveBtn.vue");
const NattoIcon_vue_1 = require("@/Common/components/Icons/NattoIcon.vue");
const createWrapper = (icon, buttoninnerText) => (0, wrapperFactory_1.default)(DocumentsArchiveBtn_vue_1.default, {
    props: {
        icon,
        buttoninnerText
    },
    global: {
        stubs: {
            NattoIcon: NattoIcon_vue_1.default
        }
    }
});
const findDomElement = (wrapper, element) => wrapper.find(element);
let wrapper = createWrapper('delete', 'Tout Archiver');
describe('DocumentsArchiveBtn', () => {
    beforeEach(() => {
        wrapper = createWrapper('delete', 'Tout Archiver');
    });
    describe('binding', () => {
        it('Should bind buttoninnerText prop correctly', () => {
            const btnText = findDomElement(wrapper, '.btn-text');
            expect(btnText.text()).toEqual('Tout Archiver');
        });
        it('Should bind icon prop correctly', () => {
            const NattoIconWrapper = wrapper.findComponent(NattoIcon_vue_1.default);
            expect(NattoIconWrapper.props('elementName')).toEqual(wrapper.props('icon'));
        });
    });
});
//# sourceMappingURL=DocumentsArchiveBtn.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const DocumentDetailsTab_vue_1 = require("@/modules/Search/components/Drawer/DocumentDetailsTab.vue");
const NattoDate_vue_1 = require("@/Common/components/Dates/NattoDate.vue");
const constants_1 = require("@/Common/constants");
const Properties_1 = require("@/modules/Search/models/Documents/Inputs/Properties");
const defaultProps = {
    document: {
        createdBy: 'luffy',
        id: 'myID',
        folderId: 45454,
        name: 'Mon bilan comptable',
        creationDate: '2018-05-27',
        path: [],
        properties: new Properties_1.default({ syncStatus: constants_1.default.PENDING_SYNC }),
        restorationStatus: '',
        size: 54545,
        type: 'jpg',
        updatedDate: '2018-05-29',
        preview: 'preview-href',
        get isTreated() {
            return false;
        },
        get isNew() {
            return false;
        },
        get isSync() {
            return false;
        }
    }
};
const findAllControle = (wrapper, btnClass) => wrapper.findAll(btnClass);
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(DocumentDetailsTab_vue_1.default, {
    props,
    global: {
        stubs: { NattoDate: NattoDate_vue_1.default },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
let wrapper = createWrapper();
describe('DocumentDetailsTab', () => {
    beforeEach(() => {
        wrapper = createWrapper();
    });
    describe('binding', () => {
        it('Should bind document prop correctly', async () => {
            const MpIconWrapper = wrapper.findAllComponents(NattoDate_vue_1.default);
            expect(MpIconWrapper).toHaveLength(2);
            expect(MpIconWrapper[0].props('date')).toEqual('2018-05-27');
            expect(MpIconWrapper[1].props('date')).toEqual('2018-05-29');
            const labels = findAllControle(wrapper, '.label');
            expect(labels).toHaveLength(4);
            expect(labels[0].text()).toBe('Mon bilan comptable');
            expect(labels[1].text()).toBe('27 mai 2018');
            expect(labels[3].text()).toBe('luffy');
        });
    });
});
//# sourceMappingURL=DocumentDetailsTab.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperFactory_1 = require("dummy_data/tests/unit/utils/wrapperFactory");
const TrashCard_vue_1 = require("@/modules/Trash/components/Cards/TrashCard.vue");
const ArboDescription_vue_1 = require("@/modules/Search/components/Cards/ArboDescription.vue");
const TrashCardTitle_vue_1 = require("@/modules/Trash/components/Cards/TrashCardTitle.vue");
const NattoCard_vue_1 = require("@/Common/components/Cards/NattoCard.vue");
const useElementStubs_1 = require("dummy_data/tests/unit/utils/useElementStubs");
const defaultProps = {};
const { ElCard } = (0, useElementStubs_1.default)();
const createWrapper = (props = defaultProps) => (0, wrapperFactory_1.default)(TrashCard_vue_1.default, {
    props,
    global: {
        stubs: {
            TrashCardTitle: TrashCardTitle_vue_1.default,
            ArboDescription: ArboDescription_vue_1.default,
            NattoCard: NattoCard_vue_1.default,
            ElCard
        },
        mocks: {
            $tc: (key, params) => params ? `${key} with ${JSON.stringify(params)}` : key
        }
    }
});
const findArboCardTitle = (wrapper) => wrapper.findComponent(TrashCardTitle_vue_1.default);
let wrapper = createWrapper();
let trashCardTitleWrapper = findArboCardTitle(wrapper);
describe('TrashCard', () => {
    beforeEach(() => {
        wrapper = createWrapper();
        trashCardTitleWrapper = findArboCardTitle(wrapper);
    });
    describe('binding', () => {
        describe('props', () => {
            it('Should bind headerTitle correctly ', () => {
                expect(trashCardTitleWrapper.props('title')).toStrictEqual('ged.trash.arboCard.title');
            });
            describe('binding with arbo description', () => {
                it('Should pass correct value to child component', () => {
                    const ArboDescriptionWrapper = wrapper.findComponent(ArboDescription_vue_1.default);
                    expect(ArboDescriptionWrapper.props('description')).toBe('ged.trash.arboCard.description');
                });
            });
            describe('trashShortcut', () => { });
        });
    });
});
//# sourceMappingURL=TrashCard.spec.js.map
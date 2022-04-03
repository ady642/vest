
import NattoBadge from '/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Badges/NattoBadge.vue';
import wrapperFactory from 'tests/unit/utils/wrapperFactory';
import useElement from 'tests/unit/utils/useElementStubs';
import { VueWrapper } from '@vue/test-utils';

            type NattoBadgeProps = {
              value: number
            };

const defaultProps: NattoBadgeProps = {
    value: 1
};

const defaultSlots = {
    default: 'I fill the default slot'
};

const createWrapper = ({
    props = defaultProps,
    slots = defaultSlots
} = {}) =>
    wrapperFactory(NattoBadge , {
        props,
        slots,
        global: {
            stubs: ElBadge
        }
    });

let wrapper = createWrapper();

const { ElBadge } = useElement();
let findElBadge = (wrapper) => wrapper.findComponent(ElBadge);
let ElBadgeWrapper = findElBadge(wrapper);

describe(NattoBadge, () => {
    beforeEach(() => {
        wrapper = createWrapper();
        ElBadgeWrapper = findElBadge(wrapper);
    });


    describe('binding with ElBadge', () => {
        test('static props', () => {
            expect(ElBadgeWrapper.attributes('hidden')).toBe(true);
            expect(ElBadgeWrapper.attributes('value')).toBe(true); });
    });


    describe('rendering', () => {
        it('should render the default slot', () => {
            expect(wrapper.html()).toContain('I fill the default slot');
        });
    });


});

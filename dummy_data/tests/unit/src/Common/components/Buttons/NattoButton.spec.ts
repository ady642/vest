import NattoButton
    from '/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Buttons/NattoButton.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import useElement from 'tests/unit/utils/useElementStubs'
import {VueWrapper} from '@vue/test-utils'

type NattoButtonProps = {
    nativeType: string, type: string, loading: boolean, disabled: boolean
}

const defaultProps: NattoButtonProps = {
    nativeType: 'test string', type: 'test string', loading: true, disabled: true
}

const {ElButton} = useElement()

const createWrapper = ({
      props = defaultProps,
} = {}) =>
    wrapperFactory(NattoButton, {
        props
    })

let wrapper = createWrapper()

let findElButton = (wrapper) => wrapper.findComponent(ElButton)


let ElButtonWrapper = findElButton(wrapper)


describe(NattoButton, () => {
    beforeEach(() => {
        wrapper = createWrapper()
        ElButtonWrapper = findElButton(wrapper)
    })


    describe('binding with ElButton', () => {
        test('static props', () => {
            expect(ElButtonWrapper.attributes('loading')).toBe(defaultProps.loading)
            expect(ElButtonWrapper.attributes('disabled')).toBe(defaultProps.disabled)
            expect(ElButtonWrapper.attributes('type')).toBe(defaultProps.type)
            expect(ElButtonWrapper.attributes('native-type')).toBe(defaultProps.nativeType)
        })
    })


    describe('rendering', () => {
        it('should render the undefined slot', () => {
            expect(wrapper.html()).toContain('I fill the undefined slot')
        })
    })


})



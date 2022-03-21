import CertifiedSelector from '@/modules/Search/components/Filters/AdvancedSearchOptions/CertifiedSelector.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findNattoRadioGroup } from 'tests/unit/utils/finders'

/****
 * Wrapper types
 */
type CertifiedSelectorProps = {
  modelValue: string | boolean
}

type CertifiedSelectorSetup = {
  handleSelectionChange: () => void
}

export type CertifiedSelectorWrapper = VueWrapper<
  ComponentPublicInstance<CertifiedSelectorSetup>
>
/****
 * Wrapper creation
 */

const defaultProps: CertifiedSelectorProps = {
  modelValue: 'all'
}

const createWrapper = ({
  props = defaultProps
} = {}): CertifiedSelectorWrapper =>
  wrapperFactory(CertifiedSelector, {
    props
  })

let wrapper = createWrapper()
let nattoRadioGroupWrapper = findNattoRadioGroup(wrapper)

describe('CertifiedSelector', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoRadioGroupWrapper = findNattoRadioGroup(wrapper)
  })

  describe('bindings with NattoRadioGroup', () => {
    test('props bindings', () => {
      expect(nattoRadioGroupWrapper.props()).toStrictEqual({
        radioItems: [
          {
            value: 'all',
            label: 'ged.search.filters.certified.all'
          },
          {
            value: true,
            label: 'ged.search.filters.certified.onlyCertified'
          },
          {
            value: false,
            label: 'ged.search.filters.certified.excludeCertified'
          }
        ]
      })
      expect(nattoRadioGroupWrapper.attributes('modelvalue')).toBe('all')
    })
    describe('events', () => {
      it('should emit update:modelValue when NattoRadioGroup emit update:modelValue', async () => {
        wrapper = createWrapper()

        nattoRadioGroupWrapper = findNattoRadioGroup(wrapper)

        await nattoRadioGroupWrapper.vm.$emit('update:modelValue', false)

        expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
        expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]])
      })
    })
  })
})

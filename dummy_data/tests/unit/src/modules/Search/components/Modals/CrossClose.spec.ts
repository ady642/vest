import CrossClose from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/CrossClose.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findMpIcon, findPreviewCTAContainer } from 'dummy_data/tests/unit/utils/finders'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

/****
 * Wrapper types
 */
export type CrossCloseWrapper = VueWrapper<ComponentPublicInstance>

/****
 * Wrapper creation
 */
const { MpIcon } = useStyleguideStubs()

const createWrapper = (): CrossCloseWrapper =>
  wrapperFactory(CrossClose, {
    global: {
      renderStubDefaultSlot: true,
      stubs: {
        MpIcon
      }
    }
  })

let wrapper = createWrapper()
let previewCTAContainer = findPreviewCTAContainer(wrapper)
let mpIconWrapper = findMpIcon(wrapper)

describe('CrossClose', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    previewCTAContainer = findPreviewCTAContainer(wrapper)
    mpIconWrapper = findMpIcon(wrapper)
  })

  describe('bindings with PreviewCTAContainer', () => {
    test('props bindings', () => {
      expect(previewCTAContainer.props('tooltipContent')).toBe(
        'ged.common.close'
      )
      expect(mpIconWrapper.props('name')).toBe('close')
    })
  })
})

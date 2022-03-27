import DownloadCTA from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DownloadCTA.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findMpIcon, findPreviewCTAContainer } from 'dummy_data/tests/unit/utils/finders'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

/****
 * Wrapper types
 */
export type DownloadCTAWrapper = VueWrapper<ComponentPublicInstance>

/****
 * Wrapper creation
 */
const { MpIcon } = useStyleguideStubs()

const createWrapper = (): DownloadCTAWrapper =>
  wrapperFactory(DownloadCTA, {
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

describe('DownloadCTA', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    previewCTAContainer = findPreviewCTAContainer(wrapper)
    mpIconWrapper = findMpIcon(wrapper)
  })

  describe('bindings with PreviewCTAContainer', () => {
    test('props bindings', () => {
      expect(previewCTAContainer.props('tooltipContent')).toBe(
        'ged.common.download'
      )
      expect(mpIconWrapper.props('name')).toBe('download')
    })
  })
})

import PreviewModalCTAs from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/PreviewModalCTAs.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import CrossClose from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/CrossClose.vue'
import DownloadCTA from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DownloadCTA.vue'
import DeleteCTA from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DeleteCTA.vue'

/****
 * Wrapper types
 */
type PreviewModalCTAsProps = {
  isDocumentDeletable: boolean
  isDocumentDeleting: boolean
}

export type PreviewModalCTAsWrapper = VueWrapper<
  ComponentPublicInstance<PreviewModalCTAsProps>
>
/****
 * Wrapper finders
 */

const findCrossClose = (wrapper: PreviewModalCTAsWrapper) =>
  wrapper.findComponent(CrossClose)

const findDownloadCTA = (wrapper: PreviewModalCTAsWrapper) =>
  wrapper.findComponent(DownloadCTA)

const findDeleteCTA = (wrapper: PreviewModalCTAsWrapper) =>
  wrapper.findComponent(DeleteCTA)

/****
 * Wrapper creation
 */

const defaultProps: PreviewModalCTAsProps = {
  isDocumentDeletable: false,
  isDocumentDeleting: false
}

const createWrapper = (props = defaultProps): PreviewModalCTAsWrapper =>
  wrapperFactory(PreviewModalCTAs, {
    props
  })

let wrapper = createWrapper()
let crossCloseWrapper = findCrossClose(wrapper)
let downloadCTAWrapper = findDownloadCTA(wrapper)
let deleteCTAWrapper = findDeleteCTA(wrapper)

describe('PreviewModalCTAs', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    crossCloseWrapper = findCrossClose(wrapper)
    downloadCTAWrapper = findDownloadCTA(wrapper)
    deleteCTAWrapper = findDeleteCTA(wrapper)
  })

  describe('bindings with CrossClose', () => {
    describe('events', () => {
      it('should emit download when CrossClose is clicked', async () => {
        await crossCloseWrapper.vm.$emit('click')

        expect(wrapper.emitted('close-click')).toHaveLength(1)
      })
    })
  })
  describe('bindings with DeleteCTA', () => {
    test('props bindings', () => {
      wrapper = createWrapper({
        isDocumentDeleting: true,
        isDocumentDeletable: true
      })

      deleteCTAWrapper = findDeleteCTA(wrapper)

      expect(deleteCTAWrapper.props('isDocumentDeleting')).toBe(true)
      expect(deleteCTAWrapper.props('isDocumentDeletable')).toBe(true)
    })
    describe('events', () => {
      it('should emit download when DeleteCTA is clicked', async () => {
        await deleteCTAWrapper.vm.$emit('click')

        expect(wrapper.emitted('delete')).toHaveLength(1)
      })
    })
  })
  describe('bindings with DownloadCTA', () => {
    describe('events', () => {
      it('should emit download when DownloadCTA is clicked', async () => {
        await downloadCTAWrapper.vm.$emit('click')

        expect(wrapper.emitted('download')).toHaveLength(1)
      })
    })
  })
})

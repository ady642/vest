import PreviewModalHeader from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalHeader.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { PreviewModalCTAsWrapper } from './PreviewModalCTAs.spec'
import Document from '@/modules/Search/models/Documents/Inputs/Document'

/****
 * Wrapper types
 */
type PreviewModalHeaderProps = {
  document: Document
  isDocumentDeletable?: boolean
  isDocumentDeleting?: boolean
}

type PreviewModalHeaderSetup = {
  noPermissionOnDocument: string
}

export type PreviewModalHeaderWrapper = VueWrapper<
  ComponentPublicInstance<PreviewModalHeaderProps, PreviewModalHeaderSetup>
>
/****
 * Wrapper finders
 */

const findPreviewModalCTAs = (
  wrapper: PreviewModalHeaderWrapper
): PreviewModalCTAsWrapper =>
  wrapper.findComponent({ name: 'preview-modal-ctas' })

const findPreviewModalDocumentType = (wrapper: PreviewModalHeaderWrapper) =>
  wrapper.findComponent({ name: 'preview-modal-document-type' })

const findPreviewModalCertifiedTag = (wrapper: PreviewModalHeaderWrapper) =>
  wrapper.findComponent({ name: 'preview-modal-certified-tag' })

/****
 * Wrapper creation
 */
const document = new Document()

document.id = 'columbo'
document.name = 'columbo'
document.type = '.pdf'

const defaultProps: PreviewModalHeaderProps = {
  document
}

const createWrapper = (props = defaultProps): PreviewModalHeaderWrapper =>
  wrapperFactory(PreviewModalHeader, {
    props
  })

let wrapper = createWrapper()
let previewModalCTAsWrapper = findPreviewModalCTAs(wrapper)
let previewModalDocumentType = findPreviewModalDocumentType(wrapper)
let previewModalCertifiedTag = findPreviewModalCertifiedTag(wrapper)

describe('PreviewModalHeader', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    previewModalCTAsWrapper = findPreviewModalCTAs(wrapper)
    previewModalDocumentType = findPreviewModalDocumentType(wrapper)
    previewModalCertifiedTag = findPreviewModalCertifiedTag(wrapper)
  })

  describe('bindings with PreviewModalCtas', () => {
    describe('props', () => {
      it('static props', () => {
        expect(previewModalCTAsWrapper.props()).toStrictEqual({
          isDocumentDeletable: false,
          isDocumentDeleting: false
        })
      })
    })
    describe('events', () => {
      it.each([['close-click'], ['download'], ['delete']])(
        'should emit %p when cross emits %p',
        async (event) => {
          // When PreviewModalCtas emits the event
          await previewModalCTAsWrapper.vm.$emit(event)

          // Then the event must be emitted
          expect(wrapper.emitted(event)).toBeTruthy()
        }
      )
    })
  })
  describe('bindings with preview-modal-document-type', () => {
    describe('props', () => {
      it('static props', () => {
        wrapper = createWrapper()

        previewModalDocumentType = findPreviewModalDocumentType(wrapper)

        expect(previewModalDocumentType.props()).toStrictEqual({
          type: '.pdf'
        })
      })
    })
  })
  describe('bindings with preview-modal-certified-tag', () => {
    describe('rendering', () => {
      it.each([
        { hasSubscribedToVault: false, existPreviewModalCertifiedTag: false },
        { hasSubscribedToVault: true, existPreviewModalCertifiedTag: true }
      ])(
        'static props',
        ({ hasSubscribedToVault, existPreviewModalCertifiedTag }) => {
          const document = new Document()

          document.properties.hasSubscribedToVault = hasSubscribedToVault

          wrapper = createWrapper({
            document
          })

          previewModalCertifiedTag = findPreviewModalCertifiedTag(wrapper)

          expect(previewModalCertifiedTag.exists()).toBe(
            existPreviewModalCertifiedTag
          )
        }
      )
    })
  })
})

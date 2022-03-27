import NattoDocViewer from '@/Common/components/DocViewer/NattoDocViewer.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'

/****
 * Wrapper types
 */
type NattoDocViewerProps = {
  file: Blob
}

type NattoDocViewerSetup = {
  urlFile: string
}

export type NattoDocViewerWrapper = VueWrapper<
  ComponentPublicInstance<NattoDocViewerProps, NattoDocViewerSetup>
>
/****
 * Wrapper finders
 */

const findIframe = (
  wrapper: NattoDocViewerWrapper
): DOMWrapper<HTMLIFrameElement> => wrapper.find('iframe')

/****
 * Wrapper creation
 */
const defaultProps: NattoDocViewerProps = {
  file: new Blob(['fileContent'], { type: 'application/pdf' })
}

const createWrapper = (props = defaultProps): NattoDocViewerWrapper =>
  wrapperFactory(NattoDocViewer, {
    props
  })

let wrapper = createWrapper()
let iFrameWrapper = findIframe(wrapper)

describe('NattoDocViewer', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    iFrameWrapper = findIframe(wrapper)
  })

  describe('bindings with NattoDialogPopup', () => {
    test('props bindings', () => {
      expect(iFrameWrapper.attributes()).toStrictEqual({
        class: 'natto-doc-viewer',
        src: 'https://myObjectUrl.com'
      })
    })
  })
})

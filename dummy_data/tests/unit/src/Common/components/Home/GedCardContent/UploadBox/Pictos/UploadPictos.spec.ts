import UploadPictos from '@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPictos.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import UploadPicto from '@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPicto.vue'
import WaitPicto from '@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/WaitPicto.vue'

/****
 * Wrapper types
 */
type UploadPictosProps = {
  isUploading?: boolean
}

type UploadPictosSetup = any

export type UploadPictosWrapper = VueWrapper<
  ComponentPublicInstance<UploadPictosProps, UploadPictosSetup>
>
/****
 * Wrapper finders
 */

const findUploadPicto = (wrapper: UploadPictosWrapper) =>
  wrapper.findComponent(UploadPicto)

const findWaitPicto = (wrapper: UploadPictosWrapper) =>
  wrapper.findComponent(WaitPicto)

/****
 * Wrapper creation
 */
const defaultProps: UploadPictosProps = {
  isUploading: false
}

const createWrapper = (props = defaultProps): UploadPictosWrapper =>
  wrapperFactory(UploadPictos, {
    props
  })

let wrapper = createWrapper()
let uploadPictoWrapper = findUploadPicto(wrapper)
let waitPictoWrapper = findUploadPicto(wrapper)

describe('UploadPictos', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    uploadPictoWrapper = findUploadPicto(wrapper)
    waitPictoWrapper = findWaitPicto(wrapper)
  })

  describe('rendering', () => {
    const cases = [
      { isUploading: false, uploadPictoExists: true, waitPictoExists: false },
      { isUploading: true, uploadPictoExists: false, waitPictoExists: true }
    ]

    test.each(cases)(
      'should render UploadPicto when there is no upload in progress',
      ({ isUploading, uploadPictoExists, waitPictoExists }) => {
        wrapper = createWrapper({ isUploading })

        uploadPictoWrapper = findUploadPicto(wrapper)
        waitPictoWrapper = findWaitPicto(wrapper)

        expect(uploadPictoWrapper.exists()).toBe(uploadPictoExists)
        expect(waitPictoWrapper.exists()).toBe(waitPictoExists)
      }
    )
  })
})

import GedCardUploadBox from '@/Common/components/Home/Card/GedCardContent/UploadBox/GedCardUploadBox.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import UploadPictos from '@/Common/components/Home/Card/GedCardContent/UploadBox/Pictos/UploadPictos.vue'
import UploadTexts from '@/Common/components/Home/Card/GedCardContent/UploadBox/Texts/UploadTexts.vue'
import { router } from '@kpmg/mypulse-shared-dependencies'
import { UploadPictosWrapper } from './Pictos/UploadPictos.spec'
import { UploadTextsWrapper } from './Texts/UploadTexts.spec'

/****
 * Wrapper types
 */
type GedCardUploadBoxProps = {
  isUploading?: boolean
}

type GedCardUploadBoxSetup = unknown

export type GedCardUploadBoxWrapper = VueWrapper<
  ComponentPublicInstance<GedCardUploadBoxProps, GedCardUploadBoxSetup>
>
/****
 * Wrapper finders
 */

const findUploadPictos = (
  wrapper: GedCardUploadBoxWrapper
): UploadPictosWrapper => wrapper.findComponent(UploadPictos)

const findUploadTexts = (
  wrapper: GedCardUploadBoxWrapper
): UploadTextsWrapper => wrapper.findComponent(UploadTexts)

/****
 * Wrapper creation
 */
const defaultProps: GedCardUploadBoxProps = {
  isUploading: true
}

const createWrapper = (props = defaultProps): GedCardUploadBoxWrapper =>
  wrapperFactory(GedCardUploadBox, {
    props
  })

let wrapper = createWrapper()
let uploadTextsWrapper = findUploadTexts(wrapper)
let uploadPictosWrapper = findUploadPictos(wrapper)

describe('GedCardUploadBox', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    uploadTextsWrapper = findUploadTexts(wrapper)
    uploadPictosWrapper = findUploadPictos(wrapper)
  })

  describe('bindings with UploadPictos', () => {
    test('props bindings', () => {
      expect(uploadPictosWrapper.props('isUploading')).toBe(true)
    })
  })
  describe('bindings with UploadTexts', () => {
    test('props bindings', () => {
      expect(uploadTextsWrapper.props('isUploading')).toBe(true)
    })
  })
})

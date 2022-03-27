import UploadTexts from '@/Common/components/Home/Card/GedCardContent/UploadBox/Texts/UploadTexts.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

/****
 * Wrapper types
 */
type UploadTextsProps = {
  isUploading?: boolean
}

type UploadTextsSetup = {
  authorizedTypes: string
  boxInnerText: Record<string, string>
}

export type UploadTextsWrapper = VueWrapper<
  ComponentPublicInstance<UploadTextsProps, UploadTextsSetup>
>

/****
 * Wrapper creation
 */
const defaultProps: UploadTextsProps = {
  isUploading: false
}

const createWrapper = (props = defaultProps): UploadTextsWrapper =>
  wrapperFactory(UploadTexts, {
    props
  })

let wrapper = createWrapper()

describe('UploadTexts', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('rendering', () => {
    const cases = [
      {
        isUploading: false,
        title: 'ged.upload.default.title',
        subtitle: 'ged.upload.default.subtitle Jpeg, Png, Pdf, Doc, Xls'
      },
      {
        isUploading: true,
        title: 'ged.upload.disabled.title',
        subtitle: 'ged.upload.disabled'
      }
    ]

    it.each(cases)(
      'should display good title and subtitle when uploading',
      ({ subtitle, title, isUploading }) => {
        wrapper = createWrapper({ isUploading })

        expect(wrapper.text()).toContain(title)
        expect(wrapper.text()).toContain(subtitle)
      }
    )
  })
})

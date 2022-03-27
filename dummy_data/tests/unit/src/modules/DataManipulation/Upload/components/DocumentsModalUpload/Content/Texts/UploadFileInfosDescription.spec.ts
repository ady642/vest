import UploadFileInfosDescription from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Texts/UploadFileInfosDescription.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

/****
 * Wrapper types
 */
type UploadFileInfosDescriptionProps = {
  selectedFolderName: string
}

type UploadFileInfosDescriptionSetup = {
  description: string
}

export type UploadFileInfosDescriptionWrapper = VueWrapper<
  ComponentPublicInstance<
    UploadFileInfosDescriptionProps,
    UploadFileInfosDescriptionSetup
  >
>

/****
 * Wrapper creation
 */
const defaultProps: UploadFileInfosDescriptionProps = {
  selectedFolderName: 'Achat'
}

const createWrapper = (
  props = defaultProps
): UploadFileInfosDescriptionWrapper =>
  wrapperFactory(UploadFileInfosDescription, {
    props
  })

let wrapper = createWrapper()

describe('UploadFileInfosDescription', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('rendering', () => {
    it('should render correct translation with parameter', () => {
      expect(wrapper.text()).toContain(
        'ged.dataManipulation.create.file.collab.description with {"selectedFolderName":"Achat"}'
      )
    })
  })
})

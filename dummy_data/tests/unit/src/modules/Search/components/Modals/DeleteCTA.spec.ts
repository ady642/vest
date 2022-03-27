import DeleteCTA from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/CTAs/DeleteCTA.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import {
  findLoadingIcon,
  findMpIcon,
  findPreviewCTAContainer
} from 'dummy_data/tests/unit/utils/finders'
import useStyleguideStubs from '../../../../../utils/useStyleguideStubs'

/****
 * Wrapper types
 */
type DeleteCTAProps = {
  isDocumentDeletable?: boolean
  isDocumentDeleting?: boolean
}

type DeleteCTASetup = {
  tooltipContent: string
}

export type DeleteCTAWrapper = VueWrapper<
  ComponentPublicInstance<DeleteCTAProps, DeleteCTASetup>
>

/****
 * Wrapper creation
 */
const defaultProps: DeleteCTAProps = {
  isDocumentDeletable: false,
  isDocumentDeleting: false
}

const { MpIcon } = useStyleguideStubs()

const createWrapper = (props = defaultProps): DeleteCTAWrapper =>
  wrapperFactory(DeleteCTA, {
    props,
    global: {
      renderStubDefaultSlot: true,
      stubs: {
        MpIcon
      }
    }
  })

let wrapper = createWrapper()
let previewCTAContainer = findPreviewCTAContainer(wrapper)
let loadingIconWrapper = findLoadingIcon(wrapper)
let mpIconWrapper = findMpIcon(wrapper)

describe('DeleteCTA', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    previewCTAContainer = findPreviewCTAContainer(wrapper)
    loadingIconWrapper = findLoadingIcon(wrapper)
    mpIconWrapper = findMpIcon(wrapper)
  })

  describe('bindings with PreviewCTAContainer', () => {
    describe('props bindings', () => {
      it.each([
        {
          isDocumentDeletable: false,
          translation: 'ged.dataManipulation.delete.cantDelete'
        },
        {
          isDocumentDeletable: true,
          translation: 'ged.dataManipulation.delete.file'
        }
      ])(
        'should bind the good translation in function if the document is deletable',
        ({ isDocumentDeletable, translation }) => {
          wrapper = createWrapper({
            ...defaultProps,
            isDocumentDeletable
          })

          previewCTAContainer = findPreviewCTAContainer(wrapper)

          expect(previewCTAContainer.props('tooltipContent')).toBe(translation)
        }
      )
    })
    describe('rendering', () => {
      it.each([
        {
          isDocumentDeleting: true,
          loadingIconExist: true,
          mpIconExist: false
        },
        {
          isDocumentDeleting: false,
          loadingIconExist: false,
          mpIconExist: true
        }
      ])(
        'should render LoadingIcon if the document is deleting',
        ({ isDocumentDeleting, loadingIconExist, mpIconExist }) => {
          wrapper = createWrapper({ ...defaultProps, isDocumentDeleting })
          loadingIconWrapper = findLoadingIcon(wrapper)
          mpIconWrapper = findMpIcon(wrapper)

          expect(loadingIconWrapper.exists()).toBe(loadingIconExist)
          expect(mpIconWrapper.exists()).toBe(mpIconExist)
        }
      )
    })
  })
})

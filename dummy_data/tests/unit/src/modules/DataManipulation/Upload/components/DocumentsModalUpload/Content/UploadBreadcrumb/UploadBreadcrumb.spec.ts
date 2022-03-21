import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import {
  UploadBreadcrumbProps,
  UploadBreadcrumbWrapper
} from './UploadBreadcrumbTypes'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import NattoBreadcrumb from '@/Common/components/Breadcrumb/NattoBreadcrumb.vue'
import UploadBreadcrumb from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadBreadcrumb.vue'

const defaultProps: UploadBreadcrumbProps = {
  folders: useFoldersData().FoldersData,
  selectedFolderToUpload: 1001,
  disabledBreadcrumb: false
}

const createWrapper = ({
  folders,
  selectedFolderToUpload,
  disabledBreadcrumb
} = defaultProps): UploadBreadcrumbWrapper =>
  wrapperFactory(UploadBreadcrumb, {
    props: {
      folders,
      selectedFolderToUpload,
      disabledBreadcrumb
    }
  })

const findNattoBreadcrumb = (wrapper: UploadBreadcrumbWrapper) =>
  wrapper.findComponent(NattoBreadcrumb)

let wrapper = createWrapper()

let nattoBreadcrumbWrapper: VueWrapper<any> = findNattoBreadcrumb(wrapper)

describe('UploadBreadcrumb', () => {
  beforeEach(() => {
    nattoBreadcrumbWrapper = findNattoBreadcrumb(wrapper)
  })
  describe('rendering', () => {
    const disabledCases = [
      { disabledBreadcrumb: true, disabledClassExists: true },
      { disabledBreadcrumb: false, disabledClassExists: false }
    ]

    it.each(disabledCases)(
      `Should have/not have upload-breadcrumb-disabled when disabledBreadcrumbs is $disabledBreadcrumb`,
      ({ disabledBreadcrumb, disabledClassExists }) => {
        // Given disabledCrumbs is $disabledBreadcrumbs
        wrapper = createWrapper({ ...defaultProps, disabledBreadcrumb })

        // Then
        const uploadBreadcrumbContainerWrapper: DOMWrapper<HTMLDivElement> =
          wrapper.find('.upload-breadcrumb-container')

        expect(
          uploadBreadcrumbContainerWrapper
            .classes()
            .includes('upload-breadcrumb-disabled')
        ).toBe(disabledClassExists)
      }
    )
  })
  describe('bindings with arrow-left-icon', () => {
    it(
      'When click on arrow-left-icon, ' +
        'Then last breadcrumbItem must be removed and update:selectedFolderToUpload must be emitted with last breadcrumbItem.id as payload',
      async () => {
        // When click on arrow-left-icon
        const arrowLeftIconWrapper: DOMWrapper<HTMLDivElement> =
          wrapper.find('.arrow-left-icon')

        await arrowLeftIconWrapper.trigger('click')

        // Then
        expect(nattoBreadcrumbWrapper.vm.breadcrumbs).toStrictEqual([
          { id: 0, text: 'GED' },
          { id: 1122, text: 'A classer' }
        ])
        expect(nattoBreadcrumbWrapper.vm.ellipsed).toStrictEqual(true)
        expect(wrapper.emitted('update:selectedFolderToUpload'))
      }
    )
  })
  describe('click on breadcrumbItem', () => {
    it('when selectedFolderToUpload prop changes, it must add the related breadcrumb item', async () => {
      // Given selectedFolderToUpload is set to 0
      wrapper = createWrapper()

      // When selectedFolderToUpload is set to the folder 2705 (name: The grandson)
      await wrapper.setProps({ selectedFolderToUpload: 2705 })

      // Then a breadcrumbItem must be added with 2705 folder information
      expect(wrapper.vm.breadcrumbs).toStrictEqual([
        { id: 0, text: 'GED' },
        { id: 1122, text: 'A classer' },
        { id: 1001, text: 'The child' },
        { id: 2705, text: 'The grandson' }
      ])
      expect(wrapper.emitted('update:selectedFolderToUpload')).toBeFalsy()
    })
  })
})

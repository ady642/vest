import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import constants from '@/Common/constants'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import FolderInfoBox from '@/modules/DataManipulation/Upload/components/Notification/FolderInfoBox.vue'

export type FolderInfoBoxTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    folderName: String
    permissions: String[]
  }>
>

const createWrapper = (
  folderName: String,
  canUpload: Boolean,
  folderDescription: String
): FolderInfoBoxTypeWrapper =>
  wrapperFactory(FolderInfoBox, {
    props: {
      folderName,
      canUpload,
      folderDescription
    }
  })

const data = {
  folderName: 'folder 1',
  canUpload: true,
  folderDescription: 'folder 1 description'
}

describe('FolderInfoBox', () => {
  describe('binding', () => {
    it('Should bind properties correctly', () => {
      const wrapper = createWrapper(
        data.folderName,
        data.canUpload,
        data.folderDescription
      )

      expect(wrapper.props('folderName')).toEqual(data.folderName)
      expect(wrapper.props('canUpload')).toEqual(data.canUpload)
      expect(wrapper.props('folderDescription')).toEqual(data.folderDescription)
    })
  })
  describe('rendering', () => {
    it('should display can upload file description when permission is granted ', () => {
      const wrapper = createWrapper(
        data.folderName,
        data.canUpload,
        data.folderDescription
      )
      const descriptionWrapper = wrapper.find('.text-part-1 > p')
      expect(descriptionWrapper.text()).toStrictEqual(
        `${constants.CAN_ADD_FILE_DESCRIPTION} ${data.folderName}. ${data.folderDescription}`
      )
    })
    it('should display can not upload file description when permission is not granted ', () => {
      const wrapper = createWrapper(
        data.folderName,
        false,
        data.folderDescription
      )
      const descriptionWrapper = wrapper.find('.text-part-1 > p')
      expect(descriptionWrapper.text()).toStrictEqual(
        `${constants.CAN_NOT_ADD_FILE_DESCRIPTION} ${data.folderName}. ${data.folderDescription}`
      )
    })
  })
})

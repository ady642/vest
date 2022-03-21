import MainUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/MainUploadPopup.vue'
import InProgressUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/InProgressUploadPopup.vue'
import FailedUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/FailedUploadPopup.vue'
import SuccessUploadPopup from '@/modules/DataManipulation/Upload/components/Notification/SuccessUploadPopup.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import {
  filesFailedCase,
  filesProgressCase,
  filesSuccessCase
} from '../../__mocks__/FileUploadMock'
import { ref } from 'vue'
import * as translationHelper from '@/Common/hooks/useTranslation'

const createWrapper = ({
  loading,
  duration,
  files
}: {
  loading: boolean
  duration: number
  files: FileUpload[]
}) =>
  wrapperFactory(MainUploadPopup, {
    propsData: {
      loading,
      duration,
      files
    },
    global: {
      stubs: {
        SuccessUploadPopup,
        FailedUploadPopup,
        InProgressUploadPopup
      }
    }
  })

let tMock = jest.fn()
let tcMock = jest.fn()

jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
  t: tMock,
  tc: tcMock
})

describe('InProgressUploadPopup', () => {
  describe('binding', () => {
    it('Should bind correct values and display in-progress when files are running and loading true', () => {
      const wrapper = createWrapper({
        loading: true,
        duration: 1000,
        files: filesProgressCase
      })
      const inProgressUploadPopupWrapper = wrapper.findComponent(
        InProgressUploadPopup
      )

      expect(inProgressUploadPopupWrapper.props('total')).toBe(3)
      expect(inProgressUploadPopupWrapper.props('running')).toBe(1)
      expect(inProgressUploadPopupWrapper.props('loading')).toBe(true)
    })

    it('Should bind correct values and display success popup', () => {
      const wrapper = createWrapper({
        loading: true,
        duration: 1000,
        files: filesSuccessCase
      })
      const successUploadPopupWrapper =
        wrapper.findComponent(SuccessUploadPopup)

      expect(successUploadPopupWrapper.props('successed')).toBe(3)
    })

    it('Should bind correct values and display failed popup', () => {
      const wrapper = createWrapper({
        loading: true,
        duration: 1000,
        files: filesFailedCase
      })
      const failedUploadPopupWrapper = wrapper.findComponent(FailedUploadPopup)

      expect(failedUploadPopupWrapper.props('errored')).toBe(1)
      expect(failedUploadPopupWrapper.props('canceled')).toBe(1)
      expect(failedUploadPopupWrapper.props('successed')).toBe(1)
    })

    it('Should run function after duration when all files uploaded', async () => {
      jest.useFakeTimers()
      const duration = 1000
      const wrapper = createWrapper({
        loading: true,
        duration: duration,
        files: filesProgressCase
      })

      wrapper.setProps({ files: filesSuccessCase })
      await wrapper.vm.$nextTick()

      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        duration
      )
    })
  })
})

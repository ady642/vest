import DownloadIcon from '@/Common/components/Icons/DownloadIcon.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import { findMpIcon } from 'dummy_data/tests/unit/utils/finders'
import useStyleguideStubs from 'dummy_data/tests/unit/utils/useStyleguideStubs'

export type DownloadIconWrapper = VueWrapper<
  ComponentPublicInstance<Record<string, unknown>, { DownloadSvg: File }>
>

const { MpIcon } = useStyleguideStubs()

const createWrapper = (): DownloadIconWrapper =>
  wrapperFactory(DownloadIcon, {
    global: {
      stubs: {
        MpIcon
      }
    }
  })

const wrapper = createWrapper()

describe('DownloadIcon', () => {
  describe('bindings', () => {
    test('props binding', () => {
      const mpIconWrapper = findMpIcon(wrapper)

      expect(mpIconWrapper.props('name')).toBe('download')
    })
  })
})

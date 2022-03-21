import DotIcon from '@/Common/components/Icons/DotIcon.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import DocumentIcon from '@/Common/components/Icons/DocumentIcon.vue'
import { DocumentIconWrapper } from './DocumentIcon.spec'
import DownloadSvg from '@/assets/Icons/Dot.svg'

export type DownloadIconWrapper = VueWrapper<
  ComponentPublicInstance<Record<string, unknown>, { DownloadSvg: File }>
>

const createWrapper = (): DownloadIconWrapper => wrapperFactory(DotIcon)

let wrapper = createWrapper()

describe('DotIcon', () => {
  describe('bindings', () => {
    it('DotSvg <=> src', () => {
      wrapper = createWrapper()

      const documentIconWrapper: DocumentIconWrapper =
        wrapper.findComponent(DocumentIcon)

      expect(documentIconWrapper.vm.src).toBe(DownloadSvg)
    })
  })
})

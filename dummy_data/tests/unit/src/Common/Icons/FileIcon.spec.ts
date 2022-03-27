import FileIcon from '@/Common/components/Icons/FileIcon.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import DocumentIcon from '@/Common/components/Icons/DocumentIcon.vue'
import { DocumentIconWrapper } from './DocumentIcon.spec'
import FileSvg from '@/assets/Icons/File.svg'

export type FileIconWrapper = VueWrapper<
  ComponentPublicInstance<Record<string, unknown>, { FileSvg: File }>
>

const createWrapper = (): FileIconWrapper => wrapperFactory(FileIcon)

let wrapper = createWrapper()

describe('FileIcon', () => {
  describe('bindings', () => {
    it('FileSvg <=> src', () => {
      wrapper = createWrapper()

      const documentIconWrapper: DocumentIconWrapper =
        wrapper.findComponent(DocumentIcon)

      expect(documentIconWrapper.vm.src).toBe(FileSvg)
    })
  })
})

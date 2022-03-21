import DocumentsInAllFoldersBar from '@/modules/Search/components/Filters/InfoBars/DocumentsInAllFoldersBar.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { InfoBarWrapper } from 'tests/unit/src/modules/Search/components/Filters/InfoBars/InfoBar.spec'
import InfoBar from '@/modules/Search/components/Filters/InfoBars/InfoBar.vue'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

type DocumentsInAllFoldersBarProps = {
  nbDocumentsInAllFolders: number
}

type DocumentsInAllFoldersBarSetup = unknown

export type DocumentsInAllFoldersBarWrapper = VueWrapper<
  ComponentPublicInstance<
    DocumentsInAllFoldersBarProps,
    DocumentsInAllFoldersBarSetup
  >
>

const createWrapper = (
  { nbDocumentsInAllFolders }: DocumentsInAllFoldersBarProps = {
    nbDocumentsInAllFolders: 75246
  }
): DocumentsInAllFoldersBarWrapper =>
  wrapperFactory(DocumentsInAllFoldersBar, {
    props: {
      nbDocumentsInAllFolders
    }
  })

let wrapper = createWrapper()

const findInfoBar = (
  wrapper: DocumentsInAllFoldersBarWrapper
): InfoBarWrapper => wrapper.findComponent(InfoBar)

describe('DocumentsInAllFoldersBar', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('bindings with InfoBar', () => {
    it('should bind the props', () => {
      const infoBarWrapper = findInfoBar(wrapper)

      expect(infoBarWrapper.vm.displayArrow).toBe(true)
      expect(infoBarWrapper.vm.title).toBe('Résultats dans toute la GED')
      expect(infoBarWrapper.vm.nbDocuments).toBe(75246)
    })
  })
})

import DocumentsInFolderAndChildBar from '@/modules/Search/components/Filters/InfoBars/DocumentsInFolderAndChildBar.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { InfoBarWrapper } from 'dummy_data/tests/unit/src/modules/Search/components/Filters/InfoBars/InfoBar.spec'
import InfoBar from '@/modules/Search/components/Filters/InfoBars/InfoBar.vue'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

type DocumentsInFolderAndChildBarProps = {
  nbDocumentsInFolderAndChild: number
}

type DocumentsInFolderAndChildBarSetup = unknown

export type DocumentsInFolderAndChildBarWrapper = VueWrapper<
  ComponentPublicInstance<
    DocumentsInFolderAndChildBarProps,
    DocumentsInFolderAndChildBarSetup
  >
>

const createWrapper = (
  { nbDocumentsInFolderAndChild }: DocumentsInFolderAndChildBarProps = {
    nbDocumentsInFolderAndChild: 5200
  }
): DocumentsInFolderAndChildBarWrapper =>
  wrapperFactory(DocumentsInFolderAndChildBar, {
    props: {
      nbDocumentsInFolderAndChild
    }
  })

let wrapper = createWrapper()

const findInfoBar = (
  wrapper: DocumentsInFolderAndChildBarWrapper
): InfoBarWrapper => wrapper.findComponent(InfoBar)

describe('DocumentsInFolderAndChildBar', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('bindings with InfoBar', () => {
    it('should bind the props', () => {
      const infoBarWrapper = findInfoBar(wrapper)

      expect(infoBarWrapper.vm.displayArrow).toBe(false)
      expect(infoBarWrapper.vm.title).toBe(
        'Résultats dans ce dossier et enfants'
      )
      expect(infoBarWrapper.vm.nbDocuments).toBe(5200)
    })
  })
})

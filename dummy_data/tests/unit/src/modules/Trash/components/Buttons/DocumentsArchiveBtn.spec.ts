import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import DocumentsArchiveBtn from '@/modules/Trash/components/Buttons/DocumentsArchiveBtn.vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'

export type DocumentsArchiveBtnTypeWrapper = VueWrapper<
  ComponentPublicInstance<{
    icon: string
    buttoninnerText: string
  }>
>

const createWrapper = (
  icon: string,
  buttoninnerText: string
): DocumentsArchiveBtnTypeWrapper =>
  wrapperFactory(DocumentsArchiveBtn, {
    props: {
      icon,
      buttoninnerText
    },
    global: {
      stubs: {
        NattoIcon
      }
    }
  })

const findDomElement = (
  wrapper: DocumentsArchiveBtnTypeWrapper,
  element: string
) => wrapper.find(element)

let wrapper = createWrapper('delete', 'Tout Archiver')

describe('DocumentsArchiveBtn', () => {
  beforeEach(() => {
    wrapper = createWrapper('delete', 'Tout Archiver')
  })
  describe('binding', () => {
    it('Should bind buttoninnerText prop correctly', () => {
      const btnText = findDomElement(wrapper, '.btn-text')

      expect(btnText.text()).toEqual('Tout Archiver')
    })
    it('Should bind icon prop correctly', () => {
      const NattoIconWrapper = wrapper.findComponent(NattoIcon)

      expect(NattoIconWrapper.props('elementName')).toEqual(
        wrapper.props('icon')
      )
    })
  })
})

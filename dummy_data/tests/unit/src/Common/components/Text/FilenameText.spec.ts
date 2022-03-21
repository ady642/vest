import FilenameText from '@/Common/components/Text/FilenameText.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

export type FileNameTextWrapper = VueWrapper<
  ComponentPublicInstance<{ filename: string }, { filenameFormatted: string }>
>

const createWrapper = (filename: string): FileNameTextWrapper =>
  wrapperFactory(FilenameText, {
    propsData: {
      filename
    },
    shallow: true
  })

describe('FilenameText', () => {
  describe('binding', () => {
    describe('props', () => {
      it('Should display filename formated when send filename props with length > 45', () => {
        const wrapper = createWrapper(
          'nomdefichiersuuuupeeeeeeeeeeeeeeeeeeeerlongggg!!.pdf'
        )
        const spanWrapper: DOMWrapper<any>[] = wrapper.findAll('span')

        expect(spanWrapper.length).toBe(1)
        expect(spanWrapper[0].text()).toBe('nomdefichiersuuuupee...gggg!!.pdf')
      })

      it('Should display filename formated when send filename props with length < 45', () => {
        const wrapper = createWrapper('nomdefichier.pdf')
        const spanWrapper: DOMWrapper<any>[] = wrapper.findAll('span')

        expect(spanWrapper.length).toBe(1)
        expect(spanWrapper[0].text()).toBe('nomdefichier.pdf')
      })
    })
  })
})

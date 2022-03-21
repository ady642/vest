import MultipleDocumentsCtas from '@/modules/Search/components/Buttons/MultipleDocumentsCtas/MultipleDocumentsCtas.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import { findDeleteCta, findDownloadCta } from 'tests/unit/utils/finders'

/****
 * Wrapper types
 */

type MultipleDocumentsCtasProps = {
  selectedDocumentsIds: string[]
}

export type MultipleDocumentsCtasWrapper = VueWrapper<
  ComponentPublicInstance<MultipleDocumentsCtasProps>
>

/****
 * Wrapper creation
 */

const defaultProps: MultipleDocumentsCtasProps = {
  selectedDocumentsIds: ['27']
}

const createWrapper = (props = defaultProps): MultipleDocumentsCtasWrapper =>
  wrapperFactory(MultipleDocumentsCtas, { props })

let wrapper = createWrapper()
let downloadCta = findDownloadCta(wrapper)
let deleteCta = findDeleteCta(wrapper)

describe('MultipleDocumentsCtas', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    downloadCta = findDownloadCta(wrapper)
    deleteCta = findDeleteCta(wrapper)
  })

  describe('bindings with DownloadCta', () => {
    describe('events', () => {
      it('should emit download when DownloadCta emit a click event', async () => {
        await downloadCta.vm.$emit('click')

        expect(wrapper.emitted('download-all-clicked')).toHaveLength(1)
      })
    })
  })

  describe('bindings with DeleteCta', () => {
    test('static props', () => {
      expect(deleteCta.props('selectedDocumentsIds')).toStrictEqual(['27'])
    })
    describe('events', () => {
      it('should emit download when DeleteCta emit a click event', async () => {
        await deleteCta.vm.$emit('click')

        expect(wrapper.emitted('delete-all-clicked')).toHaveLength(1)
      })
    })
  })
})

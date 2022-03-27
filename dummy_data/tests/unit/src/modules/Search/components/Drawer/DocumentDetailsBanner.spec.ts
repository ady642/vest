import DocumentDetailsBanner from '@/modules/Search/components/Drawer/DocumentDetailsBanner.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance, DirectiveBinding } from 'vue'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import { DocumentFromAPI } from '@/Common/types/document'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'

/****
 * Wrapper types
 */
type DocumentDetailsBannerProps = {
  document: Document
}

type DocumentDetailsBannerSetup = {
  isPreviewLoading: boolean
  previewImage: string
}

export type DocumentDetailsBannerWrapper = VueWrapper<
  ComponentPublicInstance<
    DocumentDetailsBannerProps,
    DocumentDetailsBannerSetup
  >
>
/****
 * Wrapper finders
 */

const findPreviewImg = (
  wrapper: DocumentDetailsBannerWrapper
): DOMWrapper<HTMLImageElement> =>
  wrapper.find('.document-details__banner__image')

/****
 * Wrapper creation
 */
const defaultProps: DocumentDetailsBannerProps = {
  document: new Document({ id: '27' } as DocumentFromAPI)
}

const storeDefault = createSearchStoreMocked({
  previewDocumentImage: 'test'
})

storeDefault.dispatch = jest.fn()
const createWrapper = (
  props = defaultProps,
  store = storeDefault
): DocumentDetailsBannerWrapper =>
  wrapperFactory(DocumentDetailsBanner, {
    props,
    global: {
      plugins: [store],
      directives: {
        Loading: (node: Node, binding: DirectiveBinding) => {
          console.log('ici')
          console.log(`v-loading value : ${binding.value}`)
        }
      }
    }
  })

let wrapper = createWrapper()
let previewImgWrapper = findPreviewImg(wrapper)

describe('DocumentDetailsBanner', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    previewImgWrapper = findPreviewImg(wrapper)
  })

  describe('bindings with Preview Img', () => {
    describe('mounted', () => {
      it('should call the downloadPreview action on mounted', () => {
        // The downloadPreview must have been called
        expect(storeDefault.dispatch).toHaveBeenCalledWith(
          'GED/Search/downloadPreview',
          '27'
        )
      })
    })
    test('props bindings', () => {
      // Given preview image is set to dataBase64 string
      wrapper = createWrapper(
        defaultProps,
        createSearchStoreMocked({
          previewDocumentImage: 'test'
        })
      )

      // Then the img preview must have as src the dataBase64 string
      expect(findPreviewImg(wrapper).attributes('src')).toBe('test')
    })
    describe('rendering', () => {
      it.each([
        {
          isPreviewLoading: false,
          isDownloading: false,
          expectedVLoading: false
        },
        {
          isPreviewLoading: false,
          isDownloading: true,
          expectedVLoading: true
        },
        {
          isPreviewLoading: true,
          isDownloading: false,
          expectedVLoading: true
        },
        { isPreviewLoading: true, isDownloading: true, expectedVLoading: true }
      ])(
        'should display loading mask when preview is loading or the document is downloading',
        ({ isPreviewLoading, isDownloading, expectedVLoading }) => {
          const log = console.log

          console.log = jest.fn()

          wrapper = createWrapper(
            defaultProps,
            createSearchStoreMocked({
              isDownloading,
              isPreviewLoading
            })
          )

          expect(console.log).toHaveBeenCalledWith(
            `v-loading value : ${expectedVLoading}`
          )

          console.log = log
        }
      )
      it('should send a downloadPreview action when document change', async () => {
        const store = createSearchStoreMocked()

        store.dispatch = jest.fn()
        wrapper = createWrapper(defaultProps, store)

        await wrapper.setProps({
          document: new Document({ id: '19' } as DocumentFromAPI)
        })

        // Then the store must have dispatched two downloadPreview actions (one during mounted and other when document changes)
        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          'GED/Search/downloadPreview',
          '27'
        )
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          'GED/Search/downloadPreview',
          '19'
        )
      })

      it('should not display preview when previewImage is null', async () => {
        const store = createSearchStoreMocked({
          previewDocumentImage: undefined
        })

        store.dispatch = jest.fn()
        wrapper = createWrapper(defaultProps, store)

        await wrapper.setProps({
          document: new Document({ id: '19' } as DocumentFromAPI)
        })

        expect(wrapper.classes()).not.toContain(['document-details__banner'])
      })
    })
  })
})

import PreviewModalHeader from '@/modules/Search/components/Modals/PreviewModal/PreviewModalHeader/PreviewModalHeader.vue'
import NattoDialog from '@/Common/components/Modals/NattoDialog.vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import PreviewModal from '@/modules/Search/components/Modals/PreviewModal/PreviewModal.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { createDeleteFileStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { searchModule } from '@/modules/Search/store'
import { deleteFileModule } from '@/modules/DataManipulation/Delete/DeleteFile/store'

type PreviewModalPropsType = {
  document: Document
  modelValue: boolean
}

type PreviewModalSetup = {
  creationFolderError: string
}

export type PreviewModalWrapper = VueWrapper<
  ComponentPublicInstance<PreviewModalPropsType, PreviewModalSetup>
>

const createWrapper = ({
  props = defaultProps,
  store = createDeleteFileStoreMocked()
} = {}): PreviewModalWrapper =>
  wrapperFactory(PreviewModal, {
    props,
    global: {
      plugins: [store],
      renderStubDefaultSlot: true
    }
  })

const findPreviewModalHeader = (wrapper: PreviewModalWrapper) =>
  wrapper.findComponent(PreviewModalHeader)

const defaultDocument = new Document()

defaultDocument.id = 'columbo'

const defaultProps: PreviewModalPropsType = {
  modelValue: true,
  document: defaultDocument
}

let wrapper = createWrapper()
let previewModalHeaderWrapper = findPreviewModalHeader(wrapper)

describe('PreviewModal', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    previewModalHeaderWrapper = findPreviewModalHeader(wrapper)
  })

  describe('bindings with PreviewModalHeader', () => {
    test('props bindings', () => {
      const document = new Document()

      document.id = 'columbo'
      document.name = 'test'
      document.type = '.pdf'

      const wrapper = createWrapper({
        props: {
          ...defaultProps,
          document
        },
        store: createDeleteFileStoreMocked({
          isFileDeleting: true,
          isFileDeletable: true
        })
      })

      previewModalHeaderWrapper = findPreviewModalHeader(wrapper)

      expect(previewModalHeaderWrapper.props()).toStrictEqual({
        document,
        isDocumentDeleting: true,
        isDocumentDeletable: true
      })
    })

    describe('events', () => {
      it('should close the modal when the cross is clicked', async () => {
        await previewModalHeaderWrapper.vm.$emit('close-click')

        expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]])
      })
      it('should dispatch downloadDocument with columbo when PreviewModalHeader emits download', async () => {
        const store = createDeleteFileStoreMocked()

        store.dispatch = jest.fn()

        wrapper = createWrapper({
          store
        })

        previewModalHeaderWrapper = findPreviewModalHeader(wrapper)

        await previewModalHeaderWrapper.vm.$emit('download')

        expect(store.dispatch).toHaveBeenCalledWith(
          searchModule('downloadDocument'),
          'columbo'
        )
      })
      it('should dispatch deleteFile with columbo, close the modal and fetch the documents when PreviewModalHeader emits delete', async () => {
        const store = createDeleteFileStoreMocked({
          isFileDeletable: true,
          isFileDeleting: false
        })

        store.dispatch = jest.fn()

        wrapper = createWrapper({
          store
        })

        previewModalHeaderWrapper = findPreviewModalHeader(wrapper)

        await previewModalHeaderWrapper.vm.$emit('delete')

        await flushPromises()

        expect(store.dispatch).toHaveBeenNthCalledWith(
          1,
          deleteFileModule('deleteFiles'),
          ['columbo']
        )
        expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]])
        expect(wrapper.emitted('delete')).toHaveLength(1)
        expect(store.dispatch).toHaveBeenNthCalledWith(
          2,
          searchModule('fetchDocuments')
        )
      })
      it('should not dispatch deleteFile with columbo, close the modal and fetch the documents when document is not deletable', async () => {
        const store = createDeleteFileStoreMocked()

        store.dispatch = jest.fn()

        wrapper = createWrapper({
          store: createDeleteFileStoreMocked({
            isFileDeleting: false,
            isFileDeletable: false
          })
        })

        previewModalHeaderWrapper = findPreviewModalHeader(wrapper)

        await previewModalHeaderWrapper.vm.$emit('delete')

        await flushPromises()

        expect(store.dispatch).not.toHaveBeenCalled()
        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
        expect(wrapper.emitted('delete')).toBeFalsy()
      })
    })
  })

  describe('props binding', () => {
    describe('natto-dialog', () => {
      test('modelValue', () => {
        expect(wrapper.findComponent(NattoDialog).props('modelValue')).toBe(
          true
        )
      })
    })
    describe('img', () => {
      test('src', () => {
        const wrapper = createWrapper({
          store: createDeleteFileStoreMocked({
            previewDocumentImage: 'preview-url'
          })
        })
        const imgWrapper = wrapper.find('img')

        expect(imgWrapper.attributes('src')).toBe('preview-url')
      })
    })
  })
})

import SearchPage from '@/modules/Search/pages/SearchPage.vue'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import DocumentsUploadModal from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/DocumentsUploadModal.vue'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import { createStore, Store } from 'vuex'
import DefaultLayout from '@/Common/layouts/DefaultLayout.vue'
import Search from '@/modules/Search/store'
import DataManipulation from '@/modules/DataManipulation/store'
import Upload, { uploadModule } from '@/modules/DataManipulation/Upload/store'

import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import {
  FileUploadMock,
  filesProgressCase,
  filesSuccessCase,
  filesFailedCase
} from '../../DataManipulation/Upload/__mocks__/FileUploadMock'
import RootStateInterface from '@/store/types/rootState'
import mockGetterHelpers from '@/modules/Search/store/helpers/getterHelpers'
import mockDispatchHelpers from '@/modules/Search/store/helpers/dispatchHelpers'
import { router } from '@kpmg/mypulse-shared-dependencies'

const routerMock = router
const mockTest = jest.fn()

jest.mock('@/modules/Search/store/helpers', () => () => ({
  ...mockGetterHelpers(),
  ...mockDispatchHelpers(),
  addFetchDocumentsSubscriber: mockTest
}))

const mockGoToMainView = jest.fn()

jest.mock('@/modules/Search/navigator/useSearchNavigator', () => () => ({
  goToMainView: mockGoToMainView
}))

export type AppWrapper = VueWrapper<
  ComponentPublicInstance<
    Record<string, unknown>,
    {
      ready: boolean
      isDocumentUploadModalOpened: boolean
      files: FileUpload[]
      selectedFolderToUpload: number
      changeFileStateHandler: () => void
      resetHandler: () => void
      disabledSelectionCategories: boolean
      changeFileDestinationHandler: () => void
      categories: Folder[]
      openUploadModal: () => void
    }
  >
>

const storeMock: Store<RootStateInterface> = createStore({
  modules: {
    GED: {
      namespaced: true,
      modules: {
        Search: {
          ...Search,
          actions: {
            ...Search.actions,
            setFileState: jest.fn(),
            setFileDestination: jest.fn(),
            setPaginator: jest.fn(),
            fetchDocuments: jest.fn()
          }
        },
        DataManipulation: {
          ...DataManipulation,
          modules: {
            Upload
          }
        }
      }
    }
  }
})

const RouterView = {
  template: '<div />',
  name: 'RouterView',
  props: ['isDocumentUploadModalOpened']
}

const createWrapper = (): AppWrapper =>
  wrapperFactory(SearchPage, {
    global: {
      plugins: [storeMock],
      stubs: { DefaultLayout, RouterView }
    }
  })

let wrapper = createWrapper()

const findRouterView = (wrapper: AppWrapper) =>
  wrapper.findComponent(RouterView)
const findDocumentsUploadModal = (wrapper: AppWrapper) =>
  wrapper.findComponent(DocumentsUploadModal)

describe('SearchPage', () => {
  beforeEach(() => {
    // Given Search.vue is mounted
    wrapper = createWrapper()
    storeMock.dispatch = jest.fn()
    mockGoToMainView.mockClear()
  })

  describe('on created', () => {
    it('should subscribe to fetchDocuments action', async () => {
      await wrapper.vm.$nextTick()
      expect(mockTest).toHaveBeenCalled()
    })
    it.each(['/trash', '/bank', 'documents/trash'])(
      'openUploadModal when route is %s',
      async (currentRoute) => {
        routerMock.currentRoute.value.path = currentRoute
        wrapper.vm.openUploadModal()
        await wrapper.vm.$nextTick()
        expect(mockGoToMainView).toHaveBeenCalledWith({
          openFilesUploadModal: true
        })
      }
    )
    it.each(['/documents', '/documents/arbo'])(
      'openUploadModal when route is %s',
      async (currentRoute) => {
        routerMock.currentRoute.value.path = currentRoute
        wrapper.vm.openUploadModal()
        await wrapper.vm.$nextTick()
        expect(mockGoToMainView).not.toHaveBeenCalled()
        const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
          findDocumentsUploadModal(wrapper)

        expect(documentsUploadModalWrapper.props().modelValue).toBe(true)
      }
    )
  })
  describe('events', () => {
    describe('events from RouterView', () => {
      it('Should bind payload from update:isDocumentUploadModalOpened event with modelValue DocumentsUploadModal property', async () => {
        // When RouterView receive an update:isDocumentUploadModalOpened event with true as payload
        const routerViewWrapper = findRouterView(wrapper)

        await routerViewWrapper.vm.$emit(
          'update:isDocumentUploadModalOpened',
          true
        )

        // Then modelValue property of DocumentsUploadModal must be true
        const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
          findDocumentsUploadModal(wrapper)

        expect(documentsUploadModalWrapper.props().modelValue).toBe(true)
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          `${uploadModule('closeGedNotification')}`
        )
      })
      it('Should bind payload from disable-selection-categories event with disabledCategories DocumentsUploadModal property', async () => {
        // When RouterView receive a disable-selection-categories event with true as payload
        const routerViewWrapper = findRouterView(wrapper)

        await routerViewWrapper.vm.$emit('disable-selection-categories', true)

        // Then disabledCategories property of DocumentsUploadModal must be true
        const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
          findDocumentsUploadModal(wrapper)

        expect(documentsUploadModalWrapper.props().disabledCategories).toBe(
          true
        )
      })
      it('Should bind payload from upload-all-files-same-folder event with triggerUploadAllFiles DocumentsUploadModal property', async () => {
        // When RouterView receive a disable-selection-categories event with true as payload
        const routerViewWrapper = findRouterView(wrapper)

        await routerViewWrapper.vm.$emit('upload-all-files-same-folder')

        // Then triggerUploadAllFiles property of DocumentsUploadModal must be true
        const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
          findDocumentsUploadModal(wrapper)

        expect(documentsUploadModalWrapper.props().triggerUploadAllFiles).toBe(
          true
        )
      })
    })
    describe('events from DocumentsUploadModal', () => {
      it('Should bind payload from update:modelValue event with isDocumentUploadModalOpened RouterView property', async () => {
        // When RouterView receive a on-selected-folder-change event with 27 as payload
        const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
          findDocumentsUploadModal(wrapper)

        await documentsUploadModalWrapper.vm.$emit('update:modelValue', true)

        // Then isDocumentUploadModalOpened property of RouterView must be true
        const routerViewWrapper = findRouterView(wrapper)

        expect(routerViewWrapper.props().isDocumentUploadModalOpened).toBe(true)
      })
      it('Should dispatch setPaginator, fetchDocuments and fetchDocumentsTotalCount actions, when reset is emitted', async () => {
        // When DocumentsUploadModal emit reset
        const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
          findDocumentsUploadModal(wrapper)

        await documentsUploadModalWrapper.vm.$emit('reset')

        // Then setPaginator and fetchDocuments  actions must be dispatched
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/setPaginator',
          new DocumentsPaginator()
        )
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/fetchDocuments'
        )
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Search/fetchDocumentsTotalCount'
        )
      })
      describe('showPopup', () => {
        it('Should call setGedNotifications when on-files-dropped event fired (all-files-authorized)', async () => {
          storeMock.state.GED.DataManipulation.Upload.files = filesProgressCase
          await wrapper.vm.$nextTick()
          const routerViewWrapper = findRouterView(wrapper)

          await routerViewWrapper.vm.$emit('on-files-dropped')
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            1,
            `${uploadModule('closeGedNotification')}`
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            2,
            `${uploadModule('setGedNotification')}`,
            'the notification'
          )
        })
        it('Should call setGedNotifications when on-files-dropped event fired (some-files-authorized-other-no)', async () => {
          storeMock.state.GED.DataManipulation.Upload.files = [
            ...filesProgressCase,
            ...filesFailedCase
          ]

          await wrapper.vm.$nextTick()
          const routerViewWrapper = findRouterView(wrapper)

          await routerViewWrapper.vm.$emit('on-files-dropped')
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            1,
            `${uploadModule('closeGedNotification')}`
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            2,
            `${uploadModule('setGedNotification')}`,
            'the notification'
          )
        })
        it('Should call setGedNotifications when on-files-dropped event fired (all-files-are-unauthorized)', async () => {
          storeMock.state.GED.DataManipulation.Upload.files = filesFailedCase

          await wrapper.vm.$nextTick()
          const routerViewWrapper = findRouterView(wrapper)

          await routerViewWrapper.vm.$emit('on-files-dropped')
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            1,
            `${uploadModule('closeGedNotification')}`
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            2,
            `${uploadModule('setGedNotification')}`,
            'the notification'
          )
        })
        it('Should not call setGedNotifications when on-files-dropped event fired (all-files-are-already-uploaded', async () => {
          storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock

          await wrapper.vm.$nextTick()
          const routerViewWrapper = findRouterView(wrapper)

          await routerViewWrapper.vm.$emit('on-files-dropped')
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            1,
            `${uploadModule('closeGedNotification')}`
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            2,
            `${uploadModule('setGedNotification')}`,
            'the notification'
          )
        })
        it('Should dispatch setPaginator, fetchDocuments, fetchDocumentsTotalCount and setGedNotifications actions, when reset is emitted', async () => {
          storeMock.state.GED.DataManipulation.Upload.files = filesProgressCase

          await wrapper.vm.$nextTick()

          // When DocumentsUploadModal emit reset
          const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
            findDocumentsUploadModal(wrapper)

          await documentsUploadModalWrapper.vm.$emit('reset')

          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            1,
            `${uploadModule('closeGedNotification')}`
          )
          expect(storeMock.dispatch).toHaveBeenNthCalledWith(
            2,
            `${uploadModule('setGedNotification')}`,
            'the notification'
          )
          // Then setPaginator and fetchDocuments  actions must be dispatched
          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/setPaginator',
            new DocumentsPaginator()
          )

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/fetchDocuments'
          )

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/fetchDocumentsTotalCount'
          )

          expect(global.ElNotification).toHaveBeenCalled()
        })
        it('Should dispatch only setPaginator, fetchDocuments, fetchDocumentsTotalCount actions, when reset is emitted with every files are finished', async () => {
          storeMock.state.GED.DataManipulation.Upload.files = FileUploadMock

          await wrapper.vm.$nextTick()

          // When DocumentsUploadModal emit reset
          const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
            findDocumentsUploadModal(wrapper)

          await documentsUploadModalWrapper.vm.$emit('reset')

          expect(storeMock.dispatch).not.toHaveBeenCalledWith(
            `${uploadModule('closeGedNotification')}`
          )
          expect(storeMock.dispatch).not.toHaveBeenCalledWith(
            `${uploadModule('setGedNotification')}`,
            'the notification'
          )

          // Then setPaginator and fetchDocuments  actions must be dispatched
          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/setPaginator',
            new DocumentsPaginator()
          )

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/fetchDocuments'
          )

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/fetchDocumentsTotalCount'
          )
        })
        it('Should dispatch setPaginator, fetchDocuments, fetchDocumentsTotalCount and setGedNotifications actions, when reset is emitted and files are failling to upload', async () => {
          storeMock.state.GED.DataManipulation.Upload.files = filesFailedCase

          await wrapper.vm.$nextTick()

          // When DocumentsUploadModal emit reset
          const documentsUploadModalWrapper: VueWrapper<ComponentPublicInstance> =
            findDocumentsUploadModal(wrapper)

          await documentsUploadModalWrapper.vm.$emit('reset')

          // Then setPaginator and fetchDocuments  actions must be dispatched
          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/setPaginator',
            new DocumentsPaginator()
          )

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/fetchDocuments'
          )

          expect(storeMock.dispatch).toHaveBeenCalledWith(
            'GED/Search/fetchDocumentsTotalCount'
          )

          expect(global.ElNotification).toHaveBeenCalled()
        })
      })
    })
  })
})

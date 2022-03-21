import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'
import { TrashDocumentAPIMockList } from '../mocks/TrashDocumentAPIMock'
import TrashView from '@/modules/Trash/views/TrashView.vue'
import ArboViewLayout from '@/modules/Search/components/Layouts/ArboViewLayout.vue'
import TrashViewHeader from '@/modules/Trash/components/Header/TrashViewHeader.vue'
import TrashDocumentsTable from '@/modules/Trash/components/TrashDocumentsTable.vue'
import constants from '@/Common/constants'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import BasicLayout from '@/modules/Search/components/Layouts/BasicLayout.vue'
import { pageViewFactory } from '@/Common/helpers/analyticsLog'
import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

type TrashViewProps = any

type TrashViewSetup = any

export type TrashViewWrapper = VueWrapper<
  ComponentPublicInstance<TrashViewProps, TrashViewSetup>
>

const storeMock = createTrashStoreMock()

const paginatorMock = new TrashDocumentsPaginator({
  pageNumber: 1,
  itemsPerPage: constants.TRASH_VIEW_ITEMS_PER_PAGE,
  totalItems: 100
})

const documentsData = TrashDocuments.loaded(TrashDocumentAPIMockList)

const createWrapper = (store = storeMock): TrashViewWrapper =>
  wrapperFactory(TrashView, {
    global: {
      stubs: {
        ArboViewLayout,
        TrashViewHeader,
        TrashDocumentsTable,
        BasicLayout
      },
      plugins: [store]
    }
  })

let wrapper = createWrapper()

describe('TrashView', () => {
  beforeEach(async () => {
    wrapper = createWrapper()
    storeMock.dispatch = jest.fn()
    expect(pageViewFactory).toBeCalledWith('trashview-pgv')
    jest.clearAllMocks()
  })

  describe('onMounted', () => {
    it('init paginator', async () => {
      wrapper = createWrapper()

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        'GED/Trash/setTrashPaginator',
        new TrashDocumentsPaginator({
          pageNumber: 1,
          itemsPerPage: constants.TRASH_VIEW_ITEMS_PER_PAGE,
          totalItems: 0
        })
      )
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        'GED/Trash/fetchTrashDocuments'
      )
    })
  })
  describe('binding with  TrashDocumentsTable', () => {
    describe('props', () => {
      it('Should bind props correctly with TrashDocumentsTable', () => {
        const TrashDocumentsTableWrapper =
          wrapper.findComponent(TrashDocumentsTable)

        expect(TrashDocumentsTableWrapper.props('documents')).toStrictEqual(
          documentsData
        )

        expect(TrashDocumentsTableWrapper.props('documentsPerPage')).toEqual(
          paginatorMock.itemsPerPage
        )

        expect(TrashDocumentsTableWrapper.props('pageNumber')).toEqual(
          paginatorMock.pageNumber
        )
      })
    })
    describe('events', () => {
      it('Should set page on trash-documents-table page-opened', async () => {
        const ArboViweLayoutWrapper = wrapper.findComponent(ArboViewLayout)

        const TrashDocumentsTableWrapper =
          ArboViweLayoutWrapper.findComponent(TrashDocumentsTable)

        await TrashDocumentsTableWrapper.vm.$emit('page-opened', 1)

        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Trash/setTrashPaginator',
          new TrashDocumentsPaginator({
            pageNumber: 1,
            itemsPerPage: constants.TRASH_VIEW_ITEMS_PER_PAGE,
            totalItems: 100
          })
        )
      })
      it('Should fetch documents on trash-documents-table page-opened', async () => {
        const ArboViweLayoutWrapper = wrapper.findComponent(ArboViewLayout)

        const TrashDocumentsTableWrapper =
          ArboViweLayoutWrapper.findComponent(TrashDocumentsTable)

        await TrashDocumentsTableWrapper.vm.$emit('page-opened', 1)
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          'GED/Trash/fetchTrashDocuments'
        )
      })

      describe('restore-document', () => {
        it('Should dispatch restoreFileByModal, setTrashPaginator and removeFromPendingList when restore-document is emitted from ArboViewLayout', async () => {
          const trashStore = createTrashStoreMock({
            paginator: new TrashDocumentsPaginator({
              pageNumber: 2
            }),
            documents: TrashDocuments.loaded([])
          })

          trashStore.dispatch = jest.fn()

          wrapper = createWrapper(trashStore)

          const TrashDocumentsTableWrapper =
            wrapper.findComponent(TrashDocumentsTable)

          await TrashDocumentsTableWrapper.vm.$emit(
            'restore-document',
            '13232424'
          )

          await flushPromises()

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            1,

            'GED/Trash/setTrashPaginator',

            { itemsPerPage: 10, pageNumber: 1, totalItems: 0 }
          )

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            2,

            'GED/Trash/fetchTrashDocuments'
          )

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            3,
            'GED/Trash/restoreFileByModal',
            '13232424'
          )

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            4,
            'GED/Trash/setTrashPaginator',
            { itemsPerPage: 10, pageNumber: 1, totalItems: 0 }
          )

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            5,
            'GED/Trash/fetchTrashDocuments'
          )
        })
        it('Should dispatch restoreFileByModal, setTrashPaginator and removeFromPendingList when restore-document is emitted from ArboViewLayout', async () => {
          const trashStore = createTrashStoreMock({
            paginator: new TrashDocumentsPaginator({
              pageNumber: 1
            }),
            documents: TrashDocuments.loaded([])
          })

          trashStore.dispatch = jest.fn()

          wrapper = createWrapper(trashStore)

          const TrashDocumentsTableWrapper =
            wrapper.findComponent(TrashDocumentsTable)

          await TrashDocumentsTableWrapper.vm.$emit(
            'restore-document',
            '13232424'
          )

          await flushPromises()

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            1,

            'GED/Trash/setTrashPaginator',

            { itemsPerPage: 10, pageNumber: 1, totalItems: 0 }
          )

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            2,

            'GED/Trash/fetchTrashDocuments'
          )

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            3,
            'GED/Trash/restoreFileByModal',
            '13232424'
          )

          expect(trashStore.dispatch).toHaveBeenNthCalledWith(
            4,
            'GED/Trash/fetchTrashDocuments'
          )
        })
      })
    })
  })
})

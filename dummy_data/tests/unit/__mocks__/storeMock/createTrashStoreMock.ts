import { createStore, Store } from 'vuex'
import RootSearchStateInterface from '@/store/types/rootState'
import Search from '@/modules/Search/store'
import Trash from '@/modules/Trash/store'
import DataManipulation from '@/modules/DataManipulation/store'

import TrashDocumentsPaginator from '@/modules/Trash/models/Query/TrashDocumentsPaginator'
import constants from '@/Common/constants'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import { TrashDocumentAPIMockList } from 'tests/unit/src/modules/Trash/mocks/TrashDocumentAPIMock'

const paginatorMock = new TrashDocumentsPaginator({
  pageNumber: 1,
  itemsPerPage: constants.TRASH_VIEW_ITEMS_PER_PAGE,
  totalItems: 100
})

const documentsData = TrashDocuments.loaded(TrashDocumentAPIMockList)

export const createTrashStoreMock = ({
  documents = documentsData,
  paginator = paginatorMock,
  documentsTotalCount = 1905,
  isInPendingList = false
} = {}): Store<RootSearchStateInterface> =>
  createStore({
    modules: {
      GED: {
        namespaced: true,
        modules: {
          Trash: {
            ...Trash,
            actions: {
              fetchTrashDocuments: jest.fn(),
              restoreFileByModal: jest.fn(),
              closeRestoreNotification: jest.fn(),
              setRestoreNotification: jest.fn(),
              pushInRestorePendingList: jest.fn(),
              removeFromPendingList: jest.fn(),
              setPendingListDocumentStatus: jest.fn(),
              setTrashPaginator: jest.fn()
            },
            getters: {
              ...Trash.getters,
              isInPendingList: () => () => isInPendingList,
              documentsTotalCount: () => documentsTotalCount,
              paginator: () => paginator,
              documents: () => documents
            }
          },
          DataManipulation,
          Search
        }
      }
    }
  })

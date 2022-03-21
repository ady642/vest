import { createStore, Store } from 'vuex'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import RootSearchStateInterface from '@/store/types/rootState'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import RootStateInterface from '@/store/types/rootState'
import Search from '@/modules/Search/store'
import DataManipulation from '@/modules/DataManipulation/store'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import DocumentsPaginator from '@/modules/Search/models/Documents/Query/DocumentsPaginator'
import DocumentsFilters from '@/modules/Search/models/Documents/Query/DocumentsFilters'
import DocumentsSortOptions from '@/modules/Search/models/Documents/Query/DocumentsSortOptions'

export const createDeleteFolderStoreMocked = ({
  hasPermissionToDeleteFolder = false,
  isFolderDeletable = false
} = {}): Store<RootSearchStateInterface> =>
  createStore({
    modules: {
      GED: {
        namespaced: true,
        modules: {
          DataManipulation: {
            namespaced: true,
            modules: {
              DeleteFolders: {
                namespaced: true,
                actions: {
                  deleteFolderByModal: jest.fn()
                },
                getters: {
                  hasPermissionToDeleteFolder:
                    (
                      state: DeleteFoldersStateInterface,
                      getters: any,
                      rootState: RootStateInterface,
                      rootGetters: any
                    ) =>
                    (folderId: number): boolean =>
                      hasPermissionToDeleteFolder,
                  isFolderDeletable:
                    (
                      state: DeleteFoldersStateInterface,
                      getters: any,
                      rootState: RootStateInterface,
                      rootGetters: any
                    ) =>
                    (folderIdToDelete: number): boolean =>
                      isFolderDeletable
                }
              }
            }
          }
        }
      }
    }
  })

export const createFolderStoreMocked = ({
  hasPermissionToAddFolder = true,
  isCreatingFolder = false,
  folders = useFoldersData().FoldersData,
  createFolder = jest.fn()
} = {}): Store<RootSearchStateInterface> =>
  createStore({
    modules: {
      GED: {
        namespaced: true,
        modules: {
          DataManipulation: {
            namespaced: true,
            modules: {
              CreateFolder: {
                namespaced: true,
                actions: {
                  CreateFolder: createFolder
                },
                getters: {
                  folders: () => folders,
                  hasPermissionToAddFolder:
                    (
                      state: CreateFolderStateInterface,
                      getters: any,
                      rootState: RootStateInterface,
                      rootGetters: any
                    ) =>
                    (folderId: number): boolean =>
                      hasPermissionToAddFolder,
                  isCreatingFolder: () => isCreatingFolder
                }
              }
            }
          },
          Search
        }
      }
    }
  })

export const createDeleteFileStoreMocked = ({
  isFileDeletable = false,
  isFileDeleting = false,
  areDocumentsDeletable = false,
  previewDocumentImage = 'columbo.png'
} = {}): Store<RootSearchStateInterface> =>
  createStore({
    modules: {
      GED: {
        namespaced: true,
        modules: {
          Search: {
            namespaced: true,
            actions: {
              fetchDocuments: jest.fn(),
              downloadDocument: jest.fn()
            },
            getters: {
              ...Search.getters,
              previewDocumentImage: () => previewDocumentImage
            }
          },
          DataManipulation: {
            namespaced: true,
            modules: {
              DeleteFile: {
                namespaced: true,
                actions: {
                  deleteFile: jest.fn(),
                  deleteFiles: jest.fn()
                },
                getters: {
                  isFileDeletable:
                    (
                      state: DeleteFoldersStateInterface,
                      getters: any,
                      rootState: RootStateInterface,
                      rootGetters: any
                    ) =>
                    (documentIdToDelete: string) =>
                      isFileDeletable,
                  isFileDeleting: () => isFileDeleting,
                  areDocumentsDeletable: () => () => areDocumentsDeletable
                }
              }
            }
          }
        }
      }
    }
  })

export const createSearchStoreMocked = ({
  documents = Documents.loaded([]),
  folders = Folders.loaded([]),
  paginator = new DocumentsPaginator(),
  searchActive = false,
  activeFiltersCount = 0,
  documentsTotalCount = 0,
  filters = new DocumentsFilters(),
  sortOptions = new DocumentsSortOptions(),
  areAllDocumentsLoaded = false,
  previewDocumentImage = 'test',
  multipleDownloadLoading = false,
  isDownloading = false,
  areAnyFilters = false,
  isPreviewLoading = false
} = {}): Store<RootStateInterface> =>
  createStore({
    modules: {
      GED: {
        namespaced: true,
        modules: {
          Search: {
            ...Search,
            state: {
              ...Search.state,
              documents,
              documentsTotalCount,
              folders,
              filters,
              sortOptions,
              paginator
            },
            getters: {
              ...Search.getters,
              folders: () => folders,
              searchActive: () => searchActive,
              activeFiltersCount: () => activeFiltersCount,
              documents: () => documents,
              paginator: () => paginator,
              documentsTotalCount: () => documentsTotalCount,
              filters: () => filters,
              sortOptions: () => sortOptions,
              areAllDocumentsLoaded: () => areAllDocumentsLoaded,
              previewDocumentImage: () => previewDocumentImage,
              multipleDownloadLoading: () => multipleDownloadLoading,
              isDownloading: () => isDownloading,
              areAnyFilters: () => areAnyFilters,
              isPreviewLoading: () => isPreviewLoading
            },
            actions: {
              ...Search.actions,
              fetchDocumentsTotalCount: jest.fn(),
              fetchDocuments: jest.fn(),
              setPaginator: jest.fn(),
              setFilters: jest.fn(),
              downloadPreview: jest.fn(),
              downloadDocuments: jest.fn(),
              resetVisualization: jest.fn(),
              downloadVisualization: jest.fn()
            }
          },
          DataManipulation
        }
      }
    }
  })

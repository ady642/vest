import { createStore, Store } from 'vuex'
import RootSearchStateInterface from '@/store/types/rootState'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import RootStateInterface from '@/store/types/rootState'
import Search from '@/modules/Search/store'
import Upload from '@/modules/DataManipulation/Upload/store'
import DataManipulation from '@/modules/DataManipulation/store'
import useFoldersData from '../../src/modules/Search/mocks/FoldersDataMock'
import FileUpload from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'

export const createFileStoreMock = ({
  hasPermissionToUploadFile = true,
  hasAccessDs = true,
  isUploading = false,
  folders = useFoldersData().FoldersData,
  files = [] as FileUpload[],
  selectedFolderToUpload = 0
} = {}): Store<RootSearchStateInterface> =>
  createStore({
    modules: {
      GED: {
        namespaced: true,
        modules: {
          DataManipulation: {
            ...DataManipulation,
            namespaced: true,
            modules: {
              ...DataManipulation.modules,
              Upload: {
                ...Upload,
                getters: {
                  ...Upload.getters,
                  hasPermissionToUploadFile:
                    (
                      state: CreateFolderStateInterface,
                      getters: any,
                      rootState: RootStateInterface,
                      rootGetters: any
                    ) =>
                    (folderId: number): boolean =>
                      hasPermissionToUploadFile,
                  isUploading: () => isUploading,
                  hasAccessDs: () => hasAccessDs,
                  files: () => files,
                  selectedFolderToUpload: () => selectedFolderToUpload
                }
              }
            }
          },
          Search: {
            ...Search,
            actions: {
              ...Search.actions,
              setSelectedFolderToUpload: jest.fn()
            },
            getters: {
              ...Search.getters,
              folders: () => folders
            }
          }
        }
      }
    }
  })

import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import UploadFileInfos from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadFileInfos.vue'
import UploadDocumentNavigator from '@/modules/DataManipulation/Upload/components/Navigation/UploadDocumentNavigator.vue'
import UploadBreadcrumb from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/UploadBreadcrumb.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import FolderInfoBox from '@/modules/DataManipulation/Upload/components/Notification/FolderInfoBox.vue'
import DocumentsFoldersCreation from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Forms/DocumentsFoldersCreation.vue'
import { createFolderStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { CreateFolderQuery } from '@/modules/Search/types'
import NattoCreateFolderForm from '@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue'
import { createFolderModule } from '@/modules/DataManipulation/Create/CreateFolder/store'
import { folderMock } from '@/modules/Search/services/__mocks__/folderMock'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import { UploadFileInfosDescriptionWrapper } from './Texts/UploadFileInfosDescription.spec'
import UploadFileInfosDescription from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Content/Texts/UploadFileInfosDescription.vue'
import FolderExistsError from '@/Common/errors/FolderExistsError'
import getErrorMapping from '@/Common/consts/uploadErrorMapping'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn(),
  pageViewFactory: jest.fn()
}))

type UploadFilesInfoProps = {
  selectedFolderToUpload: number
  file: FileUpload
  disabledCategories?: boolean
  canUpload: boolean
  triggerUploadAllFiles: boolean
}

type UploadFilesInfoSetup = {
  folders: Folders
  folderName: string
  showCreateFolderForm: boolean
  showFoldersBrowser: boolean
  displayFolderCreation: boolean
  showForm: boolean
  creationFolderError: string
}

export type UploadFileInfoTypeWrapper = VueWrapper<
  ComponentPublicInstance<UploadFilesInfoProps, UploadFilesInfoSetup>
>

const mainStoreMock = createFolderStoreMocked()

mainStoreMock.state.GED.Search.folders = Folders.loaded(folderMock)

let storeMock = mainStoreMock

const findUploadFileInfosDescription = (
  wrapper: UploadFileInfoTypeWrapper
): UploadFileInfosDescriptionWrapper =>
  wrapper.findComponent(UploadFileInfosDescription)

const defaultProps = {
  selectedFolderToUpload: 135393635, //compta
  file: new FileUpload(
    new File([''], 'filename', { type: 'text/html' }),
    StateUpload.TO_UPLOAD
  ),
  disabledCategories: false,
  canUpload: true,
  triggerUploadAllFiles: false
}
const createWrapper = (
  props = defaultProps,
  store = mainStoreMock
): UploadFileInfoTypeWrapper =>
  wrapperFactory(UploadFileInfos, {
    props,
    global: {
      stubs: {
        UploadDocumentNavigator,
        UploadBreadcrumb,
        FolderInfoBox,
        DocumentsFoldersCreation
      },
      plugins: [store]
    }
  })

let wrapper = createWrapper()
let uploadFileInfosDescriptionWrapper = findUploadFileInfosDescription(wrapper)

describe('UploadFileInfos', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    uploadFileInfosDescriptionWrapper = findUploadFileInfosDescription(wrapper)
    mainStoreMock.dispatch = jest.fn()
    jest.clearAllMocks()
  })
  describe('bindings with UploadFileInfosDescription', () => {
    describe('props bindings', () => {
      // Given the UploadFileInfosDescription is displayed
      const file = new FileUpload(
        new File([''], 'filename', { type: 'text/html' }),
        StateUpload.UPLOADING
      )

      wrapper = createWrapper({
        ...defaultProps,
        triggerUploadAllFiles: true,
        file
      })

      uploadFileInfosDescriptionWrapper =
        findUploadFileInfosDescription(wrapper)

      expect(uploadFileInfosDescriptionWrapper.vm.selectedFolderName).toEqual(
        'Comptabilité'
      )
    })
  })
  describe('binding ', () => {
    describe('props', () => {
      describe('upload-file-permission', () => {
        it('Should hide folders navigation  on icon click', async () => {
          wrapper = createWrapper(
            {
              selectedFolderToUpload: 135393651,

              file: new FileUpload(
                new File([''], 'filename', { type: 'text/html' }),
                StateUpload.TO_UPLOAD
              ),
              disabledCategories: false,
              canUpload: true,
              triggerUploadAllFiles: false
            },
            createFolderStoreMocked({
              hasPermissionToAddFolder: true
            })
          )
          wrapper.vm.displayFolderCreation = true

          await wrapper.vm.$nextTick()
          const AddFolderIcon = wrapper.find('.add-folder-icon')

          await AddFolderIcon.trigger('click')
          expect(trackEventFactory).toBeCalledWith(
            'updm-select-destination-file-add-folder-icon'
          )
          const UploadDocumentNavigatorWrapper = wrapper.findComponent(
            UploadDocumentNavigator
          )

          expect(UploadDocumentNavigatorWrapper.exists()).toBeFalsy()
        })
        it('Should show folders navigation  on cancel click', async () => {
          wrapper = createWrapper(
            {
              selectedFolderToUpload: 135393635,

              file: new FileUpload(
                new File([''], 'filename', { type: 'text/html' }),
                StateUpload.TO_UPLOAD
              ),
              disabledCategories: false,
              canUpload: true,
              triggerUploadAllFiles: false
            },
            createFolderStoreMocked({
              hasPermissionToAddFolder: true
            })
          )

          const AddFolderIcon = wrapper.find('.add-folder-icon')

          await AddFolderIcon.trigger('click')
          expect(trackEventFactory).toBeCalledWith(
            'updm-select-destination-file-add-folder-icon'
          )
          const DocumentsFoldersCreationWrapper = wrapper.findComponent(
            DocumentsFoldersCreation
          )

          await DocumentsFoldersCreationWrapper.vm.$emit(
            'on-cancel-create-folder'
          )
          const UploadDocumentNavigatorWrapper = wrapper.findComponent(
            UploadDocumentNavigator
          )

          expect(UploadDocumentNavigatorWrapper.exists()).toBeTruthy()
        })

        it('Should pass the correct folderName to child component', () => {
          const FolderInfoBoxWrapper = wrapper.findComponent(FolderInfoBox)

          expect(FolderInfoBoxWrapper.props('folderName')).toBe('Comptabilité')
        })

        it('Should pass the correct folderDescription to child component', () => {
          const FolderInfoBoxWrapper = wrapper.findComponent(FolderInfoBox)

          expect(FolderInfoBoxWrapper.props('folderDescription')).toBe(
            'this Comptabilité description.'
          )
        })
        it('Should pass the correct canUpload value to child component', () => {
          const FolderInfoBoxWrapper = wrapper.findComponent(FolderInfoBox)

          expect(FolderInfoBoxWrapper.props('canUpload')).toBe(
            wrapper.props('canUpload')
          )
        })
        it('Should hide folderInfo when treat by collab is chosen', () => {
          wrapper = createWrapper({
            selectedFolderToUpload: 135393635, //compta
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: true
          })

          expect(wrapper.findComponent(FolderInfoBox).exists()).toBeFalsy()
        })
      })
      it('Should pass the correct selectedFolderToUpload to child component', () => {
        const UploadDocumentNavigatorWrapper = wrapper.findComponent(
          UploadDocumentNavigator
        )

        expect(UploadDocumentNavigatorWrapper.props('searchFolderId')).toEqual(
          wrapper.props('selectedFolderToUpload')
        )
      })
      it('Should pass the correct folders to child component', () => {
        const UploadDocumentNavigatorWrapper = wrapper.findComponent(
          UploadDocumentNavigator
        )

        expect(
          UploadDocumentNavigatorWrapper.props('folders').collection.length
        ).toEqual(wrapper.vm.folders.collection.length)
      })
      it('Should bind correctly the file prop ', () => {
        expect(wrapper.vm.file).toStrictEqual(
          new FileUpload(
            new File([''], 'filename', { type: 'text/html' }),
            StateUpload.TO_UPLOAD
          )
        )
        expect(wrapper.vm.file.state).toEqual(StateUpload.TO_UPLOAD)
      })
      it('Should pass the correct disabledCategories prop to child component', () => {
        const UploadDocumentNavigatorWrapper = wrapper.findComponent(
          UploadDocumentNavigator
        )

        expect(UploadDocumentNavigatorWrapper.props('disabled')).toEqual(
          wrapper.vm.disabledCategories
        )
      })
      it('Should pass the correct disabledCategories prop to child component', () => {
        const UploadDocumentNavigatorWrapper = wrapper.findComponent(
          UploadDocumentNavigator
        )

        expect(UploadDocumentNavigatorWrapper.props('disabled')).toEqual(
          wrapper.vm.disabledCategories
        )
      })
      it('Should pass the correct props to UploadBreadcrumb', () => {
        const UploadBreadcrumbWrapper = wrapper.findComponent(UploadBreadcrumb)

        expect(UploadBreadcrumbWrapper.props('disabledBreadcrumb')).toEqual(
          wrapper.vm.disabledCategories
        )
        expect(UploadBreadcrumbWrapper.props('folders')).toEqual(
          wrapper.vm.folders
        )
        expect(UploadBreadcrumbWrapper.props('selectedFolderToUpload')).toEqual(
          wrapper.vm.selectedFolderToUpload
        )
      })
    })
    describe('DocumentsFoldersCreation', () => {
      it('Should pass the canceled error correctly', async () => {
        const file = new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.CANCELED
        )

        file.errorDescription = getErrorMapping('CanceledUpload')
        wrapper = createWrapper({
          selectedFolderToUpload: 135393651,
          file,
          disabledCategories: false,
          canUpload: true,
          triggerUploadAllFiles: false
        })

        const DocumentsFoldersCreationWrapper = wrapper.find('error-zone')

        // Then set the error message
        expect(DocumentsFoldersCreationWrapper).toBeTruthy()
      })
      it('Should pass the creationFolderError correctly', async () => {
        const mockStore = createFolderStoreMocked({
          hasPermissionToAddFolder: true
        })

        mockStore.dispatch = jest.fn(() => {
          throw new FolderExistsError()
        })

        wrapper = createWrapper(
          {
            selectedFolderToUpload: 135393651,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          mockStore
        )
        wrapper.vm.displayFolderCreation = true

        await wrapper.vm.$nextTick()

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        const data = {
          targetFolder: 1234,
          folderName: 'hello'
        }

        // When create-folder-click is emitted
        await DocumentsFoldersCreationWrapper.vm.$emit('on-create-folder', data)

        await wrapper.vm.$nextTick()
        // Then set the error message
        expect(wrapper.vm.creationFolderError).toBe(
          'ged.dataManipulation.create.folder.error.alreadyExists with {"folderName":"hello"}'
        )
      })
      it('Should pass selectedFolderId correctly to child component ', async () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 135393651,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        wrapper.vm.displayFolderCreation = true

        await wrapper.vm.$nextTick()

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        expect(wrapper.props('selectedFolderToUpload')).toBe(
          DocumentsFoldersCreationWrapper.props('selectedFolderId')
        )
      })
      it('Should pass the correct shoForm prop to child component', async () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 135393651,

            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )
        wrapper.vm.displayFolderCreation = true

        await wrapper.vm.$nextTick()

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        expect(DocumentsFoldersCreationWrapper.props('showForm')).toBe(
          wrapper.vm.showForm
        )
      })
    })
  })

  describe('rendering', () => {
    describe('DocumentsFoldersCreation', () => {
      it('Should be visible when showCreateFolderForm  is true', async () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 1122,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )
        wrapper.vm.displayFolderCreation = true
        await wrapper.vm.$nextTick()
        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        expect(DocumentsFoldersCreationWrapper.exists()).toBeTruthy()
      })
      it('Should not be visible when folder has childrens', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 135393635,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        expect(DocumentsFoldersCreationWrapper.exists()).toBeFalsy()
      })
      it('Should not be visible when selectedFolderToUpload  is 0', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 0,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        expect(DocumentsFoldersCreationWrapper.exists()).toBeFalsy()
      })
      it('Should not be visible when displayFolderCreation  is false', async () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 135393651,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )
        wrapper.vm.displayFolderCreation = false
        await wrapper.vm.$nextTick()
        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        expect(DocumentsFoldersCreationWrapper.exists()).toBeFalsy()
      })
    })
    describe('add folder small breadcrumb icon', () => {
      it('Should be visible when folderHasChildrens and canAddFolder are true', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 135393635,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        const AddFolderIcon = wrapper.find('.add-folder-icon')

        expect(AddFolderIcon.exists()).toBeTruthy()
      })

      it('Should not be visible when folderHasChildrens is false', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        const AddFolderIcon = wrapper.find('.add-folder-icon')

        expect(AddFolderIcon.exists()).toBeFalsy()
      })
      it('Should not be visible when canAddFolder is false', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 1122,

            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: false
          })
        )

        const AddFolderIcon = wrapper.find('.add-folder-icon')

        // expect(AddFolderIcon.exists()).toBeFalsy()
      })
    })
    it.each([
      {
        state: StateUpload.ERROR,
        libelle: 'errored',
        description: 'awesome error!'
      },
      {
        state: StateUpload.CANCELED,
        libelle: 'canceled',
        description: 'awesome cancelation!'
      }
    ])(
      'should display libelle when selected file contains an error or canceled or file type not supported ',
      ({ libelle, state, description }) => {
        const fileError = new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          state
        )

        fileError.errorDescription = {
          libelle,
          description
        }
        defaultProps.file = fileError

        wrapper = createWrapper({
          selectedFolderToUpload: 1122,
          file: fileError,
          disabledCategories: false,
          canUpload: true,
          triggerUploadAllFiles: false
        })

        const labelWrapper = wrapper.find('.error-libelle')
        const descriptionWrapper = wrapper.find('.error-descriptif')

        expect(labelWrapper.text()).toBe(libelle)
        expect(descriptionWrapper.text()).toBe(description)
      }
    )

    it('Should display small add folder icon when the folder has chidrens', () => {
      expect(wrapper.find('.add-folder-icon')).toBeTruthy()
    })
  })

  describe('events', () => {
    describe('DocumentsFoldersCreation', () => {
      it('Should display create folder form on cta click', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )
        const query = {
          targetFolder: 1,
          folderName: 'aaaa',
          accountNumber: '1234'
        }

        DocumentsFoldersCreationWrapper.vm.$emit(
          'on-folder-creation-cta-click',
          query
        )
        expect(trackEventFactory).toBeCalledWith(
          'updm-select-destination-file-add-folder-cta'
        )
        expect(
          DocumentsFoldersCreationWrapper.findComponent(NattoCreateFolderForm)
        ).toBeTruthy()
      })
      it('Should display create folder cta on cancel click', async () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )

        await DocumentsFoldersCreationWrapper.vm.$emit(
          'on-cancel-create-folder'
        )

        expect(wrapper.find('.create-folder-button')).toBeTruthy()
      })
      it('Should dispatch CreateFolder event when on-create-folder is triggered', async () => {
        storeMock = createFolderStoreMocked({ hasPermissionToAddFolder: true })

        storeMock.dispatch = jest.fn()

        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          storeMock
        )

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )
        const query = {
          targetFolder: 1,
          folderName: 'aaaa',
          accountNumber: '1234'
        } as CreateFolderQuery

        await DocumentsFoldersCreationWrapper.vm.$emit(
          'on-create-folder',
          query
        )

        expect(trackEventFactory).toBeCalledWith(
          'updm-select-destination-file-create-folder'
        )
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          createFolderModule('CreateFolder'),
          query
        )
      })
      it('Should not dispatch CreateFolder event when on-create-folder is triggered when folder exists', async () => {
        storeMock = createFolderStoreMocked({
          hasPermissionToAddFolder: true
        })

        storeMock.dispatch = jest.fn()
        storeMock.state.GED.Search.folders = Folders.loaded([
          {
            id: 1233,
            name: 'A classer',
            parent: { id: 0 },
            children: [],
            properties: {},
            permissions: []
          }
        ])

        wrapper = createWrapper(
          {
            selectedFolderToUpload: 1233,

            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          storeMock
        )

        const DocumentsFoldersCreationWrapper = wrapper.findComponent(
          DocumentsFoldersCreation
        )
        const query = {
          targetFolder: 1,
          folderName: 'A classer',
          accountNumber: '1234'
        } as CreateFolderQuery

        await DocumentsFoldersCreationWrapper.vm.$emit(
          'on-create-folder',
          query
        )

        expect(trackEventFactory).toBeCalledWith(
          'updm-select-destination-file-create-folder'
        )
        expect(storeMock.dispatch).toBeCalledTimes(1)
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          createFolderModule('CreateFolder'),
          query
        )
      })
      it('Should display small add folder icon when the folder has chidrens and not disabledCategories', () => {
        expect(wrapper.find('.add-folder-icon')).toBeTruthy()
      })

      it('Should not rendering small add folder icon when disabledCategories is true', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,

            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: true,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )
        expect(wrapper.find('.add-folder-icon').exists()).toBeFalsy()
      })

      it('Should not rendering small add folder icon when the folder has no child', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: false,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )

        expect(wrapper.find('.add-folder-icon').exists()).toBeFalsy()
      })

      it('Should not rendering DocumentsFoldersCreation when disabledCategories is true', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,
            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: true,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )
        expect(
          wrapper.findComponent(DocumentsFoldersCreation).exists()
        ).toBeFalsy()
      })
      it('Should not rendering UploadDocumentNavigator when disabledCategories is true', () => {
        wrapper = createWrapper(
          {
            selectedFolderToUpload: 136432102,

            file: new FileUpload(
              new File([''], 'filename', { type: 'text/html' }),
              StateUpload.TO_UPLOAD
            ),
            disabledCategories: true,
            canUpload: true,
            triggerUploadAllFiles: false
          },
          createFolderStoreMocked({
            hasPermissionToAddFolder: true
          })
        )
        expect(
          wrapper.findComponent(UploadDocumentNavigator).exists()
        ).toBeFalsy()
      })
    })

    it('should emit update:selectedFolderToUpload when UploadBreadcrumb emit update:selectedFolderToUpload', async () => {
      wrapper = createWrapper({
        selectedFolderToUpload: 1122,

        file: new FileUpload(
          new File([''], 'filename', { type: 'text/html' }),
          StateUpload.TO_UPLOAD
        ),
        disabledCategories: false,
        canUpload: true,
        triggerUploadAllFiles: false
      })

      // When UploadBreadcrumb emit update:selectedFolderToUpload
      const uploadBreadcrumbWrapper = wrapper.findComponent(UploadBreadcrumb)

      await uploadBreadcrumbWrapper.vm.$emit(
        'update:selectedFolderToUpload',
        99
      )

      // Then UploadFileInfo should emit update:selectedFolderToUpload
      expect(wrapper.emitted('update:selectedFolderToUpload')).toBeTruthy()
    })
  })
})

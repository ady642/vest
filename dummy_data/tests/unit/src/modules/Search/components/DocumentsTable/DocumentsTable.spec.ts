import { VueWrapper } from '@vue/test-utils'
import DocumentsTable from '@/modules/Search/components/DocumentsTable/DocumentsTable.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import NattoTable from '@/Common/components/Table/NattoTable.vue'
import Documents from '@/modules/Search/models/Documents/Inputs/Documents'
import { documentAPIMock } from 'tests/unit/src/modules/Search/mocks/DocumentAPIMock'
import { ComponentPublicInstance } from '@vue/runtime-core'
import { NattoTableWrapper } from 'tests/unit/src/Common/components/Table/NattoTable.spec'
import constants from '@/Common/constants'
import DeleteFileModalConfirmation from '@/modules/DataManipulation/Delete/DeleteFile/components/Modals/DeleteFileModalConfirmation.vue'
import DocumentSyncStatusElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentSyncStatusElement.vue'
import DocumentNameElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue'
import Properties from '@/modules/Search/models/Documents/Inputs/Properties'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'
import Document, {
  LifeCycleStatus
} from '@/modules/Search/models/Documents/Inputs/Document'
import { router } from '@kpmg/mypulse-shared-dependencies'
import { findDocumentActionsElement } from 'tests/unit/utils/finders'

const { MpTable } = useStyleguideStubs()

type DocumentsTableProps = {
  documents: Documents
  hideHeader?: boolean
  areAllDocumentsLoaded?: boolean
  isCollabUser: boolean
  search?: string
}

type DocumentsTableSetup = {
  documentsCellClassName: () => string
}

export type DocumentsTableWrapper = VueWrapper<
  ComponentPublicInstance<DocumentsTableProps, DocumentsTableSetup>
>

const defaultProps: DocumentsTableProps = {
  documents: Documents.loading('awesome cancel token'),
  hideHeader: false,
  areAllDocumentsLoaded: false,
  isCollabUser: false,
  search: 'test'
}

const createWrapper = (props = defaultProps) =>
  wrapperFactory(DocumentsTable, {
    global: {
      stubs: { NattoTable, MpTable, DocumentSyncStatusElement },
      directives: { Loading: {}, InfiniteScroll: {} }
    },
    props
  })

let wrapper = createWrapper()

const findNattoTable = (wrapper: DocumentsTableWrapper): NattoTableWrapper =>
  wrapper.findComponent(NattoTable)
const findDocumentNameElement = (wrapper: DocumentsTableWrapper) =>
  wrapper.findComponent(DocumentNameElement)

let documentActionElementWrapper = findDocumentActionsElement(wrapper)

describe('DocumentsTable', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    documentActionElementWrapper = findDocumentActionsElement(wrapper)
  })

  describe('DocumentsNameElement bindings', () => {
    test('props bindings', () => {
      const documentNameElementWrapper = findDocumentNameElement(wrapper)

      expect(documentNameElementWrapper.vm.search).toBe('test')
    })
  })

  describe('DocumentActionsElement bindings', () => {
    test('props bindings', () => {
      expect(documentActionElementWrapper.props()).toStrictEqual({
        displayGoTo: true
      })
    })
    describe('events', () => {
      it('Should open delete folder modal when delete-clicked', async () => {
        await documentActionElementWrapper.vm.$emit('delete-clicked', {
          documentId: '1234',
          isSynchronizedDocument: true
        })

        const deleteFileModalConfirmationWrapper: VueWrapper<any> =
          wrapper.findComponent(DeleteFileModalConfirmation)

        expect(deleteFileModalConfirmationWrapper.props('modelValue')).toBe(
          true
        )
        expect(
          deleteFileModalConfirmationWrapper.props('documentIds')
        ).toStrictEqual(['1234'])
        expect(
          deleteFileModalConfirmationWrapper.props('isSynchronizedDocument')
        ).toBe(true)
      })
      it('Should go to arboView if goto-clicked is emitted', async () => {
        await documentActionElementWrapper.vm.$emit('goto-clicked', {
          documentId: '1234',
          isSynchronizedDocument: true,
          folderId: 9876
        })

        expect(router.push).toHaveBeenCalledWith({
          name: 'ArboView',
          query: { folderId: 9876 }
        })
      })

      it('should send an on-download-document event, when download-clicked event is sent to from DocumentActions', async () => {
        await documentActionElementWrapper.vm.$emit('download-clicked', {
          documentId: '1234',
          isSynchronizedDocument: true
        })

        expect(wrapper.emitted('on-download-document')).toBeTruthy()
        expect(wrapper.emitted('on-download-document')).toEqual([['1234']])
      })
    })
  })

  describe('Natto Table bindings', () => {
    describe('props', () => {
      it('should pass props to the NattoTable props', () => {
        // Given the documents are defined
        wrapper = createWrapper({
          documents: Documents.loaded([documentAPIMock]),
          hideHeader: true,
          areAllDocumentsLoaded: true,
          isCollabUser: false
        })

        // Then the Documents.collection must be passed to the NattoTable
        const nattoTableWrapper = findNattoTable(wrapper)

        expect(nattoTableWrapper.vm.tableData).toEqual([
          {
            comments: 'je suis le bilan comptable',
            createdBy: '',
            id: 'myID',
            folderId: 45454,
            name: 'Mon bilan comptable',
            creationDate: '2018-05-27',
            path: [],
            properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
            restorationStatus: '',
            size: 54545,
            type: 'jpg',
            updatedDate: '2018-05-27',
            preview: '',
            lifecycleStatus: LifeCycleStatus.Treated
          }
        ])
        expect(nattoTableWrapper.vm.hideHeader).toBe(true)
        expect(nattoTableWrapper.vm.cellClassName).toBe(
          wrapper.vm.documentsCellClassName
        )
        expect(nattoTableWrapper.vm.infiniteScrollFinished).toBe(true)
      })
    })
    describe('events', () => {
      it('should emit document-clicked when NattoTable emits row-clicked', () => {
        const nattoTableWrapper = findNattoTable(wrapper)

        const document = new Document()

        document.id = 'TEST'
        nattoTableWrapper.vm.$emit('row-clicked', document)

        expect(wrapper.emitted('document-clicked')).toHaveLength(1)
        expect(wrapper.emitted('document-clicked')).toStrictEqual([[document]])
        expect(wrapper.emitted('document-clicked')).toBeTruthy()
      })
      it('should emit on-scroll-to-bottom when NattoTable emits on-scroll-to-bottom', () => {
        const nattoTableWrapper = findNattoTable(wrapper)

        nattoTableWrapper.vm.$emit('on-scroll-to-bottom')

        expect(wrapper.emitted('on-scroll-to-bottom')).toHaveLength(1)
        expect(wrapper.emitted('on-scroll-to-bottom')).toBeTruthy()
      })
      it('should return justify-center class for first column and empty string for others column', () => {
        // Given
        expect(wrapper.vm.documentsCellClassName({ columnIndex: 0 })).toBe(
          'justify-center'
        )
        expect(wrapper.vm.documentsCellClassName({ columnIndex: 1 })).toBe('')
      })
    })
    describe('rendering', () => {
      it('should not render ged sync icon when isCollabUser is false', () => {
        expect(
          wrapper.findComponent(DocumentSyncStatusElement).exists()
        ).toBeFalsy()
      })

      it('should not render ged sync icon when isCollabUser is true', () => {
        wrapper = createWrapper({
          documents: Documents.loaded([documentAPIMock]),
          hideHeader: true,
          areAllDocumentsLoaded: true,
          isCollabUser: true
        })
        expect(
          wrapper.findComponent(DocumentSyncStatusElement).exists()
        ).toBeTruthy()
      })
    })
  })
})

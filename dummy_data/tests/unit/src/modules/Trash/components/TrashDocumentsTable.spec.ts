import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { NattoTableWrapper } from 'dummy_data/tests/unit/src/Common/components/Table/NattoTable.spec'
import NattoTable from '@/Common/components/Table/NattoTable.vue'
import { createTrashStoreMock } from 'dummy_data/tests/unit/__mocks__/storeMock/createTrashStoreMock'
import TrashDocuments from '@/modules/Trash/models/Inputs/TrashDocuments'
import DocumentTypeElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentTypeElement.vue'
import DocumentNameElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentNameElement.vue'
import DocumentCreationDateElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentCreationDateElement.vue'
import TrashDocumentOrigin from '@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentOrigin.vue'
import TrashDocumentRestore from '@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentRestore.vue'
import TrashDocumentsActionsElement from '@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentsActionsElement.vue'
import { TrashDocumentAPILightMockList } from '../mocks/TrashDocumentAPIMock'
import TrashDocumentsTable from '@/modules/Trash/components/TrashDocumentsTable.vue'
import RestoreFileModalConfirmation from '@/modules/Trash/components/Modals/RestoreFileModalConfirmation.vue'
import { RestoreFileModalConfirmationWrapper } from 'dummy_data/tests/unit/src/modules/Trash/components/Modals/RestoreFileModalConfirmation.spec'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn()
}))

const { ElTable } = useElementStubs()

type TrashDocumentsTableProps = {
  documents: TrashDocuments
  documentsPerPage: number
  documentsTotalInFolderAndChild: number
  pageNumber: number
}

type TrashDocumentsTableSetup = {
  handlePageOpened: () => void
  fileRestoreModalState: () => void
  handleRestoreFileClickedByTab: () => void
  handleRestoreFileClickedByMenu: () => void
  areDocumentsLoading: boolean
  trashDocumentRowClass: string
}

export type TrashDocumentsTableWrapper = VueWrapper<
  ComponentPublicInstance<TrashDocumentsTableProps, TrashDocumentsTableSetup>
>
const mainStoreMock = createTrashStoreMock()

const defaultProps: TrashDocumentsTableProps = {
  documents: TrashDocuments.loaded(TrashDocumentAPILightMockList),
  documentsPerPage: 10,
  documentsTotalInFolderAndChild: 5201,
  pageNumber: 520
}

const createWrapper = (
  {
    documents,
    documentsPerPage,
    documentsTotalInFolderAndChild,
    pageNumber
  } = defaultProps,
  store = mainStoreMock
): TrashDocumentsTableWrapper =>
  wrapperFactory(TrashDocumentsTable, {
    props: {
      documents,
      documentsPerPage,
      documentsTotalInFolderAndChild,
      pageNumber
    },
    global: {
      stubs: {
        NattoTable,
        TrashDocumentsActionsElement,
        ElTable,
        TrashDocumentRestore,
        TrashDocumentOrigin,
        DocumentCreationDateElement,
        DocumentNameElement,
        DocumentTypeElement,
        RestoreFileModalConfirmation
      },
      directives: {
        Loading: {},
        InfiniteScroll: {}
      },
      plugins: [store]
    }
  })

const findNattoTable = (
  wrapper: TrashDocumentsTableWrapper
): NattoTableWrapper => wrapper.findComponent(NattoTable)

let wrapper = createWrapper()
let nattoTableWrapper = findNattoTable(wrapper)

describe('TrashDocumentsTable', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    mainStoreMock.dispatch = jest.fn()
  })

  describe('bindings with NattoTable', () => {
    describe('props', () => {
      nattoTableWrapper = findNattoTable(wrapper)

      expect(nattoTableWrapper.vm.tableData.length).toEqual(
        defaultProps.documents.collection.length
      )
      expect(nattoTableWrapper.vm.itemsPerPage).toBe(10)
      expect(nattoTableWrapper.vm.pageNumber).toBe(520)
      expect(nattoTableWrapper.vm.itemsTotal).toBe(5201)
      expect(nattoTableWrapper.vm.paginated).toBe(true)
      expect(nattoTableWrapper.vm.loading).toBe(false)
      expect(nattoTableWrapper.vm.rowClassName).toBe(
        wrapper.vm.trashDocumentRowClass
      )

      describe('tests disabled row', () => {
        const cases = [
          { isInPendingList: true, expectedClass: 'row--disabled' },
          { isInPendingList: false, expectedClass: '' }
        ]

        it.each(cases)(
          'should disabled the row if the trashDocument is in restoration',
          ({ isInPendingList, expectedClass }) => {
            wrapper = createWrapper(
              defaultProps,
              createTrashStoreMock({ isInPendingList })
            )

            nattoTableWrapper = findNattoTable(wrapper)

            if (!nattoTableWrapper.vm.rowClassName) {
              return
            }

            expect(
              nattoTableWrapper.vm.rowClassName({
                row: { id: 4545 },
                rowIndex: 45688
              })
            ).toBe(expectedClass)
          }
        )
      })
    })
    describe('events', () => {
      it('should emit page-opened when NattoTable emits page-opened', async () => {
        const nattoTableWrapper: NattoTableWrapper =
          wrapper.findComponent(NattoTable)

        await nattoTableWrapper.vm.$emit('page-opened', 2)

        expect(wrapper.emitted('page-opened')).toHaveLength(1)
        expect(wrapper.emitted('page-opened')).toEqual([[2]])
      })

      it('should open confirmation modal when restore-clicked is emited', async () => {
        const trashDocumentsActionsElementWrapper = wrapper.findComponent(
          TrashDocumentsActionsElement
        )

        await trashDocumentsActionsElementWrapper.vm.$emit(
          'restore-clicked',
          '81180f6a-7ae3-441c-b3d1-3e85ff1732fd'
        )
        const restoreFileModalConfirmationWrapper: RestoreFileModalConfirmationWrapper =
          wrapper.findComponent(RestoreFileModalConfirmation)

        expect(trackEventFactory).toBeCalledWith('tdv-menu-restore')
        expect(restoreFileModalConfirmationWrapper.vm.documentId).toBe(
          '81180f6a-7ae3-441c-b3d1-3e85ff1732fd'
        )
        expect(restoreFileModalConfirmationWrapper.vm.modelValue).toBe(true)
      })

      it('should open confirmation modal when restore-icon-click is emited', async () => {
        const TrashDocumentRestoreWrapper =
          wrapper.findComponent(TrashDocumentRestore)

        await TrashDocumentRestoreWrapper.vm.$emit('restore-icon-click', '1122')
        const restoreFileModalConfirmationWrapper: RestoreFileModalConfirmationWrapper =
          wrapper.findComponent(RestoreFileModalConfirmation)

        expect(trackEventFactory).toBeCalledWith('tdv-tab-restore')
        expect(restoreFileModalConfirmationWrapper.vm.documentId).toBe('1122')
        expect(restoreFileModalConfirmationWrapper.vm.modelValue).toBe(true)
      })

      it('should emit restore-document when restore-confirm is emited', async () => {
        const restoreFileModalConfirmationWrapper: RestoreFileModalConfirmationWrapper =
          wrapper.findComponent(RestoreFileModalConfirmation)

        await restoreFileModalConfirmationWrapper.vm.$emit(
          'restore-confirm',
          '1122'
        )

        expect(wrapper.emitted('restore-document')).toHaveLength(1)
        expect(wrapper.emitted('restore-document')).toEqual([['1122']])
      })
    })
  })
})

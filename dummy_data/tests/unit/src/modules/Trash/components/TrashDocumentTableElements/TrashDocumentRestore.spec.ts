import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { createTrashStoreMock } from 'tests/unit/__mocks__/storeMock/createTrashStoreMock'

import TrashDocumentRestore from '@/modules/Trash/components/TrashDocumentsTableElements/TrashDocumentRestore.vue'
import DocumentsTableElement from '@/modules/Search/components/DocumentsTable/DocumentsTableElements/DocumentsTableElement.vue'
import RestoreIcon from '@/Common/components/Icons/RestoreIcon.vue'
import NattoTableItem from '@/Common/components/Table/NattoTableItem.vue'
import { ComponentPublicInstance } from 'vue'
import useElement from 'tests/unit/utils/useElementStubs'

const { ElTableColumn } = useElement()
const storeMock = createTrashStoreMock()

type TrashDocumentRestoreProps = any

type TrashDocumentRestoreSetup = {
  handleClick: () => void
  trashDocumentsCount: number
}

export type TrashDocumentRestoreTypeWrapper = VueWrapper<
  ComponentPublicInstance<TrashDocumentRestoreProps, TrashDocumentRestoreSetup>
>

const defaultProps: TrashDocumentRestoreProps = {}

const createWrapper = (
  props = defaultProps,
  store = storeMock
): TrashDocumentRestoreTypeWrapper =>
  wrapperFactory(TrashDocumentRestore, {
    props,
    global: {
      plugins: [store],
      stubs: {
        DocumentsTableElement,
        RestoreIcon,
        NattoTableItem,
        ElTableColumn
      }
    }
  })

let wrapper = createWrapper()

describe('TrashDocumentRestore', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('binding', () => {
    describe('events', () => {
      it('Should fire restore-icon-click when restore icon is clicked', async () => {
        const restoreIconWrapper = wrapper.find('.restore-icon')

        await restoreIconWrapper.trigger('click')

        expect(wrapper.emitted('restore-icon-click')).toBeTruthy()
        expect(wrapper.emitted('restore-icon-click')).toHaveLength(1)
        expect(wrapper.emitted('restore-icon-click')).toStrictEqual([[45]])
      })
    })
  })
})

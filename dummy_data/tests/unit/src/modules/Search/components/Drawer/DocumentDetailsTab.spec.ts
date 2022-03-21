import { ComponentPublicInstance } from 'vue'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import DocumentDetailsTab from '@/modules/Search/components/Drawer/DocumentDetailsTab.vue'
import NattoDate from '@/Common/components/Dates/NattoDate.vue'
import constants from '@/Common/constants'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import Properties from '@/modules/Search/models/Documents/Inputs/Properties'

type DocumentDetailsTabProps = {
  document: Document
}

export type DocumentDetailsTabTypeWrapper = VueWrapper<
  ComponentPublicInstance<DocumentDetailsTabProps>
>

const defaultProps: DocumentDetailsTabProps = {
  document: {
    createdBy: 'luffy',
    id: 'myID',
    folderId: 45454,
    name: 'Mon bilan comptable',
    creationDate: '2018-05-27',
    path: [],
    properties: new Properties({ syncStatus: constants.PENDING_SYNC }),
    restorationStatus: '',
    size: 54545,
    type: 'jpg',
    updatedDate: '2018-05-29',
    preview: 'preview-href',
    get isTreated(): boolean {
      return false
    },
    get isNew(): boolean {
      return false
    },
    get isSync(): boolean {
      return false
    }
  }
}

const findAllControle = (
  wrapper: DocumentDetailsTabTypeWrapper,
  btnClass: string
): DOMWrapper<any>[] => wrapper.findAll(btnClass)

const createWrapper = (props = defaultProps): DocumentDetailsTabTypeWrapper =>
  wrapperFactory(DocumentDetailsTab, {
    props,
    global: {
      stubs: { NattoDate },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

let wrapper = createWrapper()

describe('DocumentDetailsTab', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('binding', () => {
    it('Should bind document prop correctly', async () => {
      const MpIconWrapper = wrapper.findAllComponents(NattoDate)

      expect(MpIconWrapper).toHaveLength(2)
      expect(MpIconWrapper[0].props('date')).toEqual('2018-05-27')
      expect(MpIconWrapper[1].props('date')).toEqual('2018-05-29')

      const labels = findAllControle(wrapper, '.label')

      expect(labels).toHaveLength(4)
      expect(labels[0].text()).toBe('Mon bilan comptable')
      expect(labels[1].text()).toBe('27 mai 2018')
      expect(labels[3].text()).toBe('luffy')
    })
  })
})

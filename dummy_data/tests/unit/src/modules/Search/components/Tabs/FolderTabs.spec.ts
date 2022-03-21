import FolderTabs from '@/modules/Search/components/Tabs/FolderTabs.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'

import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import * as translationHelper from '@/Common/hooks/useTranslation'
import NattoTabs from '@/Common/components/Tabs/NattoTabs.vue'
import useElementStubs from 'tests/unit/utils/useElementStubs'

export type FolderTabsTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    { folders: Folders },
    {
      activeName: string
      handleClick: (tab: { props: { name: string } }) => void
    }
  >
>

const defaultFolders = Folders.loaded([
  {
    id: 1122,
    name: 'Comptabilité',
    parent: { id: 0 },
    children: [],
    properties: {},
    permissions: []
  },
  {
    id: 1233,
    name: 'Gestion Sociale',
    parent: { id: 0 },
    children: [],
    properties: {},
    permissions: []
  }
])

const { ElTabs, ElTabPane } = useElementStubs()

const createWrapper = (folders = defaultFolders): FolderTabsTypeWrapper =>
  wrapperFactory(FolderTabs, {
    props: {
      folders
    },
    global: {
      stubs: {
        NattoTabs,
        ElTabs,
        ElTabPane
      }
    }
  })

const findNattoTabs = (wrapper: FolderTabsTypeWrapper) =>
  wrapper.findComponent(NattoTabs)

const tMock = jest.fn((value) => value)
const tcMock = jest.fn()

jest.spyOn(translationHelper, 'useTranslation').mockReturnValue({
  t: tMock,
  tc: tcMock
})

let wrapper = createWrapper()

describe('folders-tabs', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })

  describe('bindings', () => {
    it('props', () => {
      const nattoTabsWrapper = findNattoTabs(wrapper)

      expect(nattoTabsWrapper.props('items')).toStrictEqual([
        { id: 0, name: 0, label: 'ged.search.tabs.label.all' },
        { id: 1122, name: 1122, label: 'Comptabilité' },
        { id: 1233, name: 1233, label: 'Gestion Sociale' }
      ])
    })
  })
})

import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from '@vue/runtime-core'
import ArboCard from '@/modules/Search/components/Cards/ArboCard.vue'
import ArboDescription from '@/modules/Search/components/Cards/ArboDescription.vue'
import FolderShortcutList from '@/modules/Search/components/Cards/FolderShortcutList.vue'
import ArboExploreButton from '@/modules/Search/components/Buttons/ArboExploreButton.vue'
import { VueWrapper } from '@vue/test-utils'
import ArboCardTitle from '@/modules/Search/components/Cards/ArboCardTitle.vue'
import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import { ArboCardTitleWrapper } from './ArboCardTitle.spec'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import useElementStubs from 'dummy_data/tests/unit/utils/useElementStubs'
import useStyleguide from 'dummy_data/tests/unit/utils/useStyleguideStubs'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'

jest.mock('@/Common/helpers/analyticsLog', () => ({
  trackEventFactory: jest.fn()
}))

type ArboCardProps = {
  rootFolder: Folder
}
type ArboCardSetup = {
  shortcutFolders: Folder[]
  handleShortCutClick: () => void
  handleExploreClick: () => void
}

export type ArboCardTypeWrapper = VueWrapper<
  ComponentPublicInstance<ArboCardProps, ArboCardSetup>
>
const foldersData = Folders.loaded([
  {
    id: 1122,
    name: 'Comptabilité',
    parent: { id: 0 },
    children: [
      {
        id: 1223,
        name: 'Depot',
        parent: { id: 1122 },
        children: [],
        properties: {
          defaultUpload: true
        },
        permissions: []
      }
    ],
    properties: { folderDescription: 'Ranger les documents' },
    permissions: []
  },
  {
    id: 1233,
    name: 'Gestion Sociale',
    parent: { id: 0 },
    children: [
      {
        id: 1223,
        name: 'Depot',
        parent: { id: 1122 },
        children: [],
        properties: {
          defaultUpload: true,
          isShortcut: 'SH Depot',
          tracingName: 'KPMG/Test'
        },
        permissions: []
      }
    ],
    properties: {
      tracingName: 'Accounting'
    },
    permissions: []
  }
])

const storeMock = createSearchStoreMocked({ folders: foldersData })

const defaultProps: ArboCardProps = {
  rootFolder: foldersData.collection[0]
}

const { MpButton } = useStyleguide()
const { ElCard } = useElementStubs()

const createWrapper = (props = defaultProps): ArboCardTypeWrapper =>
  wrapperFactory(ArboCard, {
    props,
    global: {
      plugins: [storeMock],
      stubs: {
        ArboDescription,
        ArboExploreButton,
        MpButton,
        NattoCard,
        ElCard
      }
    }
  })

const findArboCardTitle = (
  wrapper: ArboCardTypeWrapper
): ArboCardTitleWrapper => wrapper.findComponent(ArboCardTitle)

const findFolderShortcutList = (wrapper: ArboCardTypeWrapper) =>
  wrapper.findComponent(FolderShortcutList)

let wrapper = createWrapper()
let arboCardTitleWrapper = findArboCardTitle(wrapper)
let folderShortcutListWrapper = findFolderShortcutList(wrapper)

describe('ArboCard', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    arboCardTitleWrapper = findArboCardTitle(wrapper)
    jest.clearAllMocks()
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind rootFolder correctly ', () => {
        expect(wrapper.props('rootFolder')).toStrictEqual(
          defaultProps.rootFolder
        )
      })
      it('Should bind headerTitle correctly ', () => {
        expect(arboCardTitleWrapper.props('title')).toStrictEqual(
          'Comptabilité'
        )
      })
      describe('binding with arbo description', () => {
        it('Should pass correct value to child component', () => {
          const ArboDescriptionWrapper = wrapper.findComponent(ArboDescription)

          expect(ArboDescriptionWrapper.props('description')).toBe(
            'Ranger les documents'
          )
        })
      })
    })
  })

  describe('FolderShortcutList', () => {
    it('Should bind rootFolder correctly ', () => {
      wrapper = createWrapper({
        rootFolder: foldersData.collection[1]
      })

      const shortcutListWrapper: VueWrapper<ComponentPublicInstance> =
        wrapper.findComponent(FolderShortcutList)

      expect(shortcutListWrapper.props('folderShortcuts')).toHaveLength(1)

      expect(shortcutListWrapper.props('folderShortcuts')[0]).toStrictEqual(
        foldersData.collection[1].children[0]
      )
    })

    describe('events', () => {
      const cases = [
        {
          // Folder WITHOUT tracingName
          rootFolder: foldersData.collection[0],
          expectedTrackEventCalled: false
        },
        {
          // Folder WITH tracingName
          rootFolder: foldersData.collection[1],
          expectedTrackEventCalled: true
        }
      ]

      describe('Should fire explore-more-clicked when explore-plus-button emit click event', () => {
        test.each(cases)(
          'test mdv-cta-arbo-card-explore-click event and explore-more-clicked event',
          async ({ rootFolder, expectedTrackEventCalled }) => {
            wrapper = createWrapper({ rootFolder })
            folderShortcutListWrapper = findFolderShortcutList(wrapper)

            await folderShortcutListWrapper.vm.$emit('explore-more-clicked')

            if (expectedTrackEventCalled) {
              expect(trackEventFactory).toHaveBeenCalledWith(
                'mdv-cta-arbo-card-explore-click',
                'Accounting'
              )
            } else {
              expect(trackEventFactory).not.toHaveBeenCalled()
            }

            expect(wrapper.emitted('explore-more-clicked')).toBeTruthy()
          }
        )
      })

      describe('Should fire shortcut-clicked when folder-shortcut-click emit click event', () => {
        test.each(cases)(
          'test mdv-cta-arbo-card-shortcut-click event and explore-more-clicked event',
          async ({ rootFolder, expectedTrackEventCalled }) => {
            wrapper = createWrapper({
              rootFolder
            })

            const shortcutListWrapper: VueWrapper<ComponentPublicInstance> =
              wrapper.findComponent(FolderShortcutList)

            await shortcutListWrapper.vm.$emit('folder-shortcut-click', {
              shortcutFolder: foldersData.collection[1].children[0],
              shortcutIndex: 0
            })

            if (expectedTrackEventCalled) {
              expect(trackEventFactory).toHaveBeenCalledWith(
                'mdv-cta-arbo-card-shortcut-click',
                'Accounting',
                1,
                'KPMG/Test'
              )
            } else {
              expect(trackEventFactory).not.toHaveBeenCalled()
            }

            expect(wrapper.emitted()['shortcut-clicked']).toBeTruthy()
            expect(wrapper.emitted()['shortcut-clicked']).toHaveLength(1)
            expect(wrapper.emitted()['shortcut-clicked'][0]).toStrictEqual([
              1223
            ])
          }
        )
      })
    })
  })
})

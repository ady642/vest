import MainViewTree from '@/modules/Search/components/Trees/MainViewTree.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import { findNattoTree, findSearchTreeItem } from 'tests/unit/utils/finders'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import useFoldersData from '../../mocks/FoldersDataMock'
import { router } from '@kpmg/mypulse-shared-dependencies'

/****
 * Wrapper types
 */
type MainViewTreeProps = {
  folders: Folders
}

type MainViewTreeSetup = {
  selectedFolder: string
  handleCurrentChange: (folder: Folder) => void
  defaultProps: Record<'label' | 'children', string>
}

export type MainViewTreeWrapper = VueWrapper<
  ComponentPublicInstance<MainViewTreeProps, MainViewTreeSetup>
>

/****
 * Wrapper creation
 */
const defaultProps: MainViewTreeProps = {
  folders: useFoldersData().FoldersData
}

const createNattoTree = (
  myFolder = useFoldersData().FoldersData.collection[0]
) => ({
  props: {
    folder: { type: Folder, default: myFolder }
  },
  template: `<div>
    <slot name="item" :data="folder" :node="folder" />
  </div>`
})

const createWrapper = ({
  props = defaultProps,
  NattoTree = createNattoTree()
} = {}): MainViewTreeWrapper =>
  wrapperFactory(MainViewTree, {
    props,
    global: {
      stubs: { NattoTree }
    }
  })

let wrapper = createWrapper()
let nattoTreeWrapper = findNattoTree(wrapper)
let searchItemWrapper = findSearchTreeItem(wrapper)

describe('MainViewTree', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    nattoTreeWrapper = findNattoTree(wrapper)
    searchItemWrapper = findSearchTreeItem(wrapper)
  })

  describe('bindings with NattoTree', () => {
    test('props bindings', () => {
      expect(nattoTreeWrapper.attributes()).toStrictEqual({
        data: `${useFoldersData().FoldersData.collection}`,
        props: `${{ label: 'id', children: 'children' }}`
      })
    })
    describe('events', () => {
      it('should select the folder', async () => {
        // Given SearchTreeItem isFolderSelected is false
        expect(searchItemWrapper.props('isFolderSelected')).toBe(false)

        // When NattoTree emit current-change with a folder
        await nattoTreeWrapper.vm.$emit(
          'current-change',
          useFoldersData().FoldersData.collection[0]
        )

        await flushPromises()

        // Then SearchTreeItem isFolderSelected prop must be at true
        expect(searchItemWrapper.props('isFolderSelected')).toBe(true)
      })
    })
  })
  describe('bindings with SearchTreeItem', () => {
    test('props', () => {
      expect(searchItemWrapper.props()).toStrictEqual({
        folder: useFoldersData().FoldersData.collection[0],
        isFolderSelected: false
      })
    })
    describe('events', () => {
      it('should go to arbo view when search item emit click', async () => {
        await searchItemWrapper.vm.$emit('click')

        expect(router.push).toHaveBeenCalledWith({
          name: 'ArboView',
          query: { folderId: 1122 } // Id of first folder in collection
        })
      })
    })
  })
})

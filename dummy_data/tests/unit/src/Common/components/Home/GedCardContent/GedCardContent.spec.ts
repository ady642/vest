import GedCardContent from '@/Common/components/Home/Card/GedCardContent/GedCardContent.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import Shortcuts from '@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcuts.vue'
import NoAccessBox from '@/Common/components/Home/Card/GedCardContent/NoAccess/NoAccessBox.vue'
import { createSearchStoreMocked } from 'tests/unit/__mocks__/storeMock'
import useFoldersData from 'tests/unit/src/modules/Search/mocks/FoldersDataMock'
import { createFileStoreMock } from 'tests/unit/__mocks__/storeMock/createStoreMock'
import GedCardUploadBox from '@/Common/components/Home/Card/GedCardContent/UploadBox/GedCardUploadBox.vue'
import NattoDropZone from '@/Common/components/Upload/NattoDropZone.vue'
import { ShortcutsWrapper } from './Shortcuts/Shortcuts.spec'
import { router } from '@kpmg/mypulse-shared-dependencies'
import { GedCardUploadBoxWrapper } from './UploadBox/GedCardUploadBox.spec'

/****
 * Wrapper types
 */
type GedCardContentProps = any

type GedCardContentSetup = {
  noPermissionOnDocument: string
}

export type GedCardContentWrapper = VueWrapper<
  ComponentPublicInstance<GedCardContentProps, GedCardContentSetup>
>
/****
 * Wrapper finders
 */

const findShortcuts = (wrapper: GedCardContentWrapper): ShortcutsWrapper =>
  wrapper.findComponent(Shortcuts)

const findNoAccess = (wrapper: GedCardContentWrapper): any =>
  wrapper.findComponent(NoAccessBox)

const findGedCardUploadBox = (
  wrapper: GedCardContentWrapper
): GedCardUploadBoxWrapper => wrapper.findComponent(GedCardUploadBox)

const findNattoDropZone = (
  wrapper: GedCardContentWrapper
): ComponentPublicInstance<any> => wrapper.findComponent(NattoDropZone)

/****
 * Wrapper creation
 */

const createWrapper = (
  store = createSearchStoreMocked()
): GedCardContentWrapper =>
  wrapperFactory(GedCardContent, {
    global: {
      plugins: [store],
      mocks: {
        $t: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      },
      stubs: {
        NattoDropZone
      }
    }
  })

let wrapper = createWrapper()
let shortcutsWrapper = findShortcuts(wrapper)
let gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper)
let noAccessWrapper = findNoAccess(wrapper)
let nattoDropZoneWrapper = findNattoDropZone(wrapper)

describe('GedCardContent', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    shortcutsWrapper = findShortcuts(wrapper)
    gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper)
    noAccessWrapper = findNoAccess(wrapper)
    nattoDropZoneWrapper = findNattoDropZone(wrapper)
  })

  describe('rendering', () => {
    expect(wrapper.text()).toContain('ged.title')
  })
  describe('bindings with Shortcut', () => {
    describe('props bindings ', () => {
      test('Shortcuts', async () => {
        wrapper = createWrapper(
          createSearchStoreMocked({ folders: useFoldersData().FoldersData })
        )

        shortcutsWrapper = findShortcuts(wrapper)

        expect(shortcutsWrapper.props('folders')).toEqual(
          useFoldersData().FoldersData
        )
      })
      test('GedCardUploadBox', async () => {
        wrapper = createWrapper(
          createSearchStoreMocked({ folders: useFoldersData().FoldersData })
        )

        gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper)

        expect(gedCardUploadBoxWrapper.props('isUploading')).toBeFalsy()
      })
    })
    describe('rendering', () => {
      it('Should display no-access component and hide other components when there is no folder', () => {
        wrapper = createWrapper()
        noAccessWrapper = findNoAccess(wrapper)
        expect(noAccessWrapper.exists()).toBeTruthy()
        expect(shortcutsWrapper.exists()).toBeFalsy()
        expect(gedCardUploadBoxWrapper.exists()).toBeFalsy()
      })

      it('Should display shortcuts and upload box components when there is some folders', () => {
        wrapper = createWrapper(
          createSearchStoreMocked({
            folders: useFoldersData().FoldersData
          })
        )
        noAccessWrapper = findNoAccess(wrapper)
        shortcutsWrapper = findShortcuts(wrapper)
        gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper)
        expect(noAccessWrapper.exists()).toBeFalsy()
        expect(shortcutsWrapper.exists()).toBeTruthy()
        expect(gedCardUploadBoxWrapper.exists()).toBeTruthy()
      })
    })
  })
  describe('bindings with GedCardUploadBox', () => {
    test('props bindings', () => {
      wrapper = createWrapper(
        createSearchStoreMocked({
          folders: useFoldersData().FoldersData
        })
      )
      gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper)

      expect(gedCardUploadBoxWrapper.props('isUploading')).toBe(false)
    })
    describe('events', () => {
      it('should NOT go to MainView when upload in progress', async () => {
        const wrapper = createWrapper(
          createFileStoreMock({
            isUploading: true,
            folders: useFoldersData().FoldersData
          })
        )

        gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper)

        await gedCardUploadBoxWrapper.vm.$emit('click')
        expect(router.push).toHaveBeenCalledTimes(0)
      })
      it('should go to MainView with windows explorer opened when no upload in progress', async () => {
        const wrapper = createWrapper(
          createFileStoreMock({
            isUploading: false,
            folders: useFoldersData().FoldersData
          })
        )

        gedCardUploadBoxWrapper = findGedCardUploadBox(wrapper)

        await gedCardUploadBoxWrapper.vm.$emit('click')

        expect(router.push).toHaveBeenCalledWith({
          name: 'MainView',
          query: { openSelectFilesWindow: true }
        })
      })
    })
  })
  describe('bindings with NattoDropZone', () => {
    it('should dispatch setFiles action and go to Main view when NattoDropZone emit files-changes event', async () => {
      const storeFileModule = createFileStoreMock()

      storeFileModule.dispatch = jest.fn()
      wrapper = createWrapper(storeFileModule)

      const fileList: File[] = [
        new File([''], 'File1'),
        new File([''], 'File1')
      ]

      nattoDropZoneWrapper = findNattoDropZone(wrapper)
      await nattoDropZoneWrapper.vm.$emit('files-changes', fileList)

      expect(storeFileModule.dispatch).toHaveBeenCalledWith(
        'GED/DataManipulation/Upload/setFiles',
        [
          {
            destination: null,
            errorDescription: {},
            file: new File([''], 'File1'),
            state: 0
          },
          {
            destination: null,
            errorDescription: {},
            file: new File([''], 'File1'),
            state: 0
          }
        ]
      )

      expect(router.push).toHaveBeenCalledWith({
        name: 'MainView',
        query: { openWhoUploadModal: true }
      })
    })
  })
})

import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import NattoCreateFolderForm from '@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'
import useElementStubs from 'tests/unit/utils/useElementStubs'
import { createFolderStoreMocked } from 'tests/unit/__mocks__/storeMock'
import { NattoErrorWrapper } from '../../../../../Common/components/Inputs/NattoError.spec'
import NattoError from '@/Common/components/Inputs/NattoError.vue'
import CancelButton from '@/modules/DataManipulation/Create/CreateFolder/components/CancelButton.vue'
import SaveButton from '@/modules/DataManipulation/Create/CreateFolder/components/SaveButton.vue'
import { CancelButtonWrapper } from './CancelButton.spec'
import { SaveButtonWrapper } from './SaveButton.spec'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'

export type NattoCreateFolderFormTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    {
      placeholder: string
      selectedFolderId: number
      canAddFolder: boolean
      input: string
    },
    { isCreatingFolder: boolean }
  >
>

const createElButton = (type = 'button') => ({
  name: 'ElButton',
  template: `<button type="${type}" />`
})

const { ElInput } = useElementStubs()
const { MpInput } = useStyleguideStubs()

const mainStoreMock = createFolderStoreMocked()
const findSaveBtnWrapper = (
  wrapper: NattoCreateFolderFormTypeWrapper
): SaveButtonWrapper => wrapper.findComponent(SaveButton)

const findCancelBtnWrapper = (
  wrapper: NattoCreateFolderFormTypeWrapper
): CancelButtonWrapper => wrapper.findComponent(CancelButton)

const findWarningTextWrapper = (
  wrapper: NattoCreateFolderFormTypeWrapper
): NattoErrorWrapper => wrapper.findComponent(NattoError)

const findFormWrapper = (
  wrapper: NattoCreateFolderFormTypeWrapper
): DOMWrapper<HTMLFormElement> => wrapper.find('form')

const findMpInputWrapper = (wrapper: NattoCreateFolderFormTypeWrapper) =>
  wrapper.findComponent(MpInput)

const defaultProps = {
  placeholder: '',
  selectedFolderId: 0,
  canAddFolder: false,
  creationFolderError: ''
}

const createWrapper = (
  props = defaultProps,
  store = mainStoreMock,
  ElButton = createElButton()
): NattoCreateFolderFormTypeWrapper =>
  wrapperFactory(NattoCreateFolderForm, {
    props,
    global: {
      stubs: {
        NattoButton,
        MpInput,
        ElInput,
        ElButton
      },
      plugins: [store]
    }
  })

let wrapper = createWrapper({
  ...defaultProps,
  placeholder: 'my placeholder',
  selectedFolderId: 1234,
  canAddFolder: true
})

describe('natto-create-folder-form', () => {
  beforeEach(() => {
    wrapper = createWrapper({
      ...defaultProps,
      placeholder: 'my placeholder',
      selectedFolderId: 1234,
      canAddFolder: true
    })
    mainStoreMock.dispatch = jest.fn()
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind placeholder prop value correctly', () => {
        expect(wrapper.props('placeholder')).toBe('my placeholder')
      })
      it('Should bind selectedFolderId prop value correctly', () => {
        expect(wrapper.props('selectedFolderId')).toBe(1234)
      })
      it('Should bind canAddFolder prop value correctly', () => {
        expect(wrapper.props('canAddFolder')).toBe(true)
      })
    })
    describe('events', () => {
      describe('create-folder-click event', () => {
        it('Should emit create-folder-click when folder name is valid', async () => {
          const data = [
            {
              targetFolder: 1234,
              folderName: 'hello'
            }
          ]

          wrapper.vm.input = 'hello'

          const formWrapper = findFormWrapper(wrapper)

          await formWrapper.trigger('submit')
          await wrapper.vm.$nextTick()
          expect(wrapper.emitted('create-folder-click')).toBeTruthy()

          expect(wrapper.emitted()['create-folder-click'][0]).toEqual(data)
        })
        it('Should not  emit create-folder-click when folder name is notvalid', async () => {
          const formWrapper = findFormWrapper(wrapper)

          await formWrapper.trigger('submit')
          await wrapper.vm.$nextTick()
          expect(wrapper.emitted('create-folder-click')).toBeFalsy()
        })
        it('Should   emit invalid-folder-name when folder name is notvalid', async () => {
          const formWrapper = findFormWrapper(wrapper)

          await formWrapper.trigger('submit')
          await wrapper.vm.$nextTick()
          expect(wrapper.emitted('invalid-folder-name')).toBeTruthy()
        })
        it('Should  not  emit create-folder-click when canAddFolder is false', async () => {
          wrapper = createWrapper(
            {
              ...defaultProps,
              placeholder: 'my placeholder',
              selectedFolderId: 1234,
              canAddFolder: true
            },
            mainStoreMock,
            createElButton('submit')
          )

          const btnWrapper = findSaveBtnWrapper(wrapper)

          await btnWrapper.trigger('click')
          await wrapper.vm.$nextTick()
          expect(wrapper.emitted('invalid-folder-name')).toBeFalsy()
        })
        it('Should emit cancel-create-folder-click when cancel btn click', async () => {
          const btnWrapper = findCancelBtnWrapper(wrapper)

          await btnWrapper.trigger('click')

          await wrapper.vm.$nextTick()
          expect(wrapper.emitted('cancel-create-folder-click')).toBeTruthy()
        })
      })
    })
    describe('rendering', () => {
      describe('save button', () => {
        it('Should be disabled when folder creation in progress', () => {
          wrapper = createWrapper(
            {
              ...defaultProps,
              placeholder: 'my placeholder',
              selectedFolderId: 1234,
              canAddFolder: true
            },
            createFolderStoreMocked({ isCreatingFolder: true })
          )
          const buttonWrapper = findCancelBtnWrapper(wrapper)

          expect(buttonWrapper.props('disabled')).toBe(true)
        })
        it('Should be loading when folder creation in progress', () => {
          const storeMock = createFolderStoreMocked({ isCreatingFolder: true })

          wrapper = createWrapper(
            {
              ...defaultProps,
              placeholder: 'my placeholder',
              selectedFolderId: 1234,
              canAddFolder: true
            },
            storeMock
          )
          const buttonWrapper = findSaveBtnWrapper(wrapper)

          expect(buttonWrapper.props('loading')).toBe(true)
        })
      })

      describe('cancel button', () => {
        it('Should be disabled when folder creation in progress', () => {
          wrapper = createWrapper(
            {
              ...defaultProps,
              placeholder: 'my placeholder',
              selectedFolderId: 1234,
              canAddFolder: true
            },
            createFolderStoreMocked({ isCreatingFolder: true })
          )

          const buttonWrapper = findCancelBtnWrapper(wrapper)

          expect(buttonWrapper.props('disabled')).toBe(true)
        })
      })
      describe('warning-text', () => {
        it('Should be displayed if folder name not respecting text', async () => {
          wrapper = createWrapper({
            ...defaultProps,
            placeholder: 'my placeholder',
            selectedFolderId: 1234,
            canAddFolder: true
          })

          const mpInputWrapper = findMpInputWrapper(wrapper)

          mpInputWrapper.vm.$emit('update:modelValue', 'hello$ ^')
          await wrapper.vm.$nextTick()
          const warningTextWrapper = findWarningTextWrapper(wrapper)
          const saveButtonWrapper = findSaveBtnWrapper(wrapper)

          expect(warningTextWrapper.exists()).toBeTruthy()
          expect(saveButtonWrapper.props('disabled')).toBe(true)
        })

        it('Should be not displayed if folder name not respecting text', async () => {
          const mpInputWrapper = findMpInputWrapper(wrapper)

          mpInputWrapper.vm.$emit('update:modelValue', 'hello')
          await wrapper.vm.$nextTick()
          const warningTextWrapper = findWarningTextWrapper(wrapper)
          const saveButtonWrapper = findSaveBtnWrapper(wrapper)

          expect(warningTextWrapper.exists()).toBeFalsy()
          expect(saveButtonWrapper.props('disabled')).toBe(false)
        })

        it('Should bind error message if error message prop is defined', async () => {
          wrapper = createWrapper(
            {
              ...defaultProps,
              placeholder: 'my placeholder',
              selectedFolderId: 1234,
              canAddFolder: true,
              creationFolderError: 'This folder already exists'
            },
            mainStoreMock
          )

          const warningTextWrapper = findWarningTextWrapper(wrapper)

          expect(warningTextWrapper.exists()).toBe(true)
          expect(warningTextWrapper.props('errorMessage')).toBe(
            'This folder already exists'
          )
        })
      })
    })
  })
})

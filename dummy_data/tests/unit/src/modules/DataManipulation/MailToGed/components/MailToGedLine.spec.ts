import { ComponentPublicInstance } from 'vue'
import { flushPromises, VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import MailToGedLine from '@/modules/DataManipulation/MailToGed/components/Elements/MailToGedLine.vue'

type MailToGedLineProps = {
  folderName: string
  folderEmail: string
}

type MailToGedLineSetup = {
  copied: boolean
  copy: () => void
}

export type MailToGedLineTypeWrapper = VueWrapper<
  ComponentPublicInstance<MailToGedLineProps, MailToGedLineSetup>
>

const defaultProps: MailToGedLineProps = {
  folderName: 'folder 1',
  folderEmail: 'email'
}

const createWrapper = (props = defaultProps): MailToGedLineTypeWrapper =>
  wrapperFactory(MailToGedLine, {
    props,
    global: {
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

let wrapper = createWrapper()

describe('MailToGedLine', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind correctly , folderName', () => {
        expect(wrapper.props('folderName')).toEqual(defaultProps.folderName)
      })
      it('Should bind correctly , folderEmail', () => {
        expect(wrapper.props('folderEmail')).toEqual(defaultProps.folderEmail)
      })
    })
    describe('rendering', () => {
      describe('should render the right text', () => {
        const cases = [
          {
            button: '.copy-address-btn',
            expectedValue:
              'ged.dataManipulation.mailToGed.Modal.buttons.copyAddress'
          },
          {
            button: '.send-email-btn',
            expectedValue:
              'ged.dataManipulation.mailToGed.Modal.buttons.sendEmail'
          }
        ]

        test.each(cases)('Test button text', ({ button, expectedValue }) => {
          const ButtonWrapper = wrapper.find(button)

          expect(ButtonWrapper.text()).toContain(expectedValue)
        })
      })
    })
    describe('events', () => {
      it('Should copy value to clipboard when user click copy button', async () => {
        let copiedText = ''

        jest.useFakeTimers()
        jest.spyOn(global, 'setTimeout')

        Object.assign(navigator, {
          clipboard: {
            writeText: (x: string) => {
              copiedText = x
            }
          }
        })
        jest.spyOn(navigator.clipboard, 'writeText')

        const copyAddressButton = wrapper.find('.copy-address-btn')

        expect(copyAddressButton.text()).toBe(
          'ged.dataManipulation.mailToGed.Modal.buttons.copyAddress'
        )
        copyAddressButton.trigger('click')

        await flushPromises()
        expect(copiedText).toBe('email')
        expect(navigator.clipboard.writeText).toBeCalledTimes(1)
        expect(setTimeout).toBeCalledTimes(1)
        expect(setTimeout).toBeCalledWith(expect.any(Function), 500)
        expect(copyAddressButton.text()).toBe(
          'ged.dataManipulation.mailToGed.Modal.buttons.addressCopied'
        )
        jest.runAllTimers()
        await flushPromises()
        expect(copyAddressButton.text()).toBe(
          'ged.dataManipulation.mailToGed.Modal.buttons.copyAddress'
        )
      })
    })
  })
})

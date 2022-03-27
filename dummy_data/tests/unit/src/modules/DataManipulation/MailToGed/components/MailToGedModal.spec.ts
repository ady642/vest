import { ComponentPublicInstance } from 'vue'
import { VueWrapper } from '@vue/test-utils'
import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
import { MailToGedInformations } from '@/modules/DataManipulation/MailToGed/models/MailToGedInformations'
import MailToGedModal from '@/modules/DataManipulation/MailToGed/components/Modals/MailToGedModal.vue'
import useMailToGedData from 'dummy_data/tests/unit/src/modules/DataManipulation/MailToGed/mocks/MailToGedDataMock'
import useElement from 'dummy_data/tests/unit/utils/useElementStubs'
import MailToGedLine from '@/modules/DataManipulation/MailToGed/components/Elements/MailToGedLine.vue'

type MailToGedModalProps = {
  title: string
  description: string
  mailToGedInfos: MailToGedInformations
}

type MailToGedModalSetup = {
  closeModal: () => void
}

export type MailToGedModalTypeWrapper = VueWrapper<
  ComponentPublicInstance<MailToGedModalProps, MailToGedModalSetup>
>

const defaultProps: MailToGedModalProps = {
  title: 'some title',
  description: 'some description',
  mailToGedInfos: useMailToGedData().MailToGedData
}

const { ElDialog } = useElement()

const createWrapper = (props = defaultProps): MailToGedModalTypeWrapper =>
  wrapperFactory(MailToGedModal, {
    props,
    global: {
      stubs: {
        ElDialog,
        MailToGedLine
      },
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
    describe('binding with MailToGedLine', () => {
      describe('props', () => {
        const cases = [
          {
            prop: 'folderName',
            expectedValue: defaultProps.mailToGedInfos.items[0].label
          },
          {
            prop: 'folderEmail',
            expectedValue: defaultProps.mailToGedInfos.items[0].emailAddress
          }
        ]

        test.each(cases)('Test binding props', ({ prop, expectedValue }) => {
          const MailToGedLineWrapper = wrapper.findComponent(MailToGedLine)

          expect(MailToGedLineWrapper.props(prop)).toEqual(expectedValue)
        })
      })
    })
    describe('events', () => {
      it('Should emit more-info on more info link click', async () => {
        const MoreInfoLinkWrapper = wrapper.find('.more-info')

        await MoreInfoLinkWrapper.trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('more-info')).toHaveLength(1)
        expect(wrapper.emitted('more-info')).toStrictEqual([
          [defaultProps.mailToGedInfos.moreInformationLink]
        ])
      })
      it('Should emit close event on close btn cllick', async () => {
        const CloseBtnWrapper = wrapper.find('.close-modal-btn')

        await CloseBtnWrapper.trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('close')).toBeTruthy()
      })
    })
    describe('rendering', () => {
      const cases = [
        {
          element: '.title-mailToGed',
          expectedValue: 'ged.dataManipulation.mailToGed.Modal.title'
        },
        {
          element: '.description-mailToGedd',
          expectedValue: 'ged.dataManipulation.mailToGed.Modal.description'
        },
        {
          element: '.close-modal-btn',
          expectedValue: 'ged.dataManipulation.mailToGed.Modal.buttons.close'
        }
      ]

      test.each(cases)(
        'Test content rendering',
        ({ element, expectedValue }) => {
          const ElementWrapper = wrapper.find(element)

          expect(ElementWrapper.text()).toContain(expectedValue)
        }
      )
    })
  })
})

import MailToGedCard from '@/modules/DataManipulation/MailToGed/components/MailToGedCard.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'

const createWrapper = () =>
  wrapperFactory(MailToGedCard, {
    global: {
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

describe('MailToGedCard', () => {
  it('When click on mpcard emit evnet', () => {
    const wrapper = createWrapper()

    wrapper.find('mp-card').trigger('click')
    expect(wrapper.emitted()['open-mail-to-ged']).toBeTruthy()
  })
})

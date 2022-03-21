import NattoPrimaryCta from '@/Common/components/Buttons/NattoPrimaryCta.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { DOMWrapper } from '@vue/test-utils'

const createWrapper = (action: string, disabled: boolean) =>
  wrapperFactory(NattoPrimaryCta, {
    propsData: {
      action,
      disabled
    }
  })

describe('natto-primary-cta', () => {
  describe('binding', () => {
    describe('Valider et suivant', () => {
      const wrapper = createWrapper('validateNext', false)
      const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')
      const buttonText: DOMWrapper<any> = wrapper.find('.btn-text')

      it('Should have the appropriate button label', () => {
        expect(buttonText.text()).toEqual('Valider et suivant')
      })

      it('Should emit validate event', async () => {
        await button.trigger('click')
        expect(wrapper.emitted('validate')).toBeTruthy()
      })
      describe('Diabled Button', () => {
        const wrapper = createWrapper('validateNext', true)
        const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')

        it('Should be disbaled', () => {
          expect(button.classes().find((x) => '.disabled-btn')).toBeTruthy()
        })
        it('Should not emit any events', async () => {
          await button.trigger('click')
          expect(wrapper.emitted('validate')).toBeFalsy()
        })
      })
    })
    describe('Valider', () => {
      const wrapper = createWrapper('validate', false)
      const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')
      const buttonText: DOMWrapper<any> = wrapper.find('.btn-text')

      it('Should have the appropriate button label', () => {
        expect(buttonText.text()).toEqual('Valider')
      })

      it('Should emit validate event', async () => {
        await button.trigger('click')
        expect(wrapper.emitted('validate')).toBeTruthy()
      })
      describe('Diabled Button', () => {
        const wrapper = createWrapper('validate', true)
        const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')

        it('Should be disbaled', () => {
          expect(button.classes().find((x) => '.disabled-btn')).toBeTruthy()
        })
        it('Should not emit any events', async () => {
          await button.trigger('click')
          expect(wrapper.emitted('validate')).toBeFalsy()
        })
      })
    })
    describe('Fermer', () => {
      const wrapper = createWrapper('finish', false)
      const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')
      const buttonText: DOMWrapper<any> = wrapper.find('.btn-text')

      it('Should have the appropriate button label', () => {
        expect(buttonText.text()).toEqual('Fermer')
      })

      it('Should emit validate event', async () => {
        await button.trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
      })
      describe('Diabled Button', () => {
        const wrapper = createWrapper('finish', true)
        const button: DOMWrapper<any> = wrapper.find('.natto-primary-cta')

        it('Should be disbaled', () => {
          expect(button.classes().find((x) => '.disabled-btn')).toBeTruthy()
        })
        it('Should not emit any events', async () => {
          await button.trigger('click')
          expect(wrapper.emitted('close')).toBeFalsy()
        })
      })
    })
  })
})

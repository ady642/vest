import NattoBreadcrumb from '@/Common/components/Breadcrumb/NattoBreadcrumb.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'

const { MpBreadcrumb } = useStyleguideStubs()

type NattoLightBreadcrumbProps = {
  breadcrumbs: { id: number; text: string }[]
  disabledBreadcrumbs?: boolean
  ellipsed?: boolean
}

const defaultProps: NattoLightBreadcrumbProps = {
  breadcrumbs: [
    { id: 1, text: 'Compta' },
    { id: 2, text: 'Achats' },
    { id: 3, text: 'Janvier' }
  ],
  disabledBreadcrumbs: false,
  ellipsed: false
}

const createWrapper = (props = defaultProps) =>
  wrapperFactory(NattoBreadcrumb, {
    global: {
      stubs: {
        MpBreadcrumb
      }
    },
    props
  })

const findMpBreadcrumbWrapper = (wrapper: VueWrapper<any>) =>
  wrapper.findComponent(MpBreadcrumb)

describe('NattoBreadcrumb', () => {
  describe('bindings with MpBreadcrumb', () => {
    describe('props', () => {
      const wrapper = createWrapper()
      const mpBreadcrumbWrapper = findMpBreadcrumbWrapper(wrapper)

      expect(mpBreadcrumbWrapper.props('breadcrumbItems')).toStrictEqual([
        { id: 1, text: 'Compta' },
        { id: 2, text: 'Achats' },
        { id: 3, text: 'Janvier' }
      ])
      expect(mpBreadcrumbWrapper.props('ellipsed')).toStrictEqual(false)
    })
    describe('events', () => {
      it('Should not fire event breadcrumb-click when disabled', async () => {
        const wrapper = createWrapper({
          ...defaultProps,
          disabledBreadcrumbs: true
        })
        const mpBreadcrumbWrapper = findMpBreadcrumbWrapper(wrapper)

        await mpBreadcrumbWrapper.vm.$emit('breadcrumb-click')

        expect(wrapper.emitted()['breadcrumb-click']).toStrictEqual(undefined)
      })
    })
  })
})

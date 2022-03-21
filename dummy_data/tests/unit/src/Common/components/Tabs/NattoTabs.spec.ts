import NattoTabs from '@/Common/components/Tabs/NattoTabs.vue'
import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'
import { TabItem } from '@/Common/types/common'
import useStyleguideStubs from 'tests/unit/utils/useStyleguideStubs'

const { MpTabs } = useStyleguideStubs()

export type NattoTabsTypeWrapper = VueWrapper<
  ComponentPublicInstance<
    { items: TabItem[] },
    {
      activeName: string
      handleClick: (tab: { props: { name: string } }) => void
    }
  >
>

const createWrapper = (items: TabItem[]): NattoTabsTypeWrapper =>
  wrapperFactory(NattoTabs, {
    props: {
      items
    },
    global: {
      stubs: {
        MpTabs
      }
    }
  })

const items: TabItem[] = [
  {
    id: 'Comptabilité',
    name: 'Comptabilité',
    label: 'Comptabilité'
  },
  {
    id: 'Gestion Sociale',
    name: 'Gestion Sociale',
    label: 'Gestion Sociale'
  }
]

const selected = {
  props: {
    name: '1234'
  }
}

let wrapper = createWrapper(items)
let mpTabsWrapper: VueWrapper<ComponentPublicInstance> =
  wrapper.findComponent(MpTabs)

describe('natto-tabs', () => {
  beforeEach(() => {
    wrapper = createWrapper(items)
    mpTabsWrapper = wrapper.findComponent(MpTabs)
  })
  describe('bindings with MpTabs', () => {
    it('props bindings', () => {
      expect(mpTabsWrapper.props('tabItems')).toStrictEqual(items)
    })

    describe('events', () => {
      it('Should emit tab-selected event on ElTabs click', async () => {
        await mpTabsWrapper.vm.$emit('tab-click', selected)
        expect(wrapper.emitted()['tab-selected'].length).toBe(1)
        expect(wrapper.emitted()['tab-selected'][0]).toContain('1234')
      })
    })
  })
})

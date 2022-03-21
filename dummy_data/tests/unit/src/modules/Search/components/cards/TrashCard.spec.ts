import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { ComponentPublicInstance } from '@vue/runtime-core'
import TrashCard from '@/modules/Trash/components/Cards/TrashCard.vue'
import ArboDescription from '@/modules/Search/components/Cards/ArboDescription.vue'
import { VueWrapper } from '@vue/test-utils'
import TrashCardTitle from '@/modules/Trash/components/Cards/TrashCardTitle.vue'
import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import { TrashCardTitleWrapper } from './TrashCardTitle.spec'
import useElementStubs from 'tests/unit/utils/useElementStubs'
import constants from '@/Common/constants'

type TrashCardProps = {}
type TrashCardSetup = {
  title: string
  description: string
}

export type TrashCardTypeWrapper = VueWrapper<
  ComponentPublicInstance<TrashCardProps, TrashCardSetup>
>

const defaultProps: TrashCardProps = {}

const { ElCard } = useElementStubs()

const createWrapper = (props = defaultProps): TrashCardTypeWrapper =>
  wrapperFactory(TrashCard, {
    props,
    global: {
      stubs: {
        TrashCardTitle,
        ArboDescription,
        NattoCard,
        ElCard
      },
      mocks: {
        $tc: (key: string, params: Record<string, any>) =>
          params ? `${key} with ${JSON.stringify(params)}` : key
      }
    }
  })

const findArboCardTitle = (
  wrapper: TrashCardTypeWrapper
): TrashCardTitleWrapper => wrapper.findComponent(TrashCardTitle)

let wrapper = createWrapper()
let trashCardTitleWrapper = findArboCardTitle(wrapper)

describe('TrashCard', () => {
  beforeEach(() => {
    wrapper = createWrapper()
    trashCardTitleWrapper = findArboCardTitle(wrapper)
  })
  describe('binding', () => {
    describe('props', () => {
      it('Should bind headerTitle correctly ', () => {
        expect(trashCardTitleWrapper.props('title')).toStrictEqual(
          'ged.trash.arboCard.title'
        )
      })
      describe('binding with arbo description', () => {
        it('Should pass correct value to child component', () => {
          const ArboDescriptionWrapper = wrapper.findComponent(ArboDescription)

          expect(ArboDescriptionWrapper.props('description')).toBe(
            'ged.trash.arboCard.description'
          )
        })
      })
      describe('trashShortcut', () => { })
    })
  })
})

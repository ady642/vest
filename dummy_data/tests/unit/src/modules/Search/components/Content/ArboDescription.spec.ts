import wrapperFactory from 'tests/unit/utils/wrapperFactory'
import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from '@vue/runtime-core'
import ArboDescription from '@/modules/Search/components/Cards/ArboDescription.vue'

type ArboDescriptionProps = {
  description: string
}
type ArboDescriptionSetup = {}

export type ArboDescriptionTypeWrapper = VueWrapper<
  ComponentPublicInstance<ArboDescriptionProps, ArboDescriptionSetup>
>

const defaultProps = {
  description: 'folder description'
}

const createWrapper = (props = defaultProps): ArboDescriptionTypeWrapper =>
  wrapperFactory(ArboDescription, {
    props
  })

let wrapper = createWrapper()

describe('ArboDescription', () => {
  beforeEach(() => {
    wrapper = createWrapper()
  })
  describe('binding', () => {
    it('Should bind Contentdescription correctly ', () => {
      expect(wrapper.props('description')).toStrictEqual(
        defaultProps.description
      )
    })
  })
})

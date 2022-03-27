
            import NattoTag from '/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Tags/NattoTag.vue'
            import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
            import useElement from 'dummy_data/tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'

            type NattoTagProps = {
              closable: boolean
            }

            const defaultProps: NattoTagProps = {
              closable: true
            }

            const createWrapper = ({
                props = defaultProps,
              slots = defaultSlots
            } = {}) =>
              wrapperFactory(NattoTag , {
                props
                slots
              })

            let wrapper = createWrapper()

                let findElTag = (wrapper) => wrapper.findComponent(ElTag)


                    let ElTagWrapper = findElTag(wrapper)


                describe(NattoTag, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        ElTagWrapper = findElTag(wrapper)

                     })

                      describe('binding with ElTag', () => {
                        test('static props', () => {
                          expect(ElTagWrapper.attributes('class')).toBe(true)
,expect(ElTagWrapper.attributes('closable')).toBe(true)
 })
                      })

                      describe('rendering', () => {
            it('should render the undefined slot', () => {
               expect(wrapper.html()).toContain('I fill the undefined slot')
             })
        })




                })



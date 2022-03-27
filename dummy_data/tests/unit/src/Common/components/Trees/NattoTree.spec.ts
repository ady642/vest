
            import NattoTree from '/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Trees/NattoTree.vue'
            import wrapperFactory from 'dummy_data/tests/unit/utils/wrapperFactory'
            import useElement from 'dummy_data/tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'

            const createWrapper = ({


            } = {}) =>
              wrapperFactory(NattoTree )

            let wrapper = createWrapper()

                let findElTree = (wrapper) => wrapper.findComponent(ElTree)


                    let ElTreeWrapper = findElTree(wrapper)


                describe(NattoTree, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        ElTreeWrapper = findElTree(wrapper)

                     })

                      describe('binding with ElTree', () => {
                        test('static props', () => {
                          expect(ElTreeWrapper.attributes('expand-on')).toBe(true)
,expect(ElTreeWrapper.attributes('empty-text')).toBe(true)
 })
                      })






                })



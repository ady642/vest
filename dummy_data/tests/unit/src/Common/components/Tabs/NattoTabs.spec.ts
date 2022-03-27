
            import NattoTabs from '/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Tabs/NattoTabs.vue'
            import wrapperFactory from 'tests/unit/utils/wrapperFactory'
            import useElement from 'tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'
        
            type NattoTabsProps = {
              items: array,stretch: boolean
            }
            
            const defaultProps: NattoTabsProps = {
              items: undefined,stretch: true
            }  
        
            const createWrapper = ({
                props = defaultProps,
              
            } = {}) =>
              wrapperFactory(NattoTabs , {
                props
                
              })
              
            let wrapper = createWrapper()
        
                let findMpTabs = (wrapper) => wrapper.findComponent(MpTabs)
        
                
                    let MpTabsWrapper = findMpTabs(wrapper)
                

                describe(NattoTabs, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        MpTabsWrapper = findMpTabs(wrapper)

                     })

                      describe('binding with MpTabs', () => {
                        test('static props', () => {
                          expect(MpTabsWrapper.attributes('tab-items')).toBe(true)
,expect(MpTabsWrapper.attributes('stretch')).toBe(true)
 })
                      })
                      
                             
                      
                    
                        describe('events', () => {
            it('should emit tab-click when MpTabs emits tab-click', () => {
                await MpTabsWrapper.vm.$emit(tab-click)
                expect(wrapper.emitted('my-event')).toHaveLength(1)
             })
        })
                    
                })
                
                
        
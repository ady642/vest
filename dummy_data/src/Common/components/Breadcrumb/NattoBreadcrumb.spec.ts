
            import NattoBreadcrumb from '/home/adri/Desktop/Projects/unittestgen/dummy_data/src/Common/components/Breadcrumb/NattoBreadcrumb.vue'
            import wrapperFactory from 'tests/unit/utils/wrapperFactory'
            import useElement from 'tests/unit/utils/useElementStubs'
            import { VueWrapper } from '@vue/test-utils'
        
            type NattoBreadcrumbProps = {
              breadcrumbs: array,disabledBreadcrumbs: boolean,ellipsed: boolean
            }
            
            const defaultProps: NattoBreadcrumbProps = {
              breadcrumbs: ,disabledBreadcrumbs: true,ellipsed: true
            }  
        
            const createWrapper = ({
                props = defaultProps,
              
            } = {}) =>
              wrapperFactory(NattoBreadcrumb , {
                props
                
              })
              
            let wrapper = createWrapper()
        
                let findMpBreadcrumb = (wrapper) => wrapper.findComponent(MpBreadcrumb)
        
                
                    let MpBreadcrumbWrapper = findMpBreadcrumb(wrapper)
                

                describe(NattoBreadcrumb, () => {
                     beforeEach(() => {
                        wrapper = createWrapper()
                        MpBreadcrumbWrapper = findMpBreadcrumb(wrapper)

                     })

                     
        
          describe('binding with MpBreadcrumb', () => {
            test('static props', () => {
              expect(MpBreadcrumbWrapper.attributes('breadcrumb-items')).toBe(true)
,expect(MpBreadcrumbWrapper.attributes('ellipsed')).toBe(true)
 })
          })
        
        
                     
                             
                      
                    
                        describe('events', () => {
            it('should emit breadcrumb-click when MpBreadcrumb emits breadcrumb-click', () => {
                await MpBreadcrumbWrapper.vm.$emit(breadcrumb-click)
                expect(wrapper.emitted('my-event')).toHaveLength(1)
             })
        })
                    
                })
                
                
        
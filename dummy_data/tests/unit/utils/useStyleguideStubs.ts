import { StubbedComponents, VueComponent } from './types'
import useElement from './useElementStubs'
import { ref } from 'vue'

const { ElTable } = useElement()

const components: VueComponent[] = [
  {
    template: '<div><slot/></div>',
    name: 'MpCard'
  },
  {
    template: '<div><slot/></div>',
    name: 'MpPagination'
  },
  {
    template: '<div><slot/></div>',
    name: 'MpTabs',
    props: ['tabItems']
  },
  {
    template: '<div><slot/></div>',
    name: 'MpBreadcrumb',
    props: ['breadcrumbItems', 'ellipsed']
  },
  {
    template: '<div><slot/></div>',
    name: 'MpButton',
    props: ['type', 'icon', 'disabled']
  },
  {
    template: '<slot/>',
    name: 'MpIcon',
    props: ['name']
  },
  {
    template: '<button />',
    name: 'MpAdvancedSearchBtn'
  },
  {
    name: 'MpInCard'
  },
  {
    name: 'MpHighlight'
  },
  {
    name: 'MpRadio',
    props: ['label']
  },
  {
    name: 'MpTable',
    components: { ElTable },
    template: `<div><slot/><slot name="empty"/><ElTable ref="ElTableInstance" /></div>`,
    props: [
      'cellClassName',
      'rowClassName',
      'isSelection',
      'data',
      'highlightRowOnClick'
    ],
    setup: () => ({
      ElTableInstance: ref()
    })
  },
  {
    template: '<div><slot name="prefix"/><slot /><slot name="append"/></div>',
    name: 'MpInput',
    props: ['modelValue']
  },
  {
    template: '<div><slot /><slot name="subHeader" /></div>',
    name: 'MpTitle'
  }
]

const useStyleguide = (): StubbedComponents => {
  const result: StubbedComponents = {}

  const template = '<div><slot/></div>'

  components.forEach((element) => {
    result[element.name] = {
      ...element,
      template: element.template ?? template
    }
  })

  return result
}

export default useStyleguide

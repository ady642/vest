import { RouteRecordRaw } from 'vue-router'
import Search from '@/modules/Search/pages/SearchPage.vue'
import MainView from '@/modules/Search/views/MainView.vue'
const ArboView = () => import('@/modules/Search/views/ArboView.vue')

import { hasFolderSelected } from '@/modules/Search/routes/guards'

const search: Array<RouteRecordRaw> = [
  {
    path: '/documents',
    name: 'Search',
    component: Search,
    children: [
      {
        path: '',
        name: 'MainView',
        component: MainView
      },
      {
        path: 'arbo',
        name: 'ArboView',
        component: ArboView,
        beforeEnter: hasFolderSelected,
        props: true
      }
    ]
  }
]

export default search

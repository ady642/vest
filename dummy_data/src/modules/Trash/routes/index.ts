import { RouteRecordRaw } from 'vue-router'
import TrashView from '@/modules/Trash/views/TrashView.vue'

const search: Array<RouteRecordRaw> = [
  {
    path: '/documents/trash',
    name: 'TrashView',
    component: TrashView
  }
]

export default search

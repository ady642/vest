import Search from '@/modules/Search/store'
import DataManipulation from '@/modules/DataManipulation/store'
import Trash from '@/modules/Trash/store'

export default {
  namespaced: true,
  modules: {
    Trash,
    Search,
    DataManipulation
  }
}

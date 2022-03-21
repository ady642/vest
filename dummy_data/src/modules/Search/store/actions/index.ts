import documentsActions from '@/modules/Search/store/actions/documentsActions'
import foldersActions from '@/modules/Search/store/actions/foldersActions'

export default {
  ...documentsActions,
  ...foldersActions
}

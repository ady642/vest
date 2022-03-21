import CreateFolder from '@/modules/DataManipulation/Create/CreateFolder/store'
import DeleteFolders from '@/modules/DataManipulation/Delete/DeleteFolder/store'
import DeleteFile from '@/modules/DataManipulation/Delete/DeleteFile/store'
import Upload from '@/modules/DataManipulation/Upload/store'
import MailToGed from '@/modules/DataManipulation/MailToGed/store'
import getters from '@/modules/DataManipulation/store/getters'

export const dataManipulationModule = (name: string): string =>
  `GED/DataManipulation/${name}`

export default {
  namespaced: true,
  getters,
  modules: {
    DeleteFolders,
    DeleteFile,
    Upload,
    CreateFolder,
    MailToGed
  }
}

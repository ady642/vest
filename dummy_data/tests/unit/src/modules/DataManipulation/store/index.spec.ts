import DataManipulationStore, {
  dataManipulationModule
} from '@/modules/DataManipulation/store'
import DeleteFile from '@/modules/DataManipulation/Delete/DeleteFile/store'
import Upload from '@/modules/DataManipulation/Upload/store'
import CreateFolder from '@/modules/DataManipulation/Create/CreateFolder/store'
import DeleteFolders from '@/modules/DataManipulation/Delete/DeleteFolder/store'
import MailToGed from '@/modules/DataManipulation/MailToGed/store'

describe('DataManipulation store module', () => {
  it('should return modules, getters', () => {
    expect(DataManipulationStore).toEqual({
      namespaced: true,
      getters: DataManipulationStore.getters,
      modules: {
        DeleteFolders,
        DeleteFile,
        Upload,
        CreateFolder,
        MailToGed
      }
    })
  })
  it('module string construction', () => {
    expect(dataManipulationModule('myGetter')).toBe(
      'GED/DataManipulation/myGetter'
    )
  })
})

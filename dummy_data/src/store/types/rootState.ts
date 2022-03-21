import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { SearchStateInterface } from '@/modules/Search/store/types'
import { UploadStateInterface } from '@/modules/DataManipulation/Upload/store/state'
import { DeleteFoldersStateInterface } from '@/modules/DataManipulation/Delete/DeleteFolder/store/state'
import { DeleteFileStateInterface } from '@/modules/DataManipulation/Delete/DeleteFile/store/state'
import { TrashStateInterface } from '@/modules/Trash/store/state'
import { MailToGedStateInterface } from '@/modules/DataManipulation/MailToGed/store/state'

interface RootStateInterface {
  app: {
    account: {
      AccountId: string
    }
  }
  GED: {
    Trash: TrashStateInterface
    Search: SearchStateInterface
    DataManipulation: {
      Upload: UploadStateInterface
      DeleteFolders: DeleteFoldersStateInterface
      DeleteFile: DeleteFileStateInterface
      CreateFolder: CreateFolderStateInterface
      MailToGed: MailToGedStateInterface
    }
  }
}

export default RootStateInterface

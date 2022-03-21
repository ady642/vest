import { Store } from 'vuex'
import { CreateFolderStateInterface } from '@/modules/DataManipulation/Create/CreateFolder/store/state'
import { createFolderModule } from '@/modules/DataManipulation/Create/CreateFolder/store'
import { computed } from 'vue'
import { ComputedRef } from '@vue/reactivity'

const gettersHelpers = (
  store: Store<CreateFolderStateInterface>
): gettersHelpersType => ({
  hasPermissionToAddFolder: (folderId: number) =>
    store.getters[createFolderModule('hasPermissionToAddFolder')](folderId),
  isCreatingFolder: computed(
    () => store.getters[createFolderModule('isCreatingFolder')]
  )
})

export type gettersHelpersType = {
  hasPermissionToAddFolder: (folderId: number) => boolean
  isCreatingFolder: ComputedRef<boolean>
}

export default gettersHelpers

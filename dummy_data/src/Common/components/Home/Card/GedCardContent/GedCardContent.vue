<template>
  <div class="ged-card-content">
    <h1 class="ged-card-content__title">
      {{ $t('ged.title') }}
    </h1>
    <no-access-box v-if="hasDSInactive" />
    <template v-else>
      <shortcuts :folders="folders" />
      <natto-drop-zone :disabled="isUploading" @files-changes="onFilesChange">
        <ged-card-upload-box
          @click="handleGedCardUploadBoxClick"
          :is-uploading="isUploading"
        />
      </natto-drop-zone>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import Shortcuts from '@/Common/components/Home/Card/GedCardContent/Shortcuts/Shortcuts.vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'
import NoAccessBox from '@/Common/components/Home/Card/GedCardContent/NoAccess/NoAccessBox.vue'
import GedCardUploadBox from '@/Common/components/Home/Card/GedCardContent/UploadBox/GedCardUploadBox.vue'
import useUploadStoreHelpers from '@/modules/DataManipulation/Upload/store/helpers'
import NattoDropZone from '@/Common/components/Upload/NattoDropZone.vue'
import FileUpload, {
  StateUpload
} from '@/modules/DataManipulation/Upload/models/Files/Inputs/FileUpload'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'

export default defineComponent({
  name: 'GedCardContent',
  components: { NattoDropZone, GedCardUploadBox, Shortcuts, NoAccessBox },
  setup() {
    const store = useStore()
    const { fetchFolders, folders } = useSearchStoreHelpers()
    const { isUploading, setFiles } = useUploadStoreHelpers()
    const { goToMainView } = useSearchNavigator()

    onMounted(async () => {
      await fetchFolders(store)
    })

    const handleGedCardUploadBoxClick = () => {
      if (isUploading(store).value) {
        return
      }

      goToMainView({ openSelectFilesWindow: true })
    }

    const onFilesChange = (files: File[]) => {
      if (isUploading(store).value) {
        return
      }

      setFiles(
        store,
        files.map((f: File) => new FileUpload(f, StateUpload.TO_UPLOAD))
      )

      goToMainView({ openWhoUploadModal: true })
    }

    return {
      handleGedCardUploadBoxClick,
      onFilesChange,
      folders: folders(store),
      isUploading: isUploading(store),
      hasDSInactive: computed(
        () =>
          !folders(store).value.isLoading &&
          !folders(store).value.collection.length
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.ged-card-content {
  padding: 24px;

  &__title {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>

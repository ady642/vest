<template>
  <div class="create-folder-modal-container">
    <el-dialog
      @close="handleClose"
      append-to-body
      custom-class="create-folder-dialog-container"
      v-model="isCreateFolderModalOpened"
    >
      <natto-create-folder-form
        show-form
        :creation-folder-error="creationFolderError"
        :selectedFolderId="selectedFolderId"
        :placeholder="$t('ged.dataManipulation.create.folder.title')"
        @create-folder-click="handleCreateClick"
        @cancel-create-folder-click="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import useVModel from '@/Common/hooks'
import NattoCreateFolderForm from '@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue'
import { CreateFolderQuery } from '@/modules/Search/types'
import useCreateFolderModule from '@/modules/DataManipulation/Create/CreateFolder/store/helpers'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'CreateFolderModal',
  components: { NattoCreateFolderForm },

  props: {
    modelValue: Boolean,
    selectedFolderId: Number
  },

  emits: ['on-create-folder', 'update:modelValue'],

  setup(props) {
    const isCreateFolderModalOpened = useVModel(props)

    const { t } = useTranslation()

    const store = useStore()
    const creationFolderError = ref('')
    const folderName = ref('')

    const { createFolderByArbo } = useCreateFolderModule(store)

    return {
      isCreateFolderModalOpened,
      folderName,
      handleClose: () => {
        creationFolderError.value = ''
        isCreateFolderModalOpened.value = false
      },
      handleCreateClick: async (query: CreateFolderQuery) => {
        try {
          await createFolderByArbo(query)
          isCreateFolderModalOpened.value = false
        } catch (error) {
          if (error.code === 403) {
            creationFolderError.value = t(
              'ged.dataManipulation.create.folder.error.alreadyExists',
              { folderName: query.folderName }
            )
          } else {
            throw error
          }
        }
      },
      creationFolderError
    }
  }
})
</script>

<style lang="scss">
.create-folder-dialog-container {
  width: 30% !important;
}
</style>

<template>
  <form
    class="natto-create-folder-form-container"
    @submit.prevent="triggerCreateFolder"
  >
    <div class="create-folder-form">
      <mp-input
        v-model="input"
        :placeholder="placeholder"
        class="create-folder-input"
      >
        <template #prefix>
          <folder-icon />
        </template>
      </mp-input>
      <natto-error v-if="errorMessage" :error-message="errorMessage" />
      <div class="actions">
        <cancel-button @click="triggerCancel" :disabled="isCreatingFolder" />
        <save-button :loading="isCreatingFolder" :disabled="disabledButton" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CreateFolderQuery } from '@/modules/Search/types'
import useCreateFolderModule from '@/modules/DataManipulation/Create/CreateFolder/store/helpers'
import { useStore } from 'vuex'
import constants from '@/Common/constants'
import useStringHelpers from '@/Common/hooks/useStringHelpers'
import NattoError from '@/Common/components/Inputs/NattoError.vue'
import CancelButton from '@/modules/DataManipulation/Create/CreateFolder/components/CancelButton.vue'
import SaveButton from '@/modules/DataManipulation/Create/CreateFolder/components/SaveButton.vue'
import FolderIcon from '@/Common/components/Icons/FolderIcon.vue'

export default defineComponent({
  name: 'NattoCreateFolderForm',
  emits: [
    'create-folder-click',
    'cancel-create-folder-click',
    'invalid-folder-name'
  ],
  props: {
    placeholder: String,
    selectedFolderId: Number,
    folderName: String,
    canAddFolder: { type: Boolean, default: true },
    creationFolderError: String
  },
  components: {
    FolderIcon,
    SaveButton,
    CancelButton,
    NattoError
  },
  setup(props, { emit }) {
    const { validStringAlphanumericFrench } = useStringHelpers()
    const store = useStore()
    const { isCreatingFolder } = useCreateFolderModule(store)
    const input = ref('')

    const validInput = computed(() =>
      validStringAlphanumericFrench(input.value)
    )

    const text = {
      validationNameWarning:
        constants.messages.folders.create.validationNameWarning
    }

    const errorMessage = computed(() => {
      if (!validInput.value && input.value.length > 0) {
        return text.validationNameWarning
      } else if (props.creationFolderError) {
        return props.creationFolderError
      }

      return ''
    })

    return {
      text,
      errorMessage,
      disabledButton: computed(
        () => !validInput.value || input.value.length === 0
      ),
      isCreatingFolder,
      input,
      triggerCancel: () => {
        input.value = ''
        emit('cancel-create-folder-click')
      },
      triggerCreateFolder: () => {
        if (props.canAddFolder) {
          const query = {
            targetFolder: props.selectedFolderId,
            folderName: input.value
          } as CreateFolderQuery

          if (query.folderName === '' && !query.folderName) {
            emit('invalid-folder-name', query.folderName)
          } else {
            emit('create-folder-click', query)
            input.value = ''
          }
        }
      }
    }
  }
})
</script>

<style lang="scss">
.create-folder-input-container {
  padding: 0 17px;
  display: flex;
  align-items: center;
  border: 1px solid #e4ecf9;
  border-radius: 8px;
  margin-bottom: 16px;
}

.input-icon {
  margin-right: 10px;
}

.create-folder-input {
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: flex-end;

  .el-button {
    font-weight: bold;
    line-height: 20px;
    font-size: 14px;
    padding: 8px 12px;
    border: 2px solid;
  }
}
</style>

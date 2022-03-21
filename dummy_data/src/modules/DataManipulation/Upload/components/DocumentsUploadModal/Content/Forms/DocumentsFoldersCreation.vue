<template>
  <div class="documents-folders-creation-container">
    <div class="create-folder-button" v-if="!showForm">
      <natto-button @click="$emit('on-folder-creation-cta-click')">
        <div class="btn-container">
          <div class="btn-icon">
            <natto-icon :elementName="'folder-add'" />
          </div>
          <div class="btn-text">Nouveau dossier</div>
        </div>
      </natto-button>
    </div>
    <div class="form">
      <natto-create-folder-form
        v-if="showForm"
        :showForm="showForm"
        :placeholder="'Entrer un nom de dossier'"
        :selectedFolderId="selectedFolderId"
        :creation-folder-error="creationFolderError"
        @create-folder-click="$emit('on-create-folder', $event)"
        @cancel-create-folder-click="$emit('on-cancel-create-folder')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoButton from '@/Common/components/Buttons/NattoButton.vue'
import NattoCreateFolderForm from '@/modules/DataManipulation/Create/CreateFolder/components/NattoCreateFolderForm.vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'

export default defineComponent({
  name: 'DocumentsFoldersCreation',
  emits: ['on-folder-creation-cta-click'],
  props: {
    showForm: Boolean,
    selectedFolderId: Number,
    disabled: Boolean,
    creationFolderError: String
  },
  components: {
    NattoButton,
    NattoCreateFolderForm,
    NattoIcon
  }
})
</script>

<style lang="scss">
.documents-folders-creation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

  .form {
    width: 100%;
  }

  .create-folder-button {
    .el-button {
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      text-align: center;
      color: white;
      height: fit-content;
      min-height: fit-content !important;
      background: var(--primary);
      border-color: var(--primary);
      padding: 8px 12px;

      .btn-container {
        display: flex;
        justify-content: center;
        align-items: center;

        .btn-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;

          i {
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>

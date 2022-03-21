<template>
  <div class="arbo-header__container">
    <div class="arbo-header__prepend">
      <chevron-left-icon
        class="arbo-header__back"
        name="arrow-left"
        @click="$emit('back-click')"
      />
      <natto-divider class="arbo-header__separator" />
    </div>
    <natto-header class="arbo-header" :title="arboHeaderTitle">
      <template #subHeader>
        <natto-breadcrumb
          :breadcrumbs="breadcrumbs"
          @breadcrumb-click="handleBrowserFolderSelected"
        />
      </template>
      <template #cta>
        <documents-create-folder-button
          :disabled="!canAddFolder"
          @click="openCreateFolderModal"
        />
        <div class="create-folder-icon-container">
          <documents-upload-btn
            :disabled="disabledUpload"
            :canUploadFiles="canUploadFiles"
            :hasAccessDs="hasAccessDs"
            @on-files-change="$emit('upload-triggered', $event)"
          />
        </div>
      </template>
    </natto-header>
  </div>

  <create-folder-modal
    v-model="isCreateFolderModalOpened"
    :selectedFolderId="searchFolderId"
  />
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'
import useBreadcrumbHelpers from '@/Common/hooks/useBreadcrumbHelpers'
import NattoBreadcrumb from '@/Common/components/Breadcrumb/NattoBreadcrumb.vue'
import DocumentsUploadBtn from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import DocumentsCreateFolderButton from '@/modules/Search/components/Buttons/DocumentsCreateFolderButton.vue'
import CreateFolderModal from '@/modules/Search/components/Modals/CreateFolderModal.vue'
import useCreateFolderModule from '@/modules/DataManipulation/Create/CreateFolder/store/helpers'
import { useStore } from 'vuex'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import NattoHeader from '@/Common/components/Header/NattoHeader.vue'
import ChevronLeftIcon from '@/Common/components/Icons/ChevronLeftIcon.vue'
import NattoDivider from '@/Common/components/Dividers/NattoDivider.vue'

export default defineComponent({
  name: 'ArboHeader',
  components: {
    NattoDivider,
    ChevronLeftIcon,
    NattoHeader,
    NattoBreadcrumb,
    DocumentsUploadBtn,
    DocumentsCreateFolderButton,
    CreateFolderModal
  },

  props: {
    folders: {
      type: Folders,
      required: true
    },
    disabledUpload: {
      type: Boolean,
      default: false
    },
    searchFolderId: {
      type: Number,
      required: true
    },
    canUploadFiles: Boolean,
    hasAccessDs: Boolean,
    isMainViewBtn: Boolean
  },
  emits: [
    'breadcrumb-click',
    'back-click',
    'upload-triggered',
    'update:searchFolderId',
    'open-create-folder'
  ],
  setup(props) {
    const store = useStore()

    const isCreateFolderModalOpened = ref(false)
    const { hasPermissionToAddFolder } = useCreateFolderModule(store)

    const { state, selectBreadcrumb } = useBreadcrumbHelpers({
      folders: props.folders,
      selectedFolder: props.searchFolderId,
      propName: 'searchFolderId'
    })

    const handleBrowserFolderSelected = (id: number, emitEvent: boolean) => {
      selectBreadcrumb(id, emitEvent)
    }

    watch([() => props.searchFolderId], () => {
      handleBrowserFolderSelected(props.searchFolderId, false)
      trackEventFactory(
        analyticsCode['adv-beadcrumb-click'],
        state.breadcrumbs.length
      )
    })

    const canAddFolder = computed(() =>
      hasPermissionToAddFolder(props.searchFolderId)
    )

    const arboHeaderTitle = computed(() =>
      state.breadcrumbs.length > 0
        ? state.breadcrumbs[state.breadcrumbs.length - 1].text
        : ''
    )

    return {
      canAddFolder,
      handleBrowserFolderSelected: (id: number) =>
        handleBrowserFolderSelected(id, true),
      breadcrumbs: state.breadcrumbs,
      isCreateFolderModalOpened,
      arboHeaderTitle,
      openCreateFolderModal: () => {
        if (canAddFolder.value) {
          trackEventFactory(analyticsCode['adv-add-folder-cta'])
          isCreateFolderModalOpened.value = true
        }
      }
    }
  }
})
</script>

<style scoped lang="scss">
.arbo-header {
  flex: 1;

  &__prepend {
    display: flex;
  }

  &__separator {
    margin: 15px;
  }

  &__container {
    display: flex;
    width: 100%;
    column-gap: 10px;
  }

  &__back {
    width: 25px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>

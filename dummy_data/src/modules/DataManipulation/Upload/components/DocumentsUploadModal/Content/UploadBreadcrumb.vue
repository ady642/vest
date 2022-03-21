<template>
  <div
    class="upload-breadcrumb-container"
    :class="disabledBreadcrumb ? 'upload-breadcrumb-disabled' : ''"
  >
    <div
      v-show="breadcrumbs?.length > 0 && !disabledBreadcrumb"
      class="upload-breadcrumb-element arrow-left-icon"
      @click="handleGoBack"
    >
      <arrow-left-icon />
    </div>
    <natto-breadcrumb
      ellipsed
      :disabledBreadcrumbs="disabledBreadcrumb"
      :breadcrumbs="breadcrumbs"
      @breadcrumb-click="handleBreadcrumbFolderSelected"
      class="upload-breadcrumb-element"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import ArrowLeftIcon from '@/Common/components/Icons/ArrowLeftIcon.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import useBreadcrumbHelpers from '@/Common/hooks/useBreadcrumbHelpers'
import NattoBreadcrumb from '@/Common/components/Breadcrumb/NattoBreadcrumb.vue'
import { BreadcrumbItem } from '@/Common/types/common'

export default defineComponent({
  name: 'UploadBreadcrumb',
  components: {
    NattoBreadcrumb,
    ArrowLeftIcon
  },
  props: {
    selectedFolderToUpload: Number,
    disabledBreadcrumb: Boolean,
    folders: {
      type: Folders,
      required: true
    }
  },
  emits: ['update:selectedFolderToUpload'],
  setup(props) {
    const { state, goBack, selectBreadcrumb } = useBreadcrumbHelpers({
      folders: props.folders,
      selectedFolder: props.selectedFolderToUpload,
      propName: 'selectedFolderToUpload'
    })

    state.breadcrumbs.unshift({ id: 0, text: 'GED' } as BreadcrumbItem)

    const handleGoBack = () => {
      if (props.disabledBreadcrumb) {
        return
      }
      goBack()
    }

    const handleBreadcrumbFolderSelected = (id: number, emitEvent: boolean) => {
      selectBreadcrumb(id, emitEvent)
    }

    watch([() => props.selectedFolderToUpload], () => {
      handleBreadcrumbFolderSelected(props.selectedFolderToUpload ?? 0, false)
    })

    return {
      handleBreadcrumbFolderSelected: (id: number) =>
        handleBreadcrumbFolderSelected(id, true),
      breadcrumbs: state.breadcrumbs,
      handleGoBack
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-breadcrumb-container {
  display: flex;
  flex-flow: row nowrap;

  .upload-breadcrumb-element {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;

    &.arrow-left-icon {
      cursor: pointer;
    }
  }
}
</style>

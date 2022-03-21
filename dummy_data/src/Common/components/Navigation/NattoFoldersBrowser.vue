<template>
  <div
    v-for="item in folders"
    :key="item.id"
    :class="$attrs.class"
    class="folder-item-container"
  >
    <div
      :class="disabled ? 'folder-item-disabled' : ''"
      class="folderItem"
      @click="handleClick(item.id)"
    >
      <div class="item-content">
        <div class="item-content__name__icon"><folder-icon /></div>
        <div class="item-content__name__text">{{ item.name }}</div>
        <div class="item-content__actions">
          <slot name="actions" :folder="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
import useArrayHelpers from '@/Common/hooks/useArrayHelpers'
import FolderIcon from '@/Common/components/Icons/FolderIcon.vue'

export default defineComponent({
  name: 'NattoFoldersBrowser',
  components: { FolderIcon },
  props: {
    folders: {
      type: Array as PropType<Folder[]>,
      required: true
    },
    height: {
      type: Number,
      default: 160
    },
    disabled: Boolean
  },
  emits: ['browser-folder-selected'],
  setup(props, { emit }) {
    const { sortArrayByAlphabeticalOrder } = useArrayHelpers()

    const foldersAlphabeticallySorted = ref(
      sortArrayByAlphabeticalOrder(props.folders, 'name')
    )

    const handleClick = (folderId: number) => {
      emit('browser-folder-selected', folderId)
    }

    watch(
      () => props.folders,
      () => {
        foldersAlphabeticallySorted.value = sortArrayByAlphabeticalOrder(
          props.folders,
          'name'
        )
      }
    )

    return {
      handleClick,
      foldersAlphabeticallySorted
    }
  }
})
</script>

<style lang="scss" scoped>
.folder-item-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  .item-text {
    white-space: pre;
  }
  &:hover {
    background: #f5f7fa;

    .item-text {
      color: #4e50f5;
    }
  }
}

.folderItem {
  flex-basis: 100%;
  height: 40px;
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  padding: 10px 0;
  margin-bottom: 0.5%;

  .item {
    &-content {
      width: 100%;
      display: flex;
      align-items: center;

      &__name {
        &__icon {
          flex: 0.1;
          text-indent: 14px;
        }

        &__text {
          flex: 0.8;
        }
      }

      &__actions {
        flex: 0.1;
        display: flex;
        justify-content: center;
      }
    }
  }
}

.folder-item-disabled {
  background: #f5f7fa;
  cursor: not-allowed;
}
</style>

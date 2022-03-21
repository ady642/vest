<template>
  <div
    class="search-tree__item"
    :class="{ 'search-tree__item--disabled': disabled }"
  >
    <span
      class="search-tree__item__name"
      :class="{ 'search-tree__item__name--active': isFolderSelected }"
    >
      {{ folder.name }}
    </span>
    <span
      v-if="folder?.children?.length > 0"
      class="search-tree__item__children-length"
      :class="{
        'search-tree__item__children-length--active': isFolderSelected
      }"
    >
      {{ folder?.children?.length }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'

export default defineComponent({
  name: 'SearchTreeItem',

  props: {
    folder: Folder,
    isFolderSelected: Boolean
  }
})
</script>

<style lang="scss" scoped>
.search-tree__item {
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;

  &__name {
    color: var(--black);
    font-weight: 600;
    font-size: 14px;
    margin-right: 5px;

    &--active {
      color: var(--primary);
    }
  }

  &__children-length {
    background: var(--primary-50);
    color: var(--primary);
    border-radius: 30px;
    padding: 5px 14px;
    height: 24px;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    justify-content: center;
    align-items: center;

    &--active {
      background: white;
      color: var(--primary);
    }
  }
}
</style>

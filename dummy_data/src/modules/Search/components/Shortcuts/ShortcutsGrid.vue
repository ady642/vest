<template>
  <div class="shortcut-grid">
    <div class="title-area">
      <span class="title-font">Mes raccourcis</span>
    </div>
    <div class="cards-area">
      <div class="shortcut-cards">
        <shortcut-card
          v-for="(item, index) in folders.collection"
          :key="index"
          :folder="item"
          @click="folderCardClicked(item.id)"
        >
        </shortcut-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ShortcutCard from '@/modules/Search/components/Shortcuts/ShortcutCard.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
export default {
  name: 'ShortcutsGrid',
  components: { ShortcutCard },

  props: {
    folders: {
      type: Folders,
      required: true
    }
  },
  emits: ['folder-shortcut-click'],

  setup(
    props: Record<string, Folders>,
    { emit }: { emit: (event: string, ...args: unknown[]) => void }
  ): Record<string, (id: number) => void> {
    const folderCardClicked = (id: number) => {
      emit('folder-shortcut-click', id)
    }

    return {
      folderCardClicked
    }
  }
}
</script>

<style lang="scss" scoped>
.shortcut-grid {
  display: grid;
  grid-template-areas: 'title' 'cards';

  .title-area {
    grid-area: title;
    display: flex;
    flex-direction: column;
    padding-bottom: 25px;

    .title-font {
      position: static;
      width: 352px;
      height: 25px;
      left: 0;
      top: 309px;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      display: flex;
      align-items: center;
      color: #6b6e74;
    }
  }

  .cards-area {
    grid-area: cards;
    display: flex;
    flex-direction: column;

    .shortcut-cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
}
</style>

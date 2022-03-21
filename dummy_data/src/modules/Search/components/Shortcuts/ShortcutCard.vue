<template>
  <natto-card :class="`shortcut-card ${categoryCode}`">
    <div class="folder-icon-container">
      <div :class="`folder-icon ${categoryCode}`" />
    </div>
    <span class="path-font">Parcourir</span>
    <span class="path-font">{{ folder.name }}</span>
  </natto-card>
</template>

<script lang="ts">
import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import { defineComponent, computed, ComputedRef } from 'vue'
import Folder from '@/modules/Search/models/Folders/Inputs/Folder'
export default defineComponent({
  name: 'ShortcutCard',
  components: { NattoCard },
  props: {
    folder: {
      type: Folder,
      required: true
    }
  },
  setup(props: Record<string, Folder>): Record<string, ComputedRef<string>> {
    const categoryCode = computed(() =>
      props.folder.name.includes('Comptabilité')
        ? 'compta'
        : props.folder.name.includes('Gestion Sociale')
        ? 'gs'
        : ''
    )

    return {
      categoryCode
    }
  }
})
</script>

<style lang="scss" scoped>
.shortcut-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 45%;
  margin: 5px;
  height: 130px;

  /* Secondary/Purple/50 */

  &.compta {
    background: #f1e8fb;
  }

  &.gs {
    background: #fef3e2;
  }
}

.path-font {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;

  /* Neutral/Grey/800 */

  color: #3c3c3b;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
  margin: 8px 0;
}

.folder-icon-container {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.folder-icon {
  height: 15px;
  width: 13px;
  background-size: contain;

  &.compta {
    background:
      url('../../../../assets/Folder/FolderCompta.svg') no-repeat
      center center;
  }

  &.gs {
    background:
      url('../../../../assets/Folder/FolderGS.svg') no-repeat center
      center;
  }
}
</style>

<template>
  <natto-card class="trash-card">
    <div class="trash-card-container">
      <div class="trash-card-header">
        <trash-card-title :title="$tc('ged.trash.arboCard.title')" />
      </div>
      <div class="arbo-card-content two-rows">
        <div class="trash-description">
          <arbo-description
            :description="$tc('ged.trash.arboCard.description')"
          />
        </div>
        <div class="trash-shortcut">
          <trash-shortcut />
        </div>
      </div>
    </div>
  </natto-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArboDescription from '@/modules/Search/components/Cards/ArboDescription.vue'
import TrashCardTitle from '@/modules/Trash/components/Cards/TrashCardTitle.vue'
import NattoCard from '@/Common/components/Cards/NattoCard.vue'
import TrashShortcut from '@/modules/Trash/components/Shortcuts/TrashShortcut.vue'

export default defineComponent({
  name: 'TrashCard',

  components: {
    TrashShortcut,
    NattoCard,
    TrashCardTitle,
    ArboDescription
  }
})
</script>

<style lang="scss">
.trash-card {
  margin-bottom: 24px;

  .two-rows {
    grid-template-rows: 1fr 1fr;
    margin-bottom: 0;

    .trash-shortcut {
      display: flex;
      justify-content: flex-end;
      margin-top: 1vh;
    }
  }

  .trash-card-container {
    .trash-card-content {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 2fr;
      grid-gap: 24px;
      margin-bottom: 24px;
    }
  }
}
</style>

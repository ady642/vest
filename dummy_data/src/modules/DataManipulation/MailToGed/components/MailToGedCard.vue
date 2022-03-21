<template>
  <mp-card class="mail-to-ged-card" @click="$emit('open-mail-to-ged')">
    <mp-icon name="send"></mp-icon>
    <span class="card-text">{{
      $tc('ged.dataManipulation.mailtoged.cardText')
    }}</span>
    <mp-icon name="arrow-right"></mp-icon>
  </mp-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MailToGedCard',
  emits: ['open-mail-to-ged']
})
</script>

<style lang="scss">
.mail-to-ged-card {
  cursor: pointer;
  width: stretch;
  max-width: 100%;
  .mp-card-content {
    justify-content: space-between;
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 16px;
    .card-text {
      font-size: 14px;
      padding-left: 10px;
    }
    .mp-icon-arrow-right {
      font-size: 22px;
    }
  }
  .mp-card {
    color: #00338d;
    background-color: var(--primary-50);
  }
}
</style>

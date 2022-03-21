<template>
  <basic-layout class="main-view-layout">
    <template #header>
      <main-header
        :disabled="disabled"
        :hasAccessDs="hasAccessDs"
        :isMainViewBtn="isMainViewBtn"
        @upload-triggered="$emit('upload-triggered', $event)"
      />
    </template>
    <template #content>
      <div class="main-view-content">
        <div class="listview">
          <slot name="list-view" />
        </div>
        <div class="dragfile">
          <slot name="dragfile" />
        </div>
        <div class="category">
          <slot name="category" />
        </div>
      </div>
    </template>
  </basic-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainHeader from '@/modules/Search/components/Headers/MainHeader.vue'
import BasicLayout from '@/modules/Search/components/Layouts/BasicLayout.vue'

export default defineComponent({
  name: 'MainViewLayout',
  emits: ['upload-triggered'],
  props: {
    disabled: Boolean,
    hasAccessDs: Boolean,
    isMainViewBtn: Boolean
  },
  components: {
    BasicLayout,
    MainHeader
  }
})
</script>

<style lang="scss" scoped>
.main-view-layout {
  .main-view-content {
    height: 100%;
    margin-top: 10px;
    display: grid;
    grid-template-columns: auto auto 352px;
    grid-template-rows: 260px auto;
    grid-auto-rows: 1fr;
    grid-gap: 25px;
    grid-template-areas:
      'listview listview dragfile'
      'listview listview category';
  }

  .main-view__tree {
    grid-area: tree;
    padding: 10px;
    height: min-content;
    min-width: 18vw;
    width: max-content;

    &__card-content {
      max-height: 70vh;
      overflow-y: auto;

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(76, 64, 64, 0.3);
        background-color: #f5f5f5;
        border-radius: 18px;
      }

      &::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
        height: 90%;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: var(--primary-300);
      }
    }
  }

  .listview {
    grid-area: listview;
    height: 75vh;

    @media (max-height: 1100px) {
      height: 70vh;
    }

    @media (max-height: 900px) {
      height: 60vh;
    }

    @media (max-height: 700px) {
      height: 50vh;
    }
  }

  .dragfile {
    grid-area: dragfile;
  }

  .category {
    grid-area: category;
  }
}
</style>

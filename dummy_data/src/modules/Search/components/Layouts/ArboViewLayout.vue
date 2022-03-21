<template>
  <div class="arbo-view-layout">
    <div class="arbo-main" :class="$slots.drawer ? 'small' : 'big'">
      <div class="arbo-header">
        <slot name="documents-view-header"></slot>
      </div>
      <div class="arbo-content">
        <div class="browse-doc-content">
          <div class="listview">
            <slot name="list-view" />
          </div>
        </div>
      </div>
    </div>
    <div class="arbo-drawer" :class="$slots.drawer ? 'show' : 'hide'">
      <slot name="drawer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArboViewLayout'
})
</script>

<style lang="scss" scoped>
.arbo-view-layout {
  display: flex;

  .arbo-main {
    &.big {
      flex: 100%;
    }
    &.small {
      flex: 70%;
    }

    padding: clamp(10px, 2vw, 40px);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto 1fr;
    grid-gap: 5px;
    grid-template-areas:
      'header header header'
      'main main main';

    .arbo-header {
      grid-area: header;
      margin-bottom: 15px;
    }

    .arbo-content {
      grid-area: main;

      .browse-doc-content {
        height: 100%;
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 100% 5%;
        grid-auto-rows: 1fr;
        grid-gap: 5px;
        grid-template-areas:
          'listview'
          'pagination';
      }

      .listview {
        grid-area: listview;
      }
    }
  }

  .arbo-drawer {
    &.show {
      flex: 30%;
      padding-left: 25px;
    }
    &.hide {
      flex: 0%;
    }
  }
}
// .browse-doc-layout {
//   height: calc(100vh - 50px);

//   .browse-doc-content {
//     padding: 20px;
//     height: 100%;
//     display: grid;
//     grid-template-columns: auto;
//     grid-template-rows: 100% 5%;
//     grid-auto-rows: 1fr;
//     grid-gap: 5px;
//     grid-template-areas:
//       'listview'
//       'pagination';
//   }

//   .listview {
//     grid-area: listview;
//   }
// }
</style>

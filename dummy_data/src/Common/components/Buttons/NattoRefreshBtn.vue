<template>
  <div class="refresh-btn" @click="onClick">
    <i class="el-icon-refresh-left"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NattoRefreshBtn',
  props: {},

  emits: ['refresh'],
  setup(props, { emit }) {
    return {
      onClick() {
        emit('refresh')
      }
    }
  }
})
</script>

<style lang="scss">
.refresh-btn {
  width: 56px;
  height: 56px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: pointer;

  i {
    color: #4e50f5;
    font-size: 32px;
    font-weight: 300;
  }
}
</style>

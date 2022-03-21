<template>
  <el-drawer
    v-model="value"
    :direction="direction"
    :with-header="false"
    ref="drawerRef"
  >
    <header class="el-drawer__header__custom">
      <div class="left__header">
        <slot name="header"></slot>
      </div>
      <button class="el-drawer__close-btn" type="button" @click="close">
        <i class="el-drawer__close el-icon el-icon-close"></i>
      </button>
    </header>
    <main>
      <slot></slot>
    </main>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useVModel from '@/Common/hooks'
export default defineComponent({
  name: 'NattoDrawer',
  props: {
    opened: Boolean,
    direction: {
      type: String,
      default: 'rtl'
    }
  },
  setup(props) {
    const drawerRef = ref(null as any)

    const value = useVModel(props, 'opened')

    const close = () => {
      drawerRef.value?.handleClose()
    }

    return {
      close,
      drawerRef,
      value
    }
  }
})
</script>

<style lang="scss">
.el-drawer__close-btn {
  color: var(--primary);
}
.el-drawer__header__custom {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}
</style>

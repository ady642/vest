<template>
  <ElTree
    class="natto-tree"
    v-bind="$attrs"
    :expand-on-click-node="false"
    :empty-text="$t('ged.common.loading')"
  >
    <template #default="{ node, data }">
      <slot name="item" :node="node" :data="data" />
    </template>
  </ElTree>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export interface NodeTree {
  label: string
  children: any
}

export default defineComponent({
  name: 'NattoTree'
})
</script>

<style lang="scss">
.natto-tree {
  .el-tree-node {
    height: auto;

    &.is-current {
      color: var(--primary);
    }

    &__expand-icon {
      color: var(--grey-300);
      font-size: 16px;
      transition: color ease-in-out 0.3s;

      &.expanded {
        color: var(--black);
      }
    }

    &__content {
      height: auto;
      border-radius: 12px 50px 50px 12px;
    }
  }
}
</style>

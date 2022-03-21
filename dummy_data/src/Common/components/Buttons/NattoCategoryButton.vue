<template>
  <div class="natto-category-button">
    <el-button
      :icon="icon"
      :class="classes + ' nto-btn'"
      @click="click"
      :disabled="disabled"
    >
      {{ label }}</el-button
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'NattoCategoryButton',
  props: {
    label: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    },
    containsChildren: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click-button'],

  setup(props, { emit }) {
    const click = () => emit('click-button')

    return {
      click,
      icon: computed(() =>
        props.active
          ? 'el-icon-close'
          : props.containsChildren
          ? 'el-icon-plus'
          : ''
      ),
      classes: computed(() => (props.active ? 'nto-btn-active' : ''))
    }
  }
})
</script>

<style scoped lang="scss">
.natto-category-button {
  margin: 5px;

  .nto-btn {
    border: 0;
    color: #6b6e74;
    background-color: #f5f7fa;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;

    span {
      margin-left: 5px;
    }
  }

  .nto-btn:hover {
    color: #171717;
    background-color: #e4ecf9;
  }

  .nto-btn-active {
    color: #4e50f5 !important;
    background-color: #ebebff !important;
  }
}
</style>

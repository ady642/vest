<template>
  <div class="success-container">
    <div class="icon-zone"><i class="el-icon-check"></i></div>
    <div class="main-content-zone">
      <p class="description">Import fini</p>
      <p class="sub-description">{{ subDescription }}</p>
    </div>
    <div class="actions-zone">
      <i class="el-icon-circle-close close-icon" @click="closeHandler"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SuccessUploadPopup',
  props: {
    successed: Number
  },
  setup(props, { emit }) {
    const isPlural = (count: number | undefined, char: string) => {
      return (count ?? 0) > 1 ? char : ''
    }

    return {
      subDescription: `${props.successed} nouveau${isPlural(
        props.successed,
        'x'
      )} fichier${isPlural(props.successed, 's')} déposé${isPlural(
        props.successed,
        's'
      )} correctement`,
      closeHandler: () => emit('close')
    }
  }
})
</script>

<style lang="scss">
.success-container {
  display: grid;
  align-items: center;
  padding: 16px;
  background: #e8f5e6;

  .primary {
    color: #4e50f5;
  }

  grid-template-columns: 10% 84% 10% !important;

  .icon-zone {
    i {
      color: #43b02a;
    }
  }

  .main-content-zone {
    .sub-description {
      font-weight: 600;
      line-height: 16px;
      color: #6b6e74;
      width: 90%;
      word-break: break-word;
    }
  }

  .actions-zone {
    .close-icon {
      color: #43b02a;
    }
  }
}
</style>

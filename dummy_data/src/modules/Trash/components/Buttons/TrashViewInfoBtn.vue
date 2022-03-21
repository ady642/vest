<template>
  <div class="trash-view-document-info">
    <mp-button size="small">
      <div class="btn-icon">
        <question-icon />
      </div>
    </mp-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionIcon from '@/Common/components/Icons/QuestionIcon.vue'

export default defineComponent({
  name: 'TrashViewInfoBtn',
  components: {
    QuestionIcon
  }
})
</script>

<style lang="scss">
.trash-view-document-info {
  button {
    box-shadow: 0 12px 28px rgba(87, 94, 107, 0.08);
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background: #fff !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-color: #fff !important;
    color: #4e50f5;
    font-size: 20px;

    &hover,
    &focus {
      box-shadow: 0 12px 28px rgba(87, 94, 107, 0.08);
      width: 56px;
      height: 56px;
      border-radius: 28px;
      background: #fff !important;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-color: white !important;
      color: #4e50f5;
      font-size: 20px;
    }
  }
}
</style>

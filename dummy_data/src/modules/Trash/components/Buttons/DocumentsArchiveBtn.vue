<template>
  <div class="documents-archive-btn">
    <mp-button size="small">
      <div class="btn-text">{{ buttoninnerText }}</div>

      <div class="btn-icon">
        <natto-icon :elementName="icon" />
      </div>
    </mp-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NattoIcon from '@/Common/components/Icons/NattoIcon.vue'

export default defineComponent({
  name: 'DocumentsArchiveBtn',
  components: { NattoIcon },
  props: {
    icon: {
      type: String,
      default: 'delete'
    },
    buttoninnerText: {
      type: String
    }
  }
})
</script>

<style lang="scss">
.documents-archive-btn {
  button {
    box-shadow: 0 12px 28px rgba(87, 94, 107, 0.08);
    background: #bc204b !important;
    border-color: #bc204b !important;
    color: white !important;
    padding: 16px 24px !important;
    border-radius: 28px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;

    &hover,
    &focus {
      box-shadow: 0 12px 28px rgba(87, 94, 107, 0.08);
      background: #bc204b !important;
      border-color: #bc204b !important;
      color: white !important;
      padding: 16px 24px;
      border-radius: 28px;
    }

    span {
      display: flex !important;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;

      .btn-icon {
        margin-right: 12.5px;
      }
    }
  }
}
</style>

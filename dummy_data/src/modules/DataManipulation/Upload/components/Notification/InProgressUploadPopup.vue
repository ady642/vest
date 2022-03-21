<template>
  <div class="in-progress-container">
    <div class="icon-zone"><document-icon :src="UploadWidgetSvg" /></div>
    <div class="main-content-zone">
      <p class="description">
        Import en cours - <span class="primary">{{ running }}/{{ total }}</span>
      </p>
      <progress :max="total" :value="running"></progress>
    </div>
    <div class="actions-zone">
      <loading-icon v-if="loading" />

      <input
        v-else
        type="button"
        class="cancel-action"
        value="Annuler"
        @click="cancelHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DocumentIcon from '@/Common/components/Icons/DocumentIcon.vue'
import UploadWidgetSvg from '@/assets/Icons/UploadWidget.svg'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'

export default defineComponent({
  name: 'InProgressUploadPopup',
  components: {
    LoadingIcon,
    DocumentIcon
  },
  props: {
    total: Number,
    running: Number,
    loading: Boolean
  },
  setup(props, { emit }) {
    return {
      cancelHandler: () => emit('cancelUpload'),
      UploadWidgetSvg
    }
  }
})
</script>

//
<style lang="scss">
.in-progress-container {
  .primary {
    color: #4e50f5;
  }

  margin: 0;
  display: grid;
  grid-template-columns: 10% 65% 20%;
  align-items: center;
  padding: 16px;

  .main-content-zone {
    display: flex;
    flex-direction: column;
    padding-left: 5px;

    progress {
      width: 90%;
      height: 4px;
      background-color: #4e50f5;
    }

    progress::-webkit-progress-bar {
      background-color: #e4ecf9;
      border-radius: 100px;
    }

    progress::-webkit-progress-value {
      background-color: #4e50f5;
      border-radius: 100px;
    }

    progress::-moz-progress-bar {
      background-color: #e4ecf9;
      border-radius: 100px;
    }

    progress::-moz-progress-value {
      background-color: #4e50f5;
      border-radius: 100px;
    }

    .description {
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 5px;
    }
  }

  .actions-zone {
    .holder {
      margin: auto !important;
    }

    .cancel-action {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0;
      text-align: center;
      color: #4e50f5;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
}
</style>

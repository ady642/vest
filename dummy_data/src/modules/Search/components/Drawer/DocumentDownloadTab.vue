<template>
  <div class="document-download-container">
    <certification-icon class="download-tab-header" />

    <div class="download-tab-content">
      <div class="download-tab-description">
        <p class="part1">
          {{ $t('ged.drawer.downloadTab.description.part1') }}
        </p>
        <p class="part2">
          {{ $t('ged.drawer.downloadTab.description.part2') }}
        </p>
      </div>
      <div class="download-tab-date">
        <p class="download-tab-label">
          {{ $t('ged.drawer.downloadTab.date') }}
        </p>
        <div class="download-tab-date-value">
          <natto-date
            class="document-creation-date"
            :date="document.creationDate"
            format="DD MMMM YYYY"
          />
        </div>
      </div>
      <div class="download-tab-button">
        <MpButton
          @click="$emit('download-clicked')"
          class="download-btn"
          size="small"
          type="primary"
          :disabled="isDownloading"
        >
          <div class="download-btn__content">
            <transition name="el-zoom-in-center">
              <loading-icon size="15" v-if="isDownloading" />
            </transition>
            <span>{{ $t('ged.drawer.downloadTab.download') }}</span>
          </div>
        </MpButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CertificationIcon from '@/Common/components/Icons/CertificationIcon.vue'
import NattoDate from '@/Common/components/Dates/NattoDate.vue'
import LoadingIcon from '@/Common/components/Icons/LoadingIcon.vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'
import Document from '@/modules/Search/models/Documents/Inputs/Document'

export default defineComponent({
  name: 'DocumentDownloadTab',
  components: {
    LoadingIcon,
    CertificationIcon,
    NattoDate
  },
  props: {
    document: {
      type: Document,
      required: true
    }
  },

  setup() {
    const store = useStore()
    const { isDownloading } = useSearchStoreHelpers()

    return {
      isDownloading: isDownloading(store)
    }
  }
})
</script>

<style lang="scss">
.download-btn {
  &.mp-button.is-disabled {
    color: hsla(0, 0, 100%, 0.6) !important;
  }
}
</style>

<style lang="scss" scoped>
.document-download-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: clamp(80px, 6vw, 130px);
  .download-btn__content {
    display: flex;
    align-items: center;
    transition: max-width ease-in-out 0.2s;

    & > *:first-child {
      margin-right: 10px;
    }
  }
  .download-tab {
    &-header {
      width: 180px;
      height: 175px;
      background-size: contain;
      margin-bottom: 25px;
    }
    &-content {
      max-width: 194px;
      text-align: center;
      font-weight: 600;
      line-height: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      .download-tab-description {
        color: var(--grey-900);
        line-height: 20px;
        p {
          margin: 0;
        }
      }
      .download-tab-date {
        margin-top: 15%;
        margin-bottom: 24px;
        line-height: 20px;
        .download-tab-label {
          margin: 0;
          color: var(--grey-500);
        }
        .download-tab-date-value {
          color: var(--primary-300);
        }
      }
    }
  }
}
</style>

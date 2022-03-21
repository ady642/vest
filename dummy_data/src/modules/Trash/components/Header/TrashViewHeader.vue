<template>
  <div class="trash-view-header">
    <trash-header-back-button @click="handleGoBackClick" />

    <div class="header-content">
      <div class="header-title">
        <h1>
          {{ $t('ged.trash.title') }}
          <span class="description">
            {{ $t('ged.trash.recentDelete') }}
          </span>
        </h1>
      </div>
    </div>
    <div class="spacer" />
    <!-- <div class="header-icon">
      <div class="info-icon-container">
        <trash-view-info-btn @click="$emit('info-btn-click')" />
        <documents-archive-btn
          icon="delete"
          :buttoninnerText="$t('ged.trash.archiveAll')"
          @click="$emit('archive-btn-click')"
        />
      </div>
    </div> -->
  </div>
  <div class="header-tag">
    <!-- <trash-documents-tag
      :text="$t('ged.trash.archiveIn60Days')"
      color="#FCE4E9"
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TrashHeaderBackButton from '@/modules/Trash/components/Header/TrashHeaderBackButton.vue'
import { trackEventFactory } from '@/Common/helpers/analyticsLog'
import analyticsCode from '@/Common/constants/analyticsCode'
import useSearchNavigator from '@/modules/Search/navigator/useSearchNavigator'

export default defineComponent({
  name: 'TrashViewHeader',
  emits: ['info-btn-click', 'archive-btn-click'],
  components: {
    TrashHeaderBackButton
  },

  setup() {
    const { goToMainView } = useSearchNavigator()

    const handleGoBackClick = () => {
      trackEventFactory(analyticsCode['tdv-goback'])
      goToMainView()
    }

    return {
      handleGoBackClick
    }
  }
})
</script>

<style lang="scss" scoped>
.header-icon {
  display: flex;
  align-items: center;

  .create-folder-disabled {
    color: #bbb;
  }
}

.header-tag {
  .el-tag {
    background-color: rgb(252, 228, 233);
    height: 52px;
    display: flex;
    align-items: center;
    border-color: var(--danger-50);
    border-radius: 8px;
    padding: 16px;
    color: var(--danger);
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-top: 35px;
  }
}

.trash-view-header {
  .info-icon-container {
    height: 56px;
    display: flex;

    .trash-view-document-info {
      margin-right: 24px;
    }
  }

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .header-content {
    margin-left: 24px;

    .header-title {
      .description {
        font-size: 14px;
        line-height: 21px;
        color: var(--grey-500);
        margin-left: 24px;
        font-weight: 400;
      }

      margin: 0;

      & h1 {
        margin: 0;
      }
    }
  }

  .header-icons {
    display: flex;
    align-items: center;

    .upload-icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .spacer {
    flex-grow: 1;
  }

  width: 100%;
}
</style>

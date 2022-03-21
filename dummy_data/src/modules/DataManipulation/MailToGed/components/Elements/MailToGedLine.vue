<template>
  <div class="mailToGed-element-container">
    <div class="icon-zone">
      <mp-icon name="documents"></mp-icon>
    </div>
    <div class="content-zone">
      <span class="folderName">{{ folderName }}</span>
      <span class="folder-email">{{ folderEmail }}</span>
    </div>
    <div class="actions-zone">
      <mp-button
        type="primary"
        class="copy-address-btn"
        size="small"
        btn-type="primary"
        @click="copy"
      >
        {{ emailCopyText }}
      </mp-button>
      <a :href="emailLink">
        <mp-button
          class="send-email-btn"
          size="small"
          btn-type="primary"
          @click="sendEmail"
        >
          {{ $tc('ged.dataManipulation.mailToGed.Modal.buttons.sendEmail') }}
        </mp-button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'MailToGedLine',
  props: {
    folderName: String,
    folderEmail: String
  },
  setup(props) {
    const copied = ref(false)
    const { t } = useTranslation()

    return {
      copied,
      emailCopyText: computed(() =>
        copied.value
          ? t('ged.dataManipulation.mailToGed.Modal.buttons.addressCopied')
          : t('ged.dataManipulation.mailToGed.Modal.buttons.copyAddress')
      ),
      emailLink: computed(() => 'mailto:' + props.folderEmail),
      copy: async () => {
        await navigator.clipboard.writeText(props.folderEmail ?? '')
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 500)
      }
    }
  }
})
</script>

<style lang="scss">
.mailToGed-element-container {
  display: grid;
  grid-template-columns: 5% 50% 45%;
  align-items: center;
  padding: 0px 20px;
  padding-bottom: 10px;
  margin-bottom: 16px;
  .icon-zone {
    font-size: 24px;
    color: #5446ff;
  }
  .content-zone {
    display: flex;
    flex-direction: column;
    .folderName {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 4px;
    }
    .folder-email {
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: var(--grey-500);
      .copied {
        color: var(--danger);
      }
    }
  }
  .actions-zone {
    flex: 1;
    column-gap: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .copy-address-btn,
    &hover,
    &focus,
    &active {
      width: 100%;
      border-radius: 8px;
    }
    .send-email-btn,
    &hover,
    &focus,
    &active {
      border-radius: 8px;
      justify-content: center;
      align-items: center;
      border-color: #5446ff;
      color: #5446ff;
    }
  }
}
</style>

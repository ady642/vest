<template>
  <natto-header :title="$t('ged.title')" :subtitle="$t('ged.subTitle')">
    <template #cta>
      <documents-upload-btn
        :disabled="disabled"
        :hasAccessDs="hasAccessDs"
        :isMainViewBtn="isMainViewBtn"
        @on-files-change="$emit('upload-triggered', $event)"
      />
    </template>
  </natto-header>
</template>

<script>
import NattoHeader from '@/Common/components/Header/NattoHeader'
import DocumentsUploadBtn from '@/modules/DataManipulation/Upload/components/DocumentsUploadModal/Activators/DocumentsUploadBtn.vue'

export default {
  name: 'MainHeader',
  emits: ['upload-triggered'],
  props: {
    disabled: Boolean,
    hasAccessDs: Boolean,
    isMainViewBtn: Boolean
  },
  components: { NattoHeader, DocumentsUploadBtn }
}
</script>

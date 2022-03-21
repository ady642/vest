<template>
  <natto-dialog v-model="isOpened" @close="$emit('on-modal-close')">
    <div class="modal-two-columns" :class="{ noPadding }">
      <div class="modal-header">
        <slot name="modal-header">[Header]</slot>
      </div>
      <div class="modal-subheader">
        <slot name="modal-subheader">[Subheader]</slot>
      </div>
      <div class="modal-leftpanel-title modal-panel-title">
        <slot name="modal-leftpanel-title">[Left title]</slot>
      </div>
      <div class="modal-leftpanel-content">
        <slot name="modal-leftpanel-content">[Left content]</slot>
      </div>
      <div class="modal-rightpanel-title modal-panel-title">
        <slot name="modal-rightpanel-title">[Right title]</slot>
      </div>
      <div class="modal-rightpanel-content">
        <slot name="modal-rightpanel-content">[Right content]</slot>
      </div>
      <div class="actions">
        <slot name="actions">[Actions]</slot>
      </div>
    </div>
  </natto-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useVModel from '@/Common/hooks'
import NattoDialog from '@/Common/components/Modals/NattoDialog.vue'

export default defineComponent({
  name: 'ModalTwoColumns',
  components: { NattoDialog },
  props: {
    modelValue: Boolean,
    noPadding: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const isOpened = useVModel(props)

    return {
      isOpened
    }
  }
})
</script>

<style lang="scss" scoped>
.modal-two-columns {
  background-color: white;
  padding: 40px;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 25px 55px auto max-content;
  grid-template-areas:
    'modal-header modal-header'
    'modal-subheader modal-subheader'
    'modal-leftpanel-title modal-rightpanel-title'
    'modal-leftpanel-content modal-rightpanel-content'
    'actions actions';

  .modal-header {
    grid-area: modal-header;
    font-weight: 700;
    font-size: 18px;
    line-height: 21.09px;
    color: #171717;
    display: flex;
    align-items: center;
  }

  .modal-subheader {
    grid-area: modal-subheader;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin-top: auto;
    margin-bottom: auto;
    color: #6b6e74;
  }

  .modal-leftpanel-title {
    grid-area: modal-leftpanel-title;
  }

  .modal-rightpanel-title {
    grid-area: modal-rightpanel-title;
  }

  .modal-panel-title {
    font-size: 12px;
    font-weight: 700;
    line-height: 14.06px;
    margin-top: 31px;
    color: #c0c4cc;
    margin-bottom: 3%;
  }

  .modal-leftpanel-content {
    grid-area: modal-leftpanel-content;
  }

  .modal-rightpanel-content {
    grid-area: modal-rightpanel-content;
  }

  .actions {
    grid-area: actions;
    text-align: right;
  }

  &.noPadding {
    padding: 0;
  }
}
</style>

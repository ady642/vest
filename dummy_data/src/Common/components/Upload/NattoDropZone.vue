<template>
  <div
    class="natto-dropzone__container"
    :class="[
      $attrs.class,
      {
        'natto-dropzone__container--dragged-over': dragOverEnabled,
        [dragOverEnabledClass]: dragOverEnabled,
        [dragOverDisabledClass]: dragOverDisabled
      }
    ]"
    @drop.prevent="onDropHandler"
    @dragover.prevent="onDragoverHandler"
  >
    <template v-if="dragOverEnabled">
      <div class="natto-dropzone__container-over">
        <slot name="over-content" />
      </div>
      <div
        class="natto-dropzone__mask"
        @dragleave.prevent="onDragleaveHandler"
      />
    </template>
    <slot />
  </div>
</template>

<script lang="ts">
import { getFilesFromDataTransfer } from '@/Common/helpers/dataTransferHelper'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'NattoDropZone',
  props: {
    disabled: Boolean,
    dragOverEnabledClass: String,
    dragOverDisabledClass: String
  },
  emits: ['files-changes'],
  setup(props, { emit }) {
    const dragover = ref(false)
    const dragoverDisabled = ref(false)

    const DragoverHandlerValue = (value: boolean) => {
      if (props.disabled) {
        dragoverDisabled.value = value
      } else {
        dragover.value = value
      }
    }

    const onDragleaveHandler = () => {
      DragoverHandlerValue(false)
    }

    const onDropHandler = async (e: DragEvent) => {
      if (!props.disabled) {
        if (e.dataTransfer)
          emit('files-changes', await getFilesFromDataTransfer(e.dataTransfer))
        dragover.value = false
      }
    }
    const onDragoverHandler = () => {
      DragoverHandlerValue(true)
    }

    return {
      dragover,
      dragOverEnabled: computed(() => dragover.value && !props.disabled),
      dragOverDisabled: computed(
        () => dragoverDisabled.value && props.disabled
      ),
      onDragleaveHandler,
      onDropHandler,
      onDragoverHandler
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin absolute_centered {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.natto-dropzone {
  &__container {
    position: relative;

    &--dragged-over {
      background: rgba(32, 159, 255, 0.06);
      border: 2px dashed var(--primary);
    }

    &-over {
      @include absolute_centered;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__mask {
    @include absolute_centered;
    z-index: 2;
  }
}
</style>

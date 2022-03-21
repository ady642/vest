<template>
  <div
    class="collaps-container"
    :style="{ cursor: displayArrow ? 'pointer' : 'auto' }"
    @click="handleClick"
  >
    <span class="collaps-nb-elements">{{ nbDocumentsDisplayed }}</span>
    <span class="collaps-title"> {{ title }}</span>
    <div class="spacer" />
    <arrow-right-icon class="arrow" v-if="displayArrow" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject } from 'vue'
import ArrowRightIcon from '@/Common/components/Icons/ArrowRightIcon.vue'

export default defineComponent({
  name: 'InfoBar',
  components: {
    ArrowRightIcon
  },
  props: {
    nbDocuments: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    displayArrow: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click'],

  setup(props, { emit }) {
    const documentsLoading: ComputedRef<boolean> =
      inject('documentsLoading') ?? computed(() => false)

    const handleClick = () => {
      emit('click')
    }

    const nbDocumentsDisplayed = computed(() => {
      return documentsLoading.value ? 0 : props.nbDocuments
    })

    return {
      handleClick,
      nbDocumentsDisplayed
    }
  }
})
</script>

<style lang="scss" scoped>
.collaps-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 28px 10px 16px;
  background: #fff;
  border-radius: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;

  .collaps-nb-elements {
    text-align: center;
    color: #4e50f5;
  }

  .collaps-title {
    padding-left: 20px;
    color: #171717;
  }

  .spacer {
    flex-grow: 1;
  }
}
</style>

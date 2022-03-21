<template>
  <div class="comments-tab-container">
    <mp-input
      v-loading="isLoading"
      type="textarea"
      v-model="comment"
      @change="updateComWhenInputChange"
    />
    <div class="description" v-if="currentComment">
      <div class="comment-date-container">
        <p class="header">
          {{ $t('ged.drawer.commentsTab.commentDate') }}
        </p>
        <natto-date class="label" :date="commentDate" format="DD MMMM YYYY" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useSearchStoreHelpers from '@/modules/Search/store/helpers'
import { useStore } from 'vuex'
import NattoDate from '@/Common/components/Dates/NattoDate.vue'

export default defineComponent({
  name: 'CommentsTab',
  props: {
    documentId: { type: String, required: true },
    commentDate: String,
    currentComment: String
  },
  components: {
    NattoDate
  },

  emits: ['comment-updated'],

  setup(props, { emit }) {
    const store = useStore()
    const comment = ref(props.currentComment)
    const isLoading = ref(false)

    watch(
      () => props.documentId,
      () => {
        comment.value = props.currentComment
      }
    )
    const { dispatchPatchDocumentComment } = useSearchStoreHelpers()

    const updateComWhenInputChange = async () => {
      if (comment.value) {
        try {
          isLoading.value = true
          await dispatchPatchDocumentComment(
            store,
            props.documentId,
            comment.value
          )
          emit('comment-updated')
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      updateComWhenInputChange,
      comment,
      isLoading
    }
  }
})
</script>

<style lang="scss">
.comments-tab-container {
  width: 100%;
  textarea {
    width: 100%;
    height: 196px;
  }
  .description {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    .header {
      margin: 0;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: var(--grey-500);
    }
    .label {
      margin: 4px 0;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      display: flex;
      align-items: center;
      color: var(--black);
    }
  }
}
</style>

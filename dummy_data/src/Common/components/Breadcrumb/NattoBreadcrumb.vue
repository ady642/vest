<template>
  <div class="breadcrumb-container">
    <mp-breadcrumb
      :breadcrumb-items="breadcrumbs"
      :ellipsed="ellipsed"
      @breadcrumb-click="breadcrumbClicked"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BreadcrumbItem } from '@/Common/types/common'
import useBreadcrumbHelpers from '@/Common/hooks/useBreadcrumbHelpers'

export default defineComponent({
  name: 'NattoBreadcrumb',
  props: {
    breadcrumbs: {
      type: Array as PropType<BreadcrumbItem[]>,
      required: true
    },
    disabledBreadcrumbs: Boolean,
    ellipsed: Boolean
  },
  emits: ['breadcrumb-click'],

  setup(props) {
    const { handleClickOnBreadcrumb } = useBreadcrumbHelpers()

    const breadcrumbClicked = (id: number) => {
      if (props.disabledBreadcrumbs) {
        return
      }

      handleClickOnBreadcrumb({ id, breadcrumbs: props.breadcrumbs })
    }

    return {
      breadcrumbClicked
    }
  }
})
</script>

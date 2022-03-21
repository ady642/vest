<template>
  <mp-tabs
    :tab-items="items"
    v-model="activeName"
    @tab-click="handleClick"
    :stretch="stretch"
  >
    <template v-for="item in items" #[item.name]>
      <slot :name="item.name"></slot>
    </template>
  </mp-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { TabItem } from '@/Common/types/common'
import _ from 'lodash'

export default defineComponent({
  name: 'NattoTabs',
  emits: ['tab-selected'],
  props: {
    items: {
      type: Array as PropType<TabItem[]>,
      required: true
    },
    stretch: Boolean
  },

  setup(props, { emit }) {
    let activeName = ref(props.items[0].name)

    watch(
      () => _.cloneDeep(props.items),
      (currentValue) => {
        activeName.value = currentValue[0].name
      }
    )

    return {
      activeName,
      handleClick: (tab: { props: { name: string } }) => {
        emit('tab-selected', tab.props.name)
      }
    }
  }
})
</script>

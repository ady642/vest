<template>
  <natto-tabs :items="tabItems" />
</template>

<script lang="ts">
import NattoTabs from '@/Common/components/Tabs/NattoTabs.vue'
import Folders from '@/modules/Search/models/Folders/Inputs/Folders'
import { defineComponent, computed } from 'vue'
import { useTranslation } from '@/Common/hooks/useTranslation'

export default defineComponent({
  name: 'FolderTabs',
  components: { NattoTabs },
  props: {
    folders: {
      type: Folders,
      required: true
    }
  },
  setup(props) {
    const { t } = useTranslation()

    const tabItems = computed(() => {
      let items = props.folders.collection.map((x) => ({
        id: x.id,
        name: x.id,
        label: x.name
      }))

      items.unshift({
        id: 0,
        name: 0,
        label: t('ged.search.tabs.label.all')
      })

      return items
    })

    return {
      tabItems
    }
  }
})
</script>

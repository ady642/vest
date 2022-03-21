<template>
  <div class="document-details-container">
    <div class="details-content">
      <div class="field flex-100">
        <p class="libelle">{{ $t('ged.drawer.details.documentName') }}</p>
        <p class="label">{{ document.name }}</p>
      </div>
      <div class="field flex-50">
        <p class="libelle">{{ $t('ged.drawer.details.creationDate') }}</p>
        <natto-date
          class="label"
          :date="document.creationDate"
          format="DD MMMM YYYY"
        />
      </div>
      <div class="field flex-50">
        <p class="libelle">{{ $t('ged.drawer.details.updatedDate') }}</p>
        <natto-date
          class="label"
          :date="document.updatedDate"
          format="DD MMMM YYYY"
        />
      </div>
      <div class="field flex-100">
        <p class="libelle">{{ $t('ged.drawer.details.createdby') }}</p>
        <div class="user-container">
          <p class="label" v-if="document.createdBy?.toUpperCase() !== 'ADMIN'">
            <a :href="'mailto:' + document.createdBy">{{
              document.createdBy
            }}</a>
          </p>
          <p class="label" v-else>
            {{ document.createdBy }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Document from '@/modules/Search/models/Documents/Inputs/Document'
import NattoDate from '@/Common/components/Dates/NattoDate.vue'

export default defineComponent({
  name: 'DocumentDetailsTab',
  components: {
    NattoDate
  },
  props: {
    document: {
      type: Document,
      required: true
    }
  }
})
</script>

<style lang="scss">
.document-details-container {
  .details-content {
    display: flex;
    flex-wrap: wrap;

    .field {
      padding-bottom: 24px;
      &.flex-50 {
        flex: 50%;
      }
      &.flex-100 {
        flex: 100%;
      }
      .libelle {
        padding-bottom: 4px;
        margin: 0;
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: var(--grey-500);
      }

      .label {
        margin: 0;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        color: var(--black);
      }

      .user-container {
        width: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: var(--grey-50);
        border-radius: 30px;
        padding: 8px 16px;

        a {
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          display: flex;
          align-items: center;
          text-align: center;
          color: var(--black);
          text-decoration: none;
        }
      }
    }
  }
}
</style>

<template>
  <mp-input
    v-model="input"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    class="natto-input"
    :class="$attrs.class"
    @input="handleChange"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
  </mp-input>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'NattoInput',
  props: {
    placeholder: {
      type: String,
      default: 'Entrez du texte'
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    clearable: Boolean,
    debounceTime: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const input = ref(props.modelValue)

    const debounceF = debounce((value: string) => {
      emit('update:modelValue', value)
    }, props.debounceTime)

    const handleChange = (value: string) => {
      if (props.debounceTime) {
        debounceF(value)
      } else {
        emit('update:modelValue', value)
      }
    }

    watch(
      () => props.modelValue,
      () => {
        input.value = props.modelValue
      }
    )

    return {
      handleChange,
      input
    }
  }
})
</script>

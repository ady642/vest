import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

export type NattoInputProps = {
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  debounceTime?: number
  modelValue: string
}

type NattoInputSetup = {
  handleChange: (str: string) => void
  input: string
}

export type NattoInputWrapper = VueWrapper<
  ComponentPublicInstance<NattoInputProps, NattoInputSetup>
>

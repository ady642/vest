import { computed, WritableComputedRef, getCurrentInstance } from 'vue'

type useVModelType = (
  props: { [key: string]: any },
  name?: string
) => WritableComputedRef<any>

const useVModel: useVModelType = (props, name = 'modelValue') => {
  const instance = getCurrentInstance()

  if (!instance) {
    throw new Error(
      'useVModel must be called from the setup or lifecycle hook methods.'
    )
  }

  return computed({
    get: () => props[name],
    set: (value) => {
      instance.emit(`update:${name}`, value)
    }
  })
}

export default useVModel

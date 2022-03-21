import { h } from 'vue'

export default {
  render<Props>(component: any, props: Props) {
    return h(component, props)
  }
}

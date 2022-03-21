import { Directive, DirectiveBinding } from 'vue'

type element = Node & { clickHandler: (event: Event) => void }

const ClickOutside: Directive = {
  beforeMount(el: element, binding: DirectiveBinding) {
    const ourClickEventHandler = (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (el !== event.target && !el.contains(event.target)) {
        binding.value(event) // before binding it
      }
    }

    // attached the handler to the element so we can remove it later easily
    el.clickHandler = ourClickEventHandler

    document.addEventListener('click', ourClickEventHandler)
  },

  unmounted(el: element) {
    document.removeEventListener('click', el.clickHandler)
  }
}

export default ClickOutside

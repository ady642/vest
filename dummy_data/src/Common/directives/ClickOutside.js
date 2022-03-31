"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClickOutside = {
    beforeMount(el, binding) {
        const ourClickEventHandler = (event) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (el !== event.target && !el.contains(event.target)) {
                binding.value(event); // before binding it
            }
        };
        // attached the handler to the element so we can remove it later easily
        el.clickHandler = ourClickEventHandler;
        document.addEventListener('click', ourClickEventHandler);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickHandler);
    }
};
exports.default = ClickOutside;
//# sourceMappingURL=ClickOutside.js.map
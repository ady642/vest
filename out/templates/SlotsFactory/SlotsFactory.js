"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SlotsFactory {
    constructor(vueCode) {
        const slots = vueCode.match(/<slot \/>/gm);
        const matchSlots = (slot) => slot.match(/"([a-z]*)"/) ?? [];
        this.slots = slots?.map((slot) => matchSlots(slot).length > 0 ? matchSlots(slot)[0] : 'default') ?? [];
    }
    buildSlotsIt() {
        if (this.slots.length === 0) {
            return '';
        }
        return `describe('rendering', () => {
            ${this.slots.map((slot) => `it('should render the ${slot} slot', () => {
               expect(wrapper.html()).toContain('I fill the ${slot} slot')
             })`)}
        })`;
    }
    getDefaultSlots() {
        return this.slots.length > 0 ? `           
            const defaultSlots = {
              ${this.slots.map((slot) => `${slot}: 'I fill the ${slot} slot'`)}
            }  
        ` : '';
    }
}
exports.default = SlotsFactory;
//# sourceMappingURL=SlotsFactory.js.map
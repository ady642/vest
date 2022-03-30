type slotsType = string[];

class SlotsFactory {
    slots: slotsType;

    constructor(vueCode: string) {
        const slots = vueCode.match(/<slot \/>/gm);

        const matchSlots = (slot: string) => slot.match(/"([a-z]*)"/) ?? [];

        this.slots =  slots?.map((slot) => matchSlots(slot) ? matchSlots(slot)[0] : 'default') ?? [];
    }

    buildSlotsIt() {
        if(this.slots.length === 0) {
            return '';
        }

        return `describe('rendering', () => {
            ${this.slots.map((slot) =>
            `it('should render the ${slot} slot', () => {
               expect(wrapper.html()).toContain('I fill the ${slot} slot')
             })`
        )}
        })`;
    }
}

export default SlotsFactory;

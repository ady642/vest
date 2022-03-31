"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventFactory {
    constructor(vueCode) {
        this.events = [
            { name: 'click', output: { type: 'event' } }
        ];
    }
    buildEventsIt(child) {
        if (child.events?.length === 0) {
            return '';
        }
        const chooseAction = (type) => {
            return type === 'event' ? 'emit' : 'dispatch';
        };
        return `describe('events', () => {
            ${child.events?.map((event) => `it('should ${chooseAction(event.output.type)} ${event.name} when ${child.name} emits ${event.name}', () => {
                await ${child.name}Wrapper.vm.$emit(${event.name})
                expect(wrapper.emitted('my-event')).toHaveLength(1)
             })`)}
        })`;
    }
}
exports.default = EventFactory;
//# sourceMappingURL=EventFactory.js.map
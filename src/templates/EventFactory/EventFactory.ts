import {childType} from "../ChildrenFactory";

export type eventType = {
    name: string
    output: {
        type: 'event' | 'externalCall' | 'dispatch' | 'changeChildProp'
    }
};


class EventFactory {
    events: eventType[];

    constructor(vueCode: string) {
        this.events = [
            { name: 'click', output: { type: 'event' } }
        ];
    }

    buildEventsIt(child: childType) {
        if(child.events?.length === 0) {
            return '';
        }

        const chooseAction = (type: string) => {
            return type === 'event' ? 'emit': 'dispatch';
        };

        return `describe('events', () => {
            ${child.events?.map((event) =>
        `it('should ${chooseAction(event.output.type)} ${event.name} when ${child.name} emits ${event.name}', () => {
                await ${child.name}Wrapper.vm.$emit(${event.name})
                expect(wrapper.emitted('my-event')).toHaveLength(1)
             })`
    )}
        })`;
    }
}

export default EventFactory;

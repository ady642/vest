type possibleOutputType = 'event' | 'externalCall' | 'dispatch' | 'changeChildProp';

export type eventType = {
    name: string
    outputType: possibleOutputType
};
class EventFactory {
    events: eventType[];
    name: string;

    constructor(componentTag: string, name: string,  vueCode: string) {
        this.name = name;
        const eventsString = componentTag.match(/@([a-z]*)(-[a-z]+)?/gm);
        const events: eventType[] = eventsString ? eventsString.map((event) => (
            { name: event.substring(1), outputType: this.getOutputType() }
        )) : [];

        this.events = events;
    }

    getOutputType(): possibleOutputType {
        return 'event';
    }

    buildEventsIt() {
        if(this.events?.length === 0) {
            return '';
        }

        const chooseAction = (outputType: string) => {
            return outputType === 'event' ? 'emit': 'dispatch';
        };

        return `describe('events', () => {
            ${this.events?.map((event) =>
        `it('should ${chooseAction(event.outputType)} ${event.name} when ${this.name} emits ${event.name}', async () => {
                await ${this.name}Wrapper.vm.$emit('${event.name}')
                expect(wrapper.emitted('my-event')).toHaveLength(1)
            })`
    )}
        })`;
    }
}

export default EventFactory;

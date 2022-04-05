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
            { name: event.substring(1), outputType: this.getOutputType(event, vueCode) }
        )) : [];

        this.events = events;
    }

    getOutputType(eventLine: string, vueCode: string): possibleOutputType {
        const $emitRegex = /@(?:[a-zA-Z]+)(?:=")(?:\$emit\(')(([a-z]+-[a-z]+)|([a-z]+))'/gm;
        const methodRegex = /@(?:[a-z]+)(?:-[a-z]+)?(?:=")(([a-zA-Z])*)(?:")/g;
        const $emitMatch = eventLine.match($emitRegex);
        const methodMatch = eventLine.match(methodRegex);

        if($emitMatch) {
            return 'event';
        }

        if(methodMatch) {
            return 'dispatch';
        }

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

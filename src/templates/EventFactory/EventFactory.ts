import { findClosingMatchIndex } from "../../utils";

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
        const eventLines = componentTag.match(/@([a-z]*)(-[a-z])?(="[a-zA-Z]+")/gm);
        const events: eventType[] = eventLines ? eventLines.map((eventLine) => (
            { name: eventLine.substring(eventLine.indexOf('@') + 1, eventLine.indexOf('"') - 1),
                outputType: this.getOutputType(eventLine, vueCode) }
        )) : [];

        this.events = events;
    }

    getOutputType(eventLine: string, vueCode: string): possibleOutputType {
        const $emitRegex = /\$emit/gm;
        const $emitMatch = eventLine.match($emitRegex);
        const methodName = eventLine.substring(eventLine.indexOf('"') + 1, eventLine.lastIndexOf('"'));

        if($emitMatch) {
            return 'event';
        }

        if(this.isEmitTypeMethod(methodName, vueCode)) {
            return 'event';
        }

        if(this.isDispatchTypeMethod(methodName, vueCode)) {
            return 'dispatch';
        }

        return 'event';
    }

    private determineMethodType(type = 'emit', methodName: string, vueCode: string) {
        const scriptPart = vueCode.substring(
            vueCode.indexOf("<script") + 1,
            vueCode.lastIndexOf("</script>")
        );

        const regexFirstBracket = new RegExp(`(?=(${methodName}))(.*({)$)`,'gm');

        regexFirstBracket.test(scriptPart);

        const method = scriptPart.substring(
            regexFirstBracket.lastIndex - 1,
            findClosingMatchIndex(scriptPart, regexFirstBracket.lastIndex - 1)
        );

        return method.includes(type);
    }

    isEmitTypeMethod(methodName: string, vueCode: string) {
        return this.determineMethodType('emit', methodName, vueCode);
    }

    isDispatchTypeMethod(methodName: string, vueCode: string) {
        return this.determineMethodType('dispatch', methodName, vueCode);
    }

    buildItEvent(event: eventType) {
        return `it('should emit ${event.name} when ${this.name} emits ${event.name}', async () => {
            await ${this.name}Wrapper.vm.$emit('${event.name}')
            expect(wrapper.emitted('my-event')).toHaveLength(1)
        })`;
    }

    buildEventsIt(): string {
        if(this.events?.length === 0) {
            return '';
        }

        return `describe('events', () => {
            ${this.events?.map((event) => event.outputType === 'event' ? this.buildItEvent(event): this.buildItEvent(event) )}
        })`;
    }
}

export default EventFactory;

import { findClosingMatchIndex } from "../../utils";

type possibleOutputType = 'event' | 'dispatch';

export type eventType = {
    name: string
    outputType: possibleOutputType
    outputPropertyName: string
};

const EVENT_SEPARATOR = ',';
class EventFactory {
    events: eventType[];
    name: string;

    constructor(componentTag: string, name: string,  vueCode: string) {
        this.name = name;
        const eventLines = componentTag.match(/@([a-z]*)(-[a-z]*)?(=".+")/gm);
        const events: eventType[] = eventLines ? eventLines.map((eventLine) => {
            const output = this.getOutput(eventLine, vueCode);

            return {
                name: eventLine.substring(eventLine.indexOf('@') + 1, eventLine.indexOf('"') - 1),
                outputType: output.type,
                outputPropertyName: output.propertyName
            } ;
        } ) : [];

        this.events = events;
    }

    getOutput(eventLine: string, vueCode: string): { type: possibleOutputType, propertyName: string } {
        const $emitRegex = /\$emit/gm;
        const $emitMatch = eventLine.match($emitRegex);
        const methodName = eventLine.substring(eventLine.indexOf('"') + 1, eventLine.lastIndexOf('"'));

        if($emitMatch) {
            return { type: 'event', propertyName: this.getEventEmittedName(eventLine, vueCode, true) } ;
        }

        if(this.isEmitTypeMethod(methodName, vueCode)) {
            return { type: 'event', propertyName: this.getEventEmittedName(methodName, vueCode) } ;
        }

        if(this.isDispatchTypeMethod(methodName, vueCode)) {
            return { type: 'dispatch', propertyName: this.getDispatchActionName(methodName, vueCode) } ;
        }

        return { type: 'event', propertyName: 'my-emitted-event' };
    }

    private getMethod(methodName: string, vueCode: string) {
        const scriptPart = vueCode.substring(
            vueCode.indexOf("<script") + 1,
            vueCode.lastIndexOf("</script>")
        );

        const regexFirstBracket = new RegExp(`(?=(${methodName}))(.*({)$)`,'gm');

        regexFirstBracket.test(scriptPart);

        return scriptPart.substring(
            regexFirstBracket.lastIndex - 1,
            findClosingMatchIndex(scriptPart, regexFirstBracket.lastIndex - 1)
        );
    }

    isEmitTypeMethod(methodName: string, vueCode: string) {
        const method = this.getMethod(methodName, vueCode);

        return method.includes('emit');
    }

    getEventEmittedName(methodName: string, vueCode: string, is$Emit = false): string  {
        const method = is$Emit ? methodName : this.getMethod(methodName, vueCode);

        const eventNameRegex = /emit\(((?:'|")([a-z0-9]*(-[a-z0-9])?)*(?:'|"))/gm;

        const methodMatch = method.match(eventNameRegex) ?? [''];

        return methodMatch.map(eventName => eventName.substring(eventName.indexOf("'") + 1, eventName.lastIndexOf("'"))).join(EVENT_SEPARATOR);
    }

    isDispatchTypeMethod(methodName: string, vueCode: string) {
        const method = this.getMethod(methodName, vueCode);

        return method.includes('await');
    }

    getDispatchActionName(methodName: string, vueCode: string): string  {
        return 'my-action-name';
    }

    buildItEvent(event: eventType) {
        const events = event.outputPropertyName.split(EVENT_SEPARATOR);

        return `it('should emit ${event.name} when ${this.name} emits ${event.name}', async () => {
            await ${this.name}Wrapper.vm.$emit('${event.name}')
            ${events.map(outputProperty => `expect(wrapper.emitted('${outputProperty}')).toHaveLength(1)`).join('\n')}
        })`;
    }

    buildItDispatch(event: eventType) {
        return `it('should dispatch my-action-name when ${this.name} emits ${event.name}', async () => {
            const store = createSearchStoreMocked()
            store.dispatch = jest.fn()

            wrapper = createWrapper({ store })

            ${this.name}Wrapper = find${this.name}Wrapper(wrapper)

            await ${this.name}Wrapper.vm.$emit('${event.name}')
            expect(store.dispatch).toHaveBeenCalledWith('my-action-name')
        })`;
    }

    private chooseIt(event: eventType) {
        const mapping = {
            'event': this.buildItEvent(event),
            'dispatch': this.buildItDispatch(event)
        };

        return mapping[event.outputType];
    }

    buildEventsIt(): string {
        if(this.events?.length === 0) {
            return '';
        }

        return `describe('events', () => {
            ${this.events?.map((event) => this.chooseIt(event) )}
        })`;
    }
}

export default EventFactory;

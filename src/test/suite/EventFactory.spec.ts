import EventFactory from "../../templates/EventFactory/EventFactory";
import * as fs from 'fs';

describe('EventFactory', () => {
    it('should the good constructor for Props in function of the vue component (setup normal or script setup)', () => {
        const eventLine = `@click="$emit('clicked-test')"`;
        const path = './dummy_data/components/Badges/NattoBadge.vue';
        const vueCode = fs.readFileSync(path, 'utf8');

        expect(new EventFactory(eventLine, 'MpBreadcrumb', vueCode).getOutputType(eventLine, vueCode)).toStrictEqual('event');
    });
    it('should the good constructor for Props in function of the vue component (setup normal or script setup)', () => {
        const eventLine = `@click="breadcrumbClick"`;
        const path = './dummy_data/components/Badges/NattoBadge.vue';
        const vueCode = fs.readFileSync(path, 'utf8');

        expect(new EventFactory(eventLine, 'MpBreadcrumb', vueCode).getOutputType(eventLine, vueCode)).toStrictEqual('dispatch');
    });
});


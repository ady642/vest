import PropsFactory from "../../templates/PropsFactory";
import * as fs from 'fs';

describe('PropsFactory', () => {
    describe('constructors', () => {
        it('should construct the props from a Vue 3 script setup component', () => {
            const path = './dummy_data/components/Badges/NattoBadge.vue';
            const vueCode = fs.readFileSync(path, 'utf8');

            expect(new PropsFactory(vueCode).props).toStrictEqual([
                { name: 'value', type: 'Number' }
            ]);
        });
    });

    it('should construct the props from a Vue 3 script setup component', () => {
        const path = './dummy_data/components/Breadcrumb/NattoBreadcrumb.vue';
        const vueCode = fs.readFileSync(path, 'utf8');

        expect(new PropsFactory(vueCode).props).toStrictEqual([
            { name: 'breadcrumbs', type: 'Array' },
            { name: 'disabledBreadcrumbs', type: 'boolean' },
            { name: 'ellipsed', type: 'boolean' },
        ]);
    });
});
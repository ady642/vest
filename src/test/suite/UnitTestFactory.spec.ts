import {addDoubleQuotes} from "../../utils";
import * as fs from 'fs';
import UnitTestFactory from "../../templates/UnitTestFactory";

const convertStringPropsToObject = (propsString: string): string => {
    return JSON.parse(propsString);
};

// create a regex that match component name in kebab-case and in PascalCase
const componentNameRegex = /<([a-zA-Z0-9-]+)/g;

const scriptSetupRegex = /(?=.*script)(?=.*setup).*/;

describe('regex', () => {
    it('should match mp-breadcrumb', () => {
        const match = '<mp-breadcrumb'.match(componentNameRegex);
        expect(match).toBeTruthy();
    });
    it('should match MpBreadcrumb', () => {
        const match = '<MpBreadcrumb'.match(componentNameRegex);
        expect(match).toBeTruthy();
    });
    it('should not match TEST TEST', () => {
        const match = 'TEST TEST'.match(componentNameRegex);
        expect(match).toBeFalsy();
    });

    it('should match <script and setup word in line', () => {
        const match = '<script lang="ts" setup>'.match(scriptSetupRegex);
        expect(match).toBeTruthy();
    });

    it('should match <script and setup word in line', () => {
        const match = '<script setup lang="ts">'.match(scriptSetupRegex);
        expect(match).toBeTruthy();
    });

    it('should not match <script and setup word in line', () => {
        const match = '<script lang="ts">'.match(scriptSetupRegex);
        expect(match).toBeFalsy();
    });
});

describe('convertStringPropsToObject', () => {
    it('should add double quotes on properties', () => {
        expect(addDoubleQuotes(`{ value: { type: Number, required: true } }`)).toEqual(
            `{ "value": { "type": "Number", "required": "true" } }`);
    });

    it('should return an object', () => {
        expect(convertStringPropsToObject(`{ "value": { "type": "Number", "required": "true" } }`))
            .toEqual({ value: { type: "Number", required: "true" } });
    });
});

describe('UnitTestFactory', () => {
    it('should the good constructor for Props in function of the vue component (setup normal or script setup)', () => {
        const path = './dummy_data/components/Badges/NattoBadge.vue';
        const vueCode = fs.readFileSync(path, 'utf8');

        expect(new UnitTestFactory(path, vueCode).propsFactory.props).toStrictEqual([
            { name: 'value', type: 'Number' }
        ]);
    });
});


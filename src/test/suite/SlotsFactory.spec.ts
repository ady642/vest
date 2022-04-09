import SlotsFactory from "../../templates/SlotsFactory/SlotsFactory";

describe('SlotsFactory', () => {
    it('should the good constructor for Props in function of the vue component (setup normal or script setup)', () => {
        const vueCode = `<template>
                        <MpInCard @click="breadcrumbClick">
                        <slot />
                        <slot name="item" />
                        </MpInCard>
                    </template>
                    
                    <script lang="ts" setup>
                    const emit = defineEmits(['click'])
                    
                    const breadcrumbClick = () => {
                        emit('click')
                    }

                    const handleOtherMethod = () => {
                        emit('test')
                    }
                    </script>`;

        expect(new SlotsFactory(vueCode)
            .buildSlotsIt())
            .toStrictEqual(`describe('rendering', () => {
    it('should render the default slot', () => {
       expect(wrapper.html()).toContain('I fill the default slot')
     })
     it('should render the item slot', () => {
        expect(wrapper.html()).toContain('I fill the item slot')
      })
})`);
    });
});


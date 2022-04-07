import EventFactory from "../../templates/EventFactory/EventFactory";

describe('EventFactory', () => {
    it('should the good constructor for Props in function of the vue component (setup normal or script setup)', () => {
        const vueCode = `<template>
                        <MpInCard @click="breadcrumbClick">
                        <slot />
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

        expect(new EventFactory(`<MpInCard @click="breadcrumbClick"> <slot /> </MpInCard>`, 'MpBreadcrumb', vueCode)
            .getOutputType('@click="breadcrumbClick"', vueCode))
            .toStrictEqual('event');
    });

    it('should return event if method has emit keyword', () => {
        const eventLine = `@click="breadcrumbClick"`;
        const vueCode = `<template>
                            <MpInCard @click="handleClick">
                            <slot />
                            </MpInCard>
                        </template>
                        
                        <script lang="ts" setup>
                        const emit = defineEmits(['click'])
                        
                        const handleClick = () => {
                            emit('click')
                        }

                        const handleOtherMethod = () => {
                            emit('test')
                        }
                        </script>`;

        expect(new EventFactory(eventLine, 'NattoCard', vueCode)
            .isEmitTypeMethod('handleClick', vueCode))
            .toStrictEqual(true);
    });

    it('should return dispatch if method has dispatch keyword', () => {
        const eventLine = `@click="breadcrumbClick"`;
        const vueCode = `<template>
                            <MpInCard @click="handleClick">
                            <slot />
                            </MpInCard>
                        </template>
                        
                        <script lang="ts" setup>
                        const emit = defineEmits(['click'])
                        
                        const handleClick = () => {
                            dispatch('click')
                        }

                        const handleOtherMethod = () => {
                            emit('test')
                        }
                        </script>`;

        expect(new EventFactory(eventLine, 'NattoCard', vueCode)
            .isDispatchTypeMethod('handleClick', vueCode))
            .toStrictEqual(true);
    });

    it('should return event if handle is $emit', () => {
        const eventLine = `@click="$emit('click')"`;

        expect(new EventFactory(eventLine, 'NattoCard', '')
            .getOutputType(eventLine, ''))
            .toStrictEqual('event');
    });
});


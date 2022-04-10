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
                        emit('on-click')
                    }

                    const handleOtherMethod = () => {
                        emit('test')
                    }
                    </script>`;

        expect(new EventFactory(`<MpInCard @click="breadcrumbClick"> <slot /> </MpInCard>`, 'MpBreadcrumb', vueCode)
            .getOutput('@click="breadcrumbClick"', vueCode))
            .toStrictEqual({ type: 'event', propertyName: 'on-click' });
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
        const eventLine = `@click="$emit('on-click')"`;
        const vueCode = `<template>
                        <MpInCard @click="$emit('on-click')">
                        <slot />
                        </MpInCard>
                    </template>
                    
                    <script lang="ts" setup>
                    const emit = defineEmits(['on-click'])
                    </script>`;

        expect(new EventFactory(eventLine, 'NattoCard', vueCode)
            .getOutput(eventLine, vueCode))
            .toStrictEqual({ type: 'event', propertyName: 'on-click' });
    });

    it('should return build tests', () => {
        const componentTag = `<MpInCard @click="handleClick">`;
        const vueCode = `<template>
                            <MpInCard @click="handleClick">
                            <slot />
                            </MpInCard>
                        </template>
                        
                        <script lang="ts" setup>
                        const emit = defineEmits(['click'])
                        
                        const handleClick = () => {
                            emit('on-click')
                        }

                        const handleOtherMethod = () => {
                            emit('test')
                        }
                        </script>`;

        expect(new EventFactory(componentTag, 'MpInCard', vueCode)
            .buildEventsIt())
            .toStrictEqual(`describe('events', () => {
            it('should emit click when MpInCard emits click', async () => {
            await MpInCardWrapper.vm.$emit('click')
            expect(wrapper.emitted('on-click')).toHaveLength(1)
        })
        })`);
    });

    it('should return build dispatch tests', () => {
        const componentTag = `<MpInCard @click="handleClick">`;
        const vueCode = `<template>
                            <MpInCard @click="handleClick">
                            <slot />
                            </MpInCard>
                        </template>
                        
                        <script lang="ts" setup>
                        const handleClick = async () => {
                            await downloadDocument()
                        }
                        </script>`;

        expect(new EventFactory(componentTag, 'MpInCard', vueCode)
            .buildEventsIt())
            .toStrictEqual(`describe('events', () => {
            it('should dispatch my-action-name when MpInCard emits click', async () => {
            const store = createSearchStoreMocked()
            store.dispatch = jest.fn()

            wrapper = createWrapper({ store })

            MpInCardWrapper = findMpInCardWrapper(wrapper)

            await MpInCardWrapper.vm.$emit('click')
            expect(store.dispatch).toHaveBeenCalledWith('my-action-name')
        })
        })`);
    });
});


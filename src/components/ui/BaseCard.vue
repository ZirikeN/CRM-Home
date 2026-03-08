<template>
    <Card>
        <template #title>
            <div class="text-center text-2xl font-bold">{{ title }}</div>
        </template>

        <template #content>
            <slot />
        </template>

        <template v-if="$slots.footer" #footer>
            <slot name="footer" />
        </template>
    </Card>
</template>

<script setup>
import Card from 'primevue/card'

defineProps({
    title: String,
})
</script>

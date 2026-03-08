<template>
    <Button
        :label="label"
        :icon="icon"
        :class="[
            `p-button-${variant}`,
            {
                'p-button-outlined': outlined,
                'p-button-text': text,
                'p-button-rounded': rounded,
                'w-full': fullWidth,
            },
        ]"
        :loading="loading"
        :disabled="disabled"
        :type="type"
        v-bind="$attrs"
    />
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
    label: String,
    icon: String,
    variant: {
        type: String,
        default: 'primary',
        validator: (value) =>
            ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'help'].includes(
                value
            ),
    },
    outlined: Boolean,
    text: Boolean,
    rounded: Boolean,
    fullWidth: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
        type: String,
        default: 'button',
    },
})
</script>

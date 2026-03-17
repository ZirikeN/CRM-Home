<template>
    <div class="field">
        <span class="flex flex-col gap-1">
            <label :for="id">{{ label }}</label>
            <Password
                :id="id"
                :value="modelValue"
                :class="{ 'p-invalid': error }"
                class="w-full"
                :toggleMask="toggleMask"
                :feedback="feedback"
                :promptLabel="promptLabel"
                :weakLabel="weakLabel"
                :mediumLabel="mediumLabel"
                :strongLabel="strongLabel"
                inputClass="w-full"
                v-bind="$attrs"
                @input="$emit('update:modelValue', $event)"
                @blur="$emit('blur')"
            />
        </span>
        <small v-if="error" class="p-error">{{ error }}</small>
    </div>
</template>

<script setup>
import Password from 'primevue/password'

defineProps({
    id: String,
    label: String,
    modelValue: String,
    error: String,
    toggleMask: {
        type: Boolean,
        default: true,
    },
    feedback: {
        type: Boolean,
        default: false,
    },
    promptLabel: {
        type: String,
        default: 'Введите пароль',
    },
    weakLabel: {
        type: String,
        default: 'Слабый',
    },
    mediumLabel: {
        type: String,
        default: 'Средний',
    },
    strongLabel: {
        type: String,
        default: 'Надёжный',
    },
})

defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
:deep(.p-password-input) {
    width: 100%;
}

:deep(.p-password) {
    display: flex;
    width: 100%;
}
</style>

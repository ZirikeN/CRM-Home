<template>
    <div class="field">
        <div class="field-checkbox">
            <Checkbox
                :id="id"
                :binary="true"
                :modelValue="modelValue"
                :class="{ 'p-invalid': error }"
                v-bind="$attrs"
                @update:modelValue="$emit('update:modelValue', $event)"
            />
            <label :for="id" class="ml-2">{{ label }}</label>
        </div>
        <small v-if="error" class="p-error">{{ error }}</small>
    </div>
</template>

<script setup>
import Checkbox from 'primevue/checkbox'

defineProps({
    id: String,
    label: String,
    modelValue: Boolean,
    error: String,
})

defineEmits(['update:modelValue'])
</script>

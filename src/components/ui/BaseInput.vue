<template>
    <div class="field">
        <span v-if="label" class="p-float-label" :class="{ 'p-input-icon-right': icon }">
            <i v-if="icon" :class="icon" />
            <InputText
                :id="id"
                :type="type"
                :value="modelValue"
                :class="{ 'p-invalid': error }"
                class="w-full"
                v-bind="$attrs"
                @input="$emit('update:modelValue', $event.target.value)"
                @blur="$emit('blur')"
            />
            <label :for="id">{{ label }}</label>
        </span>
        <InputText
            v-else
            :id="id"
            :type="type"
            :value="modelValue"
            :class="{ 'p-invalid': error }"
            class="w-full"
            v-bind="$attrs"
            @input="$emit('update:modelValue', $event.target.value)"
            @blur="$emit('blur')"
        />
        <small v-if="error" class="p-error">{{ error }}</small>
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'

defineProps({
    id: String,
    label: String,
    type: {
        type: String,
        default: 'text',
    },
    modelValue: [String, Number],
    error: String,
    icon: String,
})

defineEmits(['update:modelValue', 'blur'])
</script>

<template>
    <div class="">
        <Button :icon="isAsideVisible ? 'pi pi-times' : 'pi pi-bars'" @click="$emit('toggle-aside')"></Button>
    </div>
</template>

<script setup>
import { inject } from 'vue';

import Button from 'primevue/button';

const isAsideVisible = inject('isAsideVisible')

defineEmits(['toggle-aside'])
</script>
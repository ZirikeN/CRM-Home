<script setup>
import { onMounted } from 'vue'
import Toast from 'primevue/toast'
import { useAuth } from '@/composables/useAuth'

const { initAuth } = useAuth()

onMounted(() => {
    initAuth()
})
</script>

<template>
    <div>
        <Toast position="top-right" />
        <router-view></router-view>
    </div>
</template>

<style scoped></style>

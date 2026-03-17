<template>
    <div class="auth-page">
        <AuthRegister />
    </div>
</template>

<script setup>
import AuthRegister from '@/components/widgets/AuthRegister.vue'
</script>

<style scoped>
.auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<template>
    <div class="auth-page">
        <AuthLogin />
    </div>
</template>

<script setup>
import AuthLogin from '@/components/widgets/AuthLogin.vue'
</script>

<style scoped>
.auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

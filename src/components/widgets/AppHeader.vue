<template>
    <header class="header__wrapper">
        <ButtonAside @toggle-aside="toggleAside"></ButtonAside>
        <h1>AppHeader</h1>
    </header>
</template>

<script setup>
import { ref, inject } from 'vue';
import ButtonAside from '../ui/ButtonAside.vue';

const isAsideVisible = inject('isAsideVisible')

const toggleAside = () => {
    isAsideVisible.value = !isAsideVisible.value
}
</script>

<style scoped>
.header__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #f5f5f5;
}
</style>
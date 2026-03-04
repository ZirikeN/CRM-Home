<template>
    <div class="wrapper" :class="!isAsideVisible ? 'aside-hidden' : ''">
        <AppAside></AppAside>

        <div class="main__wrapper">
            <AppHeader></AppHeader>
    
            <div class="main__container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'

import AppAside from '../widgets/AppAside.vue'
import AppHeader from '../widgets/AppHeader.vue'

const isAsideVisible = ref(true)

provide('isAsideVisible', isAsideVisible)
</script>

<style scoped>
.wrapper {
    display: grid;
    grid-template-columns: 280px 1fr;
    min-height: 100vh;
    transition: grid-template-columns 0.3s ease;
}

.wrapper.aside-hidden {
    grid-template-columns: 0 1fr;
}

.main__wrapper {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
}
</style>

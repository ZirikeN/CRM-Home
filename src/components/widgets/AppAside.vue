<template>
    <div class="aside__wrapper">
        <transition name="slide">
            <aside v-show="isAsideVisible" class="aside__container">
                <NavAside :navLink="navLinks"></NavAside>
            </aside>
        </transition>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue'

import NavAside from '../ui/aside/NavAside.vue';

const isAsideVisible = inject('isAsideVisible')
const navLinks = ref({
    home: {
        title: 'Главная',
        link: '/'
    },
    about: {
        title: 'О нас',
        link: '/about'
    },
    contacts: {
        title: 'Контакты',
        link: '/contacts'
    }
})
</script>

<style scoped>
.aside__wrapper {
    display: flex;
    min-height: 100vh;
}

.aside__container {
    width: 280px;
    background-color: #f5f5f5;
    padding: 20px;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}
</style>

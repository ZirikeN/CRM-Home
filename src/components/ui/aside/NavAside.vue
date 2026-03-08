<template>
    <nav>
        <ul>
            <li v-for="item in navLink" :key="item">
                <router-link :to="item.link">{{ item.title }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps(['navLink'])
</script>
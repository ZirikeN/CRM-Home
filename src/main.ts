import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import './assets/main.css'

import App from './App.vue'
import router from './router'
import { semantic } from '@primeuix/themes/aura/base';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false,
        },
    },

    semantic: {
        primary: {
            500: '{lime.500}'
        }
    }
})

app.mount('#app')

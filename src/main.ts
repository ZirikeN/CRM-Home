import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura';
import './assets/main.css'

import App from './App.vue'
import router from './router'
import { semantic } from '@primeuix/themes/aura/base';

// Импорт всех необходимых компонентов PrimeVue
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Toast from 'primevue/toast'

const app = createApp(App)

app.use(ToastService)
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

// Глобальная регистрация компонентов
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Toast', Toast)

app.mount('#app')

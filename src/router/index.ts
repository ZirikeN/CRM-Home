import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'
import { requireAuth, requireGuest } from '@/router/authGuard'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            beforeEnter: requireAuth, // Защищаем все маршруты внутри AppLayout
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/pages/view/HomeView.vue'),
                },
                // {
                //   path: 'profile',
                //   name: 'profile',
                //   component: () => import('@/pages/ProfilePage.vue'),
                // },
                // {
                //   path: 'settings',
                //   name: 'settings',
                //   component: () => import('@/pages/SettingsPage.vue'),
                // },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/LoginPage.vue'),
            beforeEnter: requireGuest, // Только для неавторизованных
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/RegisterPage.vue'),
            beforeEnter: requireGuest, // Только для неавторизованных
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
})

router.onError((error) => {
    console.error('Router error:', error)
})

export default router

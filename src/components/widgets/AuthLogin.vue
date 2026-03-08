<template>
    <div class="flex justify-content-center align-items-center min-h-screen">
        <BaseCard :title="'Вход в систему'" style="width: 400px">
            <form @submit.prevent="onSubmit">
                <BaseInput
                    id="email"
                    label="Email"
                    type="email"
                    v-model="email"
                    :error="errors.email"
                    icon="pi pi-envelope"
                    @blur="handleBlur('email')"
                />

                <BasePassword
                    id="password"
                    label="Пароль"
                    v-model="password"
                    :error="errors.password"
                    @blur="handleBlur('password')"
                />

                <div class="flex justify-content-between align-items-center mb-3">
                    <BaseCheckbox id="remember" label="Запомнить меня" v-model="remember" />

                    <BaseButton
                        label="Забыли пароль?"
                        variant="secondary"
                        text
                        size="small"
                        @click="forgotPassword"
                    />
                </div>

                <BaseButton
                    type="submit"
                    label="Войти"
                    variant="primary"
                    fullWidth
                    :loading="isSubmitting"
                />
            </form>

            <template #footer>
                <div class="text-center">
                    <span class="text-color-secondary">Нет аккаунта? </span>
                    <BaseButton
                        label="Зарегистрироваться"
                        variant="secondary"
                        text
                        @click="navigateToRegister"
                    />
                </div>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BasePassword from '@/components/ui/BasePassword.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const toast = useToast()

const validationSchema = yup.object({
    email: yup.string().required('Email обязателен').email('Введите корректный email'),
    password: yup
        .string()
        .required('Пароль обязателен')
        .min(6, 'Пароль должен содержать минимум 6 символов'),
})

const { handleSubmit, isSubmitting, errors, validateField } = useForm({
    validationSchema,
})

const { value: email } = useField('email')
const { value: password } = useField('password')
const remember = ref(false)

const handleBlur = (field) => {
    validateField(field)
}

const onSubmit = handleSubmit(async (values) => {
    try {
        console.log('Login data:', values)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Вход выполнен',
            life: 3000,
        })

        setTimeout(() => {
            router.push('/')
        }, 1000)
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Неверный email или пароль',
            life: 3000,
        })
    }
})

const navigateToRegister = () => {
    router.push('/register')
}

const forgotPassword = () => {
    toast.add({
        severity: 'info',
        summary: 'Восстановление пароля',
        detail: 'Функция в разработке',
        life: 3000,
    })
}
</script>

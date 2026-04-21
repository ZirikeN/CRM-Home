<template>
    <div class="flex justify-center flex-column items-center min-h-screen">
        <BaseCard :title="'Регистрация'" style="width: 700px">
            <form @submit.prevent="onSubmit" class="flex flex-col gap-2">
                <BaseInput
                    id="name"
                    label="Имя"
                    v-model="name"
                    :error="errors.name"
                    @blur="handleBlur('name')"
                />

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
                    :feedback="true"
                    :promptLabel="'Придумайте пароль'"
                    :weakLabel="'Слабый'"
                    :mediumLabel="'Средний'"
                    :strongLabel="'Надёжный'"
                    @blur="handleBlur('password')"
                />

                <BasePassword
                    id="confirmPassword"
                    label="Подтверждение пароля"
                    v-model="confirmPassword"
                    :error="errors.confirmPassword"
                    :toggleMask="true"
                    :feedback="false"
                    @blur="handleBlur('confirmPassword')"
                />

                <BaseCheckbox
                    id="terms"
                    label="Я принимаю условия использования"
                    v-model="terms"
                    :error="errors.terms"
                />

                <BaseButton
                    class="mt-3"
                    type="submit"
                    label="Зарегистрироваться"
                    variant="primary"
                    fullWidth
                    :loading="isSubmitting || loading"
                />
            </form>

            <template #footer>
                <div class="text-center">
                    <span class="text-color-secondary">Уже есть аккаунт? </span>
                    <BaseButton label="Войти" variant="secondary" text @click="navigateToLogin" />
                </div>
            </template>
        </BaseCard>
    </div>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '@/composables/useAuth'

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BasePassword from '@/components/ui/BasePassword.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const toast = useToast()
const { signUp, loading } = useAuth()

// Упростим валидацию для начала
const validationSchema = yup.object({
    name: yup.string().required('Имя обязательно'),
    email: yup.string().required('Email обязателен').email('Введите корректный email'),
    password: yup
        .string()
        .required('Пароль обязателен')
        .min(6, 'Минимум 6 символов')
        .matches(/[a-z]/, 'Должна быть хотя бы одна строчная буква')
        .matches(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
        .matches(/[0-9]/, 'Должна быть хотя бы одна цифра'),
    confirmPassword: yup
        .string()
        .required('Подтверждение пароля обязательно')
        .oneOf([yup.ref('password')], 'Пароли не совпадают'),
    terms: yup.boolean().oneOf([true], 'Необходимо принять условия'),
})

const { handleSubmit, errors, validateField } = useForm({
    validationSchema,
})

// Явно определяем поля и получаем их значения
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')
const { value: terms } = useField('terms')

const handleBlur = (field) => {
    validateField(field)
}

const onSubmit = handleSubmit(async (values) => {
    try {
        console.log('Form values:', values) // Проверяем, что приходит

        // Явно передаем примитивные значения
        await signUp({
            email: String(values.email).trim(),
            password: String(values.password),
            name: String(values.name).trim(),
        })

        toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Регистрация завершена. Проверьте email для подтверждения.',
            life: 5000,
        })

        setTimeout(() => {
            router.push('/login')
        }, 3000)
    } catch (error) {
        console.error('Registration error:', error)
    }
})

const navigateToLogin = () => {
    router.push('/login')
}
</script>

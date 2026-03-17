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
                    :loading="isSubmitting"
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

import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BasePassword from '@/components/ui/BasePassword.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const toast = useToast()

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Имя обязательно')
        .min(2, 'Имя должно содержать минимум 2 символа')
        .max(50, 'Имя слишком длинное'),
    email: yup.string().required('Email обязателен').email('Введите корректный email'),
    password: yup
        .string()
        .required('Пароль обязателен')
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Пароль должен содержать заглавные, строчные буквы и цифры'
        ),
    confirmPassword: yup
        .string()
        .required('Подтверждение пароля обязательно')
        .oneOf([yup.ref('password')], 'Пароли не совпадают'),
    terms: yup.boolean().oneOf([true], 'Необходимо принять условия'),
})

const { handleSubmit, isSubmitting, errors, validateField } = useForm({
    validationSchema,
})

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
        console.log('Registration data:', values)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast.add({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Регистрация завершена',
            life: 3000,
        })

        setTimeout(() => {
            router.push('/login')
        }, 2000)
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось зарегистрироваться',
            life: 3000,
        })
    }
})

const navigateToLogin = () => {
    router.push('/login')
}
</script>

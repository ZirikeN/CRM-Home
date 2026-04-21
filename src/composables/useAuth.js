import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

export function useAuth() {
    const router = useRouter()
    const toast = useToast()

    const user = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // Проверка авторизации пользователя
    const isAuthenticated = computed(() => !!user.value)

    // Инициализация сессии
    const initAuth = async () => {
        try {
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession()

            if (sessionError) throw sessionError

            user.value = session?.user ?? null

            // Подписка на изменения аутентификации
            supabase.auth.onAuthStateChange((_event, session) => {
                user.value = session?.user ?? null
            })
        } catch (err) {
            console.error('Error initializing auth:', err)
            error.value = err.message
        }
    }

    // Регистрация пользователя
    const signUp = async ({ email, password, name }) => {
        try {
            loading.value = true
            error.value = null

            // Убеждаемся, что password это строка
            if (typeof password !== 'string') {
                console.error('Password is not a string:', password)
                password = String(password)
            }

            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                    },
                    emailRedirectTo: `${window.location.origin}/login`,
                },
            })

            console.log('Supabase signUp response:', { data, error: signUpError })

            if (signUpError) {
                console.error('SignUp error details:', signUpError)
                throw signUpError
            }

            if (!data.user) {
                console.error('No user returned from signUp')
                throw new Error('Registration failed - no user returned')
            }

            console.log('User created successfully:', data.user)

            // Проверяем, нужно ли подтверждение email
            if (data.user.identities?.length === 0) {
                console.log('User might need email confirmation')
                toast.add({
                    severity: 'info',
                    summary: 'Подтверждение email',
                    detail: 'Пользователь с таким email уже существует, но требует подтверждения',
                    life: 5000,
                })
            } else {
                toast.add({
                    severity: 'success',
                    summary: 'Регистрация',
                    detail: 'Проверьте вашу почту для подтверждения аккаунта',
                    life: 5000,
                })
            }

            return data
        } catch (err) {
            console.error('SignUp error full details:', err)
            error.value = err.message

            // Более детальное сообщение об ошибке
            let errorMessage = err.message
            if (err.message.includes('duplicate key') || err.message.includes('already exists')) {
                errorMessage = 'Пользователь с таким email уже существует'
            } else if (err.message.includes('Invalid email')) {
                errorMessage = 'Некорректный email адрес'
            } else if (err.message.includes('password')) {
                errorMessage = 'Пароль не соответствует требованиям безопасности'
            }

            toast.add({
                severity: 'error',
                summary: 'Ошибка регистрации',
                detail: errorMessage,
                life: 5000,
            })
            throw err
        } finally {
            loading.value = false
        }
    }

    // Вход пользователя
    const signIn = async ({ email, password }) => {
        try {
            console.log('Starting signIn process with:', { email })
            console.log(
                'Password type:',
                typeof password,
                'is string:',
                typeof password === 'string'
            )

            // Убеждаемся, что пароль - строка
            if (typeof password !== 'string') {
                console.warn('Password is not a string, converting...')
                password = String(password)
            }

            // Дополнительная проверка
            if (!password || password.trim() === '') {
                throw new Error('Пароль не может быть пустым')
            }

            loading.value = true
            error.value = null

            // Создаем объект для отправки
            const signInData = {
                email: String(email).trim(),
                password: password, // Теперь точно строка
            }

            console.log('Sending to Supabase:', {
                email: signInData.email,
                passwordLength: signInData.password.length,
            })

            const { data, error: signInError } = await supabase.auth.signInWithPassword(signInData)

            console.log('Supabase signIn response:', { data, error: signInError })

            if (signInError) {
                console.error('SignIn error details:', signInError)
                throw signInError
            }

            toast.add({
                severity: 'success',
                summary: 'Вход выполнен',
                detail: `Добро пожаловать, ${data.user.user_metadata?.name || data.user.email}!`,
                life: 3000,
            })

            router.push('/')

            return data
        } catch (err) {
            console.error('SignIn error full details:', err)
            error.value = err.message

            // Понятное сообщение об ошибке
            let errorMessage = 'Ошибка входа'
            if (err.message.includes('Invalid login credentials')) {
                errorMessage = 'Неверный email или пароль'
            } else if (err.message.includes('Email not confirmed')) {
                errorMessage = 'Email не подтвержден. Проверьте почту'
            } else if (err.message.includes('parse request body')) {
                errorMessage = 'Ошибка формата данных. Пожалуйста, попробуйте снова'
            }

            toast.add({
                severity: 'error',
                summary: 'Ошибка входа',
                detail: errorMessage,
                life: 3000,
            })
            throw err
        } finally {
            loading.value = false
        }
    }

    // Выход пользователя
    const signOut = async () => {
        try {
            loading.value = true
            error.value = null

            const { error: signOutError } = await supabase.auth.signOut()

            if (signOutError) throw signOutError

            toast.add({
                severity: 'info',
                summary: 'Выход',
                detail: 'Вы успешно вышли из системы',
                life: 3000,
            })

            router.push('/login')
        } catch (err) {
            error.value = err.message
            toast.add({
                severity: 'error',
                summary: 'Ошибка выхода',
                detail: err.message,
                life: 3000,
            })
        } finally {
            loading.value = false
        }
    }

    // Сброс пароля
    const resetPassword = async (email) => {
        try {
            loading.value = true
            error.value = null

            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (resetError) throw resetError

            toast.add({
                severity: 'success',
                summary: 'Сброс пароля',
                detail: 'Инструкции отправлены на вашу почту',
                life: 5000,
            })
        } catch (err) {
            error.value = err.message
            toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: err.message,
                life: 3000,
            })
        } finally {
            loading.value = false
        }
    }

    // Обновление пароля
    const updatePassword = async (newPassword) => {
        try {
            loading.value = true
            error.value = null

            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            })

            if (updateError) throw updateError

            toast.add({
                severity: 'success',
                summary: 'Пароль обновлен',
                detail: 'Ваш пароль успешно изменен',
                life: 3000,
            })

            router.push('/login')
        } catch (err) {
            error.value = err.message
            toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: err.message,
                life: 3000,
            })
        } finally {
            loading.value = false
        }
    }

    // Получение текущего пользователя
    const getCurrentUser = async () => {
        try {
            const {
                data: { user: currentUser },
                error: userError,
            } = await supabase.auth.getUser()

            if (userError) throw userError

            user.value = currentUser
            return currentUser
        } catch (err) {
            console.error('Error getting current user:', err)
            error.value = err.message
            return null
        }
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        initAuth,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        getCurrentUser,
    }
}

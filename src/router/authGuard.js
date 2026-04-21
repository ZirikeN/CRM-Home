import { supabase } from '@/lib/supabase'

export async function requireAuth(to, from) {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        return { path: '/login', query: { redirect: to.fullPath } }
    }
    return true
}

export async function requireGuest(to, from) {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        return '/'
    }
    return true
}
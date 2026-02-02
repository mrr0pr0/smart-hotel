import type { User, LoginCredentials, RegisterData, AuthResponse } from '~/types/auth'

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: LoginCredentials) => {
    try {
      const { data, error } = await useFetch<{ success: boolean; user: User }>('/api/auth/login', {
        method: 'POST',
        body: credentials
      })

      if (error.value) {
        throw new Error(error.value.message || 'Login failed')
      }

      if (data.value?.success) {
        user.value = data.value.user
        return { success: true, user: data.value.user }
      }

      throw new Error('Login failed')
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const { data, error } = await useFetch<{ success: boolean; user: User }>('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      if (error.value) {
        throw new Error(error.value.message || 'Registration failed')
      }

      if (data.value?.success) {
        user.value = data.value.user
        return { success: true, user: data.value.user }
      }

      throw new Error('Registration failed')
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await useFetch('/api/auth/logout', {
        method: 'POST'
      })

      user.value = null
      navigateTo('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout
  }
}
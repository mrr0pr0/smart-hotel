import type { Order, MenuItem, CreateOrderData } from '~/types/order'

export const useOrders = () => {
  const orders = ref<Order[]>([])
  const menuItems = ref<MenuItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMenu = async (category?: string) => {
    loading.value = true
    error.value = null

    try {
      const query = category ? `?category=${category}` : ''
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: MenuItem[] }>(`/api/restaurant/menu${query}`)

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch menu')
      }

      if (data.value?.success) {
        menuItems.value = data.value.data
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createOrder = async (orderData: CreateOrderData) => {
    loading.value = true
    error.value = null

    try {
      const endpoint = orderData.type === 'room-service' 
        ? '/api/room-service/create' 
        : '/api/restaurant/orders'

      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Order }>(endpoint, {
        method: 'POST',
        body: orderData
      })

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to create order')
      }

      if (data.value?.success) {
        return { success: true, data: data.value.data }
      }

      return { success: false, error: 'Failed to create order' }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchOrders = async (type: 'restaurant' | 'room-service', status?: string) => {
    loading.value = true
    error.value = null

    try {
      const endpoint = type === 'room-service' ? '/api/room-service/orders' : '/api/restaurant/orders'
      const query = status ? `?status=${status}` : ''
      
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Order[] }>(`${endpoint}${query}`)

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch orders')
      }

      if (data.value?.success) {
        orders.value = data.value.data
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    menuItems,
    loading,
    error,
    fetchMenu,
    createOrder,
    fetchOrders
  }
}
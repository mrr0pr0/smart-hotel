import { defineStore } from 'pinia'
import type { Order } from '~/types/order'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    selectedOrder: null as Order | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    setOrders(orders: Order[]) {
      this.orders = orders
    },

    setSelectedOrder(order: Order | null) {
      this.selectedOrder = order
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    addOrder(order: Order) {
      this.orders.push(order)
    }
  },

  getters: {
    pendingOrders: (state) => state.orders.filter(o => o.status === 'pending'),
    preparingOrders: (state) => state.orders.filter(o => o.status === 'preparing'),
    readyOrders: (state) => state.orders.filter(o => o.status === 'ready'),
    deliveredOrders: (state) => state.orders.filter(o => o.status === 'delivered'),
    restaurantOrders: (state) => state.orders.filter(o => o.type === 'restaurant'),
    roomServiceOrders: (state) => state.orders.filter(o => o.type === 'room-service')
  }
})
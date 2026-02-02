<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Restaurantbestillinger</h1>
      <p class="text-gray-400">Administrer og spor alle restaurantbestillinger</p>
    </div>

    <!-- Status Filters -->
    <div class="card mb-6">
      <div class="flex gap-3 overflow-x-auto pb-2">
        <button
          v-for="status in statuses"
          :key="status"
          :class="activeStatus === status ? 'btn-primary' : 'btn-secondary'"
          @click="activeStatus = status"
        >
          {{ status }}
        </button>
      </div>
    </div>

    <!-- Orders Grid -->
    <div v-if="filteredOrders.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="order in filteredOrders" :key="order.id" class="card">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-white">Bestilling #{{ order.id }}</h3>
            <p class="text-sm text-gray-400">Bord {{ order.table }}</p>
            <p class="text-xs text-gray-500">{{ order.time }}</p>
          </div>
          <span :class="getStatusBadge(order.status)">
            {{ order.status }}
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <div v-for="item in order.items" :key="item.name" class="flex justify-between text-sm">
            <span class="text-gray-400">{{ item.name }} × {{ item.qty }}</span>
            <span class="text-white">${{ item.price }}</span>
          </div>
        </div>

        <div class="border-t border-[#2a2a2a] pt-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-lg font-bold text-white">${{ order.total }}</span>
            <span class="text-sm text-gray-400">{{ order.customer }}</span>
          </div>
          <button class="btn-primary w-full text-sm" @click="updateStatus(order.id)">
            Oppdater Status
          </button>
        </div>
      </div>
    </div>

    <div v-else class="card text-center py-12">Ingen bestillinger funnet.</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})


const activeStatus = ref('All')
const statuses = ['All', 'Pending', 'Preparing', 'Ready', 'Served']

import type { Order } from '~/types/order'

// Try fetching restaurant orders from API (if available). If endpoint missing, default to empty list.
const { data: ordersResp, pending: ordersPending, error: ordersError } = await useAsyncData<{ success: boolean; data: Order[] }>('restaurantOrders', () =>
  $fetch('/api/restaurant/orders').catch(() => ({ success: false, data: [] }))
)

const orders = computed<Order[]>(() => (ordersResp?.value && Array.isArray(ordersResp.value.data)) ? ordersResp.value.data : [])

const filteredOrders = computed(() => {
  if (activeStatus.value === 'All') return orders.value
  return orders.value.filter(order => order.status === activeStatus.value)
})

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    'Pending': 'badge-warning',
    'Preparing': 'badge-info',
    'Ready': 'badge-success',
    'Served': 'badge-success'
  }
  return badges[status] || 'badge-info'
}

const updateStatus = (orderId: string) => {
  alert(`Update status for order ${orderId} (Connect to Neon DB)`)
}
</script>
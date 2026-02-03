<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Romservice</h1>
      <p class="text-gray-400">Administrer romservicebestillinger</p>
    </div>

    <!-- Active Orders -->
    <div v-if="orders.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="order in orders" :key="order.id" class="card">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-white">Rom {{ order.room }}</h3>
            <p class="text-sm text-gray-400">Bestilling #{{ order.id }}</p>
          </div>
          <span :class="order.status === 'pending' ? 'badge-warning' : order.status === 'preparing' ? 'badge-info' : 'badge-success'">
            {{ order.status }}
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <div v-for="item in order.items" :key="item" class="flex justify-between text-sm">
            <span class="text-gray-400">{{ item.name }} × {{ item.qty }}</span>
            <span class="text-white">${{ item.price }}</span>
          </div>
        </div>

        <div class="border-t border-[#2a2a2a] pt-4 flex items-center justify-between">
          <span class="text-lg font-bold text-white">${{ order.total }}</span>
          <button @click="updateOrderStatus(order.id, order.status)" class="btn-primary text-sm px-3 py-1">Oppdater Status</button>
        </div>
      </div>
    </div>

    <div v-else class="card text-center py-12">Ingen romservicebestillinger funnet — databasen er tom.</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import type { Order } from '~/types/order'

// Fetch room-service orders from backend
const { data: rsResp, pending: rsPending, error: rsError } = await useAsyncData<{ success: boolean; data: Order[] }>('roomServiceOrders', () =>
  $fetch('/api/room-service/orders').catch(() => ({ success: false, data: [] }))
)

const orders = computed<Order[]>(() => (rsResp?.value && Array.isArray(rsResp.value.data)) ? rsResp.value.data : [])

const updateOrderStatus = async (orderId: string, currentStatus: string) => {
  const statusMap: Record<string, string> = {
    'pending': 'preparing',
    'preparing': 'completed',
    'completed': 'pending'
  }
  const newStatus = statusMap[currentStatus] || 'pending'
  
  try {
    await $fetch(`/api/room-service/${orderId}`, {
      method: 'PUT',
      body: { status: newStatus }
    })
    // Refresh the orders
    await rsResp.value && (rsResp.value = { ...(rsResp.value as any), data: [] })
  } catch (e) {
    alert('Feil ved oppdatering av status')
  }
}
</script>
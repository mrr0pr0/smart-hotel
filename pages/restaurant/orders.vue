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
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const activeStatus = ref('All')
const statuses = ['All', 'Pending', 'Preparing', 'Ready', 'Served']

const orders = ref([
  {
    id: '301',
    table: '5',
    customer: 'John Doe',
    status: 'Pending',
    time: '10 min ago',
    items: [
      { name: 'Burger', qty: 2, price: 25.98 },
      { name: 'Fries', qty: 2, price: 7.98 }
    ],
    total: 33.96
  },
  {
    id: '302',
    table: '12',
    customer: 'Jane Smith',
    status: 'Preparing',
    time: '15 min ago',
    items: [
      { name: 'Pizza', qty: 1, price: 18.99 },
      { name: 'Salad', qty: 1, price: 9.99 }
    ],
    total: 28.98
  },
  {
    id: '303',
    table: '8',
    customer: 'Mike Johnson',
    status: 'Ready',
    time: '5 min ago',
    items: [
      { name: 'Steak', qty: 1, price: 34.99 }
    ],
    total: 34.99
  },
  {
    id: '304',
    table: '3',
    customer: 'Sarah Williams',
    status: 'Served',
    time: '30 min ago',
    items: [
      { name: 'Pasta', qty: 2, price: 27.98 },
      { name: 'Wine', qty: 1, price: 15.99 }
    ],
    total: 43.97
  },
])

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
<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Staff - Order Management</h1>
      <p class="text-gray-400">Manage assigned orders and tasks</p>
    </div>

    <!-- Status Tabs -->
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

    <!-- Orders List -->
    <div class="space-y-4">
      <div v-for="order in filteredOrders" :key="order.id" class="card">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-white">Order #{{ order.id }}</h3>
            <p class="text-sm text-gray-400">{{ order.type }} • {{ order.location }}</p>
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

        <div class="border-t border-[#2a2a2a] pt-4 flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400">Assigned to</p>
            <p class="text-white font-medium">{{ order.assignedTo }}</p>
          </div>
          <div class="flex gap-2">
            <button class="btn-primary text-sm px-3 py-1" @click="updateOrderStatus(order.id)">
              Mark as {{ getNextStatus(order.status) }}
            </button>
            <button class="btn-ghost text-sm px-3 py-1">Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'staff'
})

const activeStatus = ref('All')
const statuses = ['All', 'Pending', 'In Progress', 'Completed']

const orders = ref([
  {
    id: '701',
    type: 'Room Service',
    location: 'Room 301',
    status: 'Pending',
    time: '5 min ago',
    assignedTo: 'You',
    items: [
      { name: 'Breakfast Set', qty: 1, price: 24.99 },
      { name: 'Orange Juice', qty: 2, price: 9.98 }
    ]
  },
  {
    id: '702',
    type: 'Restaurant',
    location: 'Table 12',
    status: 'In Progress',
    time: '15 min ago',
    assignedTo: 'You',
    items: [
      { name: 'Steak', qty: 2, price: 69.98 },
      { name: 'Wine', qty: 1, price: 35.99 }
    ]
  },
  {
    id: '703',
    type: 'Room Service',
    location: 'Room 205',
    status: 'Completed',
    time: '1 hour ago',
    assignedTo: 'You',
    items: [
      { name: 'Club Sandwich', qty: 1, price: 15.99 }
    ]
  }
])

const filteredOrders = computed(() => {
  if (activeStatus.value === 'All') return orders.value
  return orders.value.filter(order => order.status === activeStatus.value)
})

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    'Pending': 'badge-warning',
    'In Progress': 'badge-info',
    'Completed': 'badge-success'
  }
  return badges[status] || 'badge-info'
}

const getNextStatus = (currentStatus: string) => {
  const statusFlow: Record<string, string> = {
    'Pending': 'In Progress',
    'In Progress': 'Completed',
    'Completed': 'Completed'
  }
  return statusFlow[currentStatus] || 'Completed'
}

const updateOrderStatus = (orderId: string) => {
  alert(`Update status for order ${orderId} (Connect to Neon DB)`)
}
</script>
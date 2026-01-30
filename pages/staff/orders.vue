<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Personal - Ordrestyring</h1>
      <p class="text-gray-400">Administrer tildelte ordrer og oppgaver</p>
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
            <p class="text-sm text-gray-400">Tildelt til</p>
            <p class="text-white font-medium">{{ order.assignedTo }}</p>
          </div>
          <div class="flex gap-2">
            <button class="btn-primary text-sm px-3 py-1" @click="updateOrderStatus(order.id)">
              Merk som {{ getNextStatus(order.status) }}
            </button>
            <button class="btn-ghost text-sm px-3 py-1">Detaljer</button>
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

const activeStatus = ref('Alle')
const statuses = ['Alle', 'Venter', 'Pågår', 'Ferdig']

const orders = ref([
  {
    id: '701',
    type: 'Romservice',
    location: 'Rom 301',
    status: 'Venter',
    time: '5 min siden',
    assignedTo: 'Du',
    items: [
      { name: 'Frokostsett', qty: 1, price: 24.99 },
      { name: 'Appelsinjuice', qty: 2, price: 9.98 }
    ]
  },
  {
    id: '702',
    type: 'Restaurant',
    location: 'Bord 12',
    status: 'Pågår',
    time: '15 min siden',
    assignedTo: 'Du',
    items: [
      { name: 'Steak', qty: 2, price: 69.98 },
      { name: 'Vin', qty: 1, price: 35.99 }
    ]
  },
  {
    id: '703',
    type: 'Romservice',
    location: 'Rom 205',
    status: 'Ferdig',
    time: '1 time siden',
    assignedTo: 'Du',
    items: [
      { name: 'Club Sandwich', qty: 1, price: 15.99 }
    ]
  }
])

const filteredOrders = computed(() => {
  if (activeStatus.value === 'Alle') return orders.value
  return orders.value.filter(order => order.status === activeStatus.value)
})

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    'Venter': 'badge-warning',
    'Pågår': 'badge-info',
    'Ferdig': 'badge-success'
  }
  return badges[status] || 'badge-info'
}

const getNextStatus = (currentStatus: string) => {
  const statusFlow: Record<string, string> = {
    'Venter': 'Pågår',
    'Pågår': 'Ferdig',
    'Ferdig': 'Ferdig'
  }
  return statusFlow[currentStatus] || 'Ferdig'
}

const updateOrderStatus = (orderId: string) => {
  alert(`Update status for order ${orderId} (Connect to Neon DB)`)
}
</script>
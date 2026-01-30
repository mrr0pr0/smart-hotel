<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Romservice</h1>
      <p class="text-gray-400">Administrer romservicebestillinger</p>
    </div>

    <!-- Active Orders -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <button class="btn-primary text-sm px-3 py-1">Oppdater Status</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const orders = ref([
  {
    id: '501',
    room: '301',
    status: 'pending',
    items: [
      { name: 'Burger', qty: 2, price: 25.98 },
      { name: 'Fries', qty: 2, price: 7.98 }
    ],
    total: 33.96
  },
  {
    id: '502',
    room: '205',
    status: 'preparing',
    items: [
      { name: 'Pizza', qty: 1, price: 18.99 },
      { name: 'Coke', qty: 2, price: 5.98 }
    ],
    total: 24.97
  },
  {
    id: '503',
    room: '412',
    status: 'delivered',
    items: [
      { name: 'Salad', qty: 1, price: 12.99 }
    ],
    total: 12.99
  },
])
</script>
<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Spor Romservice</h1>
      <p class="text-gray-400">Sanntidssporing av bestillinger og oppdateringer</p>
    </div>

    <!-- Search Order -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <input
          type="text"
          class="input flex-1"
          placeholder="Skriv inn bestillings-ID eller romnummer..."
          v-model="searchQuery"
        />
        <button class="btn-primary">Søk</button>
      </div>
    </div>

    <!-- Active Orders -->
    <div class="space-y-6">
      <div v-for="order in orders" :key="order.id" class="card">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-white">Bestilling #{{ order.id }}</h3>
            <p class="text-gray-400">Rom {{ order.room }} • {{ order.time }}</p>
          </div>
          <span :class="getStatusBadge(order.status)">
            {{ order.status }}
          </span>
        </div>

        <!-- Order Timeline -->
        <div class="space-y-4 mb-6">
          <div
            v-for="(step, index) in order.timeline"
            :key="index"
            class="flex gap-4"
          >
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  step.completed ? 'bg-primary-600' : 'bg-[#2a2a2a]'
                ]"
              >
                <svg v-if="step.completed" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="text-sm text-gray-500">{{ index + 1 }}</span>
              </div>
              <div
                v-if="index < order.timeline.length - 1"
                :class="[
                  'w-0.5 h-12',
                  step.completed ? 'bg-primary-600' : 'bg-[#2a2a2a]'
                ]"
              ></div>
            </div>
            <div class="flex-1 pb-4">
              <p :class="step.completed ? 'text-white font-medium' : 'text-gray-400'">
                {{ step.label }}
              </p>
              <p class="text-xs text-gray-500">{{ step.time }}</p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="border-t border-[#2a2a2a] pt-4">
          <h4 class="text-sm font-semibold text-white mb-3">Bestillingsvarer</h4>
          <div class="space-y-2">
            <div v-for="item in order.items" :key="item.name" class="flex justify-between text-sm">
              <span class="text-gray-400">{{ item.name }} × {{ item.qty }}</span>
              <span class="text-white">${{ item.price }}</span>
            </div>
          </div>
          <div class="flex justify-between text-lg font-bold text-white mt-4 pt-4 border-t border-[#2a2a2a]">
            <span>Total</span>
            <span>${{ order.total }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-4" v-if="order.status !== 'Delivered'">
          <button class="btn-primary flex-1">Oppdater Status</button>
          <button class="btn-secondary">Kontakt Gjest</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const searchQuery = ref('')

const orders = ref([
  {
    id: '501',
    room: '301',
    time: '15 min ago',
    status: 'Preparing',
    total: 33.96,
    items: [
      { name: 'Burger', qty: 2, price: 25.98 },
      { name: 'Fries', qty: 2, price: 7.98 }
    ],
    timeline: [
      { label: 'Order Received', time: '2:30 PM', completed: true },
      { label: 'Kitchen Preparing', time: '2:35 PM', completed: true },
      { label: 'Ready for Delivery', time: 'Pending', completed: false },
      { label: 'Out for Delivery', time: 'Pending', completed: false },
      { label: 'Delivered', time: 'Pending', completed: false }
    ]
  },
  {
    id: '502',
    room: '205',
    time: '30 min ago',
    status: 'Out for Delivery',
    total: 24.97,
    items: [
      { name: 'Pizza', qty: 1, price: 18.99 },
      { name: 'Coke', qty: 2, price: 5.98 }
    ],
    timeline: [
      { label: 'Order Received', time: '2:15 PM', completed: true },
      { label: 'Kitchen Preparing', time: '2:20 PM', completed: true },
      { label: 'Ready for Delivery', time: '2:35 PM', completed: true },
      { label: 'Out for Delivery', time: '2:40 PM', completed: true },
      { label: 'Delivered', time: 'Pending', completed: false }
    ]
  }
])

const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    'Pending': 'badge-warning',
    'Preparing': 'badge-info',
    'Out for Delivery': 'badge-info',
    'Delivered': 'badge-success'
  }
  return badges[status] || 'badge-info'
}
</script>
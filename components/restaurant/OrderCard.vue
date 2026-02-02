<template>
  <div class="card">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-white">Order #{{ order.id }}</h3>
        <p class="text-sm text-gray-400">{{ order.location }}</p>
      </div>
      <Badge :variant="statusVariant">{{ order.status }}</Badge>
    </div>
    
    <div class="space-y-2 mb-4">
      <div
        v-for="(item, index) in order.items"
        :key="index"
        class="flex justify-between text-sm"
      >
        <span class="text-gray-300">{{ item.quantity }}x {{ item.name }}</span>
        <span class="text-white">${{ (parseFloat(item.price) * item.quantity).toFixed(2) }}</span>
      </div>
    </div>
    
    <div class="pt-4 border-t border-[#2a2a2a]">
      <div class="flex justify-between mb-2">
        <span class="text-gray-400">Subtotal:</span>
        <span class="text-white">${{ order.subtotal }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-400">Tax:</span>
        <span class="text-white">${{ order.tax }}</span>
      </div>
      <div class="flex justify-between text-lg font-semibold">
        <span class="text-white">Total:</span>
        <span class="text-primary-400">${{ order.total }}</span>
      </div>
    </div>
    
    <div v-if="showActions" class="flex gap-2 mt-4">
      <Button size="sm" variant="secondary" full-width @click="emit('view', order)">
        View Details
      </Button>
      <Button
        v-if="order.status === 'pending'"
        size="sm"
        variant="accent"
        full-width
        @click="emit('update-status', order, 'preparing')"
      >
        Start Preparing
      </Button>
      <Button
        v-else-if="order.status === 'preparing'"
        size="sm"
        variant="accent"
        full-width
        @click="emit('update-status', order, 'ready')"
      >
        Mark Ready
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Order } from '~/types/order'

interface Props {
  order: Order
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true
})

const emit = defineEmits<{
  view: [order: Order]
  'update-status': [order: Order, status: string]
}>()

const statusVariant = computed(() => {
  switch (props.order.status) {
    case 'pending':
      return 'warning'
    case 'preparing':
      return 'info'
    case 'ready':
      return 'success'
    case 'delivered':
      return 'default'
    case 'cancelled':
      return 'danger'
    default:
      return 'default'
  }
})
</script>
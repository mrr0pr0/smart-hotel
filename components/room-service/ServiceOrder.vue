<template>
  <div class="card">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-white">Order #{{ order.id }}</h3>
        <p class="text-sm text-gray-400">Room {{ order.roomNumber }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ formatTime(order.createdAt) }}</p>
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
    
    <div v-if="order.specialRequests" class="mb-4 p-3 bg-[#111111] rounded-lg">
      <p class="text-xs text-gray-500 mb-1">Special Requests:</p>
      <p class="text-sm text-gray-300">{{ order.specialRequests }}</p>
    </div>
    
    <div class="pt-4 border-t border-[#2a2a2a]">
      <div class="flex justify-between text-lg font-semibold">
        <span class="text-white">Total:</span>
        <span class="text-primary-400">${{ order.total }}</span>
      </div>
    </div>
    
    <div v-if="showActions" class="flex gap-2 mt-4">
      <Button
        v-if="order.status === 'pending'"
        size="sm"
        variant="accent"
        full-width
        @click="emit('update-status', order, 'preparing')"
      >
        Accept Order
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
      <Button
        v-else-if="order.status === 'ready'"
        size="sm"
        variant="primary"
        full-width
        @click="emit('update-status', order, 'delivered')"
      >
        Mark Delivered
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

const formatTime = (date: Date | string) => {
  const d = new Date(date)
  return d.toLocaleString()
}
</script>
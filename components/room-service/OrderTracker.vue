<template>
  <div class="card">
    <h3 class="text-lg font-semibold text-white mb-6">Order Status</h3>
    
    <div class="space-y-6">
      <div
        v-for="(step, index) in steps"
        :key="step.status"
        class="flex gap-4"
      >
        <!-- Icon -->
        <div class="flex flex-col items-center">
          <div
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center transition-all',
              step.completed ? 'bg-primary-600' : 'bg-[#2a2a2a]'
            ]"
          >
            <svg
              v-if="step.completed"
              class="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span v-else class="text-gray-500 text-sm">{{ index + 1 }}</span>
          </div>
          <div
            v-if="index < steps.length - 1"
            :class="[
              'w-0.5 h-12 transition-all',
              step.completed ? 'bg-primary-600' : 'bg-[#2a2a2a]'
            ]"
          ></div>
        </div>
        
        <!-- Content -->
        <div class="flex-1 pb-6">
          <h4
            :class="[
              'font-medium mb-1',
              step.completed ? 'text-white' : 'text-gray-500'
            ]"
          >
            {{ step.label }}
          </h4>
          <p class="text-sm text-gray-500">{{ step.description }}</p>
          <p v-if="step.time" class="text-xs text-gray-600 mt-1">{{ step.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
}

const props = defineProps<Props>()

const statusOrder = ['pending', 'preparing', 'ready', 'delivered']

const steps = computed(() => {
  const currentIndex = statusOrder.indexOf(props.status)
  
  return [
    {
      status: 'pending',
      label: 'Order Received',
      description: 'Your order has been received and is waiting to be processed',
      completed: currentIndex >= 0,
      time: currentIndex >= 0 ? 'Just now' : ''
    },
    {
      status: 'preparing',
      label: 'Preparing',
      description: 'Your order is being prepared by our kitchen staff',
      completed: currentIndex >= 1,
      time: currentIndex >= 1 ? '5 mins ago' : ''
    },
    {
      status: 'ready',
      label: 'Ready for Delivery',
      description: 'Your order is ready and will be delivered shortly',
      completed: currentIndex >= 2,
      time: currentIndex >= 2 ? '2 mins ago' : ''
    },
    {
      status: 'delivered',
      label: 'Delivered',
      description: 'Your order has been delivered to your room',
      completed: currentIndex >= 3,
      time: currentIndex >= 3 ? 'Just now' : ''
    }
  ]
})
</script>
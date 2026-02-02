<template>
  <div class="card-hover cursor-pointer" @click="handleClick">
    <div class="aspect-video bg-[#111111] rounded-lg mb-4 overflow-hidden">
      <img
        v-if="room.image"
        :src="room.image"
        :alt="room.type"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
    </div>
    
    <div class="flex items-start justify-between mb-3">
      <div>
        <h3 class="text-lg font-semibold text-white">Room {{ room.number }}</h3>
        <p class="text-sm text-gray-400 capitalize">{{ room.type }}</p>
      </div>
      <Badge :variant="statusVariant">{{ room.status }}</Badge>
    </div>
    
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Capacity: {{ room.capacity }} guests</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <span>{{ room.size }} sq ft</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{{ room.view }} view</span>
      </div>
    </div>
    
    <div class="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
      <div>
        <span class="text-2xl font-bold text-white">${{ room.price }}</span>
        <span class="text-sm text-gray-500">/night</span>
      </div>
      <Button size="sm" :disabled="room.status !== 'available'">
        {{ room.status === 'available' ? 'Book Now' : 'Unavailable' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Room } from '~/types/room'

interface Props {
  room: Room
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [room: Room]
}>()

const statusVariant = computed(() => {
  switch (props.room.status) {
    case 'available':
      return 'success'
    case 'occupied':
      return 'danger'
    case 'maintenance':
      return 'warning'
    default:
      return 'default'
  }
})

const handleClick = () => {
  emit('click', props.room)
}
</script>
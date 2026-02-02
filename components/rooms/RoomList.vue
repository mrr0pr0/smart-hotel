<template>
  <div>
    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Search rooms..."
          />
        </div>
        <select
          v-model="filterStatus"
          class="px-4 py-2 bg-[#111111] border border-[#2a2a2a] rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <select
          v-model="filterType"
          class="px-4 py-2 bg-[#111111] border border-[#2a2a2a] rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Types</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>
    </div>

    <!-- Room Grid -->
    <div v-if="filteredRooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RoomCard
        v-for="room in filteredRooms"
        :key="room.id"
        :room="room"
        @click="handleRoomClick"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <p class="text-gray-500">No rooms found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Room } from '~/types/room'

interface Props {
  rooms: Room[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'room-click': [room: Room]
}>()

const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')

const filteredRooms = computed(() => {
  return props.rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filterStatus.value || room.status === filterStatus.value
    const matchesType = !filterType.value || room.type === filterType.value
    
    return matchesSearch && matchesStatus && matchesType
  })
})

const handleRoomClick = (room: Room) => {
  emit('room-click', room)
}
</script>
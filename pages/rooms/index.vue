<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Rom</h1>
        <p class="text-gray-400">Administrer alle hotellrom</p>
      </div>
      <NuxtLink to="/rooms/[id]" class="btn-primary">Legg til nytt rom</NuxtLink>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <select class="input flex-1">
          <option>Alle rom</option>
          <option>Tilgjengelig</option>
          <option>Opptatt</option>
          <option>Vedlikehold</option>
        </select>
        <select class="input flex-1">
          <option>Alle typer</option>
          <option>Enkeltrom</option>
          <option>Dobbeltrom</option>
          <option>Suite</option>
          <option>Deluxe</option>
        </select>
        <input type="text" class="input flex-1" placeholder="Søk i rom..." />
      </div>
    </div>

    <!-- Rooms Grid -->
    <div v-if="rooms.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="room in rooms" :key="room.id" class="card-hover">
        <div class="aspect-video bg-[#111111] rounded-lg mb-4 flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>

        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-lg font-semibold text-white">Rom {{ room.number }}</h3>
            <p class="text-sm text-gray-400">{{ room.type }}</p>
          </div>
          <span :class="room.status === 'available' ? 'badge-success' : room.status === 'occupied' ? 'badge-danger' : 'badge-warning'">
            {{ room.status }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-2xl font-bold text-white">${{ room.price }}</p>
          <NuxtLink :to="`/rooms/${room.id}`" class="btn-primary btn text-sm px-3 py-1">Vis detaljer</NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Empty state when DB has no rooms -->
    <div v-else class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <p class="text-gray-500">Databasen er tom — ingen rom funnet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import type { Room } from '~/types/room'

// Load rooms from the backend so UI reflects actual DB state
const { data: roomsResp, pending, error } = await useAsyncData<{ success: boolean; data: Room[] }>('rooms', () =>
  $fetch('/api/rooms').catch(() => ({ success: false, data: [] }))
)

const rooms = computed<Room[]>(() => {
  return (roomsResp?.value && Array.isArray(roomsResp.value.data)) ? roomsResp.value.data : []
})
</script>
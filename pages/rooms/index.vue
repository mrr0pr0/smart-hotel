<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Rom</h1>
        <p class="text-gray-400">Administrer alle hotellrom</p>
      </div>
      <button class="btn-primary">Legg til nytt rom</button>
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
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <button class="btn-primary btn text-sm px-3 py-1">Vis detaljer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const rooms = ref([
  { id: 1, number: '101', type: 'Single', price: 89, status: 'available' },
  { id: 2, number: '102', type: 'Double', price: 129, status: 'occupied' },
  { id: 3, number: '103', type: 'Suite', price: 249, status: 'available' },
  { id: 4, number: '201', type: 'Deluxe', price: 189, status: 'available' },
  { id: 5, number: '202', type: 'Suite', price: 249, status: 'maintenance' },
  { id: 6, number: '203', type: 'Double', price: 129, status: 'occupied' },
])
</script>
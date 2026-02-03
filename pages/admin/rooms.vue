<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Romstyring</h1>
        <p class="text-gray-400">Administrer alle hotellrom og tilgjengelighet</p>
      </div>
      <button class="btn-primary" @click="showAddModal = true">Legg Til Nytt Rom</button>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Totalt Rom</h3>
        <p class="text-3xl font-bold text-white">{{ rooms.length }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Tilgjengelig</h3>
        <p class="text-3xl font-bold text-green-400">{{ availableCount }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Opptatt</h3>
        <p class="text-3xl font-bold text-red-400">{{ occupiedCount }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Vedlikehold</h3>
        <p class="text-3xl font-bold text-yellow-400">{{ maintenanceCount }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <select class="input flex-1" v-model="filterFloor">
          <option value="">Alle Etasjer</option>
          <option value="1">Etasje 1</option>
          <option value="2">Etasje 2</option>
          <option value="3">Etasje 3</option>
          <option value="4">Etasje 4</option>
        </select>
        <select class="input flex-1" v-model="filterStatus">
          <option value="">Alle Status</option>
          <option value="available">Tilgjengelig</option>
          <option value="occupied">Opptatt</option>
          <option value="maintenance">Vedlikehold</option>
        </select>
        <select class="input flex-1" v-model="filterType">
          <option value="">Alle Typer</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="card bg-green-900/20 border-green-500 mb-6">
      <p class="text-green-400">{{ successMessage }}</p>
    </div>
    <div v-if="errorMessage" class="card bg-red-900/20 border-red-500 mb-6">
      <p class="text-red-400">{{ errorMessage }}</p>
    </div>

    <!-- Rooms Table -->
    <div class="card overflow-hidden">
      <table v-if="filteredRooms.length > 0" class="table">
        <thead>
          <tr>
            <th>Romnummer</th>
            <th>Type</th>
            <th>Etasje</th>
            <th>Pris/Natt</th>
            <th>Kapasitet</th>
            <th>Status</th>
            <th>Sist Rengjort</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in filteredRooms" :key="room.id">
            <td class="font-semibold">{{ room.number }}</td>
            <td>{{ room.type }}</td>
            <td>{{ room.floor }}</td>
            <td>${{ room.price }}</td>
            <td>{{ room.capacity }}</td>
            <td>
              <span :class="room.status === 'available' ? 'badge-success' : room.status === 'occupied' ? 'badge-danger' : 'badge-warning'">
                {{ room.status }}
              </span>
            </td>
            <td>{{ room.lastCleaned ? new Date(room.lastCleaned).toLocaleDateString() : 'N/A' }}</td>
            <td>
              <div class="flex gap-2">
                <button class="btn-ghost text-xs px-2 py-1">Rediger</button>
                <button class="btn-ghost text-xs px-2 py-1 text-red-400">Slett</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="p-8 text-center text-gray-500">Ingen rom funnet — databasen er tom.</div>
    </div>

    <!-- Add Room Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="card max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-white mb-4">Legg Til Nytt Rom</h2>
        <form @submit.prevent="addRoom" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Romnummer *</label>
            <input v-model="newRoom.number" type="text" class="input" placeholder="101" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Romtype *</label>
            <select v-model="newRoom.type" class="input" required>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Etasje *</label>
            <input v-model="newRoom.floor" type="number" class="input" placeholder="1" required min="1" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Pris per Natt *</label>
            <input v-model="newRoom.price" type="number" class="input" placeholder="89" required min="0" step="0.01" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Kapasitet (personer) *</label>
            <input v-model="newRoom.capacity" type="number" class="input" placeholder="2" required min="1" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Størrelse (sq ft)</label>
            <input v-model="newRoom.size" type="number" class="input" placeholder="300" min="0" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Utsikt</label>
            <input v-model="newRoom.view" type="text" class="input" placeholder="Ocean view" />
          </div>
          <div class="flex gap-3">
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Legger til...' : 'Legg til Rom' }}
            </button>
            <button type="button" class="btn-secondary" @click="closeModal" :disabled="isSubmitting">Avbryt</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import type { Room } from '~/types/room'

const showAddModal = ref(false)
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Filters
const filterFloor = ref('')
const filterStatus = ref('')
const filterType = ref('')

// New room form data
const newRoom = ref({
  number: '',
  type: 'single',
  floor: 1,
  price: 0,
  capacity: 1,
  size: null as number | null,
  view: ''
})

const { data: roomsResp, pending: roomsPending, error: roomsError, refresh: refreshRooms } = await useAsyncData<{ success: boolean; data: Room[] }>('adminRooms', async () => {
  try {
    return await $fetch<{ success: boolean; data: Room[] }>('/api/rooms')
  } catch {
    return { success: false, data: [] }
  }
})

const rooms = computed<Room[]>(() => roomsResp.value?.data || [])

// Computed stats
const availableCount = computed(() => rooms.value.filter(r => r.status === 'available').length)
const occupiedCount = computed(() => rooms.value.filter(r => r.status === 'occupied').length)
const maintenanceCount = computed(() => rooms.value.filter(r => r.status === 'maintenance').length)

// Filtered rooms
const filteredRooms = computed(() => {
  let filtered = rooms.value
  
  if (filterFloor.value) {
    filtered = filtered.filter(r => r.floor === parseInt(filterFloor.value))
  }
  
  if (filterStatus.value) {
    filtered = filtered.filter(r => r.status === filterStatus.value)
  }
  
  if (filterType.value) {
    filtered = filtered.filter(r => r.type === filterType.value)
  }
  
  return filtered
})

const addRoom = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const response = await $fetch<{ success: boolean; message?: string }>('/api/rooms/create', {
      method: 'POST',
      body: {
        number: newRoom.value.number,
        type: newRoom.value.type,
        floor: newRoom.value.floor,
        price: newRoom.value.price,
        capacity: newRoom.value.capacity,
        size: newRoom.value.size,
        view: newRoom.value.view || null
      }
    })
    
    if (response.success) {
      successMessage.value = 'Rom lagt til!'
      await refreshRooms()
      closeModal()
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Kunne ikke legge til rom. Prøv igjen.'
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  // Reset form
  newRoom.value = {
    number: '',
    type: 'single',
    floor: 1,
    price: 0,
    capacity: 1,
    size: null,
    view: ''
  }
}
</script>
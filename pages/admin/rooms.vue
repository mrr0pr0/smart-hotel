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
        <p class="text-3xl font-bold text-white">156</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Tilgjengelig</h3>
        <p class="text-3xl font-bold text-green-400">64</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Opptatt</h3>
        <p class="text-3xl font-bold text-red-400">82</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Vedlikehold</h3>
        <p class="text-3xl font-bold text-yellow-400">10</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <select class="input flex-1">
          <option>Alle Etasjer</option>
          <option>Etasje 1</option>
          <option>Etasje 2</option>
          <option>Etasje 3</option>
          <option>Etasje 4</option>
        </select>
        <select class="input flex-1">
          <option>Alle Status</option>
          <option>Tilgjengelig</option>
          <option>Opptatt</option>
          <option>Vedlikehold</option>
        </select>
        <select class="input flex-1">
          <option>Alle Typer</option>
          <option>Single</option>
          <option>Double</option>
          <option>Suite</option>
          <option>Deluxe</option>
        </select>
      </div>
    </div>

    <!-- Rooms Table -->
    <div class="card overflow-hidden">
      <table v-if="rooms.length > 0" class="table">
        <thead>
          <tr>
            <th>Romnummer</th>
            <th>Type</th>
            <th>Etasje</th>
            <th>Pris/Natt</th>
            <th>Status</th>
            <th>Sist Rengjort</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="room.id">
            <td class="font-semibold">{{ room.number }}</td>
            <td>{{ room.type }}</td>
            <td>{{ room.floor }}</td>
            <td>${{ room.price }}</td>
            <td>
              <span :class="room.status === 'available' ? 'badge-success' : room.status === 'occupied' ? 'badge-danger' : 'badge-warning'">
                {{ room.status }}
              </span>
            </td>
            <td>{{ room.lastCleaned }}</td>
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

    <!-- Add Room Modal (simplified) -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showAddModal = false">
      <div class="card max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-white mb-4">Legg Til Nytt Rom</h2>
        <form @submit.prevent="addRoom" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Romnummer</label>
            <input type="text" class="input" placeholder="101" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Romtype</label>
            <select class="input" required>
              <option>Single</option>
              <option>Double</option>
              <option>Suite</option>
              <option>Deluxe</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Pris per Natt</label>
            <input type="number" class="input" placeholder="89" required />
          </div>
          <div class="flex gap-3">
            <button type="submit" class="btn-primary">Legg til Rom</button>
            <button type="button" class="btn-secondary" @click="showAddModal = false">Avbryt</button>
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

const showAddModal = ref(false)

import type { Room } from '~/types/room'

const { data: roomsResp, pending: roomsPending, error: roomsError } = await useAsyncData<{ success: boolean; data: Room[] }>('adminRooms', () =>
  $fetch('/api/rooms').catch(() => ({ success: false, data: [] }))
)

const rooms = computed<Room[]>(() => (roomsResp?.value && Array.isArray(roomsResp.value.data)) ? roomsResp.value.data : [])

const addRoom = () => {
  showAddModal.value = false
  alert('Room added! (Connect to Neon DB)')
}
</script>
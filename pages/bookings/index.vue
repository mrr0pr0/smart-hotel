<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Reservasjoner</h1>
        <p class="text-gray-400">Administrer alle reservasjoner</p>
      </div>
      <NuxtLink to="/bookings/new" class="btn-primary">Ny Reservasjon</NuxtLink>
    </div>

    <!-- Bookings Table -->
    <div class="card overflow-hidden">
      <table class="table">
        <thead>
        <tr>
          <th>Reservasjons-ID</th>
          <th>Gastnavn</th>
          <th>Rom</th>
          <th>Innsjekk</th>
          <th>Utsjekk</th>
          <th>Status</th>
          <th>Handlinger</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td class="font-mono text-sm">#{{ booking.id }}</td>
          <td>{{ booking.guest }}</td>
          <td>Rom {{ booking.room }}</td>
          <td>{{ booking.checkIn }}</td>
          <td>{{ booking.checkOut }}</td>
          <td>
              <span :class="booking.status === 'confirmed' ? 'badge-success' : booking.status === 'pending' ? 'badge-warning' : 'badge-info'">
                {{ booking.status }}
              </span>
          </td>
          <td>
            <button class="btn-ghost text-xs px-2 py-1">Vis</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const bookings = ref([
  { id: '1001', guest: 'John Doe', room: '101', checkIn: 'Jan 28, 2026', checkOut: 'Jan 30, 2026', status: 'confirmed' },
  { id: '1002', guest: 'Jane Smith', room: '205', checkIn: 'Jan 27, 2026', checkOut: 'Feb 02, 2026', status: 'confirmed' },
  { id: '1003', guest: 'Mike Johnson', room: '310', checkIn: 'Jan 29, 2026', checkOut: 'Jan 31, 2026', status: 'pending' },
  { id: '1004', guest: 'Sarah Williams', room: '412', checkIn: 'Feb 01, 2026', checkOut: 'Feb 05, 2026', status: 'pending' },
  { id: '1005', guest: 'David Brown', room: '102', checkIn: 'Jan 26, 2026', checkOut: 'Jan 28, 2026', status: 'checked-in' },
])
</script>
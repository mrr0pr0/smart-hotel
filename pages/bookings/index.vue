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
      <table v-if="bookings.length > 0" class="table">
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
            <NuxtLink :to="`/bookings/${booking.id}`" class="btn-ghost text-xs px-2 py-1">Vis</NuxtLink>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-else class="p-8 text-center text-gray-500">Ingen reservasjoner funnet — databasen er tom.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import type { Booking } from '~/types/booking'

// Fetch bookings from backend
const { data: bookingsResp, pending: bookingsPending, error: bookingsError } = await useAsyncData<{ success: boolean; data: Booking[] }>('bookings', () =>
  $fetch('/api/bookings').catch(() => ({ success: false, data: [] }))
)

const bookings = computed<Booking[]>(() => (bookingsResp?.value && Array.isArray(bookingsResp.value.data)) ? bookingsResp.value.data : [])
</script>
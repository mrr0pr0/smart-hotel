<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Dashbord</h1>
      <p class="text-gray-400">Velkommen tilbake! Her er hva som skjer i dag.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span :class="percentClass(occupiedChange)">{{ signedPercent(occupiedChange) }}</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Totalt Rom</h3>
        <p class="text-3xl font-bold text-white">{{ totalRooms }}</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="badge-info">{{ availableCount }}</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Opptatte Rom</h3>
        <p class="text-3xl font-bold text-white">{{ occupiedCount }}</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="badge-warning">Venter</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Dagens Reservasjoner</h3>
        <p class="text-3xl font-bold text-white">{{ todaysReservations }}</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span :class="percentClass(revenueChange)">{{ signedPercent(revenueChange) }}</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Dagens Inntekter</h3>
        <p class="text-3xl font-bold text-white">{{ formatCurrency(todaysRevenue) }}</p>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Recent Bookings -->
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Nylige Reservasjoner</h2>
        <div class="space-y-3">
            <div v-if="recentBookings.length === 0" class="text-center text-gray-500 p-6">Ingen nylige reservasjoner funnet.</div>

            <div v-else>
              <div v-for="booking in recentBookings" :key="booking.id" class="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold">{{ booking.guest?.firstName?.charAt(0) }}{{ booking.guest?.lastName?.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-white">{{ booking.guest?.firstName }} {{ booking.guest?.lastName }}</p>
                    <p class="text-xs text-gray-500">Rom {{ booking.room?.number || booking.roomId }}</p>
                  </div>
                </div>
                <span class="badge-success">{{ booking.status }}</span>
              </div>
            </div>
          </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Rask Handling</h2>
        <div class="grid grid-cols-2 gap-3">
          <NuxtLink to="/bookings/new" class="btn-primary text-center">Ny Reservasjon</NuxtLink>
          <NuxtLink to="/rooms" class="btn-secondary text-center">Administrer Rom</NuxtLink>
          <NuxtLink to="/restaurant" class="btn-accent text-center">Restaurantbestillinger</NuxtLink>
          <NuxtLink to="/room-service" class="btn-ghost text-center">Romservice</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import { computed } from 'vue'
import type { Booking } from '~/types/booking'

const { data: roomsResp } = await useAsyncData('rooms', () =>
  $fetch('/api/rooms').catch(() => ({ success: false, data: [] }))
)
const rooms = computed(() => (roomsResp?.value && Array.isArray(roomsResp.value.data)) ? roomsResp.value.data : [])

const { data: bookingsResp } = await useAsyncData<{ success: boolean; data: Booking[] }>('bookings', () =>
  $fetch('/api/bookings').catch(() => ({ success: false, data: [] }))
)
const bookings = computed<Booking[]>(() => (bookingsResp?.value && Array.isArray(bookingsResp.value.data)) ? bookingsResp.value.data : [])

const recentBookings = computed<Booking[]>(() => bookings.value.slice(0, 5))

const totalRooms = computed(() => rooms.value.length)
const availableCount = computed(() => rooms.value.filter(r => r.status === 'available').length)
const occupiedCount = computed(() => rooms.value.filter(r => r.status === 'occupied').length)

function toDayString(d: string | Date) {
  const dt = new Date(d)
  return dt.toISOString().split('T')[0]
}

const today = new Date()
const todayStr = today.toISOString().split('T')[0]
const yesterdayStr = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]

const pendingCount = computed(() => bookings.value.filter(b => b.status === 'pending').length)
const todaysReservations = computed(() => bookings.value.filter(b => toDayString(b.checkIn) === todayStr).length)

const parseNumber = (v: any) => {
  const n = typeof v === 'number' ? v : parseFloat(String(v || 0))
  return isNaN(n) ? 0 : n
}

const todaysRevenue = computed(() =>
  bookings.value
    .filter(b => toDayString(b.checkIn) === todayStr)
    .reduce((s, b) => s + parseNumber(b.total), 0)
)

const yestReservations = computed(() => bookings.value.filter(b => toDayString(b.checkIn) === yesterdayStr).length)
const yestRevenue = computed(() =>
  bookings.value
    .filter(b => toDayString(b.checkIn) === yesterdayStr)
    .reduce((s, b) => s + parseNumber(b.total), 0)
)

function calcChange(curr: number, prev: number) {
  if (prev === 0) return curr === 0 ? 0 : 100
  return Math.round(((curr - prev) / prev) * 100)
}

const occupiedChange = computed(() => calcChange(occupiedCount.value, Math.max(1, occupiedCount.value - 1))) // fallback to avoid 0/0
const revenueChange = computed(() => calcChange(todaysRevenue.value, yestRevenue.value))

function signedPercent(n: number) {
  return (n >= 0 ? '+' : '') + n + '%'
}

function percentClass(n: number) {
  return n >= 0 ? 'badge-success' : 'badge-danger'
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}
</script>
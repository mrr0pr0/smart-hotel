<template>
  <div class="p-8">
    <!-- Back Button -->
    <NuxtLink to="/bookings" class="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Tilbake til Reservasjoner
    </NuxtLink>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Booking Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Header -->
        <div class="card">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h1 class="text-3xl font-bold text-white mb-2">Reservasjon #{{ booking.id }}</h1>
              <p class="text-gray-400">Opprettet {{ booking.createdAt }}</p>
            </div>
            <span :class="booking.status === 'confirmed' ? 'badge-success' : booking.status === 'pending' ? 'badge-warning' : 'badge-info'">
              {{ booking.status }}
            </span>
          </div>
        </div>

        <!-- Guest Information -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Gastinformasjon</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Fullt Navn</label>
              <p class="text-white">{{ booking.guest.name }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">E-post</label>
              <p class="text-white">{{ booking.guest.email }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Telefon</label>
              <p class="text-white">{{ booking.guest.phone }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Antall Gjester</label>
              <p class="text-white">{{ booking.guests }} gjester</p>
            </div>
          </div>
        </div>

        <!-- Booking Details -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Reservasjonsdetaljer</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Romnummer</label>
              <p class="text-white">{{ booking.room.number }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Romtype</label>
              <p class="text-white">{{ booking.room.type }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Innsjekk Dato</label>
              <p class="text-white">{{ booking.checkIn }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Utsjekk Dato</label>
              <p class="text-white">{{ booking.checkOut }}</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Antall Netter</label>
              <p class="text-white">{{ booking.nights }} netter</p>
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Sats per Natt</label>
              <p class="text-white">${{ booking.room.price }}</p>
            </div>
          </div>

          <div v-if="booking.specialRequests" class="mt-4">
            <label class="block text-sm text-gray-400 mb-1">Spesielle Ønsker</label>
            <p class="text-white">{{ booking.specialRequests }}</p>
          </div>
        </div>

        <!-- Activity Log -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Aktivitetslogg</h2>
          <div class="space-y-3">
            <div v-for="activity in booking.activities" :key="activity.id" class="flex gap-4">
              <div class="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div class="flex-1">
                <p class="text-white">{{ activity.action }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Payment Summary -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Betalingssammendrag</h2>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Romsats ({{ booking.nights }} netter)</span>
              <span class="text-white">${{ booking.payment.roomRate }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Moms (10%)</span>
              <span class="text-white">${{ booking.payment.tax }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Serviceavgift</span>
              <span class="text-white">${{ booking.payment.serviceFee }}</span>
            </div>
            <div class="border-t border-[#2a2a2a] pt-3 flex justify-between">
              <span class="text-lg font-bold text-white">Total</span>
              <span class="text-lg font-bold text-white">${{ booking.payment.total }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Betalt</span>
              <span class="text-green-400">${{ booking.payment.paid }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Saldo</span>
              <span class="text-yellow-400">${{ booking.payment.balance }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Handlinger</h2>
          <div class="space-y-3">
            <button class="btn-primary w-full">Innsjekk</button>
            <button class="btn-secondary w-full">Endre Reservasjon</button>
            <button class="btn-secondary w-full">Send Bekreftelse</button>
            <button class="btn-ghost w-full text-red-400">Avbryt Reservasjon</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'default'
})

// Mock data - will be fetched from Neon DB
const booking = ref({
  id: route.params.id,
  status: 'confirmed',
  createdAt: 'Jan 25, 2026',
  guest: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  },
  room: {
    number: '301',
    type: 'Deluxe Suite',
    price: 249
  },
  checkIn: 'Jan 28, 2026',
  checkOut: 'Jan 30, 2026',
  nights: 2,
  guests: 2,
  specialRequests: 'Late check-in after 10 PM. Need extra pillows.',
  payment: {
    roomRate: 498,
    tax: 49.80,
    serviceFee: 25,
    total: 572.80,
    paid: 114.56,
    balance: 458.24
  },
  activities: [
    { id: 1, action: 'Booking confirmed', time: 'Jan 25, 2026 at 3:45 PM' },
    { id: 2, action: 'Deposit payment received', time: 'Jan 25, 2026 at 3:50 PM' },
    { id: 3, action: 'Confirmation email sent', time: 'Jan 25, 2026 at 3:51 PM' }
  ]
})
</script>
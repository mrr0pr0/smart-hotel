<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Ny Reservasjon</h1>
      <p class="text-gray-400">Opprett en ny romreservasjon</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Booking Form -->
      <div class="lg:col-span-2 card">
        <form @submit.prevent="submitBooking" class="space-y-6">
          <!-- Guest Information -->
          <div>
            <h2 class="text-xl font-semibold text-white mb-4">Gastinformasjon</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">Fornavn</label>
                <input type="text" class="input" placeholder="John" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Etternavn</label>
                <input type="text" class="input" placeholder="Doe" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">E-post</label>
                <input type="email" class="input" placeholder="john@example.com" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Telefon</label>
                <input type="tel" class="input" placeholder="+1 (555) 123-4567" required />
              </div>
            </div>
          </div>

          <!-- Booking Details -->
          <div>
            <h2 class="text-xl font-semibold text-white mb-4">Reservasjonsdetaljer</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">Innsjekk Dato</label>
                <input type="date" class="input" v-model="checkInDate" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Utsjekk Dato</label>
                <input type="date" class="input" v-model="checkOutDate" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Romtype</label>
                <select class="input" v-model="selectedRoomType" required>
                  <option value="">Velg romtype</option>
                  <option value="single">Single - $89/natt</option>
                  <option value="double">Double - $129/natt</option>
                  <option value="suite">Suite - $249/natt</option>
                  <option value="deluxe">Deluxe - $189/natt</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Antall Gjester</label>
                <select class="input" required>
                  <option>1 Gjest</option>
                  <option>2 Gjester</option>
                  <option>3 Gjester</option>
                  <option>4 Gjester</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Special Requests -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Spesielle Ønsker</label>
            <textarea class="input" rows="3" placeholder="Eventuelle spesielle krav..."></textarea>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button type="submit" class="btn-primary">Opprett Reservasjon</button>
            <NuxtLink to="/bookings" class="btn-secondary">Avbryt</NuxtLink>
          </div>
        </form>
      </div>

      <!-- Booking Summary -->
      <div class="card h-fit sticky top-8">
        <h2 class="text-xl font-semibold text-white mb-4">Reservasjonssammendrag</h2>
        
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Innsjekk</span>
            <span class="text-white">{{ checkInDate || 'Ikke valgt' }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Utsjekk</span>
            <span class="text-white">{{ checkOutDate || 'Ikke valgt' }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Netter</span>
            <span class="text-white">{{ nights }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Romtype</span>
            <span class="text-white">{{ selectedRoomType || 'Ikke valgt' }}</span>
          </div>
        </div>

        <div class="border-t border-[#2a2a2a] pt-4 space-y-2">
          <div class="flex justify-between text-gray-400">
            <span>Romsats</span>
            <span>${{ roomRate }}</span>
          </div>
          <div class="flex justify-between text-gray-400">
            <span>Moms (10%)</span>
            <span>${{ tax }}</span>
          </div>
          <div class="flex justify-between text-white text-lg font-bold pt-2 border-t border-[#2a2a2a]">
            <span>Total</span>
            <span>${{ total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const checkInDate = ref('')
const checkOutDate = ref('')
const selectedRoomType = ref('')

const roomRates = {
  single: 89,
  double: 129,
  suite: 249,
  deluxe: 189
}

const nights = computed(() => {
  if (!checkInDate.value || !checkOutDate.value) return 0
  const start = new Date(checkInDate.value)
  const end = new Date(checkOutDate.value)
  const diff = end.getTime() - start.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
})

const roomRate = computed(() => {
  if (!selectedRoomType.value) return 0
  return roomRates[selectedRoomType.value as keyof typeof roomRates] * nights.value
})

const tax = computed(() => {
  return Number((roomRate.value * 0.1).toFixed(2))
})

const total = computed(() => {
  return Number((roomRate.value + tax.value).toFixed(2))
})

const submitBooking = () => {
  // This will be connected to your Neon database
  alert('Booking created! (Connect to Neon DB)')
}
</script>
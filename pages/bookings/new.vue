<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">New Booking</h1>
      <p class="text-gray-400">Create a new room reservation</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Booking Form -->
      <div class="lg:col-span-2 card">
        <form @submit.prevent="submitBooking" class="space-y-6">
          <!-- Guest Information -->
          <div>
            <h2 class="text-xl font-semibold text-white mb-4">Guest Information</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">First Name</label>
                <input type="text" class="input" placeholder="John" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Last Name</label>
                <input type="text" class="input" placeholder="Doe" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email" class="input" placeholder="john@example.com" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Phone</label>
                <input type="tel" class="input" placeholder="+1 (555) 123-4567" required />
              </div>
            </div>
          </div>

          <!-- Booking Details -->
          <div>
            <h2 class="text-xl font-semibold text-white mb-4">Booking Details</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-2">Check-in Date</label>
                <input type="date" class="input" v-model="checkInDate" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Check-out Date</label>
                <input type="date" class="input" v-model="checkOutDate" required />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Room Type</label>
                <select class="input" v-model="selectedRoomType" required>
                  <option value="">Select room type</option>
                  <option value="single">Single - $89/night</option>
                  <option value="double">Double - $129/night</option>
                  <option value="suite">Suite - $249/night</option>
                  <option value="deluxe">Deluxe - $189/night</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Number of Guests</label>
                <select class="input" required>
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Special Requests -->
          <div>
            <label class="block text-sm text-gray-400 mb-2">Special Requests</label>
            <textarea class="input" rows="3" placeholder="Any special requirements..."></textarea>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button type="submit" class="btn-primary">Create Booking</button>
            <NuxtLink to="/bookings" class="btn-secondary">Cancel</NuxtLink>
          </div>
        </form>
      </div>

      <!-- Booking Summary -->
      <div class="card h-fit sticky top-8">
        <h2 class="text-xl font-semibold text-white mb-4">Booking Summary</h2>
        
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Check-in</span>
            <span class="text-white">{{ checkInDate || 'Not selected' }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Check-out</span>
            <span class="text-white">{{ checkOutDate || 'Not selected' }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Nights</span>
            <span class="text-white">{{ nights }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Room Type</span>
            <span class="text-white">{{ selectedRoomType || 'Not selected' }}</span>
          </div>
        </div>

        <div class="border-t border-[#2a2a2a] pt-4 space-y-2">
          <div class="flex justify-between text-gray-400">
            <span>Room Rate</span>
            <span>${{ roomRate }}</span>
          </div>
          <div class="flex justify-between text-gray-400">
            <span>Tax (10%)</span>
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
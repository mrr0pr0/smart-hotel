<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">New Booking</h1>
      <p class="text-gray-400">Create a new reservation</p>
    </div>

    <div class="max-w-3xl">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Guest Information -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Guest Information</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input v-model="form.guestName" type="text" class="input" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input v-model="form.email" type="email" class="input" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input v-model="form.phone" type="tel" class="input" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">ID Number</label>
              <input v-model="form.idNumber" type="text" class="input" required />
            </div>
          </div>
        </div>

        <!-- Booking Details -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Booking Details</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Room Type</label>
              <select v-model="form.roomType" class="input" required>
                <option value="">Select room type</option>
                <option value="single">Single - $89/night</option>
                <option value="double">Double - $129/night</option>
                <option value="suite">Suite - $249/night</option>
                <option value="deluxe">Deluxe - $189/night</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Number of Guests</label>
              <input v-model.number="form.guests" type="number" min="1" class="input" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Check-in Date</label>
              <input v-model="form.checkIn" type="date" class="input" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Check-out Date</label>
              <input v-model="form.checkOut" type="date" class="input" required />
            </div>
          </div>
        </div>

        <!-- Special Requests -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Special Requests</h2>
          <textarea v-model="form.specialRequests" class="input" rows="4" placeholder="Any special requirements..."></textarea>
        </div>

        <!-- Actions -->
        <div class="flex gap-4">
          <button type="submit" class="btn-primary flex-1">Create Booking</button>
          <NuxtLink to="/bookings" class="btn-secondary flex-1 text-center">Cancel</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const form = ref({
  guestName: '',
  email: '',
  phone: '',
  idNumber: '',
  roomType: '',
  guests: 1,
  checkIn: '',
  checkOut: '',
  specialRequests: ''
})

const handleSubmit = () => {
  console.log('New booking:', form.value)
  navigateTo('/bookings')
}
</script>
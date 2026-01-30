<template>
  <div class="p-8">
    <!-- Back Button -->
    <NuxtLink to="/rooms" class="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Rooms
    </NuxtLink>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Room Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Room Image -->
        <div class="card">
          <div class="aspect-video bg-[#111111] rounded-lg flex items-center justify-center mb-4">
            <svg class="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>

          <div class="flex items-start justify-between mb-4">
            <div>
              <h1 class="text-3xl font-bold text-white mb-2">Room {{ room.number }}</h1>
              <p class="text-xl text-gray-400">{{ room.type }}</p>
            </div>
            <span :class="room.status === 'available' ? 'badge-success' : room.status === 'occupied' ? 'badge-danger' : 'badge-warning'">
              {{ room.status }}
            </span>
          </div>

          <p class="text-gray-400 mb-6">{{ room.description }}</p>

          <div class="flex items-center gap-4">
            <div class="text-3xl font-bold text-white">${{ room.price }}</div>
            <span class="text-gray-400">per night</span>
          </div>
        </div>

        <!-- Room Features -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Room Features</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="feature in room.features" :key="feature" class="flex items-center gap-3">
              <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-300">{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Booking History -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Recent Bookings</h2>
          <div class="space-y-3">
            <div v-for="booking in room.bookings" :key="booking.id" class="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
              <div>
                <p class="font-medium text-white">{{ booking.guest }}</p>
                <p class="text-sm text-gray-400">{{ booking.dates }}</p>
              </div>
              <span class="badge-info">{{ booking.nights }} nights</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div class="space-y-3">
            <button class="btn-primary w-full">Book Room</button>
            <button class="btn-secondary w-full">Mark as Maintenance</button>
            <button class="btn-secondary w-full">View Schedule</button>
            <button class="btn-ghost w-full">Edit Details</button>
          </div>
        </div>

        <!-- Room Info -->
        <div class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Room Information</h2>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Floor</span>
              <span class="text-white">{{ room.floor }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Capacity</span>
              <span class="text-white">{{ room.capacity }} guests</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Size</span>
              <span class="text-white">{{ room.size }} sq ft</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">View</span>
              <span class="text-white">{{ room.view }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Last Cleaned</span>
              <span class="text-white">{{ room.lastCleaned }}</span>
            </div>
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
const room = ref({
  id: route.params.id,
  number: '301',
  type: 'Deluxe Suite',
  status: 'available',
  price: 249,
  floor: 3,
  capacity: 4,
  size: 450,
  view: 'Ocean View',
  lastCleaned: '2 hours ago',
  description: 'Spacious deluxe suite with panoramic ocean views, separate living area, and premium amenities.',
  features: [
    'King Size Bed',
    'Ocean View',
    'Mini Bar',
    'Smart TV',
    'Air Conditioning',
    'Free WiFi',
    'Room Service',
    'Safe Box'
  ],
  bookings: [
    { id: 1, guest: 'John Doe', dates: 'Jan 20-23, 2026', nights: 3 },
    { id: 2, guest: 'Jane Smith', dates: 'Jan 15-17, 2026', nights: 2 },
    { id: 3, guest: 'Mike Johnson', dates: 'Jan 10-12, 2026', nights: 2 }
  ]
})
</script>
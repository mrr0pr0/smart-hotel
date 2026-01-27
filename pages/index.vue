<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p class="text-gray-400">Welcome back! Here's what's happening today.</p>
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
          <span class="badge-success">+12%</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Total Rooms</h3>
        <p class="text-3xl font-bold text-white">156</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="badge-success">Available</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Occupied Rooms</h3>
        <p class="text-3xl font-bold text-white">92</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="badge-warning">Pending</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Today's Bookings</h3>
        <p class="text-3xl font-bold text-white">24</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="badge-success">+8%</span>
        </div>
        <h3 class="text-gray-400 text-sm mb-1">Today's Revenue</h3>
        <p class="text-3xl font-bold text-white">$12,450</p>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Recent Bookings -->
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Recent Bookings</h2>
        <div class="space-y-3">
          <div v-for="i in 5" :key="i" class="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold">JD</span>
              </div>
              <div>
                <p class="text-sm font-medium text-white">John Doe</p>
                <p class="text-xs text-gray-500">Room 301 - Suite</p>
              </div>
            </div>
            <span class="badge-success">Active</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 gap-3">
          <NuxtLink to="/bookings/new" class="btn-primary text-center">New Booking</NuxtLink>
          <NuxtLink to="/rooms" class="btn-secondary text-center">Manage Rooms</NuxtLink>
          <NuxtLink to="/restaurant" class="btn-accent text-center">Restaurant Orders</NuxtLink>
          <NuxtLink to="/room-service" class="btn-ghost text-center">Room Service</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
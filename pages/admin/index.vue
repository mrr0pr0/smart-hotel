<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
      <p class="text-gray-400">System overview and analytics</p>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Total Revenue</h3>
        <p class="text-3xl font-bold text-white">$124,500</p>
        <span class="badge-success mt-2">+12.5%</span>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Occupancy Rate</h3>
        <p class="text-3xl font-bold text-white">78%</p>
        <span class="badge-success mt-2">+5.2%</span>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Total Staff</h3>
        <p class="text-3xl font-bold text-white">45</p>
        <span class="badge-info mt-2">Active</span>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Guest Satisfaction</h3>
        <p class="text-3xl font-bold text-white">4.8/5</p>
        <span class="badge-success mt-2">Excellent</span>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid lg:grid-cols-2 gap-6">
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Revenue Trend</h2>
        <div class="h-64 bg-[#111111] rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart placeholder</p>
        </div>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Room Occupancy</h2>
        <div class="h-64 bg-[#111111] rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart placeholder</p>
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
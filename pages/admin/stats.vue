<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Statistics & Analytics</h1>
      <p class="text-gray-400">Detailed performance metrics and insights</p>
    </div>

    <!-- Date Range Filter -->
    <div class="card mb-6">
      <div class="flex gap-4 items-center">
        <label class="text-sm text-gray-400">Date Range:</label>
        <select class="input flex-1 max-w-xs">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last Year</option>
          <option>Custom Range</option>
        </select>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-gray-400 text-sm">Total Revenue</h3>
          <span class="badge-success">+18%</span>
        </div>
        <p class="text-3xl font-bold text-white mb-1">$245,890</p>
        <p class="text-xs text-gray-500">vs last period: $208,210</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-gray-400 text-sm">Avg Occupancy</h3>
          <span class="badge-success">+5%</span>
        </div>
        <p class="text-3xl font-bold text-white mb-1">78.5%</p>
        <p class="text-xs text-gray-500">vs last period: 74.2%</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-gray-400 text-sm">Total Bookings</h3>
          <span class="badge-success">+12%</span>
        </div>
        <p class="text-3xl font-bold text-white mb-1">1,248</p>
        <p class="text-xs text-gray-500">vs last period: 1,114</p>
      </div>

      <div class="card">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-gray-400 text-sm">Avg Stay Duration</h3>
          <span class="badge-info">Stable</span>
        </div>
        <p class="text-3xl font-bold text-white mb-1">3.2 days</p>
        <p class="text-xs text-gray-500">vs last period: 3.1 days</p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid lg:grid-cols-2 gap-6 mb-8">
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Revenue Trend</h2>
        <div class="h-80 bg-[#111111] rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart.js integration point</p>
        </div>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Occupancy Rate</h2>
        <div class="h-80 bg-[#111111] rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Chart.js integration point</p>
        </div>
      </div>
    </div>

    <!-- Detailed Breakdown -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Revenue by Room Type -->
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Revenue by Room Type</h2>
        <div class="space-y-4">
          <div v-for="type in roomTypes" :key="type.name" class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-400">{{ type.name }}</span>
                <span class="text-sm font-semibold text-white">${{ type.revenue.toLocaleString() }}</span>
              </div>
              <div class="w-full bg-[#111111] rounded-full h-2">
                <div class="bg-primary-600 h-2 rounded-full" :style="{ width: type.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performing Months -->
      <div class="card">
        <h2 class="text-xl font-semibold text-white mb-4">Monthly Performance</h2>
        <div class="space-y-3">
          <div v-for="month in months" :key="month.name" class="flex items-center justify-between p-3 bg-[#111111] rounded-lg">
            <div>
              <p class="font-semibold text-white">{{ month.name }}</p>
              <p class="text-xs text-gray-400">{{ month.bookings }} bookings</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-white">${{ month.revenue.toLocaleString() }}</p>
              <span :class="month.growth >= 0 ? 'badge-success' : 'badge-danger'">
                {{ month.growth >= 0 ? '+' : '' }}{{ month.growth }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const roomTypes = ref([
  { name: 'Suite', revenue: 89450, percentage: 36 },
  { name: 'Deluxe', revenue: 72340, percentage: 29 },
  { name: 'Double', revenue: 54890, percentage: 22 },
  { name: 'Single', revenue: 29210, percentage: 13 },
])

const months = ref([
  { name: 'January 2026', bookings: 342, revenue: 68450, growth: 18 },
  { name: 'December 2025', bookings: 398, revenue: 82340, growth: 22 },
  { name: 'November 2025', bookings: 287, revenue: 54210, growth: -5 },
  { name: 'October 2025', bookings: 321, revenue: 62890, growth: 12 },
])
</script>
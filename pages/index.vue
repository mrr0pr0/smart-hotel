<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="max-w-4xl w-full space-y-8">
      <!-- Header -->
      <div class="text-center space-y-4">
        <h1 class="text-gradient text-6xl font-bold">SmartStay</h1>
        <p class="text-gray-400 text-xl">Professional Hotel Management System</p>
      </div>

      <!-- Feature Cards -->
      <div class="grid md:grid-cols-3 gap-6">
        <div class="card-hover">
          <div class="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Room Management</h3>
          <p class="text-gray-400">Manage rooms, bookings, and availability in real-time</p>
        </div>

        <div class="card-hover">
          <div class="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Restaurant POS</h3>
          <p class="text-gray-400">Complete restaurant and kitchen management system</p>
        </div>

        <div class="card-hover">
          <div class="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Room Service</h3>
          <p class="text-gray-400">Track and manage room service orders efficiently</p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4 justify-center">
        <button class="btn-primary">Get Started</button>
        <button class="btn-secondary">Learn More</button>
      </div>

      <!-- Badges Demo -->
      <div class="flex gap-3 justify-center flex-wrap">
        <span class="badge-success">Available</span>
        <span class="badge-warning">Pending</span>
        <span class="badge-danger">Occupied</span>
        <span class="badge-info">Reserved</span>
      </div>
    </div>
  </div>
</template>
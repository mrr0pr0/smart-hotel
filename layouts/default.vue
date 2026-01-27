<template>
  <div class="flex h-screen bg-dark-bg overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-dark-surface border-r border-dark-border flex flex-col">
      <!-- Logo -->
      <div class="p-6 border-b border-dark-border">
        <h1 class="text-2xl font-bold text-gradient">SmartStay</h1>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        <NuxtLink to="/" class="nav-item">
          <HomeIcon class="w-5 h-5" />
          <span>Dashboard</span>
        </NuxtLink>

        <NuxtLink to="/rooms" class="nav-item">
          <BuildingOfficeIcon class="w-5 h-5" />
          <span>Rooms</span>
        </NuxtLink>

        <NuxtLink to="/bookings" class="nav-item">
          <CalendarIcon class="w-5 h-5" />
          <span>Bookings</span>
        </NuxtLink>

        <NuxtLink to="/restaurant" class="nav-item">
          <CakeIcon class="w-5 h-5" />
          <span>Restaurant</span>
        </NuxtLink>

        <NuxtLink to="/room-service" class="nav-item">
          <BellIcon class="w-5 h-5" />
          <span>Room Service</span>
        </NuxtLink>

        <NuxtLink to="/admin" class="nav-item">
          <Cog6ToothIcon class="w-5 h-5" />
          <span>Admin</span>
        </NuxtLink>
      </nav>

      <!-- User section -->
      <div class="p-4 border-t border-dark-border">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <UserIcon class="w-6 h-6 text-white" />
          </div>
          <div>
            <p class="text-sm font-medium text-white">Admin User</p>
            <p class="text-xs text-gray-500">admin@hotel.com</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CakeIcon,
  BellIcon,
  Cog6ToothIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
</script>
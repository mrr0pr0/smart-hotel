<template>
  <header class="bg-[#111111] border-b border-[#2a2a2a] px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left side -->
      <div class="flex items-center gap-4">
        <button
          class="lg:hidden text-gray-400 hover:text-white"
          @click="emit('toggle-sidebar')"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 class="text-xl font-semibold text-white">{{ title }}</h2>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-4">
        <!-- Notifications -->
        <button class="relative text-gray-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ notificationCount }}
          </span>
        </button>

        <!-- User menu -->
        <div class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#222222] cursor-pointer">
          <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <span class="text-sm font-semibold text-white">{{ userInitials }}</span>
          </div>
          <div class="hidden md:block">
            <p class="text-sm font-medium text-white">{{ userName }}</p>
            <p class="text-xs text-gray-500">{{ userRole }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  userName?: string
  userRole?: string
  notificationCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Dashboard',
  userName: 'Admin User',
  userRole: 'Administrator',
  notificationCount: 0
})

const emit = defineEmits<{
  'toggle-sidebar': []
}>()

const userInitials = computed(() => {
  const names = props.userName.split(' ')
  return names.map(n => n[0]).join('').toUpperCase()
})
</script>
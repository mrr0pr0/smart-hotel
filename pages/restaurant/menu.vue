<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Menystyring</h1>
        <p class="text-gray-400">Administrer restaurantmenyelementer</p>
      </div>
      <button class="btn-primary" @click="showAddModal = true">Legg Til Menyelement</button>
    </div>

    <!-- Category Tabs -->
    <div class="card mb-6">
      <div class="flex gap-3 overflow-x-auto pb-2">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="activeCategory === cat ? 'btn-primary' : 'btn-secondary'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Menu Items Grid -->
    <div v-if="filteredItems.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in filteredItems" :key="item.id" class="card">
        <div class="aspect-video bg-[#111111] rounded-lg mb-4 flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-lg font-semibold text-white">{{ item.name }}</h3>
            <p class="text-sm text-gray-400">{{ item.description }}</p>
          </div>
          <span :class="item.available ? 'badge-success' : 'badge-danger'">
            {{ item.available ? 'Tilgjengelig' : 'Utsolgt' }}
          </span>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-2xl font-bold text-white">${{ item.price }}</p>
          <div class="flex gap-2">
            <button class="btn-ghost text-sm px-2 py-1">Rediger</button>
            <button class="btn-ghost text-sm px-2 py-1 text-red-400">Slett</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card text-center py-12">
      <p class="text-gray-500">Ingen menyelementer funnet — databasen er tom.</p>
    </div>

    <!-- Add Item Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showAddModal = false">
      <div class="card max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-white mb-4">Legg Til Menyelement</h2>
        <form @submit.prevent="addItem" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Varennavn</label>
            <input type="text" class="input" placeholder="Grillet Laks" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Beskrivelse</label>
            <textarea class="input" rows="2" placeholder="Fersk atlantisk laks..." required></textarea>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Kategori</label>
            <select class="input" required>
              <option>Frokost</option>
              <option>Lunsj</option>
              <option>Middag</option>
              <option>Drikke</option>
              <option>Dessert</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Pris</label>
            <input type="number" class="input" placeholder="24.99" step="0.01" required />
          </div>
          <div class="flex gap-3">
            <button type="submit" class="btn-primary">Legg til Vare</button>
            <button type="button" class="btn-secondary" @click="showAddModal = false">Avbryt</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import type { MenuItem } from '~/types/order'

const showAddModal = ref(false)
const activeCategory = ref('All')

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Drinks', 'Desserts']

// Fetch menu items from backend
const { data: menuResp, pending: menuPending, error: menuError } = await useAsyncData<{ success: boolean; data: MenuItem[] }>('menuItems', () =>
  $fetch('/api/restaurant/menu').catch(() => ({ success: false, data: [] }))
)

const menuItems = computed<MenuItem[]>(() => (menuResp?.value && Array.isArray(menuResp.value.data)) ? menuResp.value.data : [])

const filteredItems = computed(() => {
  if (activeCategory.value === 'All') return menuItems.value
  return menuItems.value.filter(item => item.category === activeCategory.value)
})

const addItem = () => {
  showAddModal.value = false
  alert('Menu item added! (Connect to Neon DB)')
}
</script>
<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Restaurant</h1>
      <p class="text-gray-400">Administrer restaurantbestillinger og meny</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Menu Categories -->
      <div class="lg:col-span-2">
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

        <!-- Menu Items -->
        <div v-if="menuItems.length > 0" class="grid md:grid-cols-2 gap-4">
          <div v-for="item in menuItems" :key="item.id" class="card-hover">
            <div class="flex gap-4">
              <div class="w-20 h-20 bg-[#111111] rounded-lg flex-shrink-0"></div>
              <div class="flex-1">
                <h3 class="font-semibold text-white mb-1">{{ item.name }}</h3>
                <p class="text-xs text-gray-400 mb-2">{{ item.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-white">${{ item.price }}</span>
                  <button class="btn-primary text-xs px-2 py-1">Legg til Bestilling</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="card text-center py-8 col-span-full">Ingen menyelementer funnet — databasen er tom.</div>
      </div>

      <!-- Current Order -->
      <div class="card h-fit sticky top-8">
        <h2 class="text-xl font-semibold text-white mb-4">Gjeldende Bestilling</h2>
        <div class="space-y-3 mb-6">
          <p class="text-sm text-gray-400 text-center py-8">Ingen varer lagt til ennå</p>
        </div>
        <div class="border-t border-[#2a2a2a] pt-4 space-y-2">
          <div class="flex justify-between text-gray-400">
            <span>Mellomsum</span>
            <span>$0.00</span>
          </div>
          <div class="flex justify-between text-gray-400">
            <span>Moms (10%)</span>
            <span>$0.00</span>
          </div>
          <div class="flex justify-between text-white text-lg font-bold pt-2 border-t border-[#2a2a2a]">
            <span>Total</span>
            <span>$0.00</span>
          </div>
        </div>
        <button class="btn-primary w-full mt-4">Plasser Bestilling</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import type { MenuItem } from '~/types/order'

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Drinks', 'Desserts']
const activeCategory = ref('All')

const { data: menuResp, pending: menuPending, error: menuError } = await useAsyncData<{ success: boolean; data: MenuItem[] }>('menu', () =>
  $fetch('/api/restaurant/menu').catch(() => ({ success: false, data: [] }))
)

const menuItems = computed<MenuItem[]>(() => (menuResp?.value && Array.isArray(menuResp.value.data)) ? menuResp.value.data : [])
</script>
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
                  <button @click="addToCart(item)" class="btn-primary text-xs px-2 py-1">Legg til Bestilling</button>
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
          <div v-if="cart.length > 0" class="space-y-2">
            <div v-for="item in cart" :key="item.id" class="flex justify-between text-sm">
              <span class="text-gray-400">{{ item.name }} × {{ item.qty }}</span>
              <span class="text-white">${{ (item.price * item.qty).toFixed(2) }}</span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400 text-center py-8">Ingen varer lagt til ennå</p>
        </div>
        <div class="border-t border-[#2a2a2a] pt-4 space-y-2">
          <div class="flex justify-between text-gray-400">
            <span>Mellomsum</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-gray-400">
            <span>Moms (10%)</span>
            <span>${{ cartTax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-white text-lg font-bold pt-2 border-t border-[#2a2a2a]">
            <span>Total</span>
            <span>${{ cartGrandTotal.toFixed(2) }}</span>
          </div>
        </div>
        <button @click="placeOrder" class="btn-primary w-full mt-4">Plasser Bestilling</button>
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
const cart = ref<Array<{ id: string; name: string; price: number; qty: number }>>([])

const { data: menuResp, pending: menuPending, error: menuError } = await useAsyncData<{ success: boolean; data: MenuItem[] }>('menu', () =>
  $fetch('/api/restaurant/menu').catch(() => ({ success: false, data: [] }))
)

const menuItems = computed<MenuItem[]>(() => (menuResp?.value && Array.isArray(menuResp.value.data)) ? menuResp.value.data : [])

const addToCart = (item: MenuItem) => {
  const existingItem = cart.value.find(c => c.id === item.id)
  if (existingItem) {
    existingItem.qty++
  } else {
    cart.value.push({ id: item.id, name: item.name, price: item.price, qty: 1 })
  }
}

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

const cartTax = computed(() => {
  return Math.round(cartTotal.value * 0.1 * 100) / 100
})

const cartGrandTotal = computed(() => {
  return cartTotal.value + cartTax.value
})

const placeOrder = async () => {
  if (cart.value.length === 0) {
    alert('Legg til varer før du legger inn bestilling')
    return
  }
  try {
    await $fetch('/api/restaurant/orders', {
      method: 'POST',
      body: { items: cart.value, total: cartGrandTotal.value }
    })
    cart.value = []
    alert('Bestilling sendt!')
  } catch (e) {
    alert('Feil ved sending av bestilling')
  }
}
</script>
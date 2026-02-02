<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold text-white mb-4">{{ category }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MenuItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @click="emit('item-click', item)"
        @add-to-cart="emit('add-to-cart', item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/order'

interface Props {
  category: string
  items: MenuItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  'item-click': [item: MenuItem]
  'add-to-cart': [item: MenuItem]
}>()
</script>
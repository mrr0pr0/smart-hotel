<template>
  <div class="card-hover" @click="handleClick">
    <div class="aspect-square bg-[#111111] rounded-lg mb-4 overflow-hidden">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
    </div>
    
    <div class="flex items-start justify-between mb-2">
      <h3 class="text-lg font-semibold text-white">{{ item.name }}</h3>
      <Badge v-if="!item.available" variant="danger">Unavailable</Badge>
    </div>
    
    <p class="text-sm text-gray-400 mb-4 line-clamp-2">{{ item.description }}</p>
    
    <div class="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
      <span class="text-xl font-bold text-white">${{ item.price }}</span>
      <Button size="sm" :disabled="!item.available" @click.stop="handleAddToCart">
        Add to Cart
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/order'

interface Props {
  item: MenuItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [item: MenuItem]
  'add-to-cart': [item: MenuItem]
}>()

const handleClick = () => {
  emit('click', props.item)
}

const handleAddToCart = () => {
  emit('add-to-cart', props.item)
}
</script>
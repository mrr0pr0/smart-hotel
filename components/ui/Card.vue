<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-[#2a2a2a]">
      <slot name="header">
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      </slot>
    </div>
    <div :class="bodyClasses">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-[#2a2a2a]">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  hover?: boolean
  padding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hover: false,
  padding: true
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] shadow-lg transition-all duration-200'
  const hoverClasses = props.hover ? 'hover:shadow-xl hover:border-gray-700 hover:-translate-y-1 cursor-pointer' : ''
  
  return [baseClasses, hoverClasses].join(' ')
})

const bodyClasses = computed(() => {
  return props.padding ? 'p-6' : ''
})
</script>
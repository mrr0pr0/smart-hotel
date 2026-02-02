<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 mb-1">{{ title }}</p>
        <p class="text-3xl font-bold text-white">{{ value }}</p>
        <p v-if="change" :class="changeClasses" class="text-sm mt-2 flex items-center gap-1">
          <svg v-if="changeType === 'increase'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="changeType === 'decrease'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          {{ change }}
        </p>
      </div>
      <div :class="iconBgClass" class="w-14 h-14 rounded-lg flex items-center justify-center">
        <component :is="icon" class="w-7 h-7" :class="iconColorClass" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease' | 'neutral'
  icon: any
  color?: 'primary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  changeType: 'neutral',
  color: 'primary'
})

const changeClasses = computed(() => {
  if (props.changeType === 'increase') return 'text-green-400'
  if (props.changeType === 'decrease') return 'text-red-400'
  return 'text-gray-400'
})

const iconBgClass = computed(() => {
  const classes = {
    primary: 'bg-primary-500/20',
    success: 'bg-green-500/20',
    warning: 'bg-yellow-500/20',
    danger: 'bg-red-500/20'
  }
  return classes[props.color]
})

const iconColorClass = computed(() => {
  const classes = {
    primary: 'text-primary-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400'
  }
  return classes[props.color]
})
</script>
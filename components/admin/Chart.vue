<template>
  <div class="card">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
    </div>
    <div class="h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface Props {
  title: string
  subtitle?: string
  type: 'line' | 'bar' | 'doughnut' | 'pie'
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string
      borderWidth?: number
    }[]
  }
}

const props = defineProps<Props>()

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const createChart = () => {
  if (!chartCanvas.value) return

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  chartInstance = new Chart(ctx, {
    type: props.type,
    data: props.data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#9CA3AF'
          }
        }
      },
      scales: props.type === 'line' || props.type === 'bar' ? {
        x: {
          ticks: {
            color: '#9CA3AF'
          },
          grid: {
            color: '#2a2a2a'
          }
        },
        y: {
          ticks: {
            color: '#9CA3AF'
          },
          grid: {
            color: '#2a2a2a'
          }
        }
      } : undefined
    }
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.data, () => {
  createChart()
}, { deep: true })
</script>
<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 bg-[#111111] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-[#2a2a2a]"
          >
            {{ column.label }}
          </th>
          <th v-if="$slots.actions" class="px-6 py-3 bg-[#111111] text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-[#2a2a2a]">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="hover:bg-[#222222] transition-colors"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 text-gray-300 border-b border-[#2a2a2a]"
          >
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="px-6 py-4 text-gray-300 border-b border-[#2a2a2a]">
            <slot name="actions" :row="row" />
          </td>
        </tr>
        <tr v-if="!data || data.length === 0">
          <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="px-6 py-8 text-center text-gray-500">
            <slot name="empty">
              No data available
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
}

interface Props {
  columns: Column[]
  data: any[]
}

defineProps<Props>()
</script>
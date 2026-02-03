<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Personalstyring</h1>
        <p class="text-gray-400">Administrer hotellpersonalet og skift</p>
      </div>
      <NuxtLink to="/staff/new" class="btn-primary">Legg til personalet</NuxtLink>
    </div>

    <!-- Staff List -->
    <div class="card overflow-hidden">
      <table v-if="staffList.length > 0" class="table">
        <thead>
        <tr>
          <th>Navn</th>
          <th>Rolle</th>
          <th>Avdeling</th>
          <th>Status</th>
          <th>Skift</th>
          <th>Handling</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="staff in staffList" :key="staff.id">
          <td>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-xs font-semibold">{{ staff.initials }}</span>
              </div>
              <span>{{ staff.name }}</span>
            </div>
          </td>
          <td>{{ staff.role }}</td>
          <td>{{ staff.department }}</td>
          <td>
              <span :class="staff.status === 'active' ? 'badge-success' : 'badge-danger'">
                {{ staff.status }}
              </span>
          </td>
          <td>{{ staff.shift }}</td>
          <td>
            <NuxtLink :to="`/staff/${staff.id}`" class="btn-ghost text-xs px-2 py-1">Rediger</NuxtLink>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-else class="p-8 text-center text-gray-500">Ingen ansatte funnet — databasen er tom.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

// Fetch staff list from backend
import type { User } from '~/types/auth'

const { data: staffResp, pending: staffPending, error: staffError } = await useAsyncData<{ success: boolean; data: User[] }>('staff', () =>
  $fetch('/api/admin/users').catch(() => ({ success: false, data: [] }))
)

const staffList = computed<User[]>(() => (staffResp?.value && Array.isArray(staffResp.value.data)) ? staffResp.value.data : [])
</script>
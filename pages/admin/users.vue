<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Brukeradministrasjon</h1>
        <p class="text-gray-400">Administrer personalkontoer og tillatelser</p>
      </div>
      <button class="btn-primary" @click="showAddModal = true">Legg Til Ny Bruker</button>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Totalt Brukere</h3>
        <p class="text-3xl font-bold text-white">48</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Aktiv</h3>
        <p class="text-3xl font-bold text-green-400">42</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Administratorer</h3>
        <p class="text-3xl font-bold text-blue-400">5</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Inaktiv</h3>
        <p class="text-3xl font-bold text-red-400">6</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <select class="input flex-1">
          <option>Alle Roller</option>
          <option>Administrator</option>
          <option>Resepsjonist</option>
          <option>Kjøkkenpersonale</option>
          <option>Romservice</option>
          <option>Rengjøring</option>
        </select>
        <select class="input flex-1">
          <option>Alle Status</option>
          <option>Aktiv</option>
          <option>Inaktiv</option>
        </select>
        <input type="text" class="input flex-1" placeholder="Søk etter brukere..." />
      </div>
    </div>

    <!-- Users Table -->
    <div class="card overflow-hidden">
      <table v-if="users.length > 0" class="table">
        <thead>
          <tr>
            <th>Bruker</th>
            <th>E-post</th>
            <th>Rolle</th>
            <th>Avdeling</th>
            <th>Status</th>
            <th>Siste Innlogging</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <span class="text-sm font-semibold">{{ user.initials }}</span>
                </div>
                <span class="font-medium">{{ user.name }}</span>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span class="badge-info">{{ user.role }}</span>
            </td>
            <td>{{ user.department }}</td>
            <td>
              <span :class="user.status === 'active' ? 'badge-success' : 'badge-danger'">
                {{ user.status }}
              </span>
            </td>
            <td>{{ user.lastLogin }}</td>
            <td>
              <div class="flex gap-2">
                <button class="btn-ghost text-xs px-2 py-1">Rediger</button>
                <button class="btn-ghost text-xs px-2 py-1 text-red-400">Deaktiver</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="p-8 text-center text-gray-500">Ingen brukere funnet — databasen er tom.</div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showAddModal = false">
      <div class="card max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-white mb-4">Legg Til Ny Bruker</h2>
        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Fullt Navn</label>
            <input type="text" class="input" placeholder="John Doe" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">E-post</label>
            <input type="email" class="input" placeholder="john@hotel.com" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Rolle</label>
            <select class="input" required>
              <option>Administrator</option>
              <option>Resepsjonist</option>
              <option>Kjøkkenpersonale</option>
              <option>Romservice</option>
              <option>Rengjøring</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Avdeling</label>
            <select class="input" required>
              <option>Ledelse</option>
              <option>Resepsjon</option>
              <option>Kjøkken</option>
              <option>Restaurant</option>
              <option>Rengjøring</option>
            </select>
          </div>
          <div class="flex gap-3">
            <button type="submit" class="btn-primary">Legg til Bruker</button>
            <button type="button" class="btn-secondary" @click="showAddModal = false">Avbryt</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const showAddModal = ref(false)

import type { User } from '~/types/auth'

const { data: usersResp, pending: usersPending, error: usersError } = await useAsyncData<{ success: boolean; data: User[] }>('adminUsers', () =>
  $fetch('/api/admin/users').catch(() => ({ success: false, data: [] }))
)

const users = computed<User[]>(() => (usersResp?.value && Array.isArray(usersResp.value.data)) ? usersResp.value.data : [])

const addUser = () => {
  showAddModal.value = false
  alert('User added! (Connect to Neon DB)')
}
</script>
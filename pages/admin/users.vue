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
        <p class="text-3xl font-bold text-white">{{ users.length }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Aktiv</h3>
        <p class="text-3xl font-bold text-green-400">{{ activeCount }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Administratorer</h3>
        <p class="text-3xl font-bold text-blue-400">{{ adminCount }}</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Inaktiv</h3>
        <p class="text-3xl font-bold text-red-400">{{ inactiveCount }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <select class="input flex-1" v-model="filterRole">
          <option value="">Alle Roller</option>
          <option value="admin">Administrator</option>
          <option value="receptionist">Resepsjonist</option>
          <option value="chef">Kjøkkenpersonale</option>
          <option value="waiter">Servitør</option>
          <option value="housekeeper">Rengjøring</option>
          <option value="room-service">Romservice</option>
        </select>
        <select class="input flex-1" v-model="filterStatus">
          <option value="">Alle Status</option>
          <option value="active">Aktiv</option>
          <option value="inactive">Inaktiv</option>
        </select>
        <input type="text" class="input flex-1" placeholder="Søk etter brukere..." v-model="searchQuery" />
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="card bg-green-900/20 border-green-500 mb-6">
      <p class="text-green-400">{{ successMessage }}</p>
    </div>
    <div v-if="errorMessage" class="card bg-red-900/20 border-red-500 mb-6">
      <p class="text-red-400">{{ errorMessage }}</p>
    </div>

    <!-- Users Table -->
    <div class="card overflow-hidden">
      <table v-if="filteredUsers.length > 0" class="table">
        <thead>
          <tr>
            <th>Bruker</th>
            <th>E-post</th>
            <th>Rolle</th>
            <th>Avdeling</th>
            <th>Status</th>
            <th>Opprettet</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <span class="text-sm font-semibold">{{ getInitials(user.name) }}</span>
                </div>
                <span class="font-medium">{{ user.name }}</span>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span class="badge-info">{{ user.role }}</span>
            </td>
            <td>{{ user.department || 'N/A' }}</td>
            <td>
              <span :class="user.status === 'active' ? 'badge-success' : 'badge-danger'">
                {{ user.status }}
              </span>
            </td>
            <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
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
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="card max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-white mb-4">Legg Til Ny Bruker</h2>
        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Fullt Navn *</label>
            <input v-model="newUser.name" type="text" class="input" placeholder="John Doe" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">E-post *</label>
            <input v-model="newUser.email" type="email" class="input" placeholder="john@hotel.com" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Passord *</label>
            <input v-model="newUser.password" type="password" class="input" placeholder="••••••••" required minlength="6" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Telefon</label>
            <input v-model="newUser.phone" type="tel" class="input" placeholder="+47 123 45 678" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Rolle *</label>
            <select v-model="newUser.role" class="input" required>
              <option value="admin">Administrator</option>
              <option value="receptionist">Resepsjonist</option>
              <option value="chef">Kjøkkenpersonale</option>
              <option value="waiter">Servitør</option>
              <option value="housekeeper">Rengjøring</option>
              <option value="room-service">Romservice</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Avdeling</label>
            <select v-model="newUser.department" class="input">
              <option value="">Velg avdeling</option>
              <option value="Ledelse">Ledelse</option>
              <option value="Resepsjon">Resepsjon</option>
              <option value="Kjøkken">Kjøkken</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Rengjøring">Rengjøring</option>
            </select>
          </div>
          <div class="flex gap-3">
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Legger til...' : 'Legg til Bruker' }}
            </button>
            <button type="button" class="btn-secondary" @click="closeModal" :disabled="isSubmitting">Avbryt</button>
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

import type { User } from '~/types/auth'

const showAddModal = ref(false)
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Filters
const filterRole = ref('')
const filterStatus = ref('')
const searchQuery = ref('')

// New user form data
const newUser = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'receptionist',
  department: ''
})

const { data: usersResp, pending: usersPending, error: usersError, refresh: refreshUsers } = await useAsyncData<{ success: boolean; data: User[] }>('adminUsers', async () => {
  try {
    return await $fetch<{ success: boolean; data: User[] }>('/api/admin/users')
  } catch {
    return { success: false, data: [] }
  }
})

const users = computed<User[]>(() => usersResp.value?.data || [])

// Computed stats
const activeCount = computed(() => users.value.filter(u => u.status === 'active').length)
const inactiveCount = computed(() => users.value.filter(u => u.status === 'inactive').length)
const adminCount = computed(() => users.value.filter(u => u.role === 'admin').length)

// Filtered users
const filteredUsers = computed(() => {
  let filtered = users.value
  
  if (filterRole.value) {
    filtered = filtered.filter(u => u.role === filterRole.value)
  }
  
  if (filterStatus.value) {
    filtered = filtered.filter(u => u.status === filterStatus.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

const getInitials = (name: string) => {
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0]
  }
  return name.substring(0, 2).toUpperCase()
}

const addUser = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const response = await $fetch<{ success: boolean; message?: string }>('/api/admin/users/create', {
      method: 'POST',
      body: {
        name: newUser.value.name,
        email: newUser.value.email,
        password: newUser.value.password,
        phone: newUser.value.phone || null,
        role: newUser.value.role,
        department: newUser.value.department || null
      }
    })
    
    if (response.success) {
      successMessage.value = 'Bruker lagt til!'
      await refreshUsers()
      closeModal()
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Kunne ikke legge til bruker. Prøv igjen.'
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  // Reset form
  newUser.value = {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'receptionist',
    department: ''
  }
}
</script>
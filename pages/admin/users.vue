<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">User Management</h1>
        <p class="text-gray-400">Manage staff accounts and permissions</p>
      </div>
      <button class="btn-primary" @click="showAddModal = true">Add New User</button>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Total Users</h3>
        <p class="text-3xl font-bold text-white">48</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Active</h3>
        <p class="text-3xl font-bold text-green-400">42</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Admins</h3>
        <p class="text-3xl font-bold text-blue-400">5</p>
      </div>
      <div class="card">
        <h3 class="text-gray-400 text-sm mb-1">Inactive</h3>
        <p class="text-3xl font-bold text-red-400">6</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <select class="input flex-1">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Receptionist</option>
          <option>Kitchen Staff</option>
          <option>Room Service</option>
          <option>Housekeeping</option>
        </select>
        <select class="input flex-1">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input type="text" class="input flex-1" placeholder="Search users..." />
      </div>
    </div>

    <!-- Users Table -->
    <div class="card overflow-hidden">
      <table class="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
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
                <button class="btn-ghost text-xs px-2 py-1">Edit</button>
                <button class="btn-ghost text-xs px-2 py-1 text-red-400">Deactivate</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showAddModal = false">
      <div class="card max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-white mb-4">Add New User</h2>
        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Full Name</label>
            <input type="text" class="input" placeholder="John Doe" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Email</label>
            <input type="email" class="input" placeholder="john@hotel.com" required />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Role</label>
            <select class="input" required>
              <option>Admin</option>
              <option>Receptionist</option>
              <option>Kitchen Staff</option>
              <option>Room Service</option>
              <option>Housekeeping</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Department</label>
            <select class="input" required>
              <option>Management</option>
              <option>Front Desk</option>
              <option>Kitchen</option>
              <option>Restaurant</option>
              <option>Housekeeping</option>
            </select>
          </div>
          <div class="flex gap-3">
            <button type="submit" class="btn-primary">Add User</button>
            <button type="button" class="btn-secondary" @click="showAddModal = false">Cancel</button>
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

const users = ref([
  { id: 1, name: 'Admin User', initials: 'AU', email: 'admin@hotel.com', role: 'Admin', department: 'Management', status: 'active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Alice Johnson', initials: 'AJ', email: 'alice@hotel.com', role: 'Receptionist', department: 'Front Desk', status: 'active', lastLogin: '5 hours ago' },
  { id: 3, name: 'Bob Smith', initials: 'BS', email: 'bob@hotel.com', role: 'Chef', department: 'Kitchen', status: 'active', lastLogin: '1 day ago' },
  { id: 4, name: 'Carol White', initials: 'CW', email: 'carol@hotel.com', role: 'Housekeeper', department: 'Housekeeping', status: 'active', lastLogin: '3 hours ago' },
  { id: 5, name: 'David Lee', initials: 'DL', email: 'david@hotel.com', role: 'Waiter', department: 'Restaurant', status: 'inactive', lastLogin: '5 days ago' },
])

const addUser = () => {
  // Connect to Neon DB
  showAddModal.value = false
  alert('User added! (Connect to Neon DB)')
}
</script>
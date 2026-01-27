<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Staff Management</h1>
        <p class="text-gray-400">Manage hotel staff and shifts</p>
      </div>
      <button class="btn-primary">Add Staff Member</button>
    </div>

    <!-- Staff List -->
    <div class="card overflow-hidden">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Department</th>
          <th>Status</th>
          <th>Shift</th>
          <th>Actions</th>
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
            <button class="btn-ghost text-xs px-2 py-1">Edit</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const staffList = ref([
  { id: 1, name: 'Alice Johnson', initials: 'AJ', role: 'Receptionist', department: 'Front Desk', status: 'active', shift: 'Morning' },
  { id: 2, name: 'Bob Smith', initials: 'BS', role: 'Chef', department: 'Kitchen', status: 'active', shift: 'Evening' },
  { id: 3, name: 'Carol White', initials: 'CW', role: 'Housekeeper', department: 'Housekeeping', status: 'active', shift: 'Morning' },
  { id: 4, name: 'David Lee', initials: 'DL', role: 'Waiter', department: 'Restaurant', status: 'off-duty', shift: 'Night' },
  { id: 5, name: 'Emma Davis', initials: 'ED', role: 'Manager', department: 'Management', status: 'active', shift: 'Day' },
])
</script>
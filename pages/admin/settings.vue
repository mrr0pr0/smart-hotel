<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">System Settings</h1>
      <p class="text-gray-400">Configure hotel management system</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Settings Navigation -->
      <div class="card h-fit">
        <nav class="space-y-1">
          <button
            v-for="section in sections"
            :key="section.id"
            :class="activeSection === section.id ? 'nav-item-active' : 'nav-item'"
            @click="activeSection = section.id"
          >
            <component :is="section.icon" class="w-5 h-5" />
            <span>{{ section.name }}</span>
          </button>
        </nav>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- General Settings -->
        <div v-if="activeSection === 'general'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">General Settings</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Hotel Name</label>
              <input type="text" class="input" value="SmartStay Hotel" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Contact Email</label>
              <input type="email" class="input" value="info@smartstay.com" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Phone Number</label>
              <input type="tel" class="input" value="+1 (555) 123-4567" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Address</label>
              <textarea class="input" rows="3">123 Hotel Street, City, State 12345</textarea>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Booking Settings -->
        <div v-if="activeSection === 'booking'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Booking Settings</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Check-in Time</label>
              <input type="time" class="input" value="14:00" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Check-out Time</label>
              <input type="time" class="input" value="11:00" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Cancellation Policy (hours)</label>
              <input type="number" class="input" value="24" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Deposit Percentage</label>
              <input type="number" class="input" value="20" />
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Payment Settings -->
        <div v-if="activeSection === 'payment'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Payment Settings</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Tax Rate (%)</label>
              <input type="number" class="input" value="10" step="0.1" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Currency</label>
              <select class="input">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
              </select>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Accept Credit Cards</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Accept Cash</span>
              </label>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeSection === 'notifications'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Notification Settings</h2>
          <form class="space-y-4">
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Email notifications for new bookings</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>SMS notifications for check-ins</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" />
                <span>Daily revenue reports</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Staff shift reminders</span>
              </label>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Security Settings -->
        <div v-if="activeSection === 'security'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Security Settings</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Session Timeout (minutes)</label>
              <input type="number" class="input" value="30" />
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Require two-factor authentication</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Log all admin actions</span>
              </label>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const activeSection = ref('general')

const sections = [
  { id: 'general', name: 'General' },
  { id: 'booking', name: 'Booking' },
  { id: 'payment', name: 'Payment' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'security', name: 'Security' },
]
</script>
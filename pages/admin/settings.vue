<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Systeminnstillinger</h1>
      <p class="text-gray-400">Konfigurer hotelstyringssystemet</p>
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
          <h2 class="text-xl font-semibold text-white mb-4">Generelle Innstillinger</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Hotellnavn</label>
              <input type="text" class="input" value="smart3 Hotel" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Kontakt E-post</label>
              <input type="email" class="input" value="info@smartstay.com" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Telefonnummer</label>
              <input type="tel" class="input" value="+1 (555) 123-4567" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Adresse</label>
              <textarea class="input" rows="3">123 Hotel Street, City, State 12345</textarea>
            </div>
            <button type="submit" class="btn-primary">Lagre Endringer</button>
          </form>
        </div>

        <!-- Booking Settings -->
        <div v-if="activeSection === 'booking'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Reservasjonsinnstillinger</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Innsjekktid</label>
              <input type="time" class="input" value="14:00" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Utsjekktid</label>
              <input type="time" class="input" value="11:00" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Avbestillingspolicy (timer)</label>
              <input type="number" class="input" value="24" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Depositumprosent</label>
              <input type="number" class="input" value="20" />
            </div>
            <button type="submit" class="btn-primary">Lagre Endringer</button>
          </form>
        </div>

        <!-- Payment Settings -->
        <div v-if="activeSection === 'payment'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Betalingsinnstillinger</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Momssats (%)</label>
              <input type="number" class="input" value="10" step="0.1" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-2">Valuta</label>
              <select class="input">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
              </select>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Godta Kredittkort</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Godta Kontanter</span>
              </label>
            </div>
            <button type="submit" class="btn-primary">Lagre Endringer</button>
          </form>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeSection === 'notifications'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Varslingsinnstillinger</h2>
          <form class="space-y-4">
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>E-postavslinger for nye reservasjoner</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>SMS-varsler for innsjekkinger</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" />
                <span>Daglige inntektsrapporter</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Personalpåminnelser for skift</span>
              </label>
            </div>
            <button type="submit" class="btn-primary">Lagre Endringer</button>
          </form>
        </div>

        <!-- Security Settings -->
        <div v-if="activeSection === 'security'" class="card">
          <h2 class="text-xl font-semibold text-white mb-4">Sikkerhetsinnstillinger</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Sesjontidsfrist (minutter)</label>
              <input type="number" class="input" value="30" />
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Krever tofaktorgodkjenning</span>
              </label>
            </div>
            <div>
              <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" checked />
                <span>Logg alle administratorhandlinger</span>
              </label>
            </div>
            <button type="submit" class="btn-primary">Lagre Endringer</button>
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
  { id: 'general', name: 'General', icon: 'i-heroicons-cog-6-tooth' },
  { id: 'booking', name: 'Booking', icon: 'i-heroicons-calendar' },
  { id: 'payment', name: 'Payment', icon: 'i-heroicons-credit-card' },
  { id: 'notifications', name: 'Notifications', icon: 'i-heroicons-bell' },
  { id: 'security', name: 'Security', icon: 'i-heroicons-lock-closed' },
]
</script>
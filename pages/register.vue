<template>
  <div class="w-full max-w-md">
    <div class="card">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient mb-2">SmartStay</h1>
        <p class="text-gray-400">Opprett kontoen din</p>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Fullt Navn</label>
          <input
              v-model="name"
              type="text"
              class="input"
              placeholder="John Doe"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">E-post</label>
          <input
              v-model="email"
              type="email"
              class="input"
              placeholder="john@example.com"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Passord</label>
          <input
              v-model="password"
              type="password"
              class="input"
              placeholder="••••••••"
              required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Bekreft Passord</label>
          <input
              v-model="confirmPassword"
              type="password"
              class="input"
              placeholder="••••••••"
              required
          />
        </div>

        <button type="submit" class="btn-primary w-full">Opprett Konto</button>
      </form>

      <!-- Login Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-400">
          Har du allerede en konto?
          <NuxtLink to="/login" class="text-primary-400 hover:text-primary-300">Logg inn</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passord samsvarer ikke!')
    return
  }
  // TODO: Implement register logic
  console.log('Register:', name.value, email.value)
  navigateTo('/login')
}
</script>
<template>
  <div class="w-full max-w-md">
    <div class="card">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gradient mb-2">SmartStay</h1>
        <p class="text-gray-400">Logg inn på kontoen din</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">E-post</label>
          <input
              v-model="email"
              type="email"
              class="input"
              placeholder="admin@hotel.com"
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

        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input type="checkbox" class="rounded bg-[#111111] border-[#2a2a2a]" />
            <span>Husk meg</span>
          </label>
          <a href="#" class="text-sm text-primary-400 hover:text-primary-300">Glemt passord?</a>
        </div>

        <button type="submit" class="btn-primary w-full">Logg Inn</button>
      </form>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-400">
          Har du ikke en konto?
          <NuxtLink to="/register" class="text-primary-400 hover:text-primary-300">Registrer deg</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // TODO: Implement login logic
  console.log('Login:', email.value, password.value)
  navigateTo('/')
}
</script>
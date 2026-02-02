<template>
  <footer class="bg-[#111111] border-t border-[#2a2a2a] px-6 py-4">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-500">
        © {{ currentYear }} SmartStay Hotel Management. All rights reserved.
      </div>
      <div class="flex items-center gap-6">
        <a href="#" class="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="text-sm text-gray-500 hover:text-white transition-colors">Support</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
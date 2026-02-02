<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Guest Information -->
    <div>
      <h3 class="text-lg font-semibold text-white mb-4">Guest Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          v-model="formData.guest.firstName"
          label="First Name"
          placeholder="John"
          required
        />
        <Input
          v-model="formData.guest.lastName"
          label="Last Name"
          placeholder="Doe"
          required
        />
        <Input
          v-model="formData.guest.email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          required
        />
        <Input
          v-model="formData.guest.phone"
          type="tel"
          label="Phone"
          placeholder="+1234567890"
          required
        />
      </div>
    </div>

    <!-- Booking Details -->
    <div>
      <h3 class="text-lg font-semibold text-white mb-4">Booking Details</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          v-model="formData.checkIn"
          type="date"
          label="Check-in Date"
          required
        />
        <Input
          v-model="formData.checkOut"
          type="date"
          label="Check-out Date"
          required
        />
        <Input
          v-model.number="formData.guests"
          type="number"
          label="Number of Guests"
          :min="1"
          :max="room?.capacity || 10"
          required
        />
      </div>
    </div>

    <!-- Room Summary -->
    <div v-if="room" class="card bg-[#111111]">
      <h3 class="text-lg font-semibold text-white mb-4">Room Summary</h3>
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Room Number:</span>
          <span class="text-white">{{ room.number }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Room Type:</span>
          <span class="text-white capitalize">{{ room.type }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-400">Price per Night:</span>
          <span class="text-white">${{ room.price }}</span>
        </div>
        <div v-if="nights > 0" class="flex justify-between text-sm">
          <span class="text-gray-400">Number of Nights:</span>
          <span class="text-white">{{ nights }}</span>
        </div>
        <div v-if="totalPrice > 0" class="flex justify-between text-lg font-semibold pt-2 border-t border-[#2a2a2a]">
          <span class="text-white">Total:</span>
          <span class="text-primary-400">${{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-4">
      <Button type="submit" :loading="loading" full-width>
        Confirm Booking
      </Button>
      <Button type="button" variant="secondary" @click="emit('cancel')">
        Cancel
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Room } from '~/types/room'

interface Props {
  room?: Room
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const formData = ref({
  guest: {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  },
  checkIn: '',
  checkOut: '',
  guests: 1
})

const nights = computed(() => {
  if (!formData.value.checkIn || !formData.value.checkOut) return 0
  const checkIn = new Date(formData.value.checkIn)
  const checkOut = new Date(formData.value.checkOut)
  const diff = checkOut.getTime() - checkIn.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

const totalPrice = computed(() => {
  if (!props.room || nights.value <= 0) return 0
  return parseFloat(props.room.price) * nights.value
})

const handleSubmit = () => {
  emit('submit', {
    ...formData.value,
    roomId: props.room?.id,
    totalPrice: totalPrice.value
  })
}
</script>
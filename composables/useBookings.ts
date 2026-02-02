import type { Booking, CreateBookingData } from '~/types/booking'

export const useBookings = () => {
  const bookings = ref<Booking[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBookings = async (status?: string) => {
    loading.value = true
    error.value = null

    try {
      const query = status ? `?status=${status}` : ''
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Booking[] }>(`/api/bookings${query}`)

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch bookings')
      }

      if (data.value?.success) {
        bookings.value = data.value.data
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchBookingById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Booking }>(`/api/bookings/${id}`)

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch booking')
      }

      if (data.value?.success) {
        return data.value.data
      }

      return null
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const createBooking = async (bookingData: CreateBookingData) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Booking }>('/api/bookings/create', {
        method: 'POST',
        body: bookingData
      })

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to create booking')
      }

      if (data.value?.success) {
        return { success: true, data: data.value.data }
      }

      return { success: false, error: 'Failed to create booking' }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    fetchBookingById,
    createBooking
  }
}
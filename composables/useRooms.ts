import type { Room, RoomAvailability } from '~/types/room'

export const useRooms = () => {
  const rooms = ref<Room[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRooms = async (status?: string) => {
    loading.value = true
    error.value = null

    try {
      const query = status ? `?status=${status}` : ''
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Room[] }>(`/api/rooms${query}`)

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch rooms')
      }

      if (data.value?.success) {
        rooms.value = data.value.data
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchRoomById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Room }>(`/api/rooms/${id}`)

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch room')
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

  const checkAvailability = async (dates: RoomAvailability) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await useFetch<{ success: boolean; data: Room[] }>('/api/rooms/availability', {
        method: 'POST',
        body: dates
      })

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to check availability')
      }

      if (data.value?.success) {
        return data.value.data
      }

      return []
    } catch (err: any) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    fetchRoomById,
    checkAvailability
  }
}
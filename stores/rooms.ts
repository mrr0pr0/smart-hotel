import { defineStore } from 'pinia'
import type { Room } from '~/types/room'

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    rooms: [] as Room[],
    selectedRoom: null as Room | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    setRooms(rooms: Room[]) {
      this.rooms = rooms
    },

    setSelectedRoom(room: Room | null) {
      this.selectedRoom = room
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string | null) {
      this.error = error
    }
  },

  getters: {
    availableRooms: (state) => state.rooms.filter(room => room.status === 'available'),
    occupiedRooms: (state) => state.rooms.filter(room => room.status === 'occupied'),
    maintenanceRooms: (state) => state.rooms.filter(room => room.status === 'maintenance'),
    roomsByType: (state) => (type: string) => state.rooms.filter(room => room.type === type)
  }
})
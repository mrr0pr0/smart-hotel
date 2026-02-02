import { defineStore } from "pinia";
import type { Booking } from "~/types/booking";

export const useBookingsStore = defineStore("bookings", {
  state: () => ({
    bookings: [] as Booking[],
    selectedBooking: null as Booking | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    setBookings(bookings: Booking[]) {
      this.bookings = bookings;
    },

    setSelectedBooking(booking: Booking | null) {
      this.selectedBooking = booking;
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },

    addBooking(booking: Booking) {
      this.bookings.push(booking);
    },
  },

  getters: {
    pendingBookings: (state) =>
      state.bookings.filter((b) => b.status === "pending"),
    confirmedBookings: (state) =>
      state.bookings.filter((b) => b.status === "confirmed"),
    checkedInBookings: (state) =>
      state.bookings.filter((b) => b.status === "checked-in"),
    checkedOutBookings: (state) =>
      state.bookings.filter((b) => b.status === "checked-out"),
    cancelledBookings: (state) =>
      state.bookings.filter((b) => b.status === "cancelled"),
  },
});

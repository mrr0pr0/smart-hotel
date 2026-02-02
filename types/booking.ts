export interface Guest {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  idNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: number
  guestId: number
  roomId: number
  checkIn: Date
  checkOut: Date
  nights: number
  guests: number
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
  specialRequests?: string
  roomRate: string
  tax: string
  serviceFee: string
  total: string
  paid: string
  balance: string
  createdAt: Date
  updatedAt: Date
  guest?: Guest
  room?: any
}

export interface CreateBookingData {
  guest: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address?: string
    idNumber?: string
  }
  roomId: number
  checkIn: Date
  checkOut: Date
  guests: number
  specialRequests?: string
}
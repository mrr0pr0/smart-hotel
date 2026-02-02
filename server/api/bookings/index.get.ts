import { eq } from 'drizzle-orm'
import { bookings, guests, rooms } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const status = query.status as string | undefined

    let bookingsQuery = db.select().from(bookings)

    if (status) {
      bookingsQuery = bookingsQuery.where(eq(bookings.status, status as any))
    }

    const allBookings = await bookingsQuery

    // Fetch related guest and room data
    const bookingsWithDetails = await Promise.all(
      allBookings.map(async (booking) => {
        const guest = await db.select().from(guests).where(eq(guests.id, booking.guestId)).limit(1)
        const room = await db.select().from(rooms).where(eq(rooms.id, booking.roomId)).limit(1)

        return {
          ...booking,
          guest: guest[0] || null,
          room: room[0] || null
        }
      })
    )

    return {
      success: true,
      data: bookingsWithDetails
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch bookings'
    })
  }
})
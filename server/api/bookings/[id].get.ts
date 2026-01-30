import { eq } from 'drizzle-orm'
import { bookings, guests, rooms } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id || '0')

        if (!id) {
            throw createError({
                statusCode: 400,
                message: 'Invalid booking ID'
            })
        }

        const booking = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1)

        if (!booking.length) {
            throw createError({
                statusCode: 404,
                message: 'Booking not found'
            })
        }

        // Fetch related guest and room data
        const guest = await db.select().from(guests).where(eq(guests.id, booking[0].guestId)).limit(1)
        const room = await db.select().from(rooms).where(eq(rooms.id, booking[0].roomId)).limit(1)

        return {
            success: true,
            data: {
                ...booking[0],
                guest: guest[0] || null,
                room: room[0] || null
            }
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch booking'
        })
    }
})
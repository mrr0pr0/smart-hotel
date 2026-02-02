import { eq } from 'drizzle-orm'
import { rooms } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const status = query.status as string | undefined

    let roomsQuery = db.select().from(rooms)

    if (status) {
      roomsQuery = roomsQuery.where(eq(rooms.status, status as any))
    }

    const allRooms = await roomsQuery

    // Parse features JSON string to array
    const roomsWithParsedFeatures = allRooms.map(room => ({
      ...room,
      features: room.features ? JSON.parse(room.features) : []
    }))

    return {
      success: true,
      data: roomsWithParsedFeatures
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch rooms'
    })
  }
})
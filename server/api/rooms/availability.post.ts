import { and, eq, or, lte, gte, not } from "drizzle-orm";
import { rooms, bookings } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { checkIn, checkOut } = body;

    if (!checkIn || !checkOut) {
      throw createError({
        statusCode: 400,
        message: "Check-in and check-out dates are required",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Get all rooms
    const allRooms = await db.select().from(rooms);

    // Get bookings that overlap with the requested dates
    const overlappingBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          or(
            and(
              lte(bookings.checkIn, checkInDate),
              gte(bookings.checkOut, checkInDate),
            ),
            and(
              lte(bookings.checkIn, checkOutDate),
              gte(bookings.checkOut, checkOutDate),
            ),
            and(
              gte(bookings.checkIn, checkInDate),
              lte(bookings.checkOut, checkOutDate),
            ),
          ),
          not(eq(bookings.status, "cancelled")),
        ),
      );

    // Filter out booked rooms
    const bookedRoomIds = overlappingBookings.map((b) => b.roomId);
    const availableRooms = allRooms.filter(
      (room) => !bookedRoomIds.includes(room.id) && room.status === "available",
    );

    // Parse features for available rooms
    const roomsWithParsedFeatures = availableRooms.map((room) => ({
      ...room,
      features: room.features ? JSON.parse(room.features) : [],
    }));

    return {
      success: true,
      data: roomsWithParsedFeatures,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to check availability",
    });
  }
});

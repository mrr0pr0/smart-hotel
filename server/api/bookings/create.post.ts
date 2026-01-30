import { guests, bookings, rooms } from "~/server/database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      guest: guestData,
      roomId,
      checkIn,
      checkOut,
      guests: numGuests,
      specialRequests,
    } = body;

    if (!guestData || !roomId || !checkIn || !checkOut) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields",
      });
    }

    // Get room details
    const room = await db
      .select()
      .from(rooms)
      .where(eq(rooms.id, roomId))
      .limit(1);

    if (!room.length) {
      throw createError({
        statusCode: 404,
        message: "Room not found",
      });
    }

    // Create or get guest
    let guestId: number;
    const existingGuest = await db
      .select()
      .from(guests)
      .where(eq(guests.email, guestData.email))
      .limit(1);

    if (existingGuest.length) {
      guestId = existingGuest[0].id;
    } else {
      const newGuest = await db
        .insert(guests)
        .values({
          firstName: guestData.firstName,
          lastName: guestData.lastName,
          email: guestData.email,
          phone: guestData.phone,
          address: guestData.address || null,
          idNumber: guestData.idNumber || null,
        })
        .returning();
      guestId = newGuest[0].id;
    }

    // Calculate booking details
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const roomRate = parseFloat(room[0].price) * nights;
    const tax = roomRate * 0.1; // 10% tax
    const serviceFee = roomRate * 0.05; // 5% service fee
    const total = roomRate + tax + serviceFee;

    // Create booking
    const newBooking = await db
      .insert(bookings)
      .values({
        guestId,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        guests: numGuests || 1,
        status: "pending",
        specialRequests: specialRequests || null,
        roomRate: roomRate.toFixed(2),
        tax: tax.toFixed(2),
        serviceFee: serviceFee.toFixed(2),
        total: total.toFixed(2),
        paid: "0",
        balance: total.toFixed(2),
      })
      .returning();

    return {
      success: true,
      data: newBooking[0],
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to create booking",
    });
  }
});

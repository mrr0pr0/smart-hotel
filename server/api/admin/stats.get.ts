import { eq, count, sum } from "drizzle-orm";
import { R } from "vue-router/dist/router-CWoNjPRp.mjs";
import { bookings, orders, rooms, users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    //get total bookings
    const totalBookings = await db.select({ count: count() }).from(bookings);

    // get active bookings
    const activeBookings = await db
      .select({ count: count() })
      .from(bookings)
      .where(eq(bookings.status, "checked-in"));

    //get toatal revenue
    const revenue = await db
      .select({ total: sum(bookings.paid) })
      .from(bookings);

    //get avabile rooms
    const availableRooms = await db
      .select({ count: count() })
      .from(rooms)
      .where(eq(rooms.status, "available"));

    //get pending orders
    const pendingOrders = await db
      .select({ count: count() })
      .from(orders)
      .where(eq(orders.status, "pending"));

    //get total staff
    const totalStaff = await db.select({ count: count() }).from(users);

    return {
      success: true,
      data: {
        totalBookings: totalBookings[0].count,
        activeBookings: activeBookings[0].count,
        totalRevenue: revenue[0].total || "0",
        availableRooms: availableRooms[0].count,
        pendingOrders: pendingOrders[0].count,
        totalStaff: totalStaff[0].count,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "failed to get statstices",
    });
  }
});

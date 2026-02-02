import { eq } from "drizzle-orm";
import { orders } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const status = query.status as string | undefined;

    let ordersQuery = db
      .select()
      .from(orders)
      .where(eq(orders.type, "room-service"));

    if (status) {
      ordersQuery = ordersQuery.where(eq(orders.status, status as any));
    }

    const roomServiceOrders = await ordersQuery;

    // Parse items JSON
    const ordersWithParsedItems = roomServiceOrders.map((order) => ({
      ...order,
      items: JSON.parse(order.items),
    }));

    return {
      success: true,
      data: ordersWithParsedItems,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to fetch room service orders",
    });
  }
});

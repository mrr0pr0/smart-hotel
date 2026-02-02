import { orders } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { type, location, roomId, guestId, items, notes } = body;

    if (!type || !location || !items || !items.length) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields",
      });
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    // Create order
    const newOrder = await db
      .insert(orders)
      .values({
        type,
        location,
        roomId: roomId || null,
        guestId: guestId || null,
        status: "pending",
        items: JSON.stringify(items),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        notes: notes || null,
      })
      .returning();

    return {
      success: true,
      data: newOrder[0],
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to create order",
    });
  }
});

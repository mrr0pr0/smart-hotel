import { rooms } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    const { number, type, floor, price, capacity, size, view, description, features } = body;

    // Validate required fields
    if (!number || !type || !floor || !price || !capacity) {
      throw createError({
        statusCode: 400,
        message: "Missing required fields: number, type, floor, price, capacity",
      });
    }

    // Insert new room
    const newRoom = await db
      .insert(rooms)
      .values({
        number,
        type,
        floor: parseInt(floor),
        price: price.toString(),
        capacity: parseInt(capacity),
        size: size ? parseInt(size) : null,
        view: view || null,
        description: description || null,
        features: features ? JSON.stringify(features) : null,
        status: "available",
        lastCleaned: new Date(),
      })
      .returning();

    return {
      success: true,
      data: newRoom[0],
      message: "Room created successfully",
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to create room",
    });
  }
});
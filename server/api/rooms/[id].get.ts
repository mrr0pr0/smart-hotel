import { eq } from "drizzle-orm";
import { features } from "node:process";
import { rooms } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || "0");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ikke ekte room ID",
      });
    }

    const room = await db.select().from(rooms).where(eq(rooms.id, id)).limit(1);

    if (!room.length) {
      throw createError({
        statusCode: 404,
        message: "room ikke funnet",
      });
    }

    //json to sting of array
    const roomData = {
      ...room[0],
      features: room[0].features ? JSON.parse(room[0].features) : [],
    };

    return {
      success: true,
      data: roomData,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to fetch room",
    });
  }
});

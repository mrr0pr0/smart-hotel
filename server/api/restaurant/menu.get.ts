import { eq } from "drizzle-orm";
import { menuItems } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const category = query.category as string | undefined;

    let menuQuery = db.select().from(menuItems);

    if (category) {
      menuQuery = menuQuery.where(eq(menuItems.category, category));
    }

    const items = await menuQuery;

    return {
      success: true,
      data: items,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to fetch menu tings",
    });
  }
});

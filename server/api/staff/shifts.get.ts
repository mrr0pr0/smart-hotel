import { eq } from "drizzle-orm";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const shift = query.shift as string | undefined;

    let usersQuery = db.select().from(users);

    if (shift) {
      usersQuery = usersQuery.where(eq(users.shift, shift));
    }

    const staff = await usersQuery;

    // Remove passwords and group by shift
    const staffWithoutPasswords = staff.map(({ password, ...user }) => user);

    return {
      success: true,
      data: staffWithoutPasswords,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to fetch shifts",
    });
  }
});
